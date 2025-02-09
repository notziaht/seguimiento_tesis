import './AddTesis.css';
import { tesisService } from '../../services/api';

export default class AddTesis {
    constructor() {
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const container = document.createElement('section');
        container.classList.add('add-tesis-container');
        container.innerHTML = `
            <h2>Agregar Tesis</h2>
            <form id="add-tesis-form">
                <label for="titulo">Título:</label>
                <input type="text" id="titulo" name="titulo" required>
                
                <label for="autor">Autor:</label>
                <input type="text" id="autor" name="autor" required>
                
                <label for="anio">Año de Publicación:</label>
                <input type="number" id="anio" name="anio" required>
                
                <label for="descripcion">Descripcion:</label>
                <textarea id="descripcion" name="descripcion" required></textarea>
                
                <button type="submit">Guardar</button>
            </form>
        `;
        
        const form = container.querySelector('#add-tesis-form');
        form.addEventListener('submit', this.handleSubmit);
        
        return container;
    }

    async handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        
        const tesisData = {
            titulo: form.titulo.value,
            autor: form.autor.value,
            anio: form.anio.value,
            descripcion: form.descripcion.value
        };
        
        try {
            await tesisService.createTesis(tesisData);
            alert('Tesis agregada con éxito!');
            form.reset();
        } catch (error) {
            console.error('Error al agregar tesis', error);
            alert('Error al agregar tesis. Inténtalo nuevamente.');
        }
    }
}