 // Initialize the map
 var map = L.map('map').setView([20.5937, 78.9629], 6);

 // Add OpenRailwayMap tiles
 L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
     maxZoom: 19,
     attribution: '&copy; OpenRailwayMap contributors'
 }).addTo(map);

 // Track user location
 var userMarker;
 var currentPosition;

 function locateUser() {
     if ("geolocation" in navigator) {
         navigator.geolocation.watchPosition(position => {
             const { latitude, longitude } = position.coords;
             currentPosition = { latitude, longitude };

             if (userMarker) {
                 // Update user marker position
                 userMarker.setLatLng([latitude, longitude]);
             } else {
                 // Add user marker on first location fetch
                 userMarker = L.marker([latitude, longitude]).addTo(map)
                     .bindPopup("You are here").openPopup();
             }

             // Center map on user location
             map.setView([latitude, longitude], 14);

             // Update UI with user location
             document.querySelector('.user-location').innerHTML = `Lat: ${latitude}, Lon: ${longitude}`;
         }, err => {
             console.error(err);
         });
     } else {
         alert("Geolocation is not supported by your browser.");
     }
 }

 // Call locateUser function to start tracking location
 locateUser();

 // Add click event listener to GPS icon
 document.querySelector('.gps-icon').addEventListener('click', () => {
     if (currentPosition) {
         map.setView([currentPosition.latitude, currentPosition.longitude], 14);
     } else {
         alert("Location not available yet.");
     }
 });