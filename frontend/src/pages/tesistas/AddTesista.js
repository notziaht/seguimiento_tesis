import './AddTesista.css';
import { tesistasService } from '../../services/api';

export default class AddTesista {
    constructor() {
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const container = document.createElement('section');
        container.classList.add('add-tesista-container');
        container.innerHTML = `
            <h2>Agregar Tesista</h2>
            <form id="add-tesista-form">
                <label for="nombres">Nombres:</label>
                <input type="text" id="nombres" name="nombres" required>
                
                <label for="apellidos">Apellidos:</label>
                <input type="text" id="apellidos" name="apellidos" required>
                
                <label for="tipo_documento">Tipo de Documento:</label>
                <select id="tipo_documento" name="tipo_documento">
                    <option value="DNI">DNI</option>
                    <option value="Pasaporte">Pasaporte</option>
                </select>
                
                <label for="nro_documento">Nro. de Documento:</label>
                <input type="text" id="nro_documento" name="nro_documento" required>
                
                <label for="nro_celular">Número de Celular:</label>
                <input type="text" id="nro_celular" name="nro_celular" required>
                
                <button type="submit">Guardar</button>
            </form>
        `;
        
        const form = container.querySelector('#add-tesista-form');
        form.addEventListener('submit', this.handleSubmit);
        
        return container;
    }

    async handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        
        const tesistaData = {
            nombres: form.nombres.value,
            apellidos: form.apellidos.value,
            tipo_documento: form.tipo_documento.value,
            nro_documento: form.nro_documento.value,
            nro_celular: form.nro_celular.value
        };
        
        try {
            await tesistasService.createTesista(tesistaData);
            alert('Tesista agregado con éxito!');
            form.reset();
        } catch (error) {
            console.error('Error al agregar tesista', error);
            alert('Error al agregar tesista. Inténtalo nuevamente.');
        }
    }
}
