import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Top 50 US airports by air travel volume, plus Tampa
const airportCoordinates = {
    ATL: [33.6407, -84.4277], // Atlanta
    LAX: [33.9416, -118.4085], // Los Angeles
    ORD: [41.9786, -87.9048], // Chicago O'Hare
    DFW: [32.8998, -97.0403], // Dallas/Fort Worth
    DEN: [39.8561, -104.6737], // Denver
    JFK: [40.6413, -73.7781], // New York JFK
    SFO: [37.6188, -122.3758], // San Francisco
    SEA: [47.4502, -122.3088], // Seattle
    LAS: [36.0840, -115.1537], // Las Vegas
    MCO: [28.4312, -81.3081], // Orlando
    EWR: [40.6895, -74.1745], // Newark
    CLT: [35.2140, -80.9431], // Charlotte
    PHX: [33.4484, -112.0740], // Phoenix
    IAH: [29.9844, -95.3414], // Houston
    MIA: [25.7932, -80.2906], // Miami
    BOS: [42.3656, -71.0096], // Boston
    MSP: [44.8848, -93.2223], // Minneapolis
    DTW: [42.2162, -83.3554], // Detroit
    FLL: [26.0742, -80.1506], // Fort Lauderdale
    PHL: [39.8721, -75.2410], // Philadelphia
    LGA: [40.7769, -73.8740], // New York LaGuardia
    BWI: [39.1774, -76.6684], // Baltimore
    SLC: [40.7899, -111.9791], // Salt Lake City
    DCA: [38.8512, -77.0402], // Washington Reagan
    IAD: [38.9445, -77.4558], // Washington Dulles
    SAN: [32.7336, -117.1897], // San Diego
    MDW: [41.7868, -87.7522], // Chicago Midway
    TPA: [27.9756, -82.5333], // Tampa
    BNA: [36.1263, -86.6774], // Nashville
    DAL: [32.8481, -96.8512], // Dallas Love Field
    HNL: [21.3187, -157.9225], // Honolulu
    PDX: [45.5898, -122.5951], // Portland
    STL: [38.7499, -90.3748], // St. Louis
    HOU: [29.6454, -95.2789], // Houston Hobby
    OAK: [37.7214, -122.2208], // Oakland
    MCI: [39.2976, -94.7139], // Kansas City
    MSY: [29.9934, -90.2580], // New Orleans
    RDU: [35.8801, -78.7880], // Raleigh/Durham
    SMF: [38.6957, -121.5908], // Sacramento
    SJC: [37.3639, -121.9289], // San Jose
    AUS: [30.1975, -97.6664], // Austin
    SAT: [29.5337, -98.4698], // San Antonio
    IND: [39.7169, -86.2956], // Indianapolis
    SNA: [33.6762, -117.8676], // Santa Ana (Orange County)
    CLE: [41.4117, -81.8494], // Cleveland
    PIT: [40.4915, -80.2329], // Pittsburgh
    CVG: [39.0489, -84.6678], // Cincinnati
    MKE: [42.9476, -87.8966], // Milwaukee
    RSW: [26.5362, -81.7552], // Fort Myers
    BDL: [41.9389, -72.6832], // Hartford
};

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

app.post('/api/flight', async (req, res) => {
    const { flightNumber, date, userLat, userLon } = req.body;

    console.log(`Received request for flight ${flightNumber} on ${date}`);
    console.log(`User location: ${userLat}, ${userLon}`);

    // Parse the start date and create an end date (next day)
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    // Format dates as YYYY-MM-DD
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    const url = `https://aeroapi.flightaware.com/aeroapi/flights/${flightNumber}?start=${formattedStartDate}&end=${formattedEndDate}&ident_type=designator`;

    console.log('Requesting flight data from FlightAware API:');
    console.log(`URL: ${url}`);

    try {
        if (!process.env.FLIGHTAWARE_API_KEY) {
            throw new Error('FLIGHTAWARE_API_KEY is not set in environment variables');
        }

        const response = await fetch(url, {
            headers: {
                'x-apikey': process.env.FLIGHTAWARE_API_KEY
            }
        });

        const data = await response.json();

        console.log('FlightAware API Response Status:', response.status);
        console.log('Number of flights returned:', data.flights ? data.flights.length : 0);

        if (!response.ok) {
            throw new Error(`FlightAware API responded with status: ${response.status}`);
        }

        if (!data.flights || data.flights.length === 0) {
            throw new Error('No flights found for the given flight number and date');
        }

        // Find the flight closest to the user's location
        let closestFlight = null;
        let shortestDistance = Infinity;

        for (const flight of data.flights) {
            console.log(`Processing flight: ${flight.ident}`);
            console.log(`Origin: ${flight.origin.code}`);
            
            const airportCoords = airportCoordinates[flight.origin.code_iata];
            if (!airportCoords) {
                console.log(`No coordinates found for airport ${flight.origin.code_iata}`);
                continue;
            }

            const [airportLat, airportLon] = airportCoords;
            console.log(`Airport Coordinates: ${airportLat}, ${airportLon}`);

            const distance = calculateDistance(userLat, userLon, airportLat, airportLon);
            console.log(`Distance to user: ${distance.toFixed(2)} km`);

            if (distance < shortestDistance) {
                shortestDistance = distance;
                closestFlight = flight;
            }
        }

        if (closestFlight) {
            console.log(`Selected flight: ${closestFlight.ident} from ${closestFlight.origin.code_iata}`);
            res.json({ flight: closestFlight });
        } else {
            throw new Error('Unable to determine the closest flight');
        }
    } catch (error) {
        console.error("Error fetching or processing flight data:", error);
        res.status(500).json({ error: "Error fetching flight data", details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`FlightAware API Key is ${process.env.FLIGHTAWARE_API_KEY ? 'set' : 'not set'}`);
});