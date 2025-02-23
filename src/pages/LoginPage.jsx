// Refactor LoginPage to support Email and Password Authentication
// Added toggle functionality between Signin and Signup components

import React, { useState } from 'react';
import { Signin } from '../components/auth/Signin';
import { Signup } from '../components/auth/Signup';

const LoginPage = () => {
  const [isSignin, setIsSignin] = useState(true);

  return (
    <div className="white-bg flex h-screen w-screen">
      {/*SECCION IZQUIERDA*/}
      <div className="login-img-bg overlay-gradient w-1/2 flex items-center justify-center">
        <div className="text-white text-center place-items-center p-10">
          <img className="mb-4" src="src\assets\logo\full-logo.png" alt="wisdrive-letter-logo" width={200} />
          <h1 className="text-4xl font-bold mb-4">Bienvenido al admin panel</h1>
          <p className="text-lg mb-10">Crea conocimiento para los usuarios</p>
        </div>
      </div>

      {/*SECCION DERECHA*/}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className='white-bg p-10 place-items-center border rounded-4xl shadow-[0px_0px_15px_5px_rgba(0,0,0,0.4)]'>
          <h2 className="text-4xl font-bold mb-3 text-gray-800">{isSignin ? 'Inicia Sesión' : 'Registrate'}</h2>
          {isSignin ? <Signin /> : <Signup />}
          <p className="center text-gray-800">
            {isSignin ? 'No tienes cuenta? ' : 'Ya tienes cuenta? '}
            <button
              onClick={() => setIsSignin(!isSignin)}
              className="text-blue-500 hover:underline hover:text-purple-800"
            >
              {isSignin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>

  );
};

export default LoginPage;
