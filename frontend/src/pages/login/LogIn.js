// Este componente maneja el inicio de sesión de usuarios.
import React, { useState } from 'react';
import './LogIn.css';

const LogIn = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Intento de inicio de sesión:', { correo, contrasena });
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Correo Electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default LogIn;