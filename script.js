// Initialiser kartet
var map = L.map('map').setView([59.07019, 9.59538], 9.5);

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
        console.log("CSV Data:", results.data); // Logg for å sjekke CSV-dataene
        results.data.forEach(row => {
            var rgb = row['RGB-verdier'].split(',').map(num => parseInt(num.trim()));
            if (rgb.length === 3) {
                var hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
                fargeKoder[row.kode] = hex;
            }
        });
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

    fetch('data/berggrunn.geojson')
        .then(response => response.json())
        .then(data => {
            console.log("GeoJSON Data:", data); // Logg GeoJSON-dataene
            geojsonLayer.addData(data);

            geojsonLayer.eachLayer(function(layer) {
                var kode = layer.feature.properties.hovedbergart;
                console.log("Kode for lag:", kode); // Logg koden som brukes
                if (kode && fargeKoder[kode]) {
                    layer.setStyle({
                        fillColor: fargeKoder[kode],
                        fillOpacity: 0.7,
                        color: 'black',
                        weight: 1
                    });
                } else {
                    layer.setStyle({
                        fillColor: 'gray',
                        fillOpacity: 0.7,
                        color: 'black',
                        weight: 1
                    });
                }
            });
        })
        .catch(error => console.log('Feil ved lastning av GeoJSON:', error));
}
