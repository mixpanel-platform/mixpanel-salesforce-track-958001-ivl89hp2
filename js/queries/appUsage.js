'use strict';

function main() {
  function getDay(tuple) {
    return new Date(tuple.event.time).toISOString().substr(0, 10);
  }
  var from = new Date(new Date(params.to) - 30 * 60 * 60 * 1000 * 24).toISOString().split('T')[0];
  return join(Events({
    from_date: from,
    to_date: params.to,
    event_selectors: [{ event: 'To: App Load', selector: '(properties["App"] == "' + params.app + '")' }]
  }), People()).filter(function (tuple) {
    return tuple.user && tuple.event && tuple.user.properties.salesforceOrgId == params.orgID;
  }).groupBy([getDay], mixpanel.reducer.count()).reduce(function (accs, items) {
    var res = {};
    _.each(items, function (item) {
      res[item.key[0]] = res[item.key[0]] + item.value || item.value;
    });
    _.each(accs, function (acc) {
      return res = acc;
    });
    return res;
  }).map(function (item) {
    return { results: item };
  });
}
var appUsage = main;