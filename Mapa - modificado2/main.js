var oReq,result,resposta1,obj,cordinate,cordinate1;

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

function reqListener () {
	var Req = this.responseText; 
	return Req;
}

/*function compiler (){
	obj = JSON.parse(resposta);
var cidade = pegarcidade()*/

var testar = function(){
	var cidade = pegarcidade();
	var oReq = new XMLHttpRequest;
	oReq.onload = reqListener();
    oReq.open("get","https://api.mapbox.com/geocoding/v5/mapbox.places/"+cidade+".json?access_token=sk.eyJ1Ijoib3J1YW4iLCJhIjoiY2sxYmEwbW53MDJpeDNvcGN4Mm5mYWYwciJ9.wuSyAqEfN8SFraG1v9jE8Q");
	var resposta;
	oReq.onreadystatechange = function(e){
		if (this.readyState == 4){
			resposta = JSON.parse(reqListener());
		}	
	}
	oReq.send();
	return resposta;
}
function pegarValores(objdata){
	var cordinate = objdata.features[0].center[1];
	var cordinate1 = objdata.features[0].center[0];
	return cordinate,codinate1;
}

/*= function pegarValores(){
	cordinate = resposta1.features[0].center[1];
	cordinate1 = resposta1.features[0].center[0];
	console.log(cordinate,cordinate1);
}
*/

/*function mostrarl(){
    var link1 =  document.getElementById("link1");
	link1.innerHTML = "Foram encontrados resultados nas seguintes cordenadas "+cordinate;
	
	var link2 =  document.getElementById("link2");
    link2.innerHTML = "Foram encontrados resultados nas seguintes cordenadas "+cordinate;
	
	var link3 =  document.getElementById("link3");
	link3.innerHTML = "Foram encontrados resultados nas seguintes cordenadas "+cordinate;
	
	var link4 =  document.getElementById("link4");
    link4.innerHTML = "Foram encontrados resultados nas seguintes cordenadas "+cordinate;
}*/
function main(){
	testar();
}
