const fs = require('fs');
const path = require('path');

const datosFilePath = path.resolve(__dirname, '../../public/datos.json');

const datos = {
    grupos: [],
    usuarios: [],
    tareas: [],
    canjes: []
};

function guardarDatos() {
    return new Promise((resolve, reject) => {
        try {
            const jsonData = JSON.stringify(datos, null, 2);
            JSON.parse(jsonData);
            fs.writeFile(datosFilePath, jsonData, { encoding: 'utf8', flag: 'w' }, (err) => {
                if (err) {
                    console.error('Error al guardar los datos:', err);
                    reject(err);
                } else {
                    console.log('Datos guardados correctamente');
                    resolve();
                }
            });
        } catch (error) {
            console.error('Error al convertir los datos a JSON:', error);
            reject(error);
        }
    });
}

function cargarDatos() {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(datosFilePath)) {
            fs.readFile(datosFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error al cargar los datos:', err);
                    reject(err);
                    return;
                }
                try {
                    Object.assign(datos, JSON.parse(data));
                    console.log('Datos cargados correctamente');
                    resolve(datos);
                } catch (e) {
                    console.error('Error al parsear los datos:', e);
                    reject(e);
                }
            });
        } else {
            console.log('No se encontró ningún archivo de datos existente.');
            resolve(datos);
        }
    });
}


function crearUsuario(nombreUsuario, contraseña, email) {
    const nuevoUsuario = {
        id: datos.usuarios.length + 1,
        nombreUsuario,
        contraseña,
        email
    };
    datos.usuarios.push(nuevoUsuario);
    guardarDatos();
    return nuevoUsuario;
}

function crearGrupo(nombreGrupo, creadorId) {
    const nuevoGrupo = {
        id: datos.grupos.length + 1,
        nombre: nombreGrupo,
        creadorId,
        usuarios: [{ id: creadorId, rol: 'creador', puntaje: 0 }],
        tareas: [],
        canjes: []
    };
    datos.grupos.push(nuevoGrupo);
    guardarDatos();
    return nuevoGrupo;
}

function añadirUsuarioAGrupo(usuarioId, grupoId, rol = 'normal') {
    const grupo = datos.grupos.find(g => g.id === grupoId);
    if (grupo) {
        grupo.usuarios.push({ id: usuarioId, rol, puntaje: 0 });
        guardarDatos();
    } else {
        console.error(`El grupo con id ${grupoId} no existe.`);
    }
}

function crearTarea(nombreTarea, descripcion, puntos, grupoId, plazo = null) {
    const nuevaTarea = {
        id: datos.tareas.length + 1,
        nombre: nombreTarea,
        descripcion,
        puntos,
        plazo,
        estado: 'pendiente'
    };
    datos.tareas.push(nuevaTarea);
    const grupo = datos.grupos.find(g => g.id === grupoId);
    if (grupo) {
        grupo.tareas.push(nuevaTarea.id);
        guardarDatos();
    } else {
        console.error(`El grupo con id ${grupoId} no existe.`);
    }
    return nuevaTarea;
}

function crearCanje(nombreCanje, descripcion, puntosNecesarios, grupoId) {
    const nuevoCanje = {
        id: datos.canjes.length + 1,
        nombre: nombreCanje,
        descripcion,
        puntosNecesarios
    };
    datos.canjes.push(nuevoCanje);
    const grupo = datos.grupos.find(g => g.id === grupoId);
    if (grupo) {
        grupo.canjes.push(nuevoCanje.id);
        guardarDatos();
    } else {
        console.error(`El grupo con id ${grupoId} no existe.`);
    }
    return nuevoCanje;
}

