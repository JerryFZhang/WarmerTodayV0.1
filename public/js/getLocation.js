var lat,lng;
var positionJSON = {lat: lat, lng: lng};
var currentObject, currentSummary, currentIcon, currentTemp, hourlyObject, hourlySummary, hourlyIcon, hourlyData, dailyObject, dailySummary, dailyIcon, dailyIcon;
var hourlyDataToCel = [];

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
//    $("p.location").replaceWith('<p>Latitude: ' + lat.toFixed(2) + '<br>Longitude: ' + lng.toFixed(2) + '</p>');
    
    // Post the location data to backend and get the weather information.
    $.post('/current', {lat: lat, lng: lng}, function (data) {
    
        data = JSON.parse(data);
        hourlyData = data.hourly.data;
        
        $("p.inner").replaceWith('<h2>' + data.currently.summary + '</h2><br>' + '<h2>' + convertToCelcius(data.currently.temperature) + ' Cº</h2><br>');
        
        for (var i = 0; i < hourlyData.length; i++) {
            var time = hourlyData[i].time;
            var date = new Date(time * 1000);
            var temp = parseFloat(hourlyData[i].apparentTemperature)
            hourlyDataToCel[i] = convertToCelcius(temp);
        };
        
        //chart
        var ctx = document.getElementById("c").getContext("2d");
        
        // Calculating time lables
        var time = new Date;
        var hour = time.getHours();
        var lables = []
        var lablesString = []
        
        for (var i = 0; i < 24; i++) {
            var addedHour = i + hour;
            if (addedHour > 24) {
                lables[i] = hour + i - 24;
            }
            else {
                lables[i] = hour + i;
            }
        }
        
        for (var i = 0; i < 24; i++) {
            switch (true) {
            case lables[i] > 0 && lables[i] < 12:
                lablesString[i] = (lables[i]) + 'am';
                break;
            case lables[i] == 12:
                lablesString[i] = '12pm';
                break;
            case lables[i] > 12 && lables[i] < 24:
                lablesString[i] = (lables[i] - 12) + 'pm';
                break;
            case lables[i] == 24:
                lablesString[i] = '12am';
                break;
            }
        }
        
        var data = {
            labels: lablesString
            , datasets: [{
                    label: "My First dataset"
                    , fillColor: "rgba(220,220,220,0.2)"
                    , strokeColor: "rgba(220,220,220,1)"
                    , pointColor: "rgba(220,220,220,1)"
                    , pointStrokeColor: "#fff"
                    , pointHighlightFill: "#fff"
                    , pointHighlightStroke: "rgba(220,220,220,1)"
                    , data: hourlyDataToCel
      }
//                      , {
//             label: "My Second dataset"
//             , fillColor: "rgba(151,187,205,0.2)"
//             , strokeColor: "rgba(151,187,205,1)"
//             , pointColor: "rgba(151,187,205,1)"
//             , pointStrokeColor: "#fff"
//             , pointHighlightFill: "#fff"
//             , pointHighlightStroke: "rgba(151,187,205,1)"
//             , data: [23, 23, 24, 24, 24, 25, 26, 27, 30, 30, 30, 31, 33, 35, 24, 24, 23, 22, 21, 19, 17, 16, 14, 15]
//      }
                     ]
        };
        var MyNewChart = new Chart(ctx).Line(data);
    });
}

$.get("http://ipinfo.io", function(data) {
    console.log(data.loc);
    console.log(data.city);
    console.log(data.region);
    console.log(data.country);
     $("p.city").replaceWith('<h3>' + data.city + ', ' + data.region + ', ' + data.country);
}, "jsonp");

function convertToCelcius(fren) {
    var celc = (fren - 32) * 5 / 9;
    return celc.toFixed(0);
}