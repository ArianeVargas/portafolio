function validar() {
    const mascota = document.getElementById("mascota").value.trim();
    const propietario = document.getElementById("propietario").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const tipoMascota = document.getElementById("tipo").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const sintomas = document.getElementById("message-text").value.trim();

    // Reiniciamos los mensajes de error
    document.querySelectorAll(".mensaje-error").forEach((elemento) => {
        elemento.textContent = "";
    });

    let error = false;
    const regex = /^[a-zA-Z\s]*$/;

    if (mascota === "") {
        mostrarError("mascota", "Por favor, digite el nombre de la mascota");
        error = true;
    } else if (!regex.test(mascota)) {
        mostrarError("mascota", "El nombre de la mascota no debe contener números");
        error = true;
    }

    if (propietario === "") {
        mostrarError("propietario", "Por favor, digite su nombre");
        error = true;
    } else if (!regex.test(propietario)) {
        mostrarError("propietario", "El nombre del propietario no debe contener números");
        error = true;
    }

    if (telefono === "") {
        mostrarError("telefono", "Por favor, digite un teléfono");
        error = true;
    } else if (telefono.length !== 10) {
        mostrarError("telefono", "Por favor, digite un número de teléfono con 10 dígitos");
        error = true;
    }

    if (tipoMascota === "Seleccione") {
        mostrarError("tipo", "Por favor, seleccione el tipo de mascota");
        error = true;
    }

    if (fecha === "") {
        mostrarError("fecha", "Por favor, seleccione una fecha para reservar");
        error = true;
    } else {
        let seleccionFecha = new Date(fecha);
        let fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);
        let seleccionHora = parseInt(hora.split(":")[0]);

        if (seleccionFecha < fechaActual || (seleccionFecha.getTime() === fechaActual.getTime() && seleccionHora < 8)) {
            mostrarError("fecha", "Debe seleccionar una fecha válida");
            error = true;
        }
    }

    if (hora === "") {
        mostrarError("hora", "Por favor, elija una hora disponible");
        error = true;
    } else {
        let seleccionHora = parseInt(hora.split(":")[0]);
        if (seleccionHora < 8 || seleccionHora > 20) {
            mostrarError("hora", "La hora debe estar entre las 8 AM y las 8 PM.");
            error = true;
        }
    }

    if (sintomas === "") {
        mostrarError("message-text", "Por favor, digite los síntomas");
        error = true;
    }

    if (error) {
        return false;
    }

    document.getElementById("msj2").style.display = "block";
    document.getElementById("msj2").textContent = "Registro Exitoso";
    document.getElementById("msj2").classList.add("mensaje-exito");

    setTimeout(() => {
        document.getElementById("msj2").style.display = "none";
        document.getElementById("msj2").classList.remove("mensaje-exito");
    }, 3000);

    return true;
}

function mostrarError(campo, mensaje) {
    const campoInput = document.getElementById(campo);
    const mensajeError = document.createElement("div");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add("mensaje-error");
    campoInput.parentNode.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 5000);
}





let bd = ""
let id = 0
let id2

let data = []

function crear() {
    bd = "agregar"
    limpiar()
}

function actualizarImagenTipoMascota() {
    const tipoInput = document.getElementById('tipo');
    const selectedOption = tipoInput.options[tipoInput.selectedIndex];
    const imagen = selectedOption.getAttribute('data-imagen');
    const imagenPreview = document.getElementById('imagen-preview');
    imagenPreview.src = imagen;
}

