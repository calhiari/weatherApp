$(document).ready(function()
{
	//gets the ip from the network access, hence the city, region and country_name
	$.getJSON("https://ipapi.co/json/", function(getLoc)
	{
		$(".cityName").html(getLoc.city + ", " + getLoc.region + ", " + getLoc.country_name);

		//from the information taken from the first request, use the latitute and longitude to make a new request for weather data
		$.getJSON("https://crossorigin.me/https://api.darksky.net/forecast/24a2848e1b40f381b46162f8d4ec6cda/" + getLoc.latitude + "," + getLoc.longitude, function(weatherObj)
		{
			//sets the temperature
			$(".weather").html(Math.ceil(weatherObj.currently.apparentTemperature) + "ºF");

			//sets the information about the weather
			$(".summary").html(weatherObj.currently.summary);

			//sets the icon based on the information of the weather
			$(".iconsImage").addClass("wi-forecast-io-" + weatherObj.currently.icon);

			var i = 0;
			//converts the temperature on click to celsiu and back to farenheit
			$(".weather").on("click", function()
			{
				if (i % 2 == 0){
					var celsiusTemp = (weatherObj.currently.apparentTemperature - 32) * 5 / 9;
					$(".weather").html(Math.ceil(celsiusTemp) + "ºC");
					i++;
				}
				else {
					$(".weather").html(Math.ceil(weatherObj.currently.apparentTemperature) + "ºF");
					i--;
				}
			});
		})
	});
});
