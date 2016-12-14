// App Adoption
var orgID = getParameterByName("orgid");var appAdoptionData = [];
var params = { 
  from: '2015-01-01',
  to: new Date().toISOString().split('T')[0],
  orgID: orgID,
  app: 'FanBuilder'
}

MP.api.jql(appAdoption, params).done(function(results) {
  if (results === []) {
    hideAllContent();
    showModal();
  } else {
    appAdoptionData = results
    fillAdoptionTable(appAdoptionData);
    calculateGrade(appAdoptionData)
  }
})

// User Leaderboard
var leaderboardData = [];
MP.api.jql(userLeaderboard, params).done(function(results) {
  if (results === []) {
    hideAllContent();
    showModal();
  } else {
    leaderboardData = results[0]
    fillLeaderboardTable(leaderboardData)
  }
})

// App Usage Leaderboard
var usageData = {};
var initializedUsage = false;
function graphQuery() {
  MP.api.jql(appUsage, params).done(function(results) {
    usageData = results[0]
    populateUsageTable(usageData);
  })
}

$('#usage-dropdown').on('change', function(e, selection) {
  params.app = selection;
  graphQuery()
})
graphQuery()
