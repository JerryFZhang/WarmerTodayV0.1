$.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAOUiSYFZUxtHi6zk3cqIYl7TOyPusI6fE", {}, function (data){
    var lat, lng;
    lat = parseFloat(JSON.stringify(data.location.lat));
    lng = parseFloat(JSON.stringify(data.location.lng));
    $("p.location").replaceWith('');
    getWeather(lat,lng);
    $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyAOUiSYFZUxtHi6zk3cqIYl7TOyPusI6fE", function (data){ 
        $("p.location2").replaceWith('<h2>' + data.results[0].address_components[3].long_name + "," + data.results[0].address_components[5].long_name + '</h2>');
//        var results = data.results;
    });
});


function convertToCelcius(fren) {
    var celc = (fren - 32) * 5 / 9;
    return celc.toFixed(0);
}

function getTimeArray(){
    
//    // Get current hour
//    var currentHour = new Date().getHours();
//    // 24-hour clock integer array
//    var $24h = [];
//    // 12-hour clock string array
//    var $12h = [];
//    
//    for (var i = 0; i < 24; i++) {
//        var addedHour = i + currentHour;
//        if (addedHour > 24) {
//            $24h[i] = currentHour + i - 24;
//        }
//        else {
//            $24h[i] = currentHour + i;
//        }
//    }
//    
//    // Convert 24h to 12h
//    for (var i = 0; i < 24; i++) {
//        switch (true) {
//        case $24h[i] > 0 && $24h[i] < 12:
//                $12h[i] = ($24h[i]) + 'am';
//                break;
//                
//        case $24h[i] == 12: 
//                $12h[i] = '12pm'; 
//                break;
//                
//        case $24h[i] > 12 && $24h[i] < 24: 
//                $12h[i] = ($24h[i] - 12) + 'pm';
//                break;
//                
//        case $24h[i] == 24:
//                $12h[i] = '12am';
//                break;
//        }
//    }
    
//    return $12h;
    return ['12pm','1am','2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
}

function loadChart(currentHourlyDataToCel, oldHourlyDataToCel) {
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

function parseHourlyData(data){
    
    var hourlyDataToCel = [];
    // Extract hourly tempurature and stored in an array
        for (var i = 0; i < data.length; i++) {
            var time = data[i].time;
            var date = new Date(time * 1000);
            var temp = parseFloat(data[i].apparentTemperature)
            hourlyDataToCel[i] = convertToCelcius(temp);
        };
    return hourlyDataToCel;
}

function getWeather(lat, lng){
//    var currentHourlyDataToCel = [];
//    var oldHourlyDataToCel = [];
    
    $.post('/current', {lat: lat, lng: lng}, function (data) {
        
        // Weather information passed
        data = JSON.parse(data);
//        var currentHourlyData = data.hourly.data;
        
//        currentHourlyDataToCel = parseHourlyData(currentHourlyData);        
//        console.log(currentHourlyDataToCel);
//        loadChart(currentHourlyDataToCel, oldHourlyDataToCel); 
        console.log(data);
        $("p.inner").replaceWith('<h2>' + data.currently.summary + '</h2>' + '<h2>' + convertToCelcius(data.currently.temperature) + ' Cº</h2><br>');
    });
    $.post('/old', {lat: lat, lng: lng}, function (data) {
        // Weather information passed
        data = JSON.parse(data);
        var oldHourlyData = data.hourly.data;
        
        oldHourlyDataToCel = parseHourlyData(oldHourlyData);
        
        console.log(oldHourlyData);
        $("p.inner2").replaceWith('');
    });
    
}

//$('#_12hour').on('click',function(){
//    console.log('12hour');
//});
//
//$('#_18hour').on('click',function(){
//    console.log('18hour');
//});
//
//$('#_24hour').on('click',function(){
//    console.log('24hour');
//});
