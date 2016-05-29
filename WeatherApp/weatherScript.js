$(document).ready(function () {

    /****EMPTY VARIABLES****/
    var lat;
    var long;
    var tempKel;
    var tempFar;
    var tempCel;
    var city;
    var condition;
    var icon;
    var windSpeed;  // wind speed in m/s
    var windSpeedMph;  // wind speed in miles per hour;
    var windSpeedKmH; // wind speed in km per hour
    var changeTemp = true;  // variable to switch between F and C temps

    // API to retrieve grographic location by user's IP address
    var api_IP = "http://ip-api.com/json";

    /*************************************************************
                   FUNCTION TO RETRIEVE WEATHER DATA
    **************************************************************/
    $.getJSON(api_IP, function (data_loc) {
        lat = (data_loc.lat);
        long = data_loc.lon;

        // OpenWeatherMap API URL
        var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=23b2dd88660300b91334a54653a4f9cc";

        /**** Function to retrieve data from OpenWeatherMap API ****/
        $.getJSON(api, function (data) {
            tempKel = data.main.temp;
            city = data.name;
            condition = data.weather[0].description;
            windSpeed = (data.wind.speed);

            //convert windSpeed from m/s to mph
            windSpeedMph = (windSpeed / 0.44704).toFixed();
            //convert windSpeed from m/s to km/h
            windSpeedKmH = (windSpeed * (18 / 5)).toFixed();

            // convert temp from Kelvin to Fahrenheit
            var tempFar = (tempKel * (9 / 5) - 459.67).toFixed();
            // convert temp from Kelvin to Celsius
            var tempCel = (tempKel - 273.15).toFixed();

            // set default temperature to Celsius
            $("#temp").html(tempCel + " &#8451");
            // set default windspeed to km per hr
            $("#windSpeed").html(windSpeedKmH + " km/h");

            // change temperature between Fahrenheit and Celsius
            $("#temp").click(function () {
                if (changeTemp === false) {
                    $("#temp").html(tempCel + " &#8451");
                    $("#windSpeed").html(windSpeedKmH + " km/h"); // change wind speed to km per hr
                    changeTemp = true;
                }
                else {
                    $("#temp").html(tempFar + " &#8457");
                    $("#windSpeed").html(windSpeedMph + " mph");  //change wind speed to miles per hr
                    changeTemp = false;
                }
            }); // end click function  

            $("#location").html(city);  // display location to html element
            $("#conditions").html(condition);  // display weather condition to html element

            if (tempFar >= 80) {
                $("body").css('background-image', 'url(http://www.ilcancellorosso.it/wp-content/uploads/2013/06/giugno.jpg)');
            }
            else if (tempFar >= 60) {
                $("body").css('background-image', 'url(https://pixabay.com/static/uploads/photo/2015/10/25/09/00/scenery-1005446_960_720.jpg)');
            }
            else if (tempFar >= 40) {
                $("body").css('background-image', 'url(http://4.bp.blogspot.com/-isvd1ZOZIcY/UaMgKsVAeRI/AAAAAAAAR1k/y724bSo63SY/s640/point-lonsdale-lighthouse-at-sunset.jpg)');
            }
            else {
                $("body").css('background-image', 'url(http://www.wallpaperup.com/uploads/wallpapers/2012/12/17/25449/a3afbd85fccd010c0e7327a1555839a4.jpg)');
            }

        }); // close OpenWeatherMap API function 
    });  // close weather data function 

});  // close document ready function