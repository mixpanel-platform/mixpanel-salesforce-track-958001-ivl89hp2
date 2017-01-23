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
      if (numDays > days) { tmpGrade = grade }
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
  .filter(tuple => tuple.event && tuple.user && tuple.user.properties.salesforceOrgId && tuple.event.properties.Name && tuple.user.properties.salesforceOrgId == params.orgID && appDict[tuple.event.properties.App])
    .groupBy(["event.properties.App"], function(accs, tuples){
    var res = {}
    _.each(tuples, tuple => {
      var event = tuple.event
      var salesForceID = tuple.user.properties.salesforceUserId
      var name = event.properties.Name
      res[name] = res[name] || {
        lastLogin: event.time,
        logins: 1,
        salesForceID: salesForceID
      }

      if (res[name].lastLogin <= event.time) { res[name].lastLogin = event.time }
      res[name].logins++
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
    _.each(app.value, (val, name) => {
      // Is the last login for the active user, or just last login
      if (val.lastLogin > recentUser.lastLogin || !recentUser.lastLogin) {
        recentUser.name = name
        recentUser.logins = recentUser.logins + val.logins || val.logins
        recentUser.salesForceID = val.salesForceID
        recentUser.lastLogin = val.lastLogin
      }
    })
    var grade = score[recentGrading(recentUser.lastLogin)]
    res.push(app.key[0])
    res.push(grade)
    res.push(new Date(recentUser.lastLogin).toISOString().split('T')[0])
    res.push({name: recentUser.name, id: recentUser.salesForceID})
    return res
  })
}
appAdoption = main