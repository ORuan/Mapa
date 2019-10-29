function map(){
	var mymap = L.map('mapid').setView([cordinate,cordinate1], 15);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2ZsYmVkdWNhdG9yIiwiYSI6ImNrMTZrYm1vNTA1dWEzaGxqN2tmMTZlazcifQ.XXsWkpgiguegb-C7WQpGBA', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
	var city = getcity();
	L.marker([cordinate,cordinate1]).addTo(mymap)
		.bindPopup("<b>Seja Bem vindo!</b><br />Você está em :"+city).openPopup();
	L.circle([cordinate,cordinate1], 400, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(mymap).bindPopup("I am a circle.");
    /*
	L.polygon([
		[-14.2221, -42.000],
		[-14.2001, -42.7960],
		[-14.2821, -42.7700]
	]).addTo(mymap).bindPopup("I am a polygon.");
	var popup = L.popup();
	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(mymap);
	}
*/
    //mymap.on('click', onMapClick);
}

var pegarcidade = function(){
	var cidade = document.getElementById("digitado").value;
	return cidade;
}

function reqListener() {
	var request = this.responseText; 
	return request;
}

var resposta;
function testar (){
    oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open("get","https://api.mapbox.com/geocoding/v5/mapbox.places/"+pegarcidade()+".json?access_token=sk.eyJ1Ijoib3J1YW4iLCJhIjoiY2sxYmEwbW53MDJpeDNvcGN4Mm5mYWYwciJ9.wuSyAqEfN8SFraG1v9jE8Q");
	oReq.onreadystatechange = function(e) {
        if(this.readyState == 4){
			resposta = JSON.parse(this.responseText);
			pegarValores();
		}
	}
	oReq.send();
}

var pegarValores = function(){
	console.log (resposta.features[0].center[1]);
	mostrarl();
}

function mostrarl(){
	document.getElementById("conteudo").innerHTML = "Foram encontrados resultados nas seguintes cordenadas "+resposta.features[0].center[1];
}
function main(){
	pegarcidade();
	testar();
}
