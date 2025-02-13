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
                    <a href="/add-tesista" class="add-tesista-btn">Agregar Tesista</a>
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
                    <td>${tesista.nombres}</td>
                    <td>${tesista.apellidos}</td>
                    <td>${tesista.tipo_documento}</td>
                    <td>${tesista.nro_documento}</td>
                    <td>${tesista.nro_celular}</td>
                    <td>
                    <a href="#">Editar</a>
                    <a href="#">Eliminar</a>
                    </td>
                </tr>
                `;
            }).join('');
        }catch(error){
            console.error('Error en la carga de tesistas.', error);
            tbody.innerHTML = `
            <tr>
                <td colspan="5">Error en la carga de tesistas. Verifica la conexión al servidor.</td>
            </tr>
            `;
        }
    }
}