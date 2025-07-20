var total;

function showLoadingState() {
  const calculateBtn = document.getElementById("calculate");
  const calculateText = document.getElementById("calculate-text");
  const loadingSpinner = document.getElementById("loading-spinner");
  const loadingText = document.getElementById("loading-text");
  
  // Show loading state
  calculateText.classList.add("d-none");
  loadingSpinner.classList.remove("d-none");
  loadingText.classList.remove("d-none");
  calculateBtn.classList.add("btn-loading");
  calculateBtn.disabled = true;
}

function hideLoadingState() {
  const calculateBtn = document.getElementById("calculate");
  const calculateText = document.getElementById("calculate-text");
  const loadingSpinner = document.getElementById("loading-spinner");
  const loadingText = document.getElementById("loading-text");
  
  // Hide loading state
  calculateText.classList.remove("d-none");
  loadingSpinner.classList.add("d-none");
  loadingText.classList.add("d-none");
  calculateBtn.classList.remove("btn-loading");
  calculateBtn.disabled = false;
}

//Calculate Result
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

  // Show loading spinner
  showLoadingState();

  // Simulate calculation time (realistic delay)
  setTimeout(() => {
    //Calculate sum
    total = ((birthday + duration + elapsed + (serious * stability)) - another)

    //Display the result with animations
    const resultElement = document.getElementById("result");
    const totalResultElement = document.getElementById("totalResult");
    
    // Remove previous animation classes
    resultElement.classList.remove("result-success-enter", "result-danger-enter");
    
    if (total<=18){
      totalResultElement.classList.remove("d-none");
      totalResultElement.classList.add("show");
      resultElement.innerHTML = "You're good to go!";
      resultElement.className = "h4 text-success-custom result-success-enter";
    } else if (total>=18){
      totalResultElement.classList.remove("d-none");
      totalResultElement.classList.add("show");
      resultElement.innerHTML = "Sorry, they're off limits";
      resultElement.className = "h4 text-danger-custom result-danger-enter";
    }
    
    // Hide loading state
    hideLoadingState();
  }, 1200); // 1.2 second delay for realistic feel
}

function clearResult(){
  document.getElementById("birthday").value = "-1";
  document.getElementById("serious").value = "-1";
  document.getElementById("stability").value = "-1";
  document.getElementById("duration").value = "-1";
  document.getElementById("elapsed").value = "-1";
  document.getElementById("another").value = "-1";
  
  const totalResultElement = document.getElementById("totalResult");
  const resultElement = document.getElementById("result");
  
  // Add fade out animation before hiding
  totalResultElement.classList.remove("show");
  
  setTimeout(() => {
    totalResultElement.classList.add("d-none");
    resultElement.className = "h4";
    resultElement.classList.remove("result-success-enter", "result-danger-enter");
  }, 300);
  
  total = -1
}

//click to call function
document.getElementById("calculate").onclick = function() {
  calculateResult();
};

//click to reset
document.getElementById("back").onclick = function()  {
  clearResult()
}


