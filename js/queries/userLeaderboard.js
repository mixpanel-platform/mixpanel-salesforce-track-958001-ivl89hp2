'use strict';

function main() {
  apps = ['FanBuilder', 'Inventory', 'Permissions', 'Publish', 'Reporting', 'SalesDeck', 'Scaling', 'Ticker'];
  return join(Events({
    from_date: new Date(new Date() - 36e5 * 24 * 30).toISOString().split('T')[0],
    to_date: params.to,
    event_selectors: _.map(apps, function (app) {
      return { event: 'To: App Load', selector: 'properties["App"] == "' + app + '"' };
    })
  }), People()).filter(function (tuple) {
    return tuple.event && tuple.user && tuple.user.properties.salesforceOrgId && tuple.user.properties.$name && tuple.user.properties.salesforceOrgId == params.orgID;
  }).groupByUser(["user.properties.$name"], function (state, tuples) {
    state = state || { total: 0, unique: {} };
    _.each(tuples, function (t) {
      var app = t.event.properties.App;
      state.unique[app] = 1;
      state.total++;
    });
    return state;
  }).map(function (i) {
    return { key: [i.key[1], _.size(i.value.unique)], value: i.value.total };
  }).reduce(mixpanel.reducer.top(5)).map(function (arr) {
    var res = [];
    _.each(arr, function (item) {
      return res.push([item.key[0], item.key[1], item.value]);
    });
    return res;
  });
}
var userLeaderboard = main;