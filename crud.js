// Obtener referencia al formulario y al contenedor del listado de equipos
const formulario = document.getElementById('formulario');
const divEquipos = document.querySelector('.div-equipos');

// Variable global para almacenar el índice del equipo que se está editando
let indiceEdicion = -1;

// Escuchar el evento submit del formulario para agregar o editar un equipo
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtener los valores del formulario
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripción').value;

  // Validar que los campos no estén vacíos
  if (nombre.trim() === '' || descripcion.trim() === '') {
    alert('Por favor, completa todos los campos');
    return;
  }

  // Crear un objeto con los datos del equipo
  const equipo = {
    nombre,
    descripcion
  };

  // Obtener el listado de equipos existente en LocalStorage
  let equipos = obtenerEquipos();

  if (indiceEdicion === -1) {
    // Agregar el nuevo equipo al listado
    equipos.push(equipo);
  } else {
    // Actualizar el equipo existente en el listado
    equipos[indiceEdicion] = equipo;
    indiceEdicion = -1; // Restablecer el índice de edición a -1
  }

  // Guardar el listado actualizado en LocalStorage
  guardarEquipos(equipos);

  // Limpiar el formulario
  formulario.reset();

  // Actualizar el listado en la interfaz
  mostrarEquipos();
});

// Función para obtener el listado de equipos almacenado en LocalStorage
function obtenerEquipos() {
  let equipos;

  if (localStorage.getItem('equipos') === null) {
    equipos = [];
  } else {
    equipos = JSON.parse(localStorage.getItem('equipos'));
  }

  return equipos;
}

// Función para guardar el listado de equipos en LocalStorage
function guardarEquipos(equipos) {
  localStorage.setItem('equipos', JSON.stringify(equipos));
}

// Función para mostrar los equipos en la interfaz
function mostrarEquipos() {
  // Obtener el listado de equipos
  const equipos = obtenerEquipos();

  // Limpiar el contenedor del listado
  divEquipos.innerHTML = '';

  // Verificar si existen equipos almacenados
  if (equipos.length === 0) {
    divEquipos.innerHTML = '<p>No hay equipos disponibles</p>';
    return;
  }

  // Generar el HTML para cada equipo y agregarlo al contenedor
  equipos.forEach((equipo, index) => {
    const divEquipo = document.createElement('div');
    divEquipo.classList.add('equipo');

    const nombreEquipo = document.createElement('p');
    nombreEquipo.classList.add('nombre');
    nombreEquipo.textContent = equipo.nombre;

    const descripcionEquipo = document.createElement('p');
    descripcionEquipo.classList.add('descripcion');
    descripcionEquipo.textContent = equipo.descripcion;

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.classList.add('btn-editar');
    btnEditar.addEventListener('click', () => {
      editarEquipo(index);
    });

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList.add('btn-eliminar');
    btnEliminar.addEventListener('click', () => {
      eliminarEquipo(index);
    });

    divEquipo.appendChild(nombreEquipo);
    divEquipo.appendChild(descripcionEquipo);
    divEquipo.appendChild(btnEditar);
    divEquipo.appendChild(btnEliminar);

    divEquipos.appendChild(divEquipo);
  });
}

// Función para editar un equipo del listado
function editarEquipo(index) {
  // Obtener el listado de equipos
  const equipos = obtenerEquipos();

  // Obtener el equipo seleccionado
  const equipo = equipos[index];

  // Llenar el formulario con los datos del equipo seleccionado
  document.getElementById('nombre').value = equipo.nombre;
  document.getElementById('descripción').value = equipo.descripcion;

  // Actualizar el índice de edición
  indiceEdicion = index;
}

// Función para eliminar un equipo del listado
function eliminarEquipo(index) {
  // Obtener el listado de equipos
  let equipos = obtenerEquipos();

  // Eliminar el equipo seleccionado del listado
  equipos.splice(index, 1);

  // Guardar el listado actualizado en LocalStorage
  guardarEquipos(equipos);

  // Actualizar el listado en la interfaz
  mostrarEquipos();
}

// Mostrar los equipos al cargar la página
mostrarEquipos();

