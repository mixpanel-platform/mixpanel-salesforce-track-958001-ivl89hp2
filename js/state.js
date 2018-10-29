// App Adoption
var orgID = getParameterByName("orgid");var appAdoptionData = [];

var params = { 
  from: '2015-01-01',
  to: new Date().toISOString().split('T')[0],
  orgID: orgID,
  app: 'TM1 Marketing',
  apps: apps
}

function getAppAdoption() {
  MP.api.jql(appAdoption, params).done(function(results) {
    if (results.length === 0) {
      hideAllContent();
      showModal();
    } else {
      appAdoptionData = results[0]
      fillAdoptionTable(appAdoptionData);
      calculateGrade(appAdoptionData)
    }
  })
}

// User Leaderboard
var leaderboardData = [];

function getUserLeaderboard() {
  MP.api.jql(userLeaderboard, params).done(function(results) {
    /*
    if (results.length === 0) {
      hideAllContent();
      showModal();
    } else {
    }
    */
    leaderboardData = results[0]
    fillLeaderboardTable(leaderboardData)
  })
}

// App Usage Leaderboard
var usageData = {};
var initializedUsage = false;

function graphQuery() {
  MP.api.jql(appUsage, params).done(function(results) {
    usageData = results[0]
    if (usageData === undefined) {
      $('.usage-chart-modal').removeClass('hidden');
    }
    populateUsageTable(usageData);
  })
}

$('#usage-dropdown').on('change', function(e, selection) {
  $('.usage-chart-modal').addClass('hidden');
  params.app = selection;
  graphQuery()
})

function runQueries() {
  console.log('test');
  $('.initiation-modal').addClass('hidden');
  showAllContent();
  getAppAdoption();
  getUserLeaderboard();
  graphQuery();
}

hideAllContent();
