import './Homepage.css'

function Homepage(){
    return `
        <div class="homepage">
            <section class="hero">
                <h1>Bienvenido al Sistema de Gestión de Tesis</h1>
                <p>Plataforma integral para el seguimiento y administración de tesis</p>
            </section>

            <section class="features">
                <div class="feature">
                    <h3>Plataforma integral de seguimiento de tesis</h3>
                    <p>Consulta el estado de tu tesis y accede a herramientas de gestión.</p>
                    <button onclick="navigateTo('/seguimiento')">Ver Seguimiento</button>
                </div>
                <div class="feature">
                    <h3>Gestiona el proceso de entrega de tu tesis</h3>
                    <p>Recibe notificaciones y cumple con los requisitos académicos.</p>
                    <button onclick="navigateTo('/entrega')">Gestionar Entrega</button>
                </div>
                <div class="feature">
                    <h3>Registra tu tesis</h3>
                    <p>Envía tu propuesta y mantente al día con las fechas importantes.</p>
                    <button onclick="navigateTo('/registro')">Registrar Tesis</button>
                </div>
            </section>
        </div>
    `
}

export default Homepage