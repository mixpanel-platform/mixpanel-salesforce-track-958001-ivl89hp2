// get values from dropdowns
var apps = [
  "Access",
  "App Manager",
  "BART Tools",
  "BigChampagne",
  "Client Center",
  "Client Center Auth",
  "ClientHub",
  "ClientHub Preprod B2B",
  "Co-branding tool",
  "Community",
  "Contract Administration",
  "Developer Center",
  "Event Management",
  "EventGo",
  "FanBuilder",
  "Flex",
  "Help",
  "Inventory",
  "Objects",
  "Permissioning UI",
  "Permissions",
  "Posting Manager",
  "Pricemaster",
  "Publish",
  "Reporting",
  "Reports",
  "Resale Support",
  "SalesDeck",
  "Scaling",
  "Settlement Reports",
  "Support",
  "Support - UAT",
  "System Administration",
  "TM Access",
  "TSCMS",
  "Ticker",
  "Trade Desk (Beta)",
  "TradeDesk",
  "TradeDesk (Preview)",
  "Venue Configuration",
  "Venue Layout",
  "WMR",
  "WPS",
  "Workflow",
  "tmAnalytics",
  "tmMessenger"
] 

var usageChartOptions = {
  items: _.map(apps, function(app) { return {label: app, value:app} })
}

var dropdown = $('#usage-dropdown');
dropdown.MPSelect(usageChartOptions);

var chartDiv = $('#usage-chart');
var usageChart;

function populateUsageTable(data) {
  debugger
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
    
    // set flag
    initializedUsage = true;
  } else {
     usageChart = $('#usage-chart');
     usageChart.MPChart('setData', data);
  }
}
