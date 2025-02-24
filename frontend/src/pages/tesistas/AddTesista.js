function AddTesista() {
    const loadTesistaData = async (id) => {
        try {
            const tesista = await tesistasService.getTesista(id);
            const form = document.getElementById('addTesistaForm');
            form.nombres.value = tesista.nombres;
            form.apellidos.value = tesista.apellidos;
            form.tipo_documento.value = tesista.tipo_documento;
            form.numeroDocumento.value = tesista.numerodocumento;
        } catch (error) {
            console.error('Error al cargar datos del tesista:', error);
            alert('Error al cargar los datos del tesista.');
        }
    };

    const setupFormHandlers = () => {
        const form = document.getElementById('addTesistaForm');
        const submitButton = form.querySelector('.btn-submit');
        const cancelButton = form.querySelector('.btn-cancel');
        const urlParams = new URLSearchParams(window.location.search);
        const tesistaId = urlParams.get('id');
        const titulo = document.querySelector('h1');

        if (tesistaId) {
            titulo.textContent = 'Editar Tesista';
            submitButton.textContent = 'Actualizar Tesista';
            loadTesistaData(tesistaId);
        }

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const formData = {
                nombres: form.nombres.value,
                apellidos: form.apellidos.value,
                tipo_documento: form.tipo_documento.value,
                numeroDocumento: form.numerodocumento.value
            };

            try {
                if (tesistaId) {
                    await tesistasService.updateTesista(tesistaId, formData);
                    alert('Tesista actualizado exitosamente');
                } else {
                    await tesistasService.createTesista(formData);
                    alert('Tesista guardado exitosamente');
                }
                window.location.href = '/tesistas';
            } catch (error) {
                console.error('Error al guardar tesista:', error);
                alert('Error al guardar el tesista. Por favor intente nuevamente.');
            }
        });

        cancelButton.addEventListener('click', () => {
            window.location.href = '/tesistas';
        });
    };

    setTimeout(setupFormHandlers, 0);

    return `
    <h1> Formulario de crear  uevo tesista </h1>
    <form id="addTesistaForm">
        <div>
            <label>Nombres: </label>
            <input type="text" name="nombres"></input>
        </div>
        <div>
            <label>Apellidos: </label>
            <input type="text" name="apellidos"></input>
        </div>
        <div>
            <label>Tipo Documento: </label>
            <select name="tipodocumento" requiered>
                <option value="cedula"> Cedula </option>
                <option value="pasaporte"> Pasaporte </option>
                <option value="dni"> DNI </option>
                <option value="ruc"> RUC</option>
            </select>
        </div>
        <div>
            <label>Numero Documento: </label>
            <input type="text" name="numerodocumento"></input>
        </div>
        <div>
            <label>Direccion: </label>
            <input type="text" name="direccion"></input>
        </div>
        <div>
            <label>Telefono: </label>
            <input type="text" name="telefono"></input>
        </div>

        <buttton type="submit" class="btn-submit"> Guardar </button>
        <buttton type="button" class="btn-cancel"> Cancelar </button>
        
    </form>
    `
}

export default AddTesista;