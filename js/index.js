
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

  var gradeTuples = [
    [ 'F', '',  0.0 ],
    [ 'D', '-', 0.7 ],
    [ 'D', '',  1.0 ],
    [ 'D', '+', 1.3 ],
    [ 'C', '-', 1.7 ],
    [ 'C', '',  2.0 ],
    [ 'C', '+', 2.3 ],
    [ 'B', '-', 2.7 ],
    [ 'B', '',  3.0 ],
    [ 'B', '+', 3.3 ],
    [ 'A', '-', 3.7 ],
    [ 'A', '',  4.0 ],
  ]

  var gradeScale = {
    'A': 4,
    'B': 3,
    'C': 2,
    'D': 1,
    'F': 0
  };

  // Gather grades from 2D array
  for (var i = 0; i < queryData.length; i++) {
    var dataRow = queryData[i];
    gradeArray.push(dataRow[1]);
  }

  // Calculate GPA into 1-decimal number x.y
  var gpa = 0;
  for (var j = 0; j < gradeArray.length; j++) {
    var currentGrade = gradeArray[j];
    if (currentGrade === null || currentGrade === undefined || queryData[j][2] == 'Never Used') { continue; }
    gpa += gradeScale[currentGrade];
  }
  var numOfApps = gradeArray.length
  var score = (numOfApps >=5) ? 5 : numOfApps
  gpa += score - 1
  numOfApps++
  gpa = (gpa / numOfApps).toPrecision(2);

  var finalGrade = "";
  var gradeModifier = document.createElement('span');
  gradeModifier.className = 'grade-modifier'

  // Split gpa into integer & decimal values
  for(var i = 0; i < gradeTuples.length; i++){
    var grade = gradeTuples[i]
    if (gpa >= grade[2]) {
      finalGrade = grade[0]
      gradeModifier.innerHTML = grade[1]
    }
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