function guardar() {
    if (!validar()) {
        return;
    }
    if (bd == "agregar") {
        let mascota = document.getElementById('mascota').value;
        let propietario = document.getElementById('propietario').value;
        let telefono = document.getElementById('telefono').value;
        let tipo = document.getElementById('tipo').value;
        let imagen = document.querySelector('#tipo option:checked').getAttribute('data-imagen');
        let fecha = document.getElementById('fecha').value;
        let hora = document.getElementById('hora').value;
        let sintomas = document.getElementById('message-text').value;
        let estadoCita = document.querySelector('#tipo option:checked').getAttribute('data-imagen');

        id += 1
        data.push({ id, mascota, propietario, telefono, tipo, imagen, fecha, hora, sintomas, estadoCita });
        document.getElementById('tarjeta').innerHTML = ""
        pintar()
        limpiar()
    } else {
        data.forEach((e, i) => {
            if (e.id === id2) {
                e.estadoCita = document.querySelector('#tipo option:checked').getAttribute('data-imagen')
                e.mascota = document.getElementById('mascota').value;
                e.propietario = document.getElementById('propietario').value;
                e.telefono = document.getElementById('telefono').value;
                e.tipo = document.getElementById('tipo').value;
                e.fecha = document.getElementById('fecha').value;
                e.hora = document.getElementById('hora').value;
                e.sintomas = document.getElementById('message-text').value;
            }
            document.getElementById('tarjeta').innerHTML = ""
            pintar()
            cerrar()
        });
    }
}

function pintar() {
    data.forEach((e, i) => {
        let cardDiv = document.createElement('div');
        cardDiv.id = `tarjeta_${e.id}`;
        cardDiv.classList.add('card');
        cardDiv.style.width = '18rem';

        if (e.estadoCita === 'cita terminada') {
            cardDiv.classList.add('card-cita-terminada');
        } else if (e.estadoCita === 'cita Cancelada') {
            cardDiv.classList.add('card-cita-cancelada');
        }

        let cardImg = document.createElement('img');
        cardImg.classList.add('card-img-top');
        cardImg.src = e.imagen;
        cardImg.alt = 'Imagen de ' + e.tipo;

        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body');

        let cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = e.mascota;

        let cardText = document.createElement('p');
        cardText.classList.add('card-text');
        let horafor = convertirhorafor(e.hora);
        cardText.innerHTML = 'Propietario: <strong>' + e.propietario + '</strong><br>Teléfono: <strong>' + e.telefono + '</strong><br>Tipo: <strong>' + e.tipo + '</strong><br>Fechas: <strong>' + e.fecha + '</strong><br>Hora: <strong>' + horafor + '</strong><br>Síntomas: <strong>' + e.sintomas + '</strong>';

        // Agregar elemento para mostrar el estado
        let estadoP = document.createElement('p');
        estadoP.classList.add('estado-text');
        estadoP.textContent = 'Estado: ' + e.estadoCita;
        cardText.appendChild(estadoP);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = '❎';

        let editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-primary');
        editButton.textContent = '✏';

        let estadoSelect = document.createElement('select');
        estadoSelect.classList.add('form-select', 'mb-3');
        estadoSelect.innerHTML = `
        <option value="Estado de cita">Estado de cita</option>
          <option value="cita terminada">cita Terminada</option>
          <option value="cita Cancelada">cita Cancelada</option>
        `;

        estadoSelect.addEventListener('change', function () {
            e.estadoCita = estadoSelect.value;
            // Actualiza la clase CSS de la tarjeta según el nuevo estado de la cita
            if (e.estadoCita === 'cita terminada') {
                cardDiv.classList.add('card-cita-terminada');
                cardDiv.classList.remove('card-cita-cancelada');
            } else if (e.estadoCita === 'cita Cancelada') {
                cardDiv.classList.add('card-cita-cancelada');
                cardDiv.classList.remove('card-cita-terminada');
            } else {
                // Si el estado de la cita no es ni "cita terminada" ni "cita Cancelada", elimina ambas clases
                cardDiv.classList.remove('card-cita-terminada', 'card-cita-cancelada');
            }

            // Actualizar el texto del estado en la tarjeta
            estadoP.textContent = 'Estado: ' + e.estadoCita;
        });

        cardBodyDiv.appendChild(estadoSelect);

        deleteButton.addEventListener('click', function () {
            cardDiv.remove();
        });

        editButton.addEventListener('click', function () {
            editar(e);
        });

        cardDiv.appendChild(cardImg);
        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);
        cardBodyDiv.appendChild(deleteButton);
        cardBodyDiv.appendChild(editButton);
        cardDiv.appendChild(cardBodyDiv);
        document.getElementById('tarjeta').appendChild(cardDiv);
    })

}



