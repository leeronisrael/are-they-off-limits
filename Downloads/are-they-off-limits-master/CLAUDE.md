# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple static web application called "Are They Off Limits?" - a novelty calculator that helps users determine if it's appropriate to pursue a romantic relationship with someone who previously dated a friend. The application uses a scoring algorithm based on friendship closeness, relationship history, and timing factors.

## Architecture

- **Frontend-only application**: No backend, database, or build process required
- **Vanilla JavaScript**: No frameworks or dependencies
- **Static HTML/CSS/JS**: Can be served directly from any web server or opened locally
- **Bootstrap styling**: Uses Bootstrap 4.3.1 CDN for basic styling with custom CSS overrides

## Core Components

- `index.html`: Main application interface with form inputs for relationship factors
- `index.js`: Contains the scoring algorithm and DOM manipulation logic
- `style.css`: Custom styling that extends Bootstrap theming
- `README.md`: Basic project description

## Key Functionality

The application calculates a "limits score" using this formula:
```
score = (birthday_contact + duration + time_elapsed + (seriousness × stability)) - new_relationship_factor
```

- Score ≤ 18: "You're good to go!"
- Score > 18: "Sorry, they're off limits"

## Development Commands

Since this is a static web application, no build commands are needed:

- **Local development**: Open `index.html` directly in a browser or serve via any local web server
- **Testing**: Manual testing in browser - no automated test framework
- **Deployment**: Copy files to any static hosting service

## Code Structure

- All logic is contained in a single JavaScript file with two main functions:
  - `calculateResult()`: Validates inputs, calculates score, and displays result
  - `clearResult()`: Resets form and hides results
- Form validation ensures all dropdown selections are made before calculation
- Results are dynamically shown/hidden using CSS display property