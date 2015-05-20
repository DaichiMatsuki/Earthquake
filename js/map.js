var map;
var marker_list;
$(document).ready(function(){

	var latlng = new google.maps.LatLng(39, 138);
	var opts = {
		zoom: 6,
 		mapTypeId: google.maps.MapTypeId.ROADMAP,
 		center: latlng
	};
	map = new google.maps.Map( $("#map")[0], opts );

        $("#upload").click(function () {
                $("#file").click();
        });

	marker_list = new google.maps.MVCArray();
        $("#file").change(function () {
                if (!this.files.length)
                        return;
                var file = this.files[0];
                var reader = new FileReader();
		marker_list.forEach(function(marker, idx) {
			marker.setMap(null);
		});
                reader.onload = function (event) {
                        var xmlDoc = $.parseXML(event.target.result);
                        var $xml = $(xmlDoc);

			var hyPos = $xml.find("Body Earthquake Hypocenter Area Coordinate").text();
			hyPos = hyPos.replace( /[\+\-\/]/g, "<>" );
			var coordinate = hyPos.split("<>");
			coordinate = $.grep(coordinate, function(e){return e !== "";});
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(parseFloat(coordinate[0]),parseFloat(coordinate[1])),
				title:$xml.find("Body Earthquake Hypocenter Area").text(),
				icon:'https://dl.dropboxusercontent.com/u/443577/googlemaps_marker/googlemaps_maker.png',
				map: map,
			});
			marker_list.push(marker);
			
			$xml.find("Body Intensity Observation Pref Area").each(function (j){
				var code = $(this).find("Code:not(City > Code,City > IntensityStation > Code)").text();
				var maxInt = $(this).find("MaxInt:not(City > MaxInt)").text();
				var name = $(this).find("Name:not(City > Name,City > IntensityStation > Name)").text();
				var ido = "", keido = "";
				for( var i = 0; i < PointMaster.length; i++ ){
					if ( PointMaster[i][0] == code ) {
						ido = PointMaster[i][1];
						keido = PointMaster[i][2];
						break;
					}
				}
				if (ido == "" || keido == "") {
					return;
				}

				var icon = 'http://img2.imepic.jp/image/20150520/348430.png?5e4300c351dcafa2f272be9a6107e27e';
				switch ( maxInt ) {
					case "1":
						icon = 'http://img2.imepic.jp/image/20150520/348441.png?2cc2faa1238b62d0abff518e9d0ee6b2';
						break;
					case "2":
						icon = 'http://img2.imepic.jp/image/20150520/348441.png?2cc2faa1238b62d0abff518e9d0ee6b2';
						break;
					case "3":
						icon = 'http://img2.imepic.jp/image/20150520/348450.png?99565a8773e5d6d1a9572e4392b086d6';
						break;
					case "4":
						icon = 'http://img2.imepic.jp/image/20150520/348451.png?bd532210c9b12dc183875e95feb17317';
						break;
					case "5-":
						icon = 'http://img2.imepic.jp/image/20150520/348452.png?c5d342076d4d47b1d91f69e845db2a50';
						break;
					case "5+":
						icon = 'http://img2.imepic.jp/image/20150520/348452.png?c5d342076d4d47b1d91f69e845db2a50';
						break;
					case "6-":
						icon = 'http://img2.imepic.jp/image/20150520/348453.png?3a4198accb58da623d249e1bd4f30cab';
						break;
					case "6+":
						icon = 'http://img2.imepic.jp/image/20150520/348453.png?3a4198accb58da623d249e1bd4f30cab';
						break;
					case "7":
						icon = 'http://img2.imepic.jp/image/20150520/348453.png?3a4198accb58da623d249e1bd4f30cab';
						break;
					default:
						break;
				}
				
				var markerInt = new google.maps.Marker({
                                	//position: new google.maps.LatLng(ido,keido),
                                	position: ConvertLatLng(ido,keido),
                                	title: code + " " + maxInt + " " + name,
                                	icon: icon,
                                	map: map,
                        	});
				marker_list.push(markerInt);
			});		
                }
                reader.readAsText(file);
        });
});

