function main() {
  function getDay(event) {
    return new Date(event.time).toISOString().substr(0, 10);
  }
  var from = new Date(new Date(params.to) - (30 * 60 * 60 * 1000 * 24)).toISOString().split('T')[0]
  return Events({
    from_date: from,
    to_date:   params.to,
    event_selectors: [{event: 'To: App Load', selector: '(properties["App"] == "' + params.app + '")' }]
  })
  .groupBy([getDay], mixpanel.reducer.count())
  .reduce((accs, items) => {
    var res = {}
    _.each(items, item => {
      res[item.key[0]] = res[item.key[0]] + item.value || item.value
    })
    _.each(accs, acc => res = acc)
    return res
  })
  .map(item => ({results: item}))
}
appUsage = main 
