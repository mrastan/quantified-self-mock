allMapStyles = [
	{
		'Other style': [{
			stylers: [
					{ hue: "#00ffe6" },
					{ saturation: -20 }
			]
		}, {
			featureType: "road",
			elementType: "geometry",
			stylers: [
					{ lightness: 100 },
					{ visibility: "simplified" }
			]
		}, {
			featureType: "road",
			elementType: "labels",
			stylers: [
					{ visibility: "off" }
			]
		}],
	},
	{
		'Greyscale': [{              
			featureType: 'all',
			stylers: [
				{ saturation: -100 },
				{ gamma: 0.60 }
			]
		}]
	}
	];

var gMapStyles = allMapStyles[0];

var gMapOptions = {
	panControl: false,
	zoomControl: false,
	scaleControl: false,
	mapTypeControl: false,
	streetViewControl: false
}