async function editarPuntajeUsuario(usuarioId, grupoId, cantidad) {
    const grupo = datos.grupos.find(group => group.id === grupoId);
    if (grupo) {
        const usuario = grupo.usuarios.find(user => user.id === usuarioId);
        if (usuario) {
            if (cantidad > 0) {
                usuario.puntaje += cantidad;
            } else if (cantidad < 0) {
                if (usuario.puntaje >= Math.abs(cantidad)) {
                    usuario.puntaje += cantidad;
                } else {
                    console.error('El usuario no tiene suficiente puntaje para eliminar.');
                    return;
                }
            } else {
                console.error('La cantidad debe ser diferente de cero.');
                return;
            }
        } else {
            console.error('El usuario no pertenece a este grupo.');
            return;
        }
    } else {
        console.error('El grupo no existe.');
        return;
    }

    try {
        await guardarDatos();
        console.log('Puntaje del usuario editado correctamente.');
    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
}






function guardarEvidencia(usuarioId, grupoId, tareaId, evidencia) {
    const evidenciaDir = path.resolve(__dirname, '../../assets/evidencia');
    const grupoDir = path.join(evidenciaDir, `grupo_${grupoId}`);
    const tareaDir = path.join(grupoDir, `tarea_${tareaId}`);
    const usuarioDir = path.join(tareaDir, `usuario_${usuarioId}`);

    if (!fs.existsSync(evidenciaDir)) {
        fs.mkdirSync(evidenciaDir, { recursive: true });
    }
    if (!fs.existsSync(grupoDir)) {
        fs.mkdirSync(grupoDir, { recursive: true });
    }
    if (!fs.existsSync(tareaDir)) {
        fs.mkdirSync(tareaDir, { recursive: true });
    }
    if (!fs.existsSync(usuarioDir)) {
        fs.mkdirSync(usuarioDir, { recursive: true });
    }

    const evidenciaFilePath = path.join(usuarioDir, 'evidencia.json');
    fs.writeFile(evidenciaFilePath, JSON.stringify(evidencia, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(`Error al guardar la evidencia para la tarea ${tareaId}:`, err);
        } else {
            console.log(`Evidencia para la tarea ${tareaId} guardada correctamente.`);
            const tarea = datos.tareas.find(t => t.id === tareaId);
            if (tarea) {
                tarea.estado = 'En revisión';
                guardarDatos();
            }
        }
    });
}

function obtenerPuntajeDeUsuarioEnGrupo(usuarioId, grupoId) {
    const grupo = datos.grupos.find(gr => gr.id === grupoId);
    if (!grupo) {
        console.error(`El grupo con id ${grupoId} no existe.`);
        return null;
    }
    const usuarioEnGrupo = grupo.usuarios.find(u => u.id === usuarioId);
    if (!usuarioEnGrupo) {
        console.error(`El usuario con id ${usuarioId} no pertenece al grupo ${grupoId}.`);
        return null;
    }
    return usuarioEnGrupo.puntaje;
}

function editarTarea(tareaId, nombreTarea, descripcion, puntos, plazo, estado) {
    const tarea = datos.tareas.find(t => t.id === tareaId);
    if (tarea) {
        tarea.nombre = nombreTarea;
        tarea.descripcion = descripcion;
        tarea.puntos = puntos;
        tarea.plazo = plazo;
        tarea.estado = estado;
        guardarDatos();
        return tarea;
    } else {
        console.error(`La tarea con id ${tareaId} no existe.`);
        return null;
    }
}

function editarCanje(canjeId, nombreCanje, descripcion, puntosNecesarios) {
    const canje = datos.canjes.find(c => c.id === canjeId);
    if (canje) {
        canje.nombre = nombreCanje;
        canje.descripcion = descripcion;
        canje.puntosNecesarios = puntosNecesarios;
        guardarDatos();
        return canje;
    } else {
        console.error(`El canje con id ${canjeId} no existe.`);
        return null;
    }
}

module.exports = {
    cargarDatos,
    crearUsuario,
    crearGrupo,
    añadirUsuarioAGrupo,
    crearTarea,
    editarTarea, // Agregado
    crearCanje,
    editarCanje, // Agregado
    editarPuntajeUsuario,
    guardarEvidencia,
    obtenerPuntajeDeUsuarioEnGrupo
};
