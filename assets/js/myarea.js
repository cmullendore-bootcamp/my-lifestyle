//This initializes the pop-up for the location
//Adding a map to locate local places near me

function initMap() {
    const location = {lat: -73.8331, lng: 40.7675} ;
    const map = new google.maps.Map(document.getElementById ("map"))
         {center: location,
            zoom: 8,
            mapId: "c84822eab8f75974" ,
         };
        }
        var input = document.getElementById('search input');
        map.controls[google.maps.ControlPostion.TOP_LEFT].push(input) ;
 
        var infowindow = new google.maps.InfoWindow() ;
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
            const service = new google.maps.places.PlacesService(map) ;
            var getNextPage;
            const moreButton = document.getElementById("more") ;
          
            moreButton.onclick = function () {
              moreButton.disabled = true ;
              if (getNextPage) {
                getNextPage() ;
          }
        };
//Adding a list to get the set of places around me on the map
      function addPlaces (places,map)
      const placesList = document.getElementById("places");
      const placesList = document.getElementById("places");

  for (const place of places) {
    if (place.geometry && place.geometry.location) {
      const image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      new google.maps.Marker({
        map,
        icon: image,
        title: place.name,
        position: place.geometry.location,
      });

      const li = document.createElement("li");

      li.textContent = place.name;
      placesList.appendChild(li);
      li.addEventListener("click", () => {
        map.setCenter(place.geometry.location);
      });
    }
  }
}
