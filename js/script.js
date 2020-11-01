(function(){
    var lat = null,
        lon = null;


    navigator.geolocation.getCurrentPosition(function(position){
    console.log(position.coords.latitude);
    console.log(position.coords.longitude)

    lat = position.coords.latitude;
    lon = position.coords.longitude;

    // Define a variable holding SVG mark-up that defines an icon image:
    var svgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">H</text></svg>';

    var icon = new H.map.Icon(svgMarkup),
        coords = {lat: lat, lng: lon},
        marker = new H.map.Marker(coords, {icon: icon});
    
    //user coordinates
    var platform = new H.service.Platform({
        'apikey': 'Gq5E86V4J55G_lsi7v7KAlTLOOgZELqUbboKvzmxz48'
        });
    
        // Obtain the default map types from the platform object:
        var defaultLayers = platform.createDefaultLayers();

        // Instantiate (and display) a map object:
        var map = new H.Map(
         document.getElementById('mapContainer'),
            defaultLayers.vector.normal.map,
            {
            zoom: 10,
            center: { 
                lat: lat, 
                lng: lon }
            });

        fetch(`https://api.hel.fi/linkedevents/v1/place/?format=json$`)
            .then(function(resp){
            return resp.json()
            })
            .then(function(json){
                json.data.forEach(function(event){
                    var _coordinates = {
                        lat: event.position.cooridinates[1],
                        lng: event.position.cooridinates[0]
                    };
                    var _marker = new H.map.Marker(coords, {icon: icon});
                    map.addObject(marker);
                })
                
            // places with coordinates
            })
            .then(function(err){
            console.log(err)
            })

        map.addObject(marker); // add a pin for current user location
          
})
    //var bboxParam = `${lon} , ${lat},${parseFloat(lon)+0.03},${parseFloat(lat)+0.02}`
    // user coordinates
    
})()