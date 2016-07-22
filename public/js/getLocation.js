var lat,lng;
var positionJSON = {lat: lat, lng: lng};
var currentObject, currentSummary, currentIcon, currentTemp, hourlyObject, hourlySummary, hourlyIcon, hourlyData, dailyObject, dailySummary, dailyIcon, dailyIcon;
    var hourlyDataToCel = [];

console.log(positionJSON);
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
     $("p.location").replaceWith('<p>Latitude: ' + lat.toFixed(2) + '<br>Longitude: ' + lng.toFixed(2) + '</p>');
     // Post the location data to backend.
     positionJSON = {lat:lat,lng:lng};
     console.log(positionJSON);
     
     
     $.post('/current', {lat:lat,lng:lng}, function (data) {
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
     $("p.inner").replaceWith('<h2>' + currentSummary + '</h2><br>' + '<h2>' + convertToCelcius(currentTemp) + ' Cº</h2><br>');
         
     for (var i = 0; i < hourlyData.length; i++) {
         var time = hourlyData[i].time;
         var date = new Date(time * 1000);
         var temp = parseFloat(hourlyData[i].apparentTemperature)
         hourlyDataToCel[i] = convertToCelcius(temp);
         console.log(hourlyDataToCel[i] + ' Cº');
     };
     console.log(hourlyDataToCel);
     //chart
     
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
function convertToCelcius(fren){
    var celc = (fren - 32) * 5 / 9;
    return celc.toFixed(0);
}
 