import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles.css';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  Auth,
  AuthError,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/services/firebaseConfig';
import { getDatabase, ref, set } from 'firebase/database'; // Importe ref e set


function ModalCadastro({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Adicione o estado para o nome
  const [phone, setPhone] = useState(''); // Adicione o estado para o telefone

  const [cadastroVisible, setCadastroVisible] = useState(true);
  const [cadastroSucessoVisible, setCadastroSucessoVisible] = useState(false);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // ...

  async function handleSignUp(e) {
    e.preventDefault();
  
    try {
      // Aguarda a promessa da função `createUserWithEmailAndPassword()` ser resolvida
      const userCredential = await createUserWithEmailAndPassword(email, password);
  
      // Verifica se a função `createUserWithEmailAndPassword()` foi executada com sucesso
      if (userCredential && userCredential.user) {
        // Usuário criado com sucesso
        // Vamos agora criar o nó "professor" associado ao usuário
  
        const user = userCredential.user; // Obtém o usuário autenticado
  
        const database = getDatabase();
        const professorRef = ref(database, `professor/${user.uid}`); // Crie uma referência ao nó "professor" com o UID do usuário
  
        const professorData = {
          nome: name, // Use o estado "name" definido acima
          telefone: phone, // Use o estado "phone" definido acima
        };
  
        // Crie o nó "professor" com os dados associados ao UID do usuário
        await set(professorRef, professorData);

        setCadastroSucessoVisible(true);
        setCadastroVisible(false);
        setTimeout(() => {
          // Redireciona o usuário para a tela inicial
          window.location.href = "/";
        }, 3000);
  
        console.log('Professor criado com sucesso:', professorData);
      } else {
        console.error('Erro ao criar o usuário:', userCredential);
      }
    } catch (error) {
      console.error('Erro ao criar o usuário:', error);
    }
  }

  const handleNameChange = (e) => {
    const input = e.target;
    const inputValue = input.value;
  
    // Remova caracteres não alfabéticos e limite a 50 caracteres
    const sanitizedValue = inputValue.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '').substring(0, 50);
  
    setName(sanitizedValue);
  }

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    // Formata o número de telefone
    if (inputValue.length <= 11) {
      const formattedValue = inputValue.replace(
        /(\d{2})(\d{0,5})(\d{0,4})/,
        '($1) $2-$3'
      );
      setPhone(formattedValue);
    }
  };



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
  
      {/* Div cadastro */}
      {cadastroVisible && (
        <div id="cadastro">
          <h2>Cadastre-se no SIGA</h2>
  
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute text-gray-400 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img
                  src="/icons/name.svg"
                  alt="Ícone de Nome"
                  className="w-5 h-5 text-gray-400"
                />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                className="focus:ring-indigo-500 text-gray-400 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                onChange={(e) => handleNameChange(e)}
                value={name}
                placeholder="Nome Completo"
              />
            </div>
          </div>
  
          <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Endereço de Email
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
  placeholder="seunome@email.com"
  required  // Torna o campo obrigatório
  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" // Expressão regular para validar o formato do email
/>
            
          </div>
        </div>

        
        <div className="mb-4">
          <label htmlFor="tel" className="block text-sm font-medium text-gray-700">
            Telefone Celular
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Ícone de Senha */}
              <img
                src="/icons/phone.svg"
                alt="Ícone de Telefone"
                className="w-5 h-5 text-gray-400"
              />
            </div>
            <input
      type="tel"
      id="tel"
      name="tel"
      className="focus:ring-indigo-500 text-gray-400 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3"
      onChange={handlePhoneChange}
      value={phone}
      placeholder="(XX) XXXXX-XXXX"
      maxLength="17" // Defina o tamanho máximo, incluindo os caracteres de formatação
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
  
          <div className="flex justify-center">
            <button onClick={handleSignUp} className="bg-[#0CCA98] text-white font-bold py-2 px-4 rounded flex items-center login-button">
              <img src="/icons/enter.svg" alt="Icon 1" className="w-4 h-4 mr-1" />
              Cadastrar
            </button>
          </div>
        </div>
      )}
  
      {/* Div cadastroSucesso */}
      {cadastroSucessoVisible && (
        <div id="cadastroSucesso">
          <h2>Usuário cadastrado com sucesso!              
          </h2>
          
        </div>
      )}
    </div>
  </div>
  );
}

export default ModalCadastro;
