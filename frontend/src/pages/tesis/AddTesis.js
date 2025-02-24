import './AddTesis.css';
import { tesisService } from '../../services/api.js';

function AddTesis() {
    const loadTesisData = async (id) => {
        try {
            const tesis = await tesisService.getTesis(id);
            const form = document.getElementById('addTesisForm');

            form.titulo.value = tesis.titulo;
            form.descripcion.value = tesis.descripcion;
            form.estado.value = tesis.estado;
            form.fecha_entrega.value = tesis.fecha_entrega;
            form.fecha_aprobacion.value = tesis.fecha_aprobacion;
        } catch (error) {
            console.error('Error al cargar datos de la tesis:', error);
            alert('Error al cargar los datos de la tesis.');
        }
    };

    const setupFormHandlers = () => {
        const form = document.getElementById('addTesisForm');
        const submitButton = form.querySelector('.btn-submit');
        const cancelButton = form.querySelector('.btn-cancel');
        const urlParams = new URLSearchParams(window.location.search);
        const tesisId = urlParams.get('id');
        const titulo = document.querySelector('h1');

        if (tesisId) {
            titulo.textContent = 'Editar Tesis';
            submitButton.textContent = 'Actualizar Tesis';
            loadTesisData(tesisId);
        }

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = {
                titulo: form.titulo.value,
                descripcion: form.descripcion.value,
                estado: form.estado.value,
                fecha_entrega: form.fecha_entrega.value,
                fecha_aprobacion: form.fecha_aprobacion.value
            };

            try {
                if (tesisId) {
                    await tesisService.updateTesis(tesisId, formData);
                    alert('Tesis actualizada exitosamente');
                } else {
                    await tesisService.createTesis(formData);
                    alert('Tesis guardada exitosamente');
                }
                window.location.href = '/tesis';
            } catch (error) {
                console.error('Error al guardar tesis:', error);
                alert('Error al guardar la tesis. Por favor intente nuevamente.');
            }
        });

        cancelButton.addEventListener('click', () => {
            window.location.href = '/tesis';
        });
    };

    setTimeout(setupFormHandlers, 0);

    return `
    <h1> Formulario de crear nueva tesis </h1>
    <form id="addTesisForm">
        <div>
            <label>Título: </label>
            <input type="text" name="titulo"></input>
        </div>
        <div>
            <label>Descripción: </label>
            <textarea name="descripcion"></textarea>
        </div>
        <div>
            <label>Estado: </label>
            <select name="estado" required>
                <option value="pendiente">Pendiente</option>
                <option value="aprobada">Aprobada</option>
                <option value="rechazada">Rechazada</option>
            </select>
        </div>
        <div>
            <label>Fecha de Entrega: </label>
            <input type="date" name="fecha_entrega"></input>
        </div>
        <div>
            <label>Fecha de Aprobación: </label>
            <input type="date" name="fecha_aprobacion"></input>
        </div>
        <button type="submit" class="btn-submit">Guardar</button>
        <button type="button" class="btn-cancel">Cancelar</button>
    </form>
    `;
}

export default AddTesis;