
if (navigator.geolocation) {
    //Call location function in and pass the location.
    navigator.geolocation.getCurrentPosition(showPosition);
}
else {
    // Location not supported.
    $("p.location").replaceWith("Geolocation is not supported by this browser.");
}

function showPosition(position) {
    var lat, lng;
    // Store latitude and longitude as a float from the json object.
    lat = parseFloat(JSON.stringify(position.coords.latitude));
    lng = parseFloat(JSON.stringify(position.coords.longitude));
    
    // Remove location alert on the page.
    $("p.location").replaceWith('');
    getWeather(lat,lng);
    
//    $.post('',{
//  "homeMobileCountryCode": 310,
//  "homeMobileNetworkCode": 410,
//  "radioType": "gsm",
//  "carrier": "Vodafone",
//  "considerIp": "true"},function (data){ 
//        
//    });
    
    $.ajax({
    type: "POST"
    , url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDruKoQKktEMAOtYSPXQrYe37kIst1EcS8"
    , dataType: "application/json"
    , data: {
        "homeMobileCountryCode": 310
        , "homeMobileNetworkCode": 260
        , "radioType": "gsm"
        , "carrier": "T-Mobile"
        , "cellTowers": [
            {
                "cellId": 39627456
                , "locationAreaCode": 40495
                , "mobileCountryCode": 310
                , "mobileNetworkCode": 260
                , "age": 0
                , "signalStrength": -95
  }
 ]
        , "wifiAccessPoints": [
            {
                "macAddress": "01:23:45:67:89:AB"
                , "signalStrength": 8
                , "age": 0
                , "signalToNoiseRatio": -65
                , "channel": 8
  }
            , {
                "macAddress": "01:23:45:67:89:AC"
                , "signalStrength": 4
                , "age": 0
  }
 ]
    },
    success: function (data) {
        console.log(data);
    }
, });
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
    var currentHourlyDataToCel = [];
    var oldHourlyDataToCel = [];
    
    $.post('/current', {lat: lat, lng: lng}, function (data) {
        
        // Weather information passed
        data = JSON.parse(data);
        var currentHourlyData = data.hourly.data;
        
        currentHourlyDataToCel = parseHourlyData(currentHourlyData);        
        loadChart(currentHourlyDataToCel, oldHourlyDataToCel); 
        
        $("p.inner").replaceWith('<h2>' + data.currently.summary + '</h2><br>' + '<h2>' + convertToCelcius(data.currently.temperature) + ' Cº</h2><br>');
    });
    
    $.post('/old', {lat: lat, lng: lng}, function (data) {
        // Weather information passed
        data = JSON.parse(data);
        var oldHourlyData = data.hourly.data;
        
        oldHourlyDataToCel = parseHourlyData(oldHourlyData);
        
        $("p.inner2").replaceWith('');
    });
    
}

$('#_12hour').on('click',function(){
    console.log('12hour');
});

$('#_18hour').on('click',function(){
    console.log('18hour');
});

$('#_24hour').on('click',function(){
    console.log('24hour');
});
