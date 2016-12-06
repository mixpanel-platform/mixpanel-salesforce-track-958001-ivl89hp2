function main() {
  return join(
    Events({
      from_date: params.from,
      to_date:   params.to,
      event_selectors: [{event: 'To: App Load'}]
    }),
    People()
  )
  .filter(tuple => tuple.event && tuple.user && tuple.user.properties.salesforceOrgId && tuple.event.properties.Name && tuple.user.properties.salesforceOrgId == params.orgID)
  .groupByUser(["event.properties.Name","event.properties.App"], (state,events) => {
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
  .reduce((accs, items) => {
    var res = []
    _.each(items, item => res.push(item))
    if (res.length > 5) {
      _.sortBy(res, obj => obj.value.total)
    }
    return res.slice(0,5)
  })
  .map(arr => {
    var res = []
    _.each(arr, item => res.push([item.key[0], item.value.unique, item.value.total]))
    return res
  })
}
userLeaderboard = main
