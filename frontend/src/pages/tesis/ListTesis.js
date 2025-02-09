import './ListTesis.css'

function ListTesis(){
    return `
        <section class="tesis-container">
            <h2>Lista de Tesis</h2>
            <a href="/add-tesis" class="add-tesis-btn">Agregar Tesis</a>
        </section>

        <section class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor(es)</th>
                        <th>Descripción</th>
                        <th>Estado de aprobación</th>
                        <th>Fecha de entrega</th>
                        <th>Fecha de aprobación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>
                            <button class="edit-btn">Editar</button>
                            <button class="delete-btn">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    `
}

export default ListTesis