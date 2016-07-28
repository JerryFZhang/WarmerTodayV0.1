var lat, lng, currentHourlyData, oldHourlyData;
var positionJSON = {
    lat: lat
    , lng: lng
};
var oldData, currentData;
var currentHourlyDataToCel = [];
var oldHourlyDataToCel = [];
if (navigator.geolocation) {
    //Call location function in and pass the location.
    navigator.geolocation.getCurrentPosition(showPosition);
}
else {
    // Location not supported.
    $("p.location").replaceWith("Geolocation is not supported by this browser.");
}

function showPosition(position) {
    // Store latitude and longitude as a float from the json object.
    lat = parseFloat(JSON.stringify(position.coords.latitude));
    lng = parseFloat(JSON.stringify(position.coords.longitude));
    
    // Display location on the page.
    $("p.location").replaceWith('');
    
    // Post the location data to backend and get the later information
    $.post('/old', {lat: lat, lng: lng
    }, function (data) {
        // Weather information passed
        data = JSON.parse(data);
        oldHourlyData = data.hourly.data;
        // Extract hourly tempurature and stored in an array
        for (var i = 0; i < oldHourlyData.length; i++) {
            var time = oldHourlyData[i].time;
            var date = new Date(time * 1000);
            var temp = parseFloat(oldHourlyData[i].apparentTemperature)
            oldHourlyDataToCel[i] = convertToCelcius(temp);
        };
        console.log(oldHourlyDataToCel);
    });
    // Post the location data to backend and get the weather information.
    $.post('/current', {lat: lat, lng: lng}, function (data) {
        // Weather information passed
        data = JSON.parse(data);
        currentHourlyData = data.hourly.data;
        //  Display current summary     
        //        $("p.inner").replaceWith('<h2>' + data.currently.summary + '</h2><br>' + '<h2>' + convertToCelcius(data.currently.temperature) + ' Cº</h2><br>');
        
        // Extract hourly tempurature and stored in an array
        for (var i = 0; i < currentHourlyData.length; i++) {
            var time = currentHourlyData[i].time;
            var date = new Date(time * 1000);
            var temp = parseFloat(currentHourlyData[i].apparentTemperature)
            currentHourlyDataToCel[i] = convertToCelcius(temp);
        };
        loadChart();
    });
}

function convertToCelcius(fren) {
    var celc = (fren - 32) * 5 / 9;
    return celc.toFixed(0);
}

function getTimeArray(){
    
    // Get current hour
    var currentHour = new Date().getHours();
    // 24-hour clock integer array
    var $24h = [];
    // 12-hour clock string array
    var $12h = [];
    
    for (var i = 0; i < 24; i++) {
        var addedHour = i + currentHour;
        if (addedHour > 24) {
            $24h[i] = currentHour + i - 24;
        }
        else {
            $24h[i] = currentHour + i;
        }
    }
    
    // Convert 24h to 12h
    for (var i = 0; i < 24; i++) {
        switch (true) {
        case $24h[i] > 0 && $24h[i] < 12:
                $12h[i] = ($24h[i]) + 'am';
                break;
                
        case $24h[i] == 12: 
                $12h[i] = '12pm'; 
                break;
                
        case $24h[i] > 12 && $24h[i] < 24: 
                $12h[i] = ($24h[i] - 12) + 'pm';
                break;
                
        case $24h[i] == 24:
                $12h[i] = '12am';
                break;
        }
    }
    
    return $12h;
}

function loadChart() {
    var chart = document.getElementById("c").getContext("2d");
    var timeLabel = getTimeArray();
    var data = {
        labels: timeLabel
        , datasets: [{
                label: "My First dataset"
                , fillColor: "rgba(220,220,220,0.2)"
                , strokeColor: "rgba(220,220,220,1)"
                , pointColor: "rgba(220,220,220,1)"
                , pointStrokeColor: "#fff"
                , pointHighlightFill: "#fff"
                , pointHighlightStroke: "rgba(220,220,220,1)"
                , data: currentHourlyDataToCel
        },{
                label: "My Second dataset"
                , fillColor: "rgba(151,187,205,0.2)"
                , strokeColor: "rgba(151,187,205,1)"
                , pointColor: "rgba(151,187,205,1)"
                , pointStrokeColor: "#fff"
                , pointHighlightFill: "#fff"
                , pointHighlightStroke: "rgba(151,187,205,1)"
                , data: oldHourlyDataToCel
        }]
    };
    var MyNewChart = new Chart(chart).Line(data);
}