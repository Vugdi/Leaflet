// Initialiser kartet
var map = L.map('map').setView([59.07019, 9.59538], 9.5); // Sett posisjon og zoom-nivå

// Legg til OpenStreetMap som bakgrunn
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Funksjon for å tilpasse stilen på GeoJSON basert på bergarten
function style(feature) {
    var color;

    // Sjekk hvilken bergart som er spesifisert i 'properties'
    if (feature.properties.hovedbergart_navn) {
        switch (feature.properties.hovedbergart_navn) {
            case 'Gabbro':
                color = '#FF5733';  // Rød for Gabbro
                break;
            case 'Granitt':
                color = '#D4ACF3';  // Lilla for Granitt
                break;
            case 'Sandstein':
                color = '#F1C40F';  // Gul for Sandstein
                break;
            default:
                color = '#7F8C8D';  // Grå for andre bergarter
        }
    } else {
        color = '#BDC3C7';  // Standard farge
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

// Last inn GeoJSON-filen
fetch('data/berggrunn.geojson') // Endre til riktig filbane hvis nødvendig
    .then(response => response.json())
    .then(data => {
        // Legg GeoJSON-dataene til kartet med stil og popups
        L.geoJSON(data, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    .catch(error => console.log('Feil ved lasting av GeoJSON:', error));







// Legg til en marker
var marker = L.marker([59.07019, 9.59538]).addTo(map);
marker.bindPopup('<b>Hei, verden!</b>').openPopup();