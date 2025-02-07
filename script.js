<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Leaflet toturial</title>

    <!-- leaflet css -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css" integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14=" crossorigin="" />

    <!-- markercluster -->
    <link rel="stylesheet" href="./dist/MarkerCluster.css">
    <link rel="stylesheet" href="./dist/MarkerCluster.Default.css">

    <style>
        body {
            margin: 0;
            padding: 0;
        }

        #map {
            width: 100%;
            height: 100vh;
        }
    </style>
</head>

<body>
    <div id="map"></div>

</body>

</html>

<!-- leaflet js -->
<script src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js" integrity="sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg=" crossorigin=""></script>

<script src="js/catiline.js"></script>
<script src="js/leaflet.shpfile.js"></script>

<!-- markercluster -->
<script src="dist/leaflet.markercluster.js"></script>

<script>
    // map initialization
    var map = L.map('map').setView([59.07019, 9.59538], 9.5);

    //osm layer
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    osm.addTo(map);

	// Hent GeoJSON-fil og legg til på kartet
	var geojsonLayer = L.geoJSON().addTo(map);

	fetch('data/BerggrunnGea.geojson')  // GeoJSON-filen må være tilgjengelig her
		.then(response => response.json())
		.then(data => {
			geojsonLayer.addData(data); // Legger GeoJSON-dataene til laget
		})
		.catch(error => console.log('Feil ved lastning av GeoJSON:', error));


    // vann
    var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	    subdomains: 'abcd',
	    minZoom: 1,
	    maxZoom: 16,
	    ext: 'jpg'
    });

    // Stamen_Watercolor.addTo(map);

    // google street 
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });  

    // googleStreets.addTo(map);

    googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });

    // googleSat.addTo(map);

    var Berggrunn = L.tileLayer.wms("https://geo.ngu.no/mapserver/BerggrunnWMS3?request=GetCapabilities&SERVICE=WMS", {
    layers: 'BERGGRUNNWMS3',
    format: 'image/png',
    transparent: true,
    opacity: 0.5,
    attribution: "© 2022 | NORGES GEOLOGISKE UNDERSØKELSE"

    });
	
    var Losmasser = L.tileLayer.wms("https://geo.ngu.no/mapserver/LosmasserWMS2?request=GetCapabilities&service=WMS", {
    layers: 'LosmasserWMS2',
    format: 'image/png',
    transparent: true,
    opacity: 0.5,
    attribution: "© 2022 | NORGES GEOLOGISKE UNDERSØKELSE"

		
});
    

    // marker
    var myIcon = L.icon({
        iconUrl: 'ikoner/Unesco-ikon.png',
        iconSize: [40, 40],

    });


    
    var singleMarker = L.marker([58.97102, 9.83456], );
    var popup = singleMarker.bindPopup('Mølen').openPopup()
    

    var singleMarker2 = L.marker([58.99317, 9.74636],);
    var popup = singleMarker2.bindPopup('Steinvika').openPopup()
    
   
    var popupContent3 = '<div style="max-width: 400px; text-align: center;">' + 
                    '<img src="https://www.geoparken.no/var/geanor/storage/images/media/images/img_13272/6004-1-nor-NO/img_1327_banner_image.jpg" alt="Bildebeskrivelse" style="width:100%; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);">' +
                    '<p style="margin-top: 5px; font-size: 14px;">Rognstranda</p>' +
                    '<a href="https://www.geoparken.no/steder-aa-besoeke/bamble/rognstranda" style="display: block; margin-top: 5px; color: #007BFF; text-decoration: none; font-weight: bold;">Gå til underside</a>' +
                    '</div>';
    var singleMarker3 = L.marker([59.00757, 9.70297]).bindPopup(popupContent3).openPopup();
    
    
    var singleMarker4 = L.marker([58.86469, 9.59557], );
    var popup = singleMarker4.bindPopup('Jomfruland').openPopup()
    

    var singleMarker5 = L.marker([58.78508, 9.38415], );
    var popup = singleMarker5.bindPopup('Stangnes').openPopup()
   
    var singleMarker6 = L.marker([58.86979, 9.40996], );
    var popup = singleMarker6.bindPopup('Steinmann').openPopup()
    
    
    var singleMarker7 = L.marker([59.00343, 9.74727], );
    var popup = singleMarker7.bindPopup('Kongshavn').openPopup()
    

    var singleMarker8 = L.marker([59.27087, 9.27343], );
    var popup = singleMarker8.bindPopup('Holla kirkeruin').openPopup()
    

    var singleMarker9 = L.marker([59.2818, 9.28086], );
    var popup = singleMarker9.bindPopup('Geostien langs Nordsjø').openPopup()
    

    var singleMarker10 = L.marker([59.20167, 9.62426], );
    var popup = singleMarker10.bindPopup('Kapitelberget').openPopup()
    

    var singleMarker11 = L.marker([59.02254, 10.17933], );
    var popup = singleMarker11.bindPopup('Ula').openPopup()
    

    var singleMarker12 = L.marker([58.97984, 10.02642], );
    var popup = singleMarker12.bindPopup('Rakke').openPopup()
    

    var singleMarker13 = L.marker([59.28121, 9.73574], );
    var popup = singleMarker13.bindPopup('Øverbøtjønn').openPopup()
    

    var singleMarker14 = L.marker([59.24732, 9.79199], );
    var popup = singleMarker14.bindPopup('Gorningen').openPopup()
    
    var singleMarker15 = L.marker([59.21969, 9.47593], );
    var popup = singleMarker15.bindPopup('Mikaelshula').openPopup()
    

    var singleMarker16 = L.marker([59.05974, 9.7311], );
    var popup = singleMarker16.bindPopup('Løvøya').openPopup()
    

    var singleMarker17 = L.marker([58.99558, 9.81733], );
    var popup = singleMarker17.bindPopup('Låven').openPopup()
    

    var singleMarker18 = L.marker([59.32725, 9.65308], );
    var popup = singleMarker18.bindPopup('Skriua').openPopup()
    
    
    var singleMarker19 = L.marker([59.34449, 9.91249], );
    var popup = singleMarker19.bindPopup('Kjærra fossepark').openPopup() 
	
 

    //layer controll
    var baseMaps = {
        "osm": osm,
        "Google Streets": googleStreets,
        "Google Satallitt": googleSat,
        
    };
    // Grupperer sammen lokasjonene 
    var Gruppe = L.layerGroup([singleMarker, singleMarker2, singleMarker3, singleMarker4, singleMarker5, singleMarker6, singleMarker7, singleMarker8, singleMarker9, singleMarker10, singleMarker11, singleMarker12, singleMarker13, singleMarker14, singleMarker15, singleMarker16, singleMarker17, singleMarker18, singleMarker19])
    var overlayMaps = {
        'Berggrunn': Berggrunn,
		'losmasser': Losmasser,
		'Berggrunn GeoJSON': geojsonLayer,
        
    };


    // marker clustering
    var markers = L.markerClusterGroup();
    markers.addLayer(Gruppe);    
    map.addLayer(markers);

    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

// GeoJSON

// legg inn shapefil

var shpfile = new L.Shapefile('Omriss/Omriss2.zip', {     
	//		onEachFeature: function(feature, layer) {
	//			if (feature.properties) {
	//				layer.bindPopup(Object.keys(feature.properties).map(function(k) {
	//					return k + ": " + feature.properties[k];
	//				}).join("<br />"), {
	//					maxHeight: 200
	//				});
	//			}
	//		},
            style: {
            fillColor: 'blue',
            fillOpacity: 0.05,
            color: '#4733ff',
            weight: 3

        }
		});
		shpfile.addTo(map);
		shpfile.once("data:loaded", function() {
			console.log("finished loaded shapefile");
		});

</script>