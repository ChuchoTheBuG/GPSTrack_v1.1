
window.onload=cargaInicial;
setInterval(actualizar, 60000);


var latArray = 		[];
var lonArray =	 	[];
var locations = 	[];
var markers = 		[];

//Funcion ejecutada al cargar la pagian web
function cargaInicial(){

	//LLamamos a la funcion xmlHTTPRequest para hacer una peticion al servidor
	//mediante metodo GET, con el codigo 200 para solicitar las gruas activas
	var xmlhttp;
	//var contenidoRecivido = new Array();


	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var obj = JSON.parse(xmlhttp.responseText); 
			fillInfo(obj);
			cargaCoordenadas();
		}
	}

	xmlhttp.open("GET","http://restapi.talleresygruasmendez.com.mx/v1.1/auto/200");
	xmlhttp.send();	

}

//Carga las coordenadas iniciales
function cargaCoordenadas(){	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var obj = JSON.parse(xmlhttp.responseText); 

			console.log(obj);

			for (let i in obj) {
				for (let j in obj[i]){
					if (obj[i][j].hasOwnProperty('lat')) {
						//console.log("Lat:  "+obj[i][j].lat);
						latArray.push(parseFloat(obj[i][j].lat));
						
					}

					if (obj[i][j].hasOwnProperty('lon')) {
						//console.log("Lon:  "+obj[i][j].lon);
						lonArray.push(parseFloat(obj[i][j].lon));
					}

					if (j == 0) {
						document.getElementById("fecha").innerHTML 		 = "Fecha: "+obj[i][j].date;
						document.getElementById("lat").innerHTML 		 = "Lat: "+obj[i][j].lat;
						document.getElementById("lon").innerHTML 		 = "Lon: "+obj[i][j].lon;
						document.getElementById("b_estado").innerHTML 	 = "Bateria: "+obj[i][j].b_estado;
						document.getElementById("b_porcent").innerHTML 	 = "Bat. Porcentage: "+obj[i][j].b_porcent + "%";
						document.getElementById("b_voltage").innerHTML 	 = "Bat. Voltage: "+obj[i][j].b_voltage + "mV";
						document.getElementById("gsm").innerHTML 		 = "Señal GMS: "+obj[i][j].gsmq;
						document.getElementById("tf").innerHTML 		 = "Toma de Fuerza: "+obj[i][j].tf;
						document.getElementById("bulbo").innerHTML 		 = "Bulbo: "+obj[i][j].bulbo;
					}
				}
			}

			//Recomponiendo  coordenadas
			console.log("Recomponiendo coordenadas ");

			
			setMapOnAll(null);
			markers = [];



			//Creando marcadores
			for (var i = 0; i < latArray.length; i++) {
				locations.push({lat: latArray[i], lng: lonArray[i]})
				if (i == 0) {
					var image = 'http://talleresygruasmendez.com.mx/track/img/marker.png';
					var mkr = new google.maps.Marker({
					position: locations[i],
					map:map,
					animation: google.maps.Animation.DROP,
					icon: image,
					title: 'Grua XAL001 Esta Aqui'
					});

					markers.push(mkr);
				}

				else {
					var image = 'http://talleresygruasmendez.com.mx/track/img/wpoint.png';
					var mkr = new google.maps.Marker({
					position: locations[i],
					map:map,
					animation: google.maps.Animation.DROP,
					icon: image,
					title: 'Grua XAL001 Paso por aqui'
					});

					markers.push(mkr);
				}
				
				console.log(locations[i]);
			}
			map.setCenter(locations[0]);
			map.setZoom(16);

			//Limpiando array
			locations = [];
			latArray = [];
			lonArray = [];


			//Actualizando datos en el DOM
			/*
			document.getElementById("lat").innerHTML 		 = "Lat: "+obj.response.lat;
			document.getElementById("lon").innerHTML 		 = "Lon: "+obj.response.lon;
			document.getElementById("b_estado").innerHTML 	 = "Bateria: "+obj.response.b_estado;
			document.getElementById("b_porcent").innerHTML 	 = "Bat. Porcentage: "+obj.response.b_porcent + "%";
			document.getElementById("b_voltage").innerHTML 	 = "Bat. Voltage: "+obj.response.b_voltage + "mV";
			document.getElementById("gsm").innerHTML 		 = "Señal GMS: "+obj.response.gsmq;
			document.getElementById("tf").innerHTML 		 = "Toma de Fuerza: "+obj.response.tf;
			document.getElementById("bulbo").innerHTML 		 = "Bulbo: "+obj.response.bulbo;

			//actualizando mapa
			var coor = {lat: parseFloat(obj.response.lat), lng: parseFloat(obj.response.lon)};
			console.log(coor);
			marker.setPosition(coor);
			map.setCenter(coor);
			map.setZoom(16);
			*/

		}
	}

	xmlhttp.open("GET","http://restapi.talleresygruasmendez.com.mx/v1.1/auto/202");
	xmlhttp.send();

}


function fillInfo(obj){
	document.getElementById("id").innerHTML += obj.gruas.grua_id;
	document.getElementById("info").innerHTML += " Conexion OK";
}

function actualizar(){

	cargaCoordenadas();
	/*
	var coor = {lat: 19.563614, lng: -96.925018};
	marker.setPosition(coor);
	map.setCenter(coor);
	map.setZoom(16);
	*/
}


     // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }