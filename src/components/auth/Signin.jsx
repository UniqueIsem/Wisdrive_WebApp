// Signin Component for Email and Password Authentication
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import { Drama } from 'lucide-react';

export const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data: signinData, error: signinError } = await supabase.auth.signInWithPassword({ email, password });
      if (signinError) throw signinError;

      
      const userId = signinData?.user?.id;
      if (!userId) throw new Error('Usuario no encontrado');

      //consultar si es admin
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('role')
        .eq('user_id', userId)
        .single(); 

      if (adminError || !adminData) {
        await supabase.auth.signOut();
        setError('Acceso denegado. No eres administrador.');
        return;
      }

      if (adminData.role !== 'admin') {
        await supabase.auth.signOut();
        setError('Acceso denegado. Rol no permitido.');
        return;
      }

      // si sí es admin, navega
      navigate('/');    } catch (error) {
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