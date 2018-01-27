/* ------------------------------------
* CANVAS
------------------------------------ */

//Inicia el ejemplo con <canvas>
function iniciaPizarraCanvas() {
  let canvas = document.getElementById('areaDibujo');
  let contexto = canvas.getContext('2d');
  //Listener para el click
  canvas.addEventListener('click', function(e){
    let cajaBound = canvas.getBoundingClientRect();
    let mouseX = e.clientX - cajaBound.left;
    let mouseY = e.clientY - cajaBound.top;
    dibujaCirculo(mouseX, mouseY, contexto, cajaBound);
  });
}

//Dibuja el círculo en el <canvas>. Calcula en forma aleatorea
//el color y el radio del círculo
function dibujaCirculo(x = 0, y = 0, ctx, cajaBound) {
  let size = Math.random() * 100;
  let color = {
    R: 0,
    G: 0,
    B: 0
  }
  for (let attr in color) {
    color[attr] = Math.floor(Math.random() * (255 - 0 + 1) + 0);
  }
  ctx.beginPath();
  ctx.fillStyle = `rgb(${color.R},${color.G},${color.B})`;
  ctx.arc(x, y, size, 0, 2*Math.PI);
  ctx.stroke();
  ctx.fill();
}

iniciaPizarraCanvas();

/* ------------------------------------
* LOCAL STORAGE
------------------------------------ */

//Guarda una tarea en el localStorage
function guardaTarea() {
  let tarea = document.getElementById('tarea').value;
  if (tarea != '') {
    if (window.localStorage) {
      localStorage.setItem(genKey(), tarea);
      let tablaTareas = document.querySelector('#tabla_tareas tbody');
      tablaTareas.appendChild(crearNodo(tarea));
    } else {
      alert('Su navegador no soporta localStorage');
    }
  } else {
    alert('Debe ingresar alguna tarea!');
  }
}

//Crea un nodo para agregar al DOM
function crearNodo(tarea) {
  let tr = document.createElement('tr');
  let td = document.createElement('td');
  td.innerText = tarea;
  tr.appendChild(td);
  return tr;
}

//Crea una string para utilizar como key al guardar una nueva tarea
function genKey() {
  var caracteres = ['a', 'b', 'c', 'd', 'e', '0', '1', '2', '3', '4'];
  var uuid = '';
  for (let i = 0; i <= 10; i++) {
    uuid += caracteres[Math.floor(Math.random() * caracteres.length)];
  }
  return uuid;
}

//Lista todas las tareas que se encuentren en el localStorage
function listarTareas() {
  let tablaTareas = document.querySelector('#tabla_tareas tbody');
  if (localStorage.length > 0) {
    for (let i in localStorage) {
      if (typeof(localStorage[i]) != 'function' && [i] != 'length') {
        tablaTareas.appendChild(crearNodo(localStorage[i]));
      }
    }
  }
}

//Invoca a la función de listarTareas
listarTareas();

/* ------------------------------------
* GEOLOCACIÓN
------------------------------------ */

//Llama a la geolocación del navegador
function geolocaliza() {
  if (navigator.geolocation) {
    let location = navigator.geolocation.getCurrentPosition(geoPosicion, geoError);
  } else {
    alert('Su navegador no soporta geolocación');
  }
}

//Obtiene la latitud y longitud para agregarlo al DOM
function geoPosicion(posicion) {
  let lat = document.querySelector('.lat').textContent = posicion.coords.latitude;
  let lng = document.querySelector('.lng').textContent = posicion.coords.longitude;
  document.getElementById('tabla_geolocacion').style.display = 'block';
}

//Función que se llama cuando ocurre un error
function geoError(error) {
  switch (error.code) {
    case 1:
      alert('Usted ha declinado geolocalizarse! :(');
    break;

    default:
      alert(error.message);
    break;
  }
}