// Funciones para realizar consultas al backend para todos los recursos del sistema de seguimiento

// 1. Se coloca la ruta de la API
const API_URL='http://localhost:8081/api';

// 2. Se crean los métodos de la API
export const tesistasService = {
    async getAllTesistas(){
        console.log('Intentando acceder a: ',`${API_URL}/tesistas`);
        const response = await fetch(`${API_URL}/tesistas`);

        // Se crean acciones de depuración
        console.log('Estado de la respuesta: ', response.status);
        console.log('Headers: ', Object.fromEntries(response.headers));

        if (!response.ok){
            throw new Error('Error en la petición');
        }
        const data = await response.json();
        console.log('Respuesta obtenida de getAllTesistas', data);
        
        // Se valida la estructura json para presentar en el frontend
        if (!data || !Array.isArray(data.data)){
            console.error('Estructura de datos incorrecta.', data);
            throw new Error('Estructura de datos incorrecta.')
        }
        return data;
    }
};

export const tesisService = {
    async getAllTesis(){
        console.log('Intentando acceder a: ',`${API_URL}/tesis`);
        const response = await fetch(`${API_URL}/tesis`);

        console.log('Estado de la respuesta: ', response.status);
        console.log('Headers: ', Object.fromEntries(response.headers));

        if (!response.ok){
            throw new Error('Error en la petición');
        }
        const data = await response.json();
        console.log('Respuesta obtenida de getAllTesis', data);

        if (!data || !Array.isArray(data.data)){
            console.error('Estructura de datos incorrecta.', data);
            throw new Error('Estructura de datos incorrecta.')
        }
        return data;
    },
    async createTesis(tesisData){
        console.log('Enviando datos de nueva tesis a: ', `${API_URL}/tesis`);
        const response = await fetch(`${API_URL}/tesis`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tesisData)
        });

        if (!response.ok) {
            throw new Error('Error al agregar tesis');
        }

        const data = await response.json();
        console.log('Tesis agregada exitosamente', data);
        return data;
    }
};