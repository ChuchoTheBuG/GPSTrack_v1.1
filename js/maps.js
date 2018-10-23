 
var marker;
var map;
function initMap() {



	var myLatLng = {lat: 19.5421271, lng: -96.9199274};
	var myCoor = {lat: 19.563354, lng: -96.926013};

		map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: myLatLng
	});
		/*
		var image = 'http://talleresygruasmendez.com.mx/track/img/marker.png';
		marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		animation: google.maps.Animation.DROP,
		icon: image,
		title: 'Grua XAL001'

	});*/
	
}