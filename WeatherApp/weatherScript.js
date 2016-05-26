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
    var windSpeed;
    var changeTemp = true;  // variable to switch between F and C temps

    // API to retrieve grographic location by user's IP address
    var api_IP = "http://ip-api.com/json";

    /*************************************************************
                   FUNCTION TO RETRIEVE WEATHER DATA
    **************************************************************/
    $.getJSON(api_IP, function (data_loc) {
        lat = data_loc.lat;
        long = data_loc.lon;

        // OpenWeatherMap API URL
        var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=23b2dd88660300b91334a54653a4f9cc";

        /**** Function to retrieve data from OpenWeatherMap API ****/
        $.getJSON(api, function (data) {
            tempKel = data.main.temp;
            city = data.name;
            condition = data.weather[0].description;
            icon = data.weather[0].icon; // sore weather ison id
            windSpeed = data.wind.speed;

            $("#weatherIcon").html(icon);

            // convert temp from Kelvin to Farenheit
            var tempFar = tempKel * (9 / 5) - 459.67;
            // convert temp from Kelvin to Celsius
            var tempCel = tempKel - 273.15;

            // set default temperature to Farenheit
            $("#temp").html(tempFar + " F");
            // change temperature between Farenheit and Celsius
            $("#temp").click(function () {
                if (changeTemp === false) {
                    $("#temp").html(tempCel + " C");
                    changeTemp = true;
                }
                else {
                    $("#temp").html(tempFar + " F");
                    changeTemp = false;
                }
            }); // end click function  

            $("#location").html(city);  // display location to html element
            $("#conditions").html(condition);  // display weather condition to html element
            $("#windSpeed").html(windSpeed);  // display wind speed to html element        

        }); // close OpenWeatherMap API function 
    });  // close weather data function 

});  // close document ready function