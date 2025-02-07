// Initialiser kartet
var map = L.map('map').setView([59.07019, 9.59538], 9.5); // Sett posisjon og zoom-nivå

// Legg til OpenStreetMap som bakgrunn
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Initialiser et objekt for fargene
var fargeKoder = {};

// Last CSV-filen med farger
Papa.parse("data/bergart_farger.csv", {
    download: true,
    header: true,
    complete: function(results) {
        // Logg CSV-dataene for å sjekke at de er lastet riktig
        console.log("CSV Data:", results.data);

        // Lagre fargene fra CSV-filen i objektet
        results.data.forEach(row => {
            // Lag en RGB-verdi som en hex-verdi, fjern eventuelle mellomrom
            var rgb = row['RGB-verdier'].split(',').map(num => parseInt(num.trim())); 
            var hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
            fargeKoder[row.kode] = hex;
        });

        // Når CSV-en er lastet, last GeoJSON og fargelegg den
        lastGeoJson();
    }
});

// Funksjon for å konvertere RGB til HEX
function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
}

// Funksjon for å laste GeoJSON og bruke fargene
function lastGeoJson() {
    var geojsonLayer = L.geoJSON().addTo(map);

    fetch('data/berggrunn.geojson')  // GeoJSON-filen må være tilgjengelig her
        .then(response => response.json())
        .then(data => {
            console.log("GeoJSON Data:", data); // Logg GeoJSON-dataene for å sjekke at de er lastet riktig
            geojsonLayer.addData(data); // Legger GeoJSON-dataene til laget

            // Fargelegg GeoJSON-ene
            geojsonLayer.eachLayer(function(layer) {
                var kode = layer.feature.properties.hovedbergart;
                console.log("Kode for lag:", kode); // Logg kode for å sjekke om den er riktig

                // Bruker fargekoden hvis den finnes, ellers sett en standardfarge
                if (fargeKoder[kode]) {
                    layer.setStyle({
                        fillColor: fargeKoder[kode],
                        fillOpacity: 0.7,
                        color: 'black',
                        weight: 1
                    });
                } else {
                    // Bruk en standardfarge hvis fargekoden ikke finnes
                    layer.setStyle({
                        fillColor: 'gray', // Standardfarge hvis kode ikke finnes
                        fillOpacity: 0.7,
                        color: 'black',
                        weight: 1
                    });
                }
            });
        })
        .catch(error => console.log('Feil ved lastning av GeoJSON:', error));
}

// Legg til en marker
var marker = L.marker([59.07019, 9.59538]).addTo(map);
marker.bindPopup('<b>Hei, verden!</b>').openPopup();

