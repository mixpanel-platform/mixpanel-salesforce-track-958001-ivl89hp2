//* get values from dropdowns
var apps = ['FanBuilder', 'Inventory', 'Permissions', 'Publish', 'Analytics', 'SalesDeck', 'Scaling', 'Ticker', 'Offers']
var usageChartOptions = {
  items: _.map(apps, function(app) { return {label: app, value:app} })
}

var dropdown = $('#usage-dropdown');
dropdown.MPSelect(usageChartOptions);

var chartDiv = $('#usage-chart');
var usageChart;

function populateUsageTable(data) {
  if (!initializedUsage) {
    var usageContainer = $('.mp-usage-last-30-days');
    usageContainer.css('opacity', '0');
    usageContainer.removeClass('hidden');

    usageChart = $('#usage-chart').MPChart({
      chartType: 'line',
    })

    usageChart.MPChart('setData', data);
    usageContainer.addClass('hidden');
    usageContainer.css('opacity', '1');
    initializedUsage = true;
  } else {
     usageChart = $('#usage-chart');
     usageChart.MPChart('setData', data);
  }
}
