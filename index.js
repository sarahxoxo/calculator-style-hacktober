$(function() {
  var result = 0;
  var operation = null;
  var currentEntry = 0;
  var prevEntry = 0;
  updateScreen(result);
  
  $(".button").on("click", function(e) {
    var pressed = $(this).data("value");

    if(pressed === "C") {
      result = 0;
      currentEntry = 0;
      updateScreen(currentEntry);
    } else if(pressed === "+/-") {
      currentEntry *= -1;
      updateScreen(currentEntry);
    } else if(pressed === "%") {
      currentEntry /= 100;
      updateScreen(currentEntry);
    } else if(pressed === ".") {
       if(currentEntry === 0) {
        currentEntry = pressed;
      } else {
        currentEntry += pressed.toString();
      }
      updateScreen(currentEntry);

    } else if(isOperator(pressed)) {
      prevEntry = currentEntry;
      operation = pressed;
      currentEntry = "";
      $(".result span").html(operation);
    } else if(isNum(pressed)) {
      if(currentEntry === 0) {
        currentEntry = pressed;
      } else {
        currentEntry += pressed.toString();
      }
      updateScreen(currentEntry);
    } else if(pressed === "=") {
      currentEntry = compute(prevEntry, currentEntry, operation);
      operation = null;
      updateScreen(currentEntry);
    }
  });
});

function updateScreen(display) {
  $(".result span").html(display);
}

function isNum(value) {
  return !isNaN(value);
} 

function isOperator(value) {
  return value === "÷" || value === "x" || value === "-" || value === "+";
}
function compute(prev, current, operation) {
  prev = parseFloat(prev);
  current = parseFloat(current);
  
  if(operation === "+") return prev + current;
  else if(operation === "-") return prev - current;
  else if(operation === "x") return prev * current;
  else if(operation === "÷") return prev / current;
}
