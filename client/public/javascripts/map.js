var map;
var infowindow;
$.get("http://localhost:3001/api/maps",function(data){
  initMap(data);
})

function initMap(data) {
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(-6.943097,107.633545),
    mapTypeId: 'roadmap'
  });

  var features = []
  for(let item of data){
    features.push({position:new google.maps.LatLng(item.lat,item.lng),name:item.title})
  }

  features.forEach(function(feature,idx) {
    var marker = new google.maps.Marker({
      position: feature.position,
      map: map
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(features[idx].name);
      infowindow.open(map, this);
    });
  });
}
