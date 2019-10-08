var cidade,oReq,reqListener,result,resposta,obj,cordinate,cordinate1,compilado,link1,link2,link3,link4;;

function map(){
	var mymap = L.map('mapid').setView([cordinate,cordinate1], 15);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2ZsYmVkdWNhdG9yIiwiYSI6ImNrMTZrYm1vNTA1dWEzaGxqN2tmMTZlazcifQ.XXsWkpgiguegb-C7WQpGBA', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
	L.marker([cordinate,cordinate1]).addTo(mymap)
		.bindPopup("<b>Seja Bem vindo!</b><br />Você está em :"+cidade).openPopup();
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
function getcity(){
	cidade = document.getElementById("digitado").value;
}

function reqListener () {
	resposta = this.responseText; 
	//console.log (resposta);
}

function testar (){
    oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open("get","https://api.mapbox.com/geocoding/v5/mapbox.places/"+cidade+".json?access_token=sk.eyJ1Ijoib3J1YW4iLCJhIjoiY2sxYmEwbW53MDJpeDNvcGN4Mm5mYWYwciJ9.wuSyAqEfN8SFraG1v9jE8Q");
	oReq.send();

}

function compiler (){
	obj = JSON.parse(resposta);
    console.log (obj);
}

function pegarValores(){
	cordinate = obj.features[0].center[1];
	cordinate1 = obj.features[0].center[0];
	console.log(cordinate,cordinate1);
}
	
function mostrarl(){
    var link1 =  document.getElementById("link1");
	link1.innerHTML = "Foram encontrados resultados nas seguintes cordenadas "+cordinate;
	var link2 =  document.getElementById("link2");
    link2.innerHTML = "Foram encontrados resultados nas seguintes cordenadas "+cordinate;
	var link3 =  document.getElementById("link3");
	link3.innerHTML = "Foram encontrados resultados nas seguintes cordenadas "+cordinate;
	var link4 =  document.getElementById("link4");
    link4.innerHTML = "Foram encontrados resultados nas seguintes cordenadas "+cordinate;
}

function main(){
	getcity();
	var timerId = setTimeout(testar(), 3000);		
	compiler();
	pegarValores();
}
