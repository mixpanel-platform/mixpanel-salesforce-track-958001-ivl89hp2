var usageChartOptions = {
	items: [
		{ label: 'ANALYTICS', value: 'analytics' },
		{ label: 'EVENTBASE', value: 'eventbase' },
		{ label: 'FANBUILDER', value: 'fanbuilder' },
		{ label: 'INVENTORY CONTROL', value: 'inventory control' },
		{ label: 'SALESDECK MOBILE', value: 'salesdeck mobile' }
	]
}

var dropdown = $('#usage-dropdown');
dropdown.MPSelect(usageChartOptions);

var chartDiv = $('#usage-chart');
var usageChart;

var dummyChartData = {
	'results': {
		'2016-10-01': 20500,
		'2016-10-02': 21000,
		'2016-10-03': 20000,
		'2016-10-04': 19000,
		'2016-10-05': 21523,
		'2016-10-06': 20099,
		'2016-10-07': 18900,
		'2016-10-08': 22222,
		'2016-10-09': 20910,
		'2016-10-10': 21040
	}
};

dropdown.on('change', function(e, selection) {
	usageChart = chartDiv.MPChart({
		chartType: 'line',
		//data: MP.api.jql(jql(selection))
		data: dummyChartData
	});
});



