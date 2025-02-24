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
    },

    async createTesista(data) {
        try {
            console.log('Enviando datos del tesista:', data);
            const response = await fetch(`${API_URL}/tesista`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nombres: data.nombres,
                    apellidos: data.apellidos, 
                    tipo_documento: data.tipo_documento,
                    numero_documento: data.numeroDocumento
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear tesista');
            }

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            return responseData;

        } catch (error) {
            console.error('Error al crear tesista:', error);
            throw new Error(`Error al crear tesista: ${error.message}`);
        }
    }

    ,
    async updateTesista(id, data) {
        try {
            console.log('Actualizando datos del tesista:', data);
            const response = await fetch(`${API_URL}/tesista/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    tipo_documento: data.tipo_documento,
                    numero_documento: data.numeroDocumento
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar tesista');
            }

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            return responseData;

        } catch (error) {
            console.error('Error al actualizar tesista:', error);
            throw new Error(`Error al actualizar tesista: ${error.message}`);
        }
    },

    async getTesista(id) {
        try {
            console.log('Obteniendo datos del tesista:', id);
            const response = await fetch(`${API_URL}/tesista/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener tesista');
            }

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            return responseData.data;

        } catch (error) {
            console.error('Error al obtener tesista:', error);
            throw new Error(`Error al obtener tesista: ${error.message}`);
        }
    },

    async deleteTesista(id) {
        try {
            console.log('Eliminando tesista:', id);
            const response = await fetch(`${API_URL}/tesista/${id}`, {
                method: 'DELETE',
                headers: {  
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();    
                throw new Error(errorData.message || 'Error al eliminar tesista');  
            }

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            return responseData;
        } catch (error) {   
            console.error('Error al eliminar tesista:', error);
            throw new Error(`Error al eliminar tesista: ${error.message}`);
        }
    },
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
    },
    async createTesis(data) {
        try {
            console.log('Enviando datos del tesis:', data);
            const response = await fetch(`${API_URL}/tesis`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    titulo: data.titulo,
                    descripcion: data.descripcion, 
                    estado: data.estado,
                    fecha_entrega: data.fecha_entrega,
                    fecha_aprobacion: data.fecha_aprobacion,
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear tesis');
            }

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            return responseData;

        } catch (error) {
            console.error('Error al crear tesis:', error);
            throw new Error(`Error al crear tesis: ${error.message}`);
        }
    }

    ,
    async updateTesis(id, data) {
        try {
            console.log('Actualizando datos del tesis:', data);
            const response = await fetch(`${API_URL}/tesis/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    titulo: data.titulo,
                    descripcion: data.descripcion, 
                    estado: data.estado,
                    fecha_entrega: data.fecha_entrega,
                    fecha_aprobacion: data.fecha_aprobacion,
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar tesis');
            }

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            return responseData;

        } catch (error) {
            console.error('Error al actualizar tesis:', error);
            throw new Error(`Error al actualizar tesis: ${error.message}`);
        }
    },

    async getTesis(id) {
        try {
            console.log('Obteniendo datos del tesis:', id);
            const response = await fetch(`${API_URL}/tesis/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener tesis');
            }

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            return responseData.data;

        } catch (error) {
            console.error('Error al obtener tesis:', error);
            throw new Error(`Error al obtener tesis: ${error.message}`);
        }
    },

    async deleteTesis(id) {
        try {
            console.log('Eliminando tesis:', id);
            const response = await fetch(`${API_URL}/tesis/${id}`, {
                method: 'DELETE',
                headers: {  
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();    
                throw new Error(errorData.message || 'Error al eliminar tesis');  
            }

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            return responseData;
        } catch (error) {   
            console.error('Error al eliminar tesis:', error);
            throw new Error(`Error al eliminar tesis: ${error.message}`);
        }
    },

};