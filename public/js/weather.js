$.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAOUiSYFZUxtHi6zk3cqIYl7TOyPusI6fE", {}, function (data){
    var lat, lng;
    lat = parseFloat(JSON.stringify(data.location.lat));
    lng = parseFloat(JSON.stringify(data.location.lng));
    $("p.location").replaceWith('');
    getWeather(lat,lng);
    $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyAOUiSYFZUxtHi6zk3cqIYl7TOyPusI6fE", function (data){ 
        $("p.location2").replaceWith('<h2 style="text-align: right;">' + data.results[0].address_components[3].long_name + "," + data.results[0].address_components[5].long_name + '</h2>');
//        var results = data.results;
    });
});


function convertToCelcius(fren) {
    var celc = (fren - 32) * 5 / 9;
    return celc.toFixed(0);
}

function getTimeArray(){
    return ['12pm','','', '3am', '', '', '6am', '', '', '9am', '', '', '12pm', '', '', '3pm', '', '', '6pm', '', '', '9pm', '', '11pm'];
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
    var MyNewChart = new Chart(chart).Line(data, {responsive: true});
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
//    console.log(hourlyDataToCel);
    return hourlyDataToCel;
}

function getWeather(lat, lng){
    var currentHourlyDataToCel = [];
    var oldHourlyDataToCel = [];
    
     $.post('/yesterday', {lat: lat, lng: lng}, function (data) {
        // Weather information passed
        data = JSON.parse(data);
        var oldHourlyData = data.hourly.data;
         
        // Covert to celcius
        oldHourlyDataToCel = parseHourlyData(oldHourlyData);
        
        //Delete the warning message.
        $("p.inner2").replaceWith('');
    });
    
    $.post('/today', {lat: lat, lng: lng}, function (data) {
        
        // Weather information passed
        data = JSON.parse(data);
        var currentHourlyData = data.hourly.data; 

        // Covert to celcius
        currentHourlyDataToCel = parseHourlyData(currentHourlyData);
        
        loadChart(currentHourlyDataToCel, oldHourlyDataToCel); 
        
        //Delete the warning message, replace with currentn wather information.
        $("p.inner").replaceWith('<h2 style="text-align: right;">' + data.currently.summary + '</h2>' + '<h2 style="text-align: right;">' + convertToCelcius(data.currently.temperature) + ' Cº</h2><br>');
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
