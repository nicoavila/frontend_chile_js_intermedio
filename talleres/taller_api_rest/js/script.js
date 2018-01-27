//Declaración de función que retorna una promesa con la información sobre el recorrido C01
function getRecorridoC01()  {
  let request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open('GET', 'http://www.transantiago.cl/restservice/rest/getrecorrido/C01', true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText);
        resolve(data);
      } else {
        reject({error: 'Error de comunicación con el servidor'});
      }
    };
    request.onerror = function() {
      reject({error: 'Error de comunicación con el servidor'});
    };
    request.send();
  });
}

function iniciaMapa() {
  //Invoca a la función para obtener el recorrido de la C01
  getRecorridoC01().then((data) => {
    document.getElementById('loading').style.display = 'none';

    let coordenadasRuta = data[0].shapes.map((coord) => {
      let obj = {
        lat: null,
        lng: null
      }
      obj.lat = parseFloat(coord.latShape);
      obj.lng = parseFloat(coord.lonShape);
      return obj;
    });

    let mapa = new google.maps.Map(document.getElementById('mapa'), {
      zoom: 12,
      center: {lat: -33.408783, lng: -70.567070},
      mapTypeId: 'terrain'
    });

    console.log(coordenadasRuta);
    let recorrido = new google.maps.Polyline({
      path: coordenadasRuta,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    recorrido.setMap(mapa);

  });
}
