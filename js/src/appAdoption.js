function main() {
  recentLoginGrades = { 0: 4, 30: 3, 60: 2, 90: 1, 120: 0 };
  score = { 0: 'F', 1: 'D', 2: 'C', 3: 'B', 4: 'A' };
  apps = [ 'FanBuilder',
    'Inventory',
    'Permissions',
    'Publish',
    'Reporting',
    'SalesDeck',
    'Scaling',
    'Ticker',
  ]
  appDict = _.object(apps, _.map(apps, app => 1))
  function recentGrading (loginDate) {
    var numDays =  Math.floor((new Date() - loginDate) / ( 60 * 60 * 1000 * 24))
    var tmpGrade
    _.each(recentLoginGrades, (grade, days) => {
      if (numDays >= days) { tmpGrade = grade }
    })
    return tmpGrade
  }

  return join(
    Events({
      from_date: params.from,
      to_date:   params.to,
      event_selectors: [{event: 'To: App Load'}]
    }),
    People()
  )

  .filter(tuple => tuple.event && tuple.user && tuple.user.properties.salesforceOrgId && tuple.user.properties.$name && tuple.user.properties.salesforceOrgId == params.orgID && appDict[tuple.event.properties.App])
  .groupBy(["event.properties.App"], function(accs, tuples){
    var res = {}
    _.each(tuples, tuple => {
      var event = tuple.event
      var userProps = tuple.user.properties
      var salesForceID = userProps.salesforceUserId
      var name = userProps.$name
      res[name] = res[name] || {
        lastLogin: event.time,
        logins: 0,
        salesForceID: salesForceID
      }

      if (res[name].lastLogin <= event.time) { res[name].lastLogin = event.time }
      if (event.time > new Date() - 1000 * 60 * 60 * 24 * 30) res[name].logins++
    })
    _.each(accs, acc => {
      _.each(acc, (v, name) => {
        res[name] = res[name] || {
          lastLogin: 0,
          logins: 0,
          salesForceID: v['salesForceID']
        }

        res[name]['lastLogin'] = (res[name]['lastLogin'] < v['lastLogin']) ? v['lastLogin'] : res[name]['lastLogin']
        res[name]['logins'] += v['logins']
      })
    })
    return res
  })
  .map(app => {
    var res = []

    var recentUser = {}
    var last = 0
    _.each(app.value, (val, name) => {
      // Split this into last login vs Most Active user
      if (val.lastLogin > last) last = val.lastLogin
      if (val.logins > recentUser.logins || !recentUser.logins) {
        recentUser.name = name
        recentUser.logins = val.logins
        recentUser.salesForceID = val.salesForceID
        recentUser.lastLogin = val.lastLogin
      }
    })
    var grade = score[recentGrading(last)]
    res = [app.key[0], grade, new Date(recentUser.lastLogin).toLocaleDateString('en-US'), {name: recentUser.name, id: recentUser.salesForceID}]
    return res
  })
}
appAdoption = main