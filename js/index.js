
/* 
  Populate 'App Adoption' Table
  Input: 'queryData' - 2D array of table data from a JQL query
*/
function fillAdoptionTable(queryData) {
  var adoptionTable = document.getElementById('adoption-table-body');
  // Iterate over each array to create its <tr> and internal <td> elements
  for (var i = 0; i < queryData.length; i++) {
    var dataRow = queryData[i];
    var tableRow = document.createElement('tr');
    tableRow.className = 'mp-table-row';

    // Enumerable list of class names to append depending on which <td> element we're generating
    var styleTypes = ['app-name', 'grade', 'last-login', 'most-active-user'];
    // Iterate over data to create/append <td> elements
    for (var k = 0; k < dataRow.length; k++) {
      var tableData = document.createElement('td');
      var dataStyle = tableData.classList;

      dataStyle.add('mp-table-row-item');
      dataStyle.add(styleTypes[k]);

      var data = dataRow[k];

      // 'Most Active User' is the 4th array element, and an <a> element linking to Salesforce
      if (k === 3) {
        var salesforceLink = document.createElement('a');
        salesforceLink.target = "_blank";
        salesforceLink.href = "https://na30.salesforce.com/" + data.id;
        salesforceLink.innerHTML = data.name;
        salesforceLink.className = 'mp-sf-link';

        // Append <a> link within <td> element
        tableData.appendChild(salesforceLink);
      } else {
        // Set text of data to data in array
        tableData.innerHTML = data;
      }
      tableRow.appendChild(tableData);
    }
    // Append row to table
    adoptionTable.appendChild(tableRow);
  }
}

function calculateGrade(queryData) {
  var gradeArray = [];

  var gradeScale = {
    'A': 4,
    'B': 3,
    'C': 2,
    'D': 1,
    'F': 0
  };

  var numberScale = {
    '0': 'F',
    '1': 'D',
    '2': 'C',
    '3': 'B',
    '4': 'A'
  }

  // Gather grades from 2D array
  for (var i = 0; i < queryData.length; i++) {
    var dataRow = queryData[i];
    gradeArray.push(dataRow[1]);
  }

  // Calculate GPA into 1-decimal number x.y
  var gpa = 0;
  for (var j = 0; j < gradeArray.length; j++) {
    var currentGrade = gradeArray[j];
    gpa += gradeScale[currentGrade];
  }
  gpa = (gpa / gradeArray.length).toPrecision(2);

  // Split gpa into integer & decimal values
  var digit = gpa.split('.')[0];
  var decimal = gpa.split('.')[1];

  // Assign grades based on grading scale
  var finalGrade = "";
  finalGrade += numberScale[digit];

  var gradeModifier = document.createElement('span');
  gradeModifier.className = 'grade-modifier'

  if (decimal < 3) {
    gradeModifier.innerHTML = '-';
  } else if (decimal > 6) {
    gradeModifier.innerHTML = '+';
  }
  document.getElementById('grade-value').innerHTML = finalGrade;
  document.getElementById('grade-value').appendChild(gradeModifier);

}


/*
  Populate Leaderboard Table

  'queryData': 2D array of data from JQL
*/
function fillLeaderboardTable(queryData) {
  var leaderboardTable = document.getElementById('leaderboard-table-body');

  for (var i = 0; i < queryData.length; i++) {
    var dataArray = queryData[i];
    var tableRow = document.createElement('tr');
    tableRow.className = 'mp-table-row';

    var styleTypes = ['user-name', 'unique-app-count', 'total-logins'];
    for (var k = 0; k < dataArray.length; k++) {
      var data = dataArray[k];

      var tableData = document.createElement('td');
      var dataStyle = tableData.classList;

      dataStyle.add('mp-table-row-item');
      dataStyle.add(styleTypes[k]);

      tableData.innerHTML = data
      tableRow.appendChild(tableData);
    }
    leaderboardTable.appendChild(tableRow);
  }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2]);
}
