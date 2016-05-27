$(document).ready(function() {
  
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
  var windSpeedMph;  // wind speed in mph;
  var windSpeedKmH; // wind speed in km/h
  var changeTemp = true;  // variable to switch between F and C temps
  
  // API to retrieve grographic location by user's IP address
  var api_IP = "http://ip-api.com/json"; 
  
  /*************************************************************
                 FUNCTION TO RETRIEVE WEATHER DATA
  **************************************************************/
  $.getJSON(api_IP, function(data_loc) {
    lat = (data_loc.lat);
    long = data_loc.lon;    
        
    // OpenWeatherMap API URL
    var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=23b2dd88660300b91334a54653a4f9cc";
   
    /**** Function to retrieve data from OpenWeatherMap API ****/ 
    $.getJSON(api, function(data)  {
      tempKel = data.main.temp; 
      city = data.name;      
      condition = data.weather[0].description;
      icon = data.weather[0].icon; // sore weather ison id
      windSpeed = (data.wind.speed); 
      
      //convert windSpeed from m/s to mph
      windSpeedMph = (windSpeed / 0.44704).toFixed(); 
      //convert windSpeed from m/s to km/h
      windSpeedKmH = (windSpeed * (18/5)).toFixed(); 
            
      // convert temp from Kelvin to Farenheit
      var tempFar = (tempKel * (9/5) - 459.67).toFixed();       
      // convert temp from Kelvin to Celsius
      var tempCel = (tempKel - 273.15).toFixed();  
      
      // set default temperature to Celsius
      $("#temp").html(tempCel + " &#8451");
      // set default windspeed to miles per hr
      $("#windSpeed").html(windSpeedMph + " mph");   
      
      // change temperature between Farenheit and Celsius
      $("#temp").click(function() {
        if (changeTemp === false) {
          $("#temp").html(tempCel + " &#8451");
          $("#windSpeed").html(windSpeedMph + " mph"); // change wind speed tp miles per hr
          changeTemp = true;
        }
        else {
          $("#temp").html(tempFar + " &#8457"); 
          $("#windSpeed").html(windSpeedKmH + " km/h");  //change wind speed tp km per hr
          changeTemp = false;
        }
      }); // end click function  
                          
      $("#location").html(city);  // display location to html element
      $("#conditions").html(condition);  // display weather condition to html element
      
      if (tempFar >= 80) {
        $("body").css('background-image', 'url(http://thumbs.xdesktopwallpapers.com/wp-content/uploads/2011/05/Clear-Sky-in-a-sunny-day-720x405.jpg)');
      }
      else if (tempFar >= 60) {
        $("body").css('background-image', 'url(http://cdn.paper4pc.com/images/perfect-clouds-wallpaper-1.jpg)');
      }
      else if (tempFar >= 40) {
        $("body").css('background-image', 'url(https://c8.staticflickr.com/7/6023/5975465375_9c089b6085_b.jpg)');
      }
      else {        
        $("body").css('background-image', 'url(http://img03.deviantart.net/e6a5/i/2006/317/a/f/one_snowy_night_by_tofubunny.jpg)');
      }
      
    }); // close OpenWeatherMap API function 
  });  // close weather data function 
 
});  // close document ready function