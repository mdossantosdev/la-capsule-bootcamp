const mymap = L.map('worldmap', {
  center: [48.866667, 2.333333],
  zoom: 4
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }
).addTo(mymap);

const fontAwesomeIcon = L.divIcon({
  html: '<i class="fa fa-map-marker-alt"></i>',
  className: 'markerIcon'
});

const cities = document.getElementsByClassName('list-group-item');

for (const city of cities) {
  // City name
  const name = city.dataset.name;

  // City latitude
  const latitude = city.dataset.latitude;

  // City longitude
  const longitude = city.dataset.longitude;

  // Set marker
  L.marker([latitude, longitude], { icon: fontAwesomeIcon }).addTo(mymap).bindPopup(name);
}
