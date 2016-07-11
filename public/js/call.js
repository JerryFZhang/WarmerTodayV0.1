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
            
            $("p.inner").replaceWith( 
                '<pre>' + currentSummary + '</pre><br>' + 
                '<pre>' + currentIcon + '</pre><br>' + 
                '<pre>' + currentTemp + '</pre><br>' + 
                '<pre>' + hourlySummary + '</pre><br>' + 
                '<pre>' + hourlyIcon + '</pre><br>' + 
//                '<pre>' + hourlyData[1].time + '</pre><br>' +
                '<pre>' + dailySummary + '</pre><br>' + 
                '<pre>' + dailyIcon + '</pre><br>' + 
                '<pre>' + JSON.stringify(dailyData) +'</pre><br>');
            
            for (var i = 0; i < hourlyData.length; i++ ){
                var time = hourlyData[i].time;
                var date = new Date(time*1000);
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