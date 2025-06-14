function myFunction() {
  // Get all values from the vals input boxes  
  var text_in = document.getElementById("vals");
  var min_col = Number(text_in.elements[0].value);
  var max_col = Number(text_in.elements[1].value);
  var min_row = Number(text_in.elements[2].value);
  var max_row = Number(text_in.elements[3].value);
  var text = ""
  var array = [text_in.elements[0].value, text_in.elements[1].value, text_in.elements[2].value, text_in.elements[3].value];
  // Makes sure the 4 values are numbers
  var validBits = isValidNumberArray(array);
  // If not displays an error instead of a table
  if (validBits != 0) {
    text = makeError(text_in, validBits)
  }
  // If they are all numbers make the table
  else {
    text = makeTable(min_col, max_col, min_row, max_row);
  }
  document.getElementById("table").innerHTML = text;
  // document.getElementById("table").innerText = text;
}

// Takes 4 values, and creates a multiplication table with html format
function makeTable(min_col, max_col, min_row, max_row) {
  // Variable declaration
  var i;
  var j;
  var i_addend = 1;
  var j_addend = 1;
  var text = "<div class='row'> <div class='col'> <div class='scrollable-table'> <table class='center table'>\n  <tr> <th id='blank'>  </th>";

  // Creates the first row, contains the row values and makes them header table elements.
  if (max_row < min_row) {
    i_addend = -1;
  }
  i = min_row
  while (i != max_row + i_addend) {
    text += "<th id='number''>";
    text += i;
    text += "</th>";
    i = i + i_addend;
  }
  text += "</tr>";

  // Creates the rest of the table, makes the initial column values header table elements.
  if (max_col < min_col) {
    j_addend = -1;
  }
  j = min_col;
  while (j != max_col + j_addend) {
    text += "<tr>"
    i = min_row;
    text += "<th id='number'>";
    text += j;
    text += "</th>";
    while (i != max_row + i_addend) {
      text += "<td id='number'>";
      text += i * j;
      text += "</td>";
      i = i + i_addend;
    }
    j = j + j_addend;
    text += "</tr>";
  }
  text += "</table></div></div></div>";
  return text;
}

//Takes 2 values and makes a list of errors with html format
function makeError(text_in, validBits) {
  var temp = 0;
  var bit = 0;
  var text = "<div class='row'> <div class='col' id='error'><h3>ERROR</h3><p class = 'error'>Invalid input:</p><ul>";
  for (var i = 0; i < 4; i++) {
    bit = (validBits >> 3 - i) - temp;
    temp = (bit + temp) << 1;
    if (bit != 0) {
      if (/\S/.test(text_in.elements[i].value) == false) {
        text += "<li class = 'error'>" + "Empty box" + "</li>";
      }
      else {
        text += "<li class = 'error'>" + text_in.elements[i].value + "</li>";
      }
    }
  }
  text += "</ul><p class = 'error'> Please enter numbers between -100 and 100 (inclusive).</p></div></div>"
  return text;
}

// Resets input boxes and table block
function reset_page() {
  document.getElementById("vals").reset();
  document.getElementById("demo").innerText = "";
}

// Checks an array to see if all the values are numbers.
// Returns a number with array.length bits, where 1 means the number at array.length - i index is not a number or |number| > 500
function isValidNumberArray(array) {
  var text = '';
  var whichIsntNum = 0;
  for (var i = 0; i < array.length; i++) {
    whichIsntNum <<= 1;
    if (isNaN(Number(array[i])) == true || abs(Number(array[i])) > 100 || (Number(array[i] == 0) && array[i] != '0'))
      whichIsntNum += 1;
  }
  text = whichIsntNum;
  return text;
}

// Computes the absolute value of a number 
function abs(x) {
  if (x < 0) {
    x *= -1;
  }
  return x;
}