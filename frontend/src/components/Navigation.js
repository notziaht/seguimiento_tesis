import "../styles/Navigation.css"

function Navigation() {
    return `
        <div class="nav-container">
            <div class="nav-logo">
                <span>Sistema de Seguimiento de Tesis</span>
            </div>
            <div class="nav-links">
                <a href="/">Inicio</a>
                <a href="/tesis">Tesis</a>
                <a href="/tesistas">Estudiantes/Tesistas</a>
                <a href="#">Docentes</a>
            </div>
        </div>
    `;
}

export default Navigation