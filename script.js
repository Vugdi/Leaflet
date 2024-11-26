// Initialiser kartet
var map = L.map('map').setView([59.07019, 9.59538], 9.5); // Sett posisjon og zoom-nivå

// Legg til OpenStreetMap som bakgrunn
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetch('data/berggrunn.geojson')
    .then(response => {
        console.log('GeoJSON response:', response);  // Logg responsen
        return response.json();
    })
    .then(geojson => {
        console.log('GeoJSON-data:', geojson);  // Logg GeoJSON-dataene
        L.geoJSON(geojson, {
            style: function(feature) {
                return style(feature, colorData);
            },
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    .catch(error => {
        console.error('Feil ved lasting av GeoJSON:', error);
    });


// Legg til en marker
var marker = L.marker([59.07019, 9.59538]).addTo(map);
marker.bindPopup('<b>Hei, verden!</b>').openPopup();
