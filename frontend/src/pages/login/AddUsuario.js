// Este componente permite agregar un nuevo usuario en el sistema.
import React, { useState } from 'react';
import './AddUsuario.css';

const AddUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Usuario agregado:', { nombre, correo, contrasena });
    };

    return (
        <div className="add-usuario-container">
            <h2>Agregar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="email" placeholder="Correo Electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default AddUsuario;