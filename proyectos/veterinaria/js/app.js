let tarjetaId = 1;
let tarjetas = [];
const ESTADOS = ["", "creada", "finalizada", "cancelada"];
const ESTADO_COLORS = ["", "#AED6F1", "#82E0AA", "#F5B7B1"];

function generarTarjeta(nombreMascota, nombrePropietario, telefono, tipoMascota, fecha, hora, sintomas, estadoIndex) {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.style.width = '20rem';
    cardDiv.setAttribute('id', 'tarjeta-' + tarjetaId);

    let cardImg = document.createElement('img');
    cardImg.classList.add('card-img-top');
    let imagenSeleccionada = document.querySelector('#tipoMascota option:checked').getAttribute('data-imagen');
    cardImg.src = imagenSeleccionada;
    cardImg.alt = 'Imagen de ' + tipoMascota;

    let cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-bod');

    let cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = nombreMascota;

    let cardText = document.createElement('p');
    cardText.classList.add('card-text');
    let horaFormato12 = convertirHoraFormato12(hora);
    cardText.innerHTML = 'Propietario: <strong>' + nombrePropietario + '</strong><br>Teléfono: <strong>' + telefono + '</strong><br>Tipo de mascota: <strong>' + tipoMascota + '</strong><br>Fecha: <strong>' + fecha + '</strong><br>Hora: <strong>' + horaFormato12 + '</strong><br>Síntomas: <strong>' + sintomas + '</strong>';

    let cardFooterDiv = document.createElement('div');
    cardFooterDiv.classList.add('card-footer');

    let estadoSelect = document.createElement('select');
    estadoSelect.classList.add('form-select');

    ESTADOS.forEach((estado, index) => {
        let estadoOption = document.createElement('option');
        estadoOption.value = index;
        estadoOption.textContent = estado.charAt(0).toUpperCase() + estado.slice(1);
        estadoOption.style.backgroundColor = ESTADO_COLORS[index];

        estadoSelect.appendChild(estadoOption);
    });

    estadoSelect.value = estadoIndex;

    estadoSelect.addEventListener('change', function () {
        let selectedEstado = ESTADOS[estadoSelect.value];
        tarjetas[tarjetaId - 1].estado = selectedEstado;
        console.log(tarjetas);

        estadoSelect.style.backgroundColor = ESTADO_COLORS[estadoSelect.value];
    });

    let editarBtn = document.createElement('button');
    editarBtn.classList.add('btn', 'btn-cambios', 'mr-2');
    editarBtn.textContent = 'Editar';
    editarBtn.addEventListener('click', function () {
        cargarDatosEdicion(tarjetaId);
    });

    cardDiv.classList.add(`estado-${ESTADOS[estadoIndex]}`);
    cardFooterDiv.appendChild(estadoSelect);
    cardFooterDiv.appendChild(editarBtn);

    tarjetaId++;
    cardDiv.appendChild(cardImg);
    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardText);
    cardDiv.appendChild(cardBodyDiv);
    cardDiv.appendChild(cardFooterDiv);
    document.getElementById('tarjetasContainer').appendChild(cardDiv);
}

let editingTarjetaId = null;
function cargarDatosEdicion(tarjetaId) {
    let tarjetaIndex = tarjetaId - 1;
    let tarjeta = tarjetas[tarjetaIndex];
    document.getElementById('nombreMascota').value = tarjeta.nombreMascota;
    document.getElementById('nombrePropietario').value = tarjeta.nombrePropietario;
    document.getElementById('telefono').value = tarjeta.telefono;
    document.getElementById('tipoMascota').value = tarjeta.tipoMascota;
    document.getElementById('fecha').value = tarjeta.fecha;
    document.getElementById('hora').value = tarjeta.hora;
    document.getElementById('message-text').value = tarjeta.sintomas;

    editingTarjetaId = tarjetaId;

    let modal = document.getElementById('exampleModal');
    let modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.show();
}

function convertirHoraFormato12(hora24) {
    let hora12 = "";
    let partesHora = hora24.split(":");
    let hora = parseInt(partesHora[0]);
    let minutos = partesHora[1];

    if (hora === 0) {
        hora12 = "12:" + minutos + " AM";
    } else if (hora < 12) {
        hora12 = hora + ":" + minutos + " AM";
    } else if (hora === 12) {
        hora12 = "12:" + minutos + " PM";
    } else {
        hora12 = (hora > 12 ? hora - 12 : hora) + ":" + minutos + " PM";
    }

    return hora12;
}

