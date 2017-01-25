function main() {
  return join(
    Events({
      from_date: params.from,
      to_date:   params.to,
      event_selectors: [{event: 'To: App Load'}]
    }),
    People()
  )
  .filter(tuple => tuple.event && tuple.user && tuple.user.properties.salesforceOrgId && tuple.user.properties.$name && tuple.user.properties.salesforceOrgId == params.orgID)
  .groupByUser(["user.properties.$name","event.properties.App"], (state,events) => {
    state = state + events.length || events.length
    return state
  })
  .groupBy(['key.1'], (accs, items) => {
    var res = {unique: 0}
    _.each(items, item => {
      res.unique ++
      res.total = res.total + item.value || item.value
    })
    
    _.each(accs, acc => {
      _.each(acc, (v,k) => res[k] = res[k] + v || v)
    })
    return res
  })
  .map(i => ({key: [i.key[0], i.value.unique], value: i.value.total}))
  .reduce(mixpanel.reducer.top(5))
  .map(arr => {
    var res = []
    _.each(arr, item => res.push([item.key[0], item.key[1], item.value]))
    return res
  })
}
userLeaderboard = main
