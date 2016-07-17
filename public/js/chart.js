//Call handler
var currentObject, currentSummary, currentIcon, currentTemp, hourlyObject, hourlySummary, hourlyIcon, hourlyData, dailyObject, dailySummary, dailyIcon, dailyIcon;
$('#current').click(function () {
    $.get('/current', {}, function (data) {
        data = JSON.parse(data);
        currentSummary = data.currently.summary;
        currentIcon = data.currently.icon;
        currentTemp = data.currently.temperature;
        hourlySummary = data.hourly.summary;
        hourlyIcon = data.hourly.icon;
        hourlyData = data.hourly.data;
        dailySummary = data.daily.summary;
        dailyIcon = data.daily.icon;
        dailyData = data.daily.data;
        $("p.inner").replaceWith('<pre>' + currentSummary + '</pre><br>' + '<pre>' + currentIcon + '</pre><br>' + '<pre>' + currentTemp + '</pre><br>' + '<pre>' + hourlySummary + '</pre><br>' + '<pre>' + hourlyIcon + '</pre><br>' +
            //                '<pre>' + hourlyData[1].time + '</pre><br>' +
            '<pre>' + dailySummary + '</pre><br>' + '<pre>' + dailyIcon + '</pre><br>' + '<pre>' + JSON.stringify(dailyData) + '</pre><br>');
        for (var i = 0; i < hourlyData.length; i++) {
            var time = hourlyData[i].time;
            var date = new Date(time * 1000);
            var f = parseFloat(hourlyData[i].apparentTemperature);
            var c = (f - 32) * 5 / 9;
            console.log(hourlyData[i].summary);
            console.log(date);
            console.log(c.toFixed(2) + 'ºC');
            console.log(hourlyData[i].windSpeed);
        };
    });
});
$('#old').click(function () {
    $.get('/old', {}, function (data) {
        $("p.inner").replaceWith()
    });
});
// Chart populator
var ctx = document.getElementById("c").getContext("2d");

// Calculating time lables
var time = new Date;
var hour = time.getHours();
var lables = []
for (var i = 0; i < 24; i++) {
    var addedHour = i + hour;
    if (addedHour > 24) {
        lables[i] = hour + i - 24;
    }
    else {
        lables[i] = hour + i;
    }
}

var data = {
    labels: lables
    , datasets: [{
        label: "My First dataset"
        , fillColor: "rgba(220,220,220,0.2)"
        , strokeColor: "rgba(220,220,220,1)"
        , pointColor: "rgba(220,220,220,1)"
        , pointStrokeColor: "#fff"
        , pointHighlightFill: "#fff"
        , pointHighlightStroke: "rgba(220,220,220,1)"
        , data: [12, 15, 15, 17, 19, 23, 23, 24, 24, 24, 25, 26, 27, 19, 17, 16, 15, 15, 15, 14, 13, 13, 15, 16]
      }, {
        label: "My Second dataset"
        , fillColor: "rgba(151,187,205,0.2)"
        , strokeColor: "rgba(151,187,205,1)"
        , pointColor: "rgba(151,187,205,1)"
        , pointStrokeColor: "#fff"
        , pointHighlightFill: "#fff"
        , pointHighlightStroke: "rgba(151,187,205,1)"
        , data: [23, 23, 24, 24, 24, 25, 26, 27, 30, 30, 30, 31, 33, 35, 24, 24, 23, 22, 21, 19, 17, 16, 14, 15]
      }]
};
var MyNewChart = new Chart(ctx).Line(data);