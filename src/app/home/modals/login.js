import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  Auth,
  AuthError,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
} from 'firebase/auth';
import { auth } from '@/services/firebaseConfig';

function ModalLogin({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  }

  if (loading) {
    return <p>carregando...</p>;
  }
  if (user) {
    window.location.href = "/general";
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button
          className="close text-gray-600"
          onClick={onClose}
          style={{ fontSize: '24px', color: '#828282' }}
        >
          &times;
        </button>
        <h2>Entre em sua conta SIGA</h2>

        {/* Campo de Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Ícone de Email */}
              <img
                src="/icons/email.svg"
                alt="Ícone de Email"
                className="w-5 h-5 text-gray-400"
              />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              className="focus:ring-indigo-500 text-gray-400 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Ícone de Senha */}
              <img
                src="/icons/senha.svg"
                alt="Ícone de Senha"
                className="w-5 h-5 text-gray-400"
              />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              className="focus:ring-indigo-500 text-gray-400 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 mt-2">
            Erro ao fazer login. Verifique seu email e senha.
          </div>
        )}

        <div className="flex justify-center">
          <button onClick={handleSignIn} className="bg-[#0CCA98] text-white font-bold py-2 px-4 rounded flex items-center login-button">
            <img src="/icons/enter.svg" alt="Icon 1" className="w-4 h-4 mr-1" />
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalLogin;
