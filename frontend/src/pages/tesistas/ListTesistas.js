import './ListTesistas.css';
import { tesistasService } from '../../services/api';

let tesistaListInstance = null;

export default class ListTesistas{
    constructor(){
        if(!tesistaListInstance){
            return tesistaListInstance;
        }
        this.tesistas = [];
        this.handleRowClick = this.handleRowClick.bind(this);
        tesistaListInstance = this;
    }
    
    async render() {
        console.log('Render() function reached.');
        const container = document.createElement('section');
        container.className = 'tesistas-section';
        container.innerHTML = 
        `
            <div class="tesistas-container">
                <div>
                    <h2>Lista de Tesistas</h2>
                    <a href="/agregar-tesista" class="add-tesista-btn">Agregar Tesista</a>
                </div>
            
                <table class="tesistas-table">
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Tipo de documento</th>
                            <th>Nro. de documento</th>
                            <th>Nro. celular</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tesistas-table-body">
                        
                    </tbody>
                </table>
            </div>
        `;
       
        await this.loadTesistas(container);
        const tbody = container.querySelector('#tesistas-table-body');
        tbody.addEventListener('click', (event) => this.handleRowClick(event));
        

        console.log('Contenedor de tesistas', container.innerHTML);
        return container;
    }

    // Se crea el metodo handleRowClick
    handleRowClick(event){
        const tr = event.target.closest('tr');
        if(!tr) return;
        
        const tesistaIndex = tr.dataset.index;
        if(tesistaIndex){
            const tesista = this.tesistas[tesistaIndex];
            console.log('Tesista seleccionado', tesista);
        }
    }

    // Metodo para obtener todos los registros de tesistas y colocarlos en cada fila de la tabla
    async loadTesistas(container){
        const tbody = container.querySelector('#tesistas-table-body');
        try{
            console.log('Inicializando la carga de tesistas');
            tbody.innerHTML = `
            <tr>
                <td colspan="5">Cargando...</td>
            </tr>
            `;

            const response = await tesistasService.getAllTesistas();
            console.log('Respuesta completa del servidor:', response);
            if (!response || !response.data){
                throw new Error('Estructra de datos incorrecta.');
            }

            this.tesistas = response.data;
            console.log('Tesistas cargados.', this.tesistas);

            if(this.tesistas.length === 0){
                tbody.innerHTML = `
                <tr>
                    <td colspan="5">No existen registros de tesistas.</td>
                </tr>
                `;
            }
            tbody.innerHTML = this.tesistas.map((tesista, index) => {
                console.log('Tesista', tesista);
                return `
                <tr data-index="${index}">
                    <td>${tesista.nombres || 'S/D'}</td>
                    <td>${tesista.apellidos || 'S/D'}</td>
                    <td>${tesista.tipo_documento || 'S/D'}</td>
                    <td>${tesista.nro_documento || 'S/D'}</td>
                    <td>${tesista.nro_celular || 'S/D'}</td>
                    <td>
                    <a href="/agregar-tesista?id=${tesista.id}" class="btn btn-warning btn-edit">
                        <i class="fas fa-edit"></i> Editar
                    </a>
                    <button class="btn btn-danger btn-delete" data-tesista-id="${tesista.id}">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                    </td>
                </tr>
                `;
            }).join('');

            console.log('Tabla actualizada con éxito.')

            // Agregar event listeners para los botones de eliminar
            const deleteButtons = tbody.querySelectorAll('.btn-delete');
            deleteButtons.forEach(button => {
                button.addEventListener('click', (e) => this.handleDelete(e));
            });

        }catch(error){
            console.error('Error en la carga de tesistas.', error);
            tbody.innerHTML = `
            <tr>
                <td colspan="5">Error en la carga de tesistas. Verifica la conexión al servidor.</td>
            </tr>
            `;
        }
    }

    async handleDelete(event) {
        const tesistaId = event.target.dataset.tesistaId;
        if (!tesistaId) return;

        if (confirm('¿Está seguro de eliminar este tesista?')) {
            try {
                await tesistasService.deleteTesista(tesistaId);
                // Recargar la lista después de eliminar
                await this.loadTesistas(event.target.closest('section'));
            } catch (error) {
                console.error('Error al eliminar tesista:', error);
                alert('Error al eliminar el tesista: ' + error.message);
            }
        }
    }

}