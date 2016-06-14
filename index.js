

//Making sure document fully loads before rest of javascript executes

$(function(){

	//calling JSON object into javascript file

	$.getJSON("topspots.json", function(data) {

	//creating array to store long string concatenation to populate table


  		var tableString = new Array(), j = -1;

 		for (var key=0, size = data.length; key<size; key++){
 			tableString[++j] ='<tr><td>';
			tableString[++j] = data[key].name;
		    tableString[++j] = '</td><td>';
		    tableString[++j] = data[key].description;
		    tableString[++j] = '</td><td>';
		    tableString[++j] = '<a href="https://www.google.com/maps?q=';
		    tableString[++j] = data[key].location;
		    tableString[++j] = '" target="_blank" class="btn btn-primary active" role="button">Link to Google Maps</a>';
		    tableString[++j] = '</td></tr>';
		 }

 		$('#dataTable').html(tableString.join(''));
	


		//Defining initMap function for HTML to load it

		var map;
			
		window.initMap = function() {

			map = new google.maps.Map(document.getElementById('map'), {
		  	center: {lat: 32.824932, lng: -117.155888},
		  	zoom: 11,
		  	scrollwheel: false
			});

			var bounds = new google.maps.LatLngBounds();


			var markers = new Array();
			var infoWindowContent = new Array();

			for(var i=0; i < data.length; i++) {
	    		markers[i] = [data[i].name, data[i].location[0], data[i].location[1]];
	    		infoWindowContent[i] = 
	    			['<div class="info_content"><h3>' + data[i].name + '</h3><p>' + data[i].description + '</p></div']
	    		
			}


		    var infoWindow = new google.maps.InfoWindow(), marker, i;

		    // Loop through our array of markers & place each one on the map  

		    for( i = 0; i < markers.length; i++ ) {
		        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
		        bounds.extend(position);
		        marker = new google.maps.Marker({
		            position: position,
		            map: map,
		            title: markers[i][0]
		        });

		        // Allow each marker to have an info window 

		    	google.maps.event.addListener(marker, 'click', (function(marker, i) {
		        return function() {
		            infoWindow.setContent(infoWindowContent[i][0]);
		            infoWindow.open(map, marker);
		        }

		   	 	})(marker, i));
			}

		    // Automatically center the map fitting all markers on the screen

		    map.fitBounds(bounds);

		    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)

		    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
		        this.setZoom(10);
		        google.maps.event.removeListener(boundsListener);

		    });
		    
			}
		});

	// Adding a map object to the document through script object

	var $map = document.createElement('script');
	$map.type= 'text/javascript';
	$map.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBrzRKtP7KavbCovyCRMZhIopg0fRJgukw&callback=initMap";
	$('#map').append($map);

});