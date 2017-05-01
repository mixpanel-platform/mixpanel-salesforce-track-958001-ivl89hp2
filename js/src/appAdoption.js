function main() {
  recentLoginGrades = { 0: 4, 30: 3, 60: 2, 90: 1, 120: 0 };
  score = { 0: 'F', 1: 'D', 2: 'C', 3: 'B', 4: 'A' };

  appDict = _.object(params.apps, _.map(params.apps, function (app) {
    return 1;
  }));
  function recentGrading(loginDate) {
    var numDays = Math.floor((new Date() - loginDate) / (60 * 60 * 1000 * 24));
    var tmpGrade;
    _.each(recentLoginGrades, function (grade, days) {
      if (numDays >= days) {
        tmpGrade = grade;
      }
    });
    return tmpGrade;
  }
  function defaultApps(){
    res = {}
    _.each(params.apps, app => {
      res[app] = { 
        lastLogin: 0,
        logins: 0,
        salesForceID: null,
      }
    })
    return res
  }
  return join(
    Events({
      from_date: params.from,
      to_date: params.to,
      event_selectors: [{ event: 'To: App Load' }]
    }), 
    People()
    //add selectors to handle name sfdcorg, etc
  )
  .filter(function (tuple) {
    return tuple.event && tuple.user && tuple.user.properties.salesforceOrgId && tuple.user.properties.$name && tuple.user.properties.salesforceOrgId == params.orgID && appDict[tuple.event.properties.App];
  })
  .groupByUser((s, tuples) => {
    s = s || defaultApps()
    _.each(tuples, function (tuple) {
      var event = tuple.event;
      var app = event.properties.App
      var userProps = tuple.user.properties;
      s[app]['salesForceID'] = userProps.salesforceUserId;
      s[app]['name'] = userProps.$name;
      if (s[app].lastLogin <= event.time) {
        s[app].lastLogin = event.time;
      }
      if (event.time > new Date() - 1000 * 60 * 60 * 24 * 30) s[app].logins++;
    })
    return s
  })
  .groupBy([], (accs, items) => {
    var res = defaultApps()
    _.each(items, item => {
      _.each(item.value, (appDict, appName) => {
        if (appDict.lastLogin > res[appName]['lastLogin']){
          res[appName] = appDict
        }
      })
    })
    _.each(accs, acc => {
      _.each(acc, (appDict, appName) => {
        var tmpLogin = res[appName]['lastLogin']
        if (res[appName]['logins'] < appDict.logins || (!res[appName]['logins'] && appDict.lastLogin > tmpLogin) ) {
          res[appName] = appDict
        }
        if (appDict.lastLogin < tmpLogin){
          res[appName]['lastLogin'] = tmpLogin
        }
      })
    })
    return res
  })
  .map(i => {
    var res = []
    _.each(i.value, (appDict, appName) =>{
      var grade = score[recentGrading(appDict.lastLogin)]
      var name = appDict.name || 'Never Used'
      var id = appDict.salesForceID || 'Never Used'
      var date = appDict.lastLogin == 0 ? 'Never Used' : new Date(appDict.lastLogin).toLocaleDateString('en-US')
      var user = { name, id }
      res.push([appName, grade, date, user])
    })
    return res
  })
}
let appAdoption = main