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

var dummyChartDataTwo = {
	'results': {
		'2016-10-01': 2050,
		'2016-10-02': 2100,
		'2016-10-03': 2000,
		'2016-10-04': 1900,
		'2016-10-05': 2153,
		'2016-10-06': 2009,
		'2016-10-07': 1800,
		'2016-10-08': 2222,
		'2016-10-09': 2910,
		'2016-10-10': 2100
	}
};

dropdown.on('change', function(e, selection) {
	if (selection === "analytics" || selection === "eventbase") {
		usageData = dummyChartData;
	} else {
		usageData = dummyChartDataTwo;
	}

	/* 
		EMMETT'S JQL HERE
	*/


	usageChart.MPChart('setData', usageData);
});

function populateUsageTable(data) {
	var usageContainer = $('.mp-usage-last-30-days');

	usageContainer.css('opacity', '0');
	usageContainer.removeClass('hidden');	

	usageChart = $('#usage-chart').MPChart({
		chartType: 'line',
		data: data
	})

	usageContainer.addClass('hidden');
	usageContainer.css('opacity', '1');
}

// Delete when state.js is done
$(document).ready(function() {
	
	/* MPChart needs the full width of the container to create the chart
		that fills that width - create the chart with an opacity:0 but display: block
		and immediately change CSS back to opacity:1 and display:none when render is done
	 */
	var usageContainer = $('.mp-usage-last-30-days');

	usageContainer.css('opacity', '0');
	usageContainer.removeClass('hidden');	

	usageChart = $('#usage-chart').MPChart({
		chartType: 'line',
		data: dummyChartData
	})

	usageContainer.addClass('hidden');
	usageContainer.css('opacity', '1');
});
