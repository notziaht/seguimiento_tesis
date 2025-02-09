//import './style.css'
import Footer from './components/Footer.js'
import Header from './components/Header.js'
import Layout from './components/Layout.js'
import Navigation from './components/Navigation.js'
import Homepage from './pages/presentation/Homepage.js'
import ListTesistas from './pages/tesistas/ListTesistas.js'
import AddTesista from './pages/tesistas/AddTesista.js'
import ListTesis from './pages/tesis/ListTesis.js'
import AddTesis from './pages/tesis/AddTesis.js'

function renderMainContent() {
  return `
    <div>
      <h2>Contenido principal</h2>
    </div>
  `;
}

function initApp(){
  const app = document.getElementById('app');

  const routeHandler = async () => {
    const path = window.location.pathname;
    let mainContent;

    try{
      // Se manejaran todas las rutas
      switch(path){
        case '/':
          mainContent = Homepage();
          break;
        //case 'login':
        //case 'dashboard':
        case '/tesistas':
          mainContent = new ListTesistas;
          break;
        case '/add-tesista':
          mainContent = new AddTesista;
          break;    
        case '/tesis':
          mainContent = ListTesis();
          break;
        case '/add-tesis':
          mainContent = new AddTesis;
          break;
        default:
          mainContent = Homepage();
          break;
      }

      // Se arma la estructura básica del proyecto
      const content = `
        ${Navigation()}
        ${Header()}
        <main id="main-content">
          ${mainContent}
        </main>
        ${Footer()}
      `;

      app.innerHTML = Layout(content);
      // Agregar la posibilidad de manejar directamente el HTML
      if (mainContent instanceof HTMLElement){
        const mainElement = document.querySelector('#main-content');
        mainElement.appendChild(mainContent);
      }

      app.classList.add('app-container');

    }catch(error){
      console.log('Error al buscar la ruta ingresada', error);
      app.innerHTML = Layout(`
          <div>
            <h1>Error al cargar la página</h1>
            <p>${error.message}<p>
          </div>
        `);
    }
  };

  // Manejador de navegación por clics
  document.addEventListener('click', async (e) => {
    if (e.target.matches('a[href]')){
      e.preventDefault();
      const href = e.target.getAttribute('href');
      window.history.pushState({}, '', href);
      await routeHandler();
    }
  });

  // Botones para ir hacia atras y hacia adelante
  window.addEventListener('popstate', routeHandler());

  // Cargar las rutas del proyecto
  routeHandler();

}

document.addEventListener('DOMContentLoaded', initApp());
