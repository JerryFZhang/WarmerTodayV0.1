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
            var lat = parseFloat(JSON.stringify(position.coords.latitude));
            var lng = parseFloat(JSON.stringify(position.coords.longitude));
            // Display location on the page.
            $("p.location").replaceWith('<p>Latitude: ' + lat.toFixed(2) + '<br>Longitude: ' + lng.toFixed(2) + '</p>');
            // Post the location data to backend.
            $.post('/position', {
                lat: lat
                , lng: lng
            });
        }