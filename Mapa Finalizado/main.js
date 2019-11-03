
//Mapa feito por Ruan Pablo +_-


//Cria Lista Ordenanada
function criarOl(){
	
	var divl = document.createElement("div");
	divl.setAttribute("id","divl");
	document.getElementById("corpo").appendChild(divl);

	var lista = document.createElement("ol");
	lista.setAttribute("id","lista");
	lista.style.static ="0"
	document.getElementById("divl").appendChild(lista);
}
	
//Pega cordenadas, adiciona na Lista Ordenada e transforma em Link
var pegarValores = function(){

	for (var i=0;i<5;i++){

		var lat = resposta.features[i].center[1];
		var long = resposta.features[i].center[0] ;
		var nomes = resposta.features[i].place_name;

		if(i==0){
			criarOl();
		}
		var li = document.createElement('li');
		li.setAttribute('id', i);

		var itens = document.createElement("a");
		var criar = 'init('+String(lat)+','+String(long)+')';
		itens.setAttribute('href' , "#" );
		itens.setAttribute('onclick' , criar );

		var cont = document.createTextNode(nomes);
		itens.appendChild(cont);
		li.appendChild(itens);
		document.getElementById('lista').appendChild(li);	

	}
}

//Cria div do mapa e chama a funcao passando as cordenadas como parametros; 
var init = function (lat,long) {
	limpar();
	var lat1 = lat;
	var long1 = long;

	
	var mapa = document.createElement('div');
	mapa.setAttribute("id","mapid");
	document.getElementById('conteudo').appendChild(mapa);
	
	mapa.style.width="600px";
	mapa.style.height="400px";
		
	CriarMap(lat1,long1);
	
}

//Onde o mapa é gerado
function CriarMap(lat1,long1){
	let lat = lat1;
	let long = long1;
	
	var mymap = L.map('mapid').setView([lat,long], 15);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2ZsYmVkdWNhdG9yIiwiYSI6ImNrMTZrYm1vNTA1dWEzaGxqN2tmMTZlazcifQ.XXsWkpgiguegb-C7WQpGBA', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
	L.marker([lat,long]).addTo(mymap)
		.bindPopup("<b>Seja Bem vindo!</b><br />Você está em: "+pegarcidade()).openPopup();
	L.circle([lat,long], 400, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(mymap).bindPopup("Seja bem-vindo");
}

//Pega valor digitado no input;
var pegarcidade = function(){
	return  document.getElementById("digitado").value;; 
}

//Funções em conjunto para fazer a requisição na API;
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

//Função usada pra limpar div onde está o mapa e outro poder ser recarregado;

function limpar  () {
	document.getElementById('conteudo').innerHTML=" ";
}

//Funcao principal, chama todas outras em uma sequência lógica;
function main(){
	limpar();
	if(document.getElementById('divl') == null){
	}else{
		document.getElementById('divl').innerHTML=" ";
	}
	pegarcidade();
	testar();
}