//Making sure document fully loads before javascript executes

$(function(){

	//calling JSON object into javascript file

	$.getJSON("topspots.json", function(data) {

	//creating array to store long string concatenation 

  		var r = new Array(), j = -1;

 		for (var key=0, size = data.length; key<size; key++){
 			r[++j] ='<tr><td>';
			r[++j] = data[key].name;
		    r[++j] = '</td><td>';
		    r[++j] = data[key].description;
		    r[++j] = '</td><td>';
		    r[++j] = '<a href="https://www.google.com/maps?q='
		    r[++j] = data[key].location;
		    r[++j] = '" class="btn btn-primary active" role="button">Link to Google Maps</a>';
		    r[++j] = '</td></tr>';
		 }

 		$('#dataTable').html(r.join(''));
	});

});