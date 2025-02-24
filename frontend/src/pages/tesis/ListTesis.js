import { tesisService } from '../../services/api.js';

function ListTesis() {
    const loadTesis = async () => {
        try {
            const tesisList = await tesisService.getAllTesis();
            const tbody = document.querySelector('#tesisTable tbody');
            tbody.innerHTML = '';

            tesisList.forEach((tesis, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${tesis.titulo || ''}</td>
                    <td>${tesis.descripcion || ''}</td>
                    <td>${tesis.estado || ''}</td>
                    <td>${tesis.fecha_entrega || ''}</td>
                    <td>${tesis.fecha_aprobacion || ''}</td>
                    <td>
                        <a href="/agregar-tesis?id=${tesis.id}" class="btn btn-warning btn-edit">
                            <i class="fas fa-edit"></i> Editar
                        </a>
                        <button class="btn btn-danger btn-delete" data-tesis-id="${tesis.id}">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            // Agregar event listeners para los botones de eliminar
            const deleteButtons = tbody.querySelectorAll('.btn-delete');
            deleteButtons.forEach(button => {
                button.addEventListener('click', (e) => handleDelete(e));
            });
        } catch (error) {
            console.error('Error al cargar la lista de tesis:', error);
            alert('Error al cargar las tesis.');
        }
    };

    const handleDelete = async (event) => {
        const tesisId = event.target.dataset.tesisId;
        if (!tesisId) return;

        if (confirm('¿Está seguro de eliminar esta tesis?')) {
            try {
                await tesisService.deleteTesis(tesisId);
                await loadTesis();
            } catch (error) {
                console.error('Error al eliminar la tesis:', error);
                alert('Error al eliminar la tesis: ' + error.message);
            }
        }
    };

    document.addEventListener('DOMContentLoaded', loadTesis);

    return `
    <h2>Tesis Registradas</h2>
    <div class="actions-container">
        <button class="btn btn-primary btn-add" onclick="window.location.href='/agregar-tesis'">
            <i class="fas fa-plus"></i> Agregar Tesis
        </button>
    </div>
    <table id="tesisTable">
        <thead>
            <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Fecha de Entrega</th>
                <th>Fecha de Aprobación</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `;
}

export default ListTesis;