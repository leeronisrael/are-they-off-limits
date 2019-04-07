var total;

//Calculate Tip
function calculateResult() {
  var birthday = parseInt(document.getElementById("birthday").value);
  var serious = parseInt(document.getElementById("serious").value);
  var stability = parseInt(document.getElementById("stability").value);
  var duration = parseInt(document.getElementById("duration").value);
  var elapsed = parseInt(document.getElementById("elapsed").value);
  var another = parseInt(document.getElementById("another").value);

  //validate input
  if (birthday == -1 || serious == -1 || stability == -1 || duration == -1 || elapsed == -1 || another == -1 ) {
    alert("Please enter values");
    return;
  }

  //Calculate sum
  total = ((birthday + duration + elapsed + (serious * stability)) - another)

  //Display the result
  if (total<=18){
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

function clearResult(){
  document.getElementById("birthday").value = "-1";
  document.getElementById("serious").value = "-1";
  document.getElementById("stability").value = "-1";
  document.getElementById("duration").value = "-1";
  document.getElementById("elapsed").value = "-1";
  document.getElementById("another").value = "-1";
  document.getElementById("totalResult").style.display = "none";
  total = -1
}
//Hide the result on load
document.getElementById("totalResult").style.display = "none";

//click to call function
document.getElementById("calculate").onclick = function() {
  calculateResult();
};

//click to reset
document.getElementById("back").onclick = function()  {
  clearResult()
}


