// Signup Component for Creating a New Account
import React, { useState } from 'react';
import { supabase } from '../../supabase/client';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      setSuccess('¡Cuenta creada exitosamente! Revisa tu correo para verificar tu cuenta.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-8 rounded-xl w-3/4 max-w-md">
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
      {success && <p className=" text-green-600">{success}</p>}
      <button type="submit" className="w-full p-2 mb-2 text-white bg-green-500 rounded hover:bg-purple-800">
        Registrarse
      </button>
    </form>
  );
};
