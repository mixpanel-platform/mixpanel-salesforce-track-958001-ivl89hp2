// App Adoption
var orgID = getParameterByName("orgid");var appAdoptionData = [];
var params = { 
  from: '2015-01-01',
  to: new Date().toISOString().split('T')[0],
  orgID: orgID,
  app: 'Access'
}

MP.api.jql(appAdoption, params).done(function(results) {
  appAdoptionData = results
  fillAdoptionTable(appAdoptionData);
  calculateGrade(appAdoptionData)
})

// User Leaderboard
var leaderboardData = [];
MP.api.jql(userLeaderboard, params).done(function(results) {
  leaderboardData = results[0]
  fillLeaderboardTable(leaderboardData)
})

// App Usage Leaderboard
var usageData = {};
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
