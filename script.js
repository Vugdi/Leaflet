// Initialiser kartet
var map = L.map('map').setView([59.07019, 9.59538], 9.5); // Sett posisjon og zoom-nivå

// Legg til OpenStreetMap som bakgrunn
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Hent GeoJSON-fil og legg til på kartet

	fetch('data/berggrunn.geojson')  // GeoJSON-filen må være tilgjengelig her
		.then(response => response.json())
		.then(data => {
			console.log(data);  // Sjekk GeoJSON-strukturen
			geojsonLayer.addData(data); // Legger GeoJSON-dataene til laget
		})
		.catch(error => console.log('Feil ved lastning av GeoJSON:', error));

// Legg til en marker
var marker = L.marker([59.07019, 9.59538]).addTo(map);
marker.bindPopup('<b>Hei, verden!</b>').openPopup();
