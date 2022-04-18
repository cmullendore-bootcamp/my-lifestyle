
var index_current_location_json = localStorage.getItem("lifestyle-location");

if (!index_current_location_json) {
    window.location = "./welcome.html";
}

var index_location = JSON.parse(index_current_location_json);

$("#index-current-location").html(index_location.name + "<br>" + index_location.vicinity);

function LoadContent(path, target) {
    fetch(path)
        .then(function(response) {
            if (response.ok) {
                response.text()
                    .then(function(text) {
                        $(target).html(text);
                    })
            }
    })
}

LoadContent("../content/contacts.html", "#contacts-content");
LoadContent("../content/tasks.html", "#tasks-content");
LoadContent("../content/shoppinglist.html", "#shopping-list-content");
LoadContent("../content/weather.html", "#weather-content");
LoadContent("../content/myarea.html", "#my-area-content");
