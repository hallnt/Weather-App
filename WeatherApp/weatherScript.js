$(document).ready(function () {

    var lat ;  // create empty variable to store user's lattitude location
    var long;  // create empty variable to store user's lattitude location

    var api = "http://ip-api.com/json";    // api to retrieve user's location using IP address and return JSON format
    $.getJSON(api, function (data) {
        lat = data.lat;     //  store lattitude
        long = data.lon;    // store longitude

        var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=23b2dd88660300b91334a54653a4f9cc";
        // OpenWeatherMap API url

        $.getJSON(api, function (data) {  // retrieve necessary data from api url above
            //$("#weatherIcon").html();     
            $("#temp").html("Temp: " + data.main.temp); // display temperature in html section
            $("#location").html(data.name);        // display location city in html section
            // $("#conditions").html(data.weather);
        });

    });


});