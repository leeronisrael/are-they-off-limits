//Calculate Tip
function calculateResult() {
  var birthday = document.getElementById("birthday").value;
  var serious = document.getElementById("serious").value;
  var stability = document.getElementById("stability").value;
  var duration = document.getElementById("duration").value;
  var elapsed = document.getElementById("elapsed").value;
  var another = document.getElementById("another").value;

  //validate input
  if (birthday === -1 || serious === -1 || stability === -1 || duration === -1 || elapsed === -1 || another === -1 ) {
    alert("Please enter values");
    return;
  }

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
//     document.getElementById("totalResult").style.display = "block"
//     document.getElementById("result").innerHTML = "blah";
  }
}

//Hide the result on load
document.getElementById("totalResult").style.display = "none";

//click to call function
document.getElementById("calculate").onclick = function() {
  calculateResult();

};
