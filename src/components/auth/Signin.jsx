// Signin Component for Email and Password Authentication
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/client';

export const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      //alert('Inicio de sesión exitoso!');
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSignin} className="p-8 rounded-xl w-3/4 max-w-md">
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 text-gray-800 border border-gray-800 rounded placeholder-gray-800 hover:border-purple-800 hover:border-2"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-2 text-gray-800 border border-gray-800 rounded placeholder-gray-800 hover:border-purple-800 hover:border-2"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="w-full p-2 mb-2 text-white bg-blue-500 rounded hover:bg-purple-800">
        Iniciar Sesión
      </button>
    </form>
  );
};