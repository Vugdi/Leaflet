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

// Funksjon for å tilpasse stilen på GeoJSON basert på bergarten
function style(feature, colorData) {
    var color;

    // Sjekk om vi har en bergart og at den eksisterer i colorData
    if (feature.properties && feature.properties.hovedbergart) {
        const bergartKode = feature.properties.hovedbergart; // Hent bergartens kode
        console.log(`Bergartkode: ${bergartKode}`);  // Logg for å se hvilke koder som brukes
        
        const rgb = colorData[bergartKode];  // Hent fargen fra colorData
        if (rgb) {
            color = `rgb(${rgb.join(',')})`;  // Sett fargen til RGB-verdi
        } else {
            console.warn(`Ingen farge funnet for bergartkode: ${bergartKode}`);  // Logg hvis farge ikke finnes
            color = '#BDC3C7';  // Standard farge hvis ikke funnet
        }
    } else {
        color = '#BDC3C7';  // Standard farge hvis ingen bergart er spesifisert
    }

    return {
        fillColor: color,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.6
    };
}

// Funksjon for å legge til interaktive popups med informasjon om bergarten
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.hovedbergart_navn) {
        // Vist navn på hovedbergart i popup
        layer.bindPopup('<b>Bergart:</b> ' + feature.properties.hovedbergart_navn);
    }
}

// Funksjon for å laste og parse CSV-filen
function loadColorData() {
    return new Promise((resolve, reject) => {
        // Bruk PapaParse til å lese CSV-filen
        Papa.parse('data/bergart_farger.csv', {
            download: true,
            header: true,
            delimiter: ';',
            complete: function(results) {
                const colorData = {};

                // Lagre fargene i et objekt, der 'kode' er nøkkelen
                results.data.forEach(row => {
                    // Del opp RGB-verdiene
                    const rgb = row['RGB-verdier'].split(',').map(Number);
                    colorData[row['kode']] = rgb;

                    console.log(`Kode: ${row['kode']}, RGB: ${rgb}`); // Logg fargene for å se om parsing fungerer
                });

                resolve(colorData);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

// Når kartet er klart, last fargedataene
let colorData = {};
loadColorData().then(data => {
    colorData = data;
    console.log('Farger lastet', colorData);

    // Last GeoJSON-dataene etter at fargene er lastet
    fetch('data/berggrunn.geojson')
    .then(response => response.json())
    .then(geojson => {
        console.log('GeoJSON-data lastet', geojson);  // Legg til denne loggen
        L.geoJSON(geojson, {
            style: function(feature) {
                return style(feature, colorData);  // Bruk fargene fra CSV-filen
            },
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    .catch(error => console.error('Feil ved lasting av GeoJSON', error));

}).catch(error => {
    console.error('Feil ved lasting av farger:', error);
});

// Legg til en marker
var marker = L.marker([59.07019, 9.59538]).addTo(map);
marker.bindPopup('<b>Hei, verden!</b>').openPopup();