function ConvertLatLng(lat, lng) {
	var ido  = lat.split('.');
	var keido = lng.split('.');
	return TokyoToWGS84(parseInt(ido[0]) + parseInt(ido[1]) / 60,parseInt(keido[0]) + parseInt(keido[1]) / 60);
}

function TokyoToWGS84(latTokyo, lngTokyo)
{
      var latWGS84 = latTokyo - 0.00010695 * latTokyo + 0.000017464 * lngTokyo + 0.0046017;
      var lngWGS84 = lngTokyo - 0.000046038 * latTokyo - 0.000083043 * lngTokyo + 0.010040;

      return new google.maps.LatLng(latWGS84,lngWGS84);
}

var PointMaster = new Array(
         new Array( 100, "43.10", "141.19" )
        ,new Array( 101, "43.03", "141.20" )
        ,new Array( 102, "42.49", "141.39" )
        ,new Array( 105, "42.07", "140.22" )
        ,new Array( 106, "41.49", "140.45" )
        ,new Array( 107, "41.26", "140.07" )
        ,new Array( 110, "41.52", "140.08" )
        ,new Array( 115, "43.11", "141.01" )
        ,new Array( 116, "42.48", "140.41" )
        ,new Array( 117, "42.39", "140.03" )
        ,new Array( 119, "42.05", "139.28" )
        ,new Array( 120, "43.43", "142.03" )
        ,new Array( 121, "43.30", "142.13" )
        ,new Array( 122, "43.02", "141.58" )
        ,new Array( 125, "44.00", "142.09" )
        ,new Array( 126, "43.45", "142.23" )
        ,new Array( 127, "43.21", "142.23" )
        ,new Array( 130, "44.18", "141.39" )
        ,new Array( 131, "43.57", "141.38" )
        ,new Array( 135, "45.01", "141.51" )
        ,new Array( 136, "45.07", "142.21" )
        ,new Array( 139, "45.18", "141.03" )
        ,new Array( 140, "44.01", "144.17" )
        ,new Array( 141, "44.07", "144.05" )
        ,new Array( 142, "44.21", "143.22" )
        ,new Array( 145, "42.28", "140.53" )
        ,new Array( 146, "42.19", "140.59" )
        ,new Array( 150, "42.53", "142.27" )
        ,new Array( 151, "42.22", "142.19" )
        ,new Array( 152, "42.10", "142.47" )
        ,new Array( 155, "43.19", "143.19" )
        ,new Array( 156, "42.37", "143.22" )
        ,new Array( 157, "42.30", "143.17" )
        ,new Array( 160, "43.29", "144.27" )
        ,new Array( 161, "42.59", "144.23" )
        ,new Array( 165, "43.35", "144.43" )
        ,new Array( 166, "43.24", "145.07" )
        ,new Array( 167, "43.20", "145.35" )
        ,new Array( 200, "40.49", "140.46" )
        ,new Array( 201, "40.37", "140.28" )
        ,new Array( 202, "40.32", "141.32" )
        ,new Array( 203, "41.17", "141.13" )
        ,new Array( 210, "39.39", "141.58" )
        ,new Array( 211, "39.21", "141.54" )
        ,new Array( 212, "39.42", "141.10" )
        ,new Array( 213, "39.08", "141.08" )
        ,new Array( 220, "38.34", "140.58" )
        ,new Array( 221, "38.00", "140.37" )
        ,new Array( 222, "38.22", "140.40" )
        ,new Array( 230, "40.12", "140.02" )
        ,new Array( 231, "39.43", "140.06" )
        ,new Array( 232, "40.16", "140.34" )
        ,new Array( 233, "39.19", "140.34" )
        ,new Array( 240, "38.43", "139.50" )
        ,new Array( 241, "38.45", "140.19" )
        ,new Array( 242, "38.15", "140.21" )
        ,new Array( 243, "37.55", "140.07" )
        ,new Array( 250, "37.45", "140.28" )
        ,new Array( 251, "36.57", "140.54" )
        ,new Array( 252, "37.29", "139.55" )
        ,new Array( 300, "36.23", "140.28" )
        ,new Array( 301, "36.06", "140.12" )
        ,new Array( 310, "36.44", "139.30" )
        ,new Array( 311, "36.33", "139.52" )
        ,new Array( 320, "36.39", "139.03" )
        ,new Array( 321, "36.24", "139.04" )
        ,new Array( 330, "36.09", "139.23" )
        ,new Array( 331, "35.54", "139.29" )
        ,new Array( 332, "35.59", "139.05" )
        ,new Array( 340, "35.44", "140.52" )
        ,new Array( 341, "35.46", "140.23" )
        ,new Array( 342, "34.59", "139.52" )
        ,new Array( 350, "35.41", "139.46" )
        ,new Array( 351, "35.40", "139.20" )
        ,new Array( 352, "35.47", "139.17" )
        ,new Array( 354, "34.11", "139.08" )
        ,new Array( 355, "34.45", "139.22" )
        ,new Array( 356, "34.32", "139.17" )
        ,new Array( 357, "34.07", "139.32" )
        ,new Array( 358, "33.07", "139.48" )
        ,new Array( 359, "27.05", "142.12" )
        ,new Array( 360, "35.27", "139.38" )
        ,new Array( 361, "35.16", "139.05" )
        ,new Array( 370, "37.02", "137.52" )
        ,new Array( 371, "37.08", "138.37" )
        ,new Array( 372, "37.55", "139.03" )
        ,new Array( 375, "38.02", "138.15" )
        ,new Array( 380, "36.42", "137.12" )
        ,new Array( 381, "36.47", "137.04" )
        ,new Array( 390, "37.02", "136.58" )
        ,new Array( 391, "36.35", "136.38" )
        ,new Array( 400, "36.03", "136.14" )
        ,new Array( 401, "35.39", "136.04" )
        ,new Array( 411, "35.32", "138.37" )
        ,new Array( 412, "35.28", "138.49" )
        ,new Array( 420, "36.40", "138.12" )
        ,new Array( 421, "36.15", "137.58" )
        ,new Array( 422, "35.31", "137.50" )
        ,new Array( 430, "36.09", "137.15" )
        ,new Array( 431, "35.20", "137.08" )
        ,new Array( 432, "35.24", "136.46" )
        ,new Array( 440, "35.03", "139.06" )
        ,new Array( 441, "34.58", "138.47" )
        ,new Array( 442, "34.58", "138.24" )
        ,new Array( 443, "34.42", "137.43" )
        ,new Array( 450, "34.45", "137.25" )
        ,new Array( 451, "34.55", "137.18" )
        ,new Array( 460, "34.56", "136.35" )
        ,new Array( 461, "34.44", "136.31" )
        ,new Array( 462, "34.21", "136.25" )
        ,new Array( 500, "35.16", "136.15" )
        ,new Array( 501, "35.12", "135.55" )
        ,new Array( 510, "35.18", "135.08" )
        ,new Array( 511, "35.16", "135.33" )
        ,new Array( 520, "34.42", "135.32" )
        ,new Array( 521, "34.32", "135.30" )
        ,new Array( 530, "35.32", "134.50" )
        ,new Array( 531, "34.43", "135.16" )
        ,new Array( 532, "34.50", "134.40" )
        ,new Array( 535, "34.20", "134.54" )
        ,new Array( 540, "34.41", "135.50" )
        ,new Array( 550, "34.14", "135.10" )
        ,new Array( 551, "33.53", "135.29" )
        ,new Array( 560, "35.29", "134.14" )
        ,new Array( 562, "35.23", "133.49" )
        ,new Array( 563, "35.26", "133.20" )
        ,new Array( 570, "35.27", "133.04" )
        ,new Array( 571, "34.54", "132.04" )
        ,new Array( 575, "36.12", "133.20" )
        ,new Array( 580, "35.04", "134.01" )
        ,new Array( 581, "34.39", "133.55" )
        ,new Array( 590, "34.48", "132.52" )
        ,new Array( 591, "34.35", "133.04" )
        ,new Array( 592, "34.32", "132.47" )
        ,new Array( 600, "34.04", "134.35" )
        ,new Array( 601, "33.55", "134.39" )
        ,new Array( 610, "34.19", "134.03" )
        ,new Array( 611, "34.17", "133.48" )
        ,new Array( 620, "34.03", "133.00" )
        ,new Array( 621, "33.50", "132.47" )
        ,new Array( 622, "33.13", "132.33" )
        ,new Array( 630, "33.15", "134.11" )
        ,new Array( 631, "33.33", "133.22" )
        ,new Array( 632, "33.27", "133.12" )
        ,new Array( 700, "34.24", "131.25" )
        ,new Array( 702, "33.57", "130.56" )
        ,new Array( 703, "34.10", "132.13" )
        ,new Array( 704, "34.09", "131.27" )
        ,new Array( 710, "33.39", "130.26" )
        ,new Array( 711, "33.55", "130.57" )
        ,new Array( 712, "33.44", "130.44" )
        ,new Array( 713, "33.01", "130.27" )
        ,new Array( 720, "33.16", "129.53" )
        ,new Array( 721, "33.22", "130.13" )
        ,new Array( 730, "33.11", "129.43" )
        ,new Array( 731, "32.44", "129.53" )
        ,new Array( 732, "32.47", "130.21" )
        ,new Array( 735, "34.39", "129.28" )
        ,new Array( 736, "33.45", "129.42" )
        ,new Array( 737, "33.15", "129.08" )
        ,new Array( 740, "32.56", "131.07" )
        ,new Array( 741, "32.41", "130.59" )
        ,new Array( 742, "32.12", "130.47" )
        ,new Array( 743, "32.13", "130.24" )
        ,new Array( 750, "33.35", "131.11" )
        ,new Array( 751, "33.30", "131.34" )
        ,new Array( 752, "32.56", "131.52" )
        ,new Array( 721, "33.22", "130.13" )
        ,new Array( 730, "33.11", "129.43" )
        ,new Array( 731, "32.44", "129.53" )
        ,new Array( 732, "32.47", "130.21" )
        ,new Array( 735, "34.39", "129.28" )
        ,new Array( 736, "33.45", "129.42" )
        ,new Array( 737, "33.15", "129.08" )
        ,new Array( 740, "32.56", "131.07" )
        ,new Array( 741, "32.41", "130.59" )
        ,new Array( 742, "32.12", "130.47" )
        ,new Array( 743, "32.13", "130.24" )
        ,new Array( 750, "33.35", "131.11" )
        ,new Array( 751, "33.30", "131.34" )
        ,new Array( 752, "32.56", "131.52" )
        ,new Array( 753, "33.19", "130.56" )
        ,new Array( 760, "32.35", "131.40" )
        ,new Array( 761, "32.13", "131.09" )
        ,new Array( 762, "31.56", "131.25" )
        ,new Array( 763, "31.44", "131.05" )
        ,new Array( 770, "31.22", "130.33" )
        ,new Array( 771, "31.24", "130.52" )
        ,new Array( 774, "29.50", "129.52" )
        ,new Array( 775, "31.50", "129.55" )
        ,new Array( 776, "30.44", "131.00" )
        ,new Array( 777, "30.14", "130.33" )
        ,new Array( 778, "28.27", "129.41" )
        ,new Array( 779, "27.41", "128.57" )
        ,new Array( 800, "26.35", "127.58" )
        ,new Array( 800, "26.35", "127.58" )
        ,new Array( 801, "26.15", "127.41" )
        ,new Array( 802, "26.21", "126.45" )
        ,new Array( 803, "25.50", "131.14" )
        ,new Array( 804, "24.51", "125.18" )
        ,new Array( 805, "24.20", "124.09" )
        ,new Array( 806, "24.28", "123.01" )
        ,new Array( 807, "24.14", "124.01" )
);
