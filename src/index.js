
var weatherSlursMap = {
  // Thunderstorm - Bartok
  200 : "#B",
201 : "#B",
202 : "#B",
210 : "#B",
211 : "#B",
212 : "#B",
221 : "#B",
230 : "#B",
231 : "#B",
232 : "#B",
 // Drizzle - Saint Saens
300 : "#S",
301 : "#S",
302 : "#S",
310 : "#S",
311 : "#S",
312 : "#S",
313 : "#S",
314 : "#S",
321 : "#S",
 // Rain - Bartok
500 : "#B",
501 : "#B",
502 : "#B",
503 : "#B",
504 : "#B",
511 : "#B",
520 : "#B",
521 : "#B",
522 : "#B",
531 : "#B",
// Snow - Saint Saens
600 : "#S",
601 : "#S",
602 : "#S",
611 : "#S",
612 : "#S",
615 : "#S",
616 : "#S",
620 : "#S",
621 : "#S",
622 : "#S",
// Atmosphere - NMA
701 : "#NMA",
711 : "#NMA",
721 : "#NMA",
731 : "#NMA",
741 : "#NMA",
751 : "#NMA",
761 : "#NMA",
762 : "#NMA",
771 : "#NMA",
781 : "#NMA",
// Clear - Autograph
800 : "#A",
// Clouds - First Edition
801 : "#FE",
802 : "#FE",
803 : "#FE",
804 : "#FE",
// Extreme - Autograph
900 : "#A",
901 : "#A",
902 : "#A",
903 : "#A",
904 : "#A",
905 : "#A",
906 : "#A",
// Windy - Bartok
951 : "#B",
952 : "#B",
953 : "#B",
954 : "#B",
955 : "#B",
956 : "#B",
957 : "#B",
958 : "#B",
959 : "#B",
960 : "#B",
961 : "#B",
962 : "#B"
}

var sourceNames = {
  "#A" : "Mozart Autograph (1783)",
  "#FE" : "First Edition (1784)",
  "#S" : "Saint-Saëns (1915)",
  "#B" : "Bartók (1911)"
}

var appID = "dfd525a8d688433f98472ba8b2fa441f"

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherForPos);
} else {
    $("html") = "Geolocation is not supported by this browser.";
}

var vrvToolkit = new verovio.toolkit();

$(document).ready(function(){
  $("#changeWeather").click(function(e){
    e.preventDefault();
    console.log('h')
    var newLoc = $("#newLoc").val()
    if (!newLoc) {
      navigator.geolocation.getCurrentPosition(getWeatherForPos);
    }
    else {
      getWeatherFor(newLoc);
    }
  })
})

function getWeatherForPos(position) {
  var api = "http://api.openweathermap.org/data/2.5/weather?"
  var lat = "lat="+position.coords.latitude
  var lon = "lon="+position.coords.longitude
  $.get(api+lat+"&"+lon+"&appID="+appID, function(data){
    console.log(data)
    var source = weatherSlursMap[data.weather[0].id]
    renderScoreWithSource(source)
    updateInfo(data)
  })
}

function getWeatherFor(query) {
  var api = "http://api.openweathermap.org/data/2.5/weather?"
  $.get(api+"q="+query+"&appID="+appID, function(data){
    console.log(data)
    var source = weatherSlursMap[data.weather[0].id]
    renderScoreWithSource(source)
    updateInfo(data)
  })

}

function updateInfo(data){
  $("#loading").show();
  var source = weatherSlursMap[data.weather[0].id]
  $("#location").text(data.name)
  $("#weather").html("<img title='"+data.weather[0].description+"' height='30' width='30' src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'/>")
  $("#slurs").text(sourceNames[source])
}

function renderScoreWithSource(source){
  $("#output").empty()
  console.log($(document).height())
   var options = JSON.stringify({
          pageWidth: $(document).width() * 100 / 36,
          pageHeight: $(document).height() * 100 / 40, //$(document).height(),
          ignoreLayout: 1,
          adjustPageHeight: 1,
          border: 50,
          scale: 35,
          appXPathQuery: "./rdg[contains(@source, '"+source+"')]"
      });
      vrvToolkit.setOptions(options);

  $.get( "data/K333.xml", function( data ) {
      vrvToolkit.loadData( data + "\n", "");
      var pgs = vrvToolkit.getPageCount();
      // var svg = vrvToolkit.renderPage(1);

      $("#output").append(svg);
      for (var i = 1; i <= pgs; i++){
          var svg = vrvToolkit.renderPage(i);

          $("#output").append(svg);
          $("#loading").hide();
      }
  }, 'text');
}
