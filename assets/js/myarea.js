
// https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places


//This initializes the pop-up for the location
//Adding a map to locate local places near me

function myarea_initAutocomplete() {
    const location = { lat: -73.8331, lng: 40.7675 };
    const myareamap = new google.maps.Map(document.getElementById("myarea-map"),
        {
            center: location,
            zoom: 4,
            mapId: "c84822eab8f75974",
        });
    var input = document.getElementById('myarea-search');
    const searchBox = new google.maps.places.SearchBox(input);
    
    myareamap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    let markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };

            // Create a marker for each place.
            markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
            );
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        myareamap.fitBounds(bounds);
    });

}





