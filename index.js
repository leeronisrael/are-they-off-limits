//Calculate Tip
function calculateResult() {
  var birthday = document.getElementById("birthday").value;
  var serious = document.getElementById("serious").value;
  var stability = document.getElementById("stability").value;
  var duration = document.getElementById("duration").value;
  var elapsed = document.getElementById("elapsed").value;
  var another = document.getElementById("another").value;

  //validate input
//   if (birthday === 0 || serious == 0 || stability === 0 || duration == 0 || elapsed === 0 || another == 0 ) {
//     alert("Please enter values");
//     return;
//   }

  //Calculate sum
  var total = ((birthday + duration + elapsed + (serious * stability)) - another)

  //Display the result
  if (total>-1 && <=18){
    document.getElementById("totalResult").style.display = "block"
    document.getElementById("result").innerHTML = "You're good to go!";
  } else if (total>=18){
    document.getElementById("totalResult").style.display = "block"
    document.getElementById("result").innerHTML = "Sorry, they're off limits";  
  } else {
    document.getElementById("totalResult").style.display = "block"
    document.getElementById("result").innerHTML = "blah";
  }
}

//Hide the result on load
document.getElementById("totalResult").style.display = "none";

//click to call function
document.getElementById("calculate").onclick = function() {
  calculateResult();

};