function guardar() {
    if (!validar()) {
        return;
    }

    if (editingTarjetaId !== null) {
        let tarjetaIndex = editingTarjetaId - 1;
        tarjetas[tarjetaIndex].nombreMascota = document.getElementById('nombreMascota').value;
        tarjetas[tarjetaIndex].nombrePropietario = document.getElementById('nombrePropietario').value;
        tarjetas[tarjetaIndex].telefono = document.getElementById('telefono').value;
        tarjetas[tarjetaIndex].tipoMascota = document.getElementById('tipoMascota').value;
        tarjetas[tarjetaIndex].fecha = document.getElementById('fecha').value;
        tarjetas[tarjetaIndex].hora = document.getElementById('hora').value;
        tarjetas[tarjetaIndex].sintomas = document.getElementById('message-text').value;

        let editedCard = document.getElementById('tarjeta-' + editingTarjetaId);
        editedCard.querySelector('.card-title').textContent = document.getElementById('nombreMascota').value;
        let horaFormato12 = convertirHoraFormato12(document.getElementById('hora').value);
        editedCard.querySelector('.card-text').innerHTML = 'Propietario: <strong>' + document.getElementById('nombrePropietario').value + '</strong><br>Teléfono: <strong>' + document.getElementById('telefono').value + '</strong><br>Tipo de mascota: <strong>' + document.getElementById('tipoMascota').value + '</strong><br>Fecha: <strong>' + document.getElementById('fecha').value + '</strong><br>Hora: <strong>' + horaFormato12 + '</strong><br>Síntomas: <strong>' + document.getElementById('message-text').value + '</strong>';
        editedCard.classList.remove(...editedCard.classList);

        editingTarjetaId = null;
    } else {
        let nombreMascota = document.getElementById('nombreMascota').value;
        let nombrePropietario = document.getElementById('nombrePropietario').value;
        let telefono = document.getElementById('telefono').value;
        let tipoMascota = document.getElementById('tipoMascota').value;
        let fecha = document.getElementById('fecha').value;
        let hora = document.getElementById('hora').value;
        let sintomas = document.getElementById('message-text').value;

        generarTarjeta(nombreMascota, nombrePropietario, telefono, tipoMascota, fecha, hora, sintomas);
    }

    limpiarModal();
}

function validar() {
    if (document.getElementById("nombreMascota").value.trim() === "") {
        document.getElementById("alerta").textContent = "Por favor, digite un nombre de mascota";
        document.getElementById("alerta").style.display = "block";
        limpiarError();
        return false;
    } else if (document.getElementById("nombrePropietario").value.trim() === "") {
        document.getElementById("alerta").textContent = "Por favor, digite un nombre de propietario";
        document.getElementById("alerta").style.display = "block";
        limpiarError();
        return false;
    } else if (document.getElementById("telefono").value.trim() === "") {
        document.getElementById("alerta").textContent = "Por favor digite un teléfono";
        document.getElementById("alerta").style.display = "block";
        limpiarError();
        return false;
    } else if (document.getElementById("telefono").value.length < 10) {
        document.getElementById("alerta").textContent = "Por favor, el número debe tener al menos 10 caracteres";
        document.getElementById("alerta").style.display = "block";
        limpiarError();
        return false;
    } else if (!(/^\d+$/.test(document.getElementById("telefono").value.trim()))) {
        document.getElementById("alerta").textContent = "El teléfono debe contener solo números";
        document.getElementById("alerta").style.display = "block";
        return false;
    } else if (document.getElementById("fecha").value === "") {
        document.getElementById("alerta").textContent = "Por favor, seleccione una fecha";
        document.getElementById("alerta").style.display = "block";
        limpiarError();
        return false;
    } else if (document.getElementById("hora").value === "") {
        document.getElementById("alerta").textContent = "Por favor, seleccione una hora";
        document.getElementById("alerta").style.display = "block";
        limpiarError();
        return false;
    } else if (document.getElementById("hora").value < 8 || document.getElementById("hora").value > 18) {
        document.getElementById("alerta").textContent = "La hora debe estar entre las 8 AM y las 6 PM.";
        document.getElementById("alerta").style.display = "block";
        limpiarError();
        return false;
    } else if (document.getElementById("message-text").value.trim() === "") {
        document.getElementById("alerta").textContent = "Por favor, ingrese los síntomas";
        document.getElementById("alerta").style.display = "block";
        limpiarError();
        return false;
    } else {
        let seleccionFecha = new Date(document.getElementById("fecha").value);
        let seleccionHora = parseInt(document.getElementById("hora").value);

        let fechaActual = new Date();

        if (seleccionHora < 8 || seleccionHora > 18) {
            document.getElementById("alerta").textContent = "La hora debe estar entre las 8 AM y las 6 PM.";
            document.getElementById("alerta").style.display = "block";
            limpiarError();
            return false;
        }

        fechaActual.setHours(0, 0, 0, 0);

        if (seleccionFecha <= fechaActual) {
            document.getElementById("alerta").textContent = "La fecha debe ser desde el día siguiente al actual.";
            document.getElementById("alerta").style.display = "block";
            limpiarError();
            return false;
        }

        return true;
    }
}

function esCitaRepetida(fecha, hora) {
    for (let i = 0; i < citas.length; i++) {
        const cita = cita[i];
        if (cita.fecha.getTime() === fecha.getTime() && cita.hora === hora) {
            return true;
        }
    }
    return false;
}


function limpiarError() {
    setTimeout(function () {
        document.getElementById("alerta").textContent = "";
        document.getElementById("alerta").style.display = "none";
    }, 2500);
}

function limpiarModal() {
    document.getElementById('nombreMascota').value = '';
    document.getElementById('nombrePropietario').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('tipoMascota').value = 'Mamifero';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('message-text').value = '';

    let modal = document.getElementById('exampleModal');
    let modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
}


function mostrarCitasByEstado(estado) {
    document.getElementById('tarjetasContainer').innerHTML = '';

    let citasFiltradas = tarjetas.filter(cita => cita.estado === estado);

    citasFiltradas.forEach(cita => {
        generarTarjeta(
            cita.nombreMascota,
            cita.nombrePropietario,
            cita.telefono,
            cita.tipoMascota,
            cita.fecha,
            cita.hora,
            cita.sintomas,
            ESTADOS.indexOf(cita.estado)
        );
    });
}