document.getElementById("inlineRadio1").addEventListener("click", mostrarTarjetasTerminadas);
document.getElementById("inlineRadio2").addEventListener("click", mostrarTarjetasAbiertas);
document.getElementById("inlineRadio3").addEventListener("click", mostrarTarjetasCanceladas);

function mostrarTarjetasTerminadas() {
    // Recorremos el arreglo 'data' y mostramos u ocultamos las tarjetas según el estado
    data.forEach((e, i) => {
        let tarjeta = document.getElementById(`tarjeta_${e.id}`);
        if (e.estadoCita === 'cita terminada') {
            tarjeta.style.display = "block"; // Mostramos la tarjeta
        } else {
            tarjeta.style.display = "none"; // Ocultamos la tarjeta
        }
    });
}

function mostrarTarjetasAbiertas() {
    // Recorremos el arreglo 'data' y mostramos u ocultamos las tarjetas según el estado
    data.forEach((e, i) => {
        let tarjeta = document.getElementById(`tarjeta_${e.id}`);
        if (e.estadoCita !== 'cita terminada' && e.estadoCita !== 'cita Cancelada') {
            tarjeta.style.display = "block"; // Mostramos la tarjeta
        } else {
            tarjeta.style.display = "none"; // Ocultamos la tarjeta
        }
    });
}

function mostrarTarjetasCanceladas() {
    // Recorremos el arreglo 'data' y mostramos u ocultamos las tarjetas según el estado
    data.forEach((e, i) => {
        let tarjeta = document.getElementById(`tarjeta_${e.id}`);
        if (e.estadoCita === 'cita Cancelada') {
            tarjeta.style.display = "block"; // Mostramos la tarjeta
        } else {
            tarjeta.style.display = "none"; // Ocultamos la tarjeta
        }
    });
}

function convertirhorafor(hora24) {
    let hora12 = "";
    let partesHora = hora24.split(":");
    let hora = parseInt(partesHora[0]);
    let min = partesHora[1];

    if (hora === 0) {
        hora12 = "12:" + min + " AM";
    } else if (hora < 12) {
        hora12 = hora + ":" + min + " AM";
    } else if (hora === 12) {
        hora12 = "12:" + min + " PM";
    } else {
        hora12 = (hora - 12) + ":" + min + " PM";
    }

    return hora12;
}

function limpiar() {
    document.getElementById('mascota').value = '';
    document.getElementById('propietario').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('tipo').value = 'Seleccione';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('message-text').value = '';

}

function editar(cita) {
    bd = "editar"
    id2 = cita.id
    console.log(cita)
    let mascotaInput = document.getElementById('mascota');
    let propietarioInput = document.getElementById('propietario');
    let telefonoInput = document.getElementById('telefono');
    let tipoInput = document.getElementById('tipo');
    let fechaInput = document.getElementById('fecha');
    let horaInput = document.getElementById('hora');
    let sintomasInput = document.getElementById('message-text');

    mascotaInput.value = cita.mascota;
    propietarioInput.value = cita.propietario;
    telefonoInput.value = cita.telefono;
    tipoInput.value = cita.tipo;
    fechaInput.value = cita.fecha;
    horaInput.value = cita.hora;
    sintomasInput.value = cita.sintomas;


    let modal = document.getElementById('exampleModal');
    let modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.show();

    actualizarImagenTipoMascota();
    guardar()

    modal.addEventListener('hidden.bs.modal', function () {
        limpiar();
    });
}

function cerrar() {
    let modal = document.getElementById("exampleModal");
    let bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();
}