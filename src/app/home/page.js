"use client"
import Head from 'next/head';
import './styles.css';
import './custom-fonts.css';
import ModalLogin from './modals/login';
import ModalCadastro from './modals/cadastro';
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';


export default function Home() {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCadastrarOpen, setIsModalCadastrarOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const openModalCadastrar = () => {
      setIsModalCadastrarOpen(true);
    };

    const closeModalCadastrar = () => {
      setIsModalCadastrarOpen(false);
    };


  return (
    <div className="container">
      <Head>
        <title>SIGA Software - Home</title>
      </Head>

      {/* Cabeçalho */}
      <header className="header">
        <div className="logo"></div>
      </header>

      {/* Conteúdo */}
      <main className="content">
        <div className="flex">
          {/* Bloco da Imagem à Esquerda */}
          <div className="w-1/2 p-4">
            <img src="./images/imagem-consulta-2.png" alt="Imagem" className="imagem-consulta" />
          </div>

          <div className="w-1/2 p-4 flex flex-col items-center justify-center">
  <h1 className="font-bold text-4xl">Bem-vindo ao SIGA!</h1>

  <p className="text-white text-md font-light text-justify my-2">
  O SIGA Software é uma ferramenta intuitiva que facilita
  a criação e gestão de relatórios psicológicos e comportamentais
  de alunos em instituições de ensino. Com uma interface amigável,
   permite aos educadores gerenciar facilmente dados e informações.
  </p>

  <div className="flex mt-2">
  <button onClick={openModal} className="bg-[#0CCA98] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 flex items-center">
      <img src="/icons/enter.svg" alt="Login" className="w-4 h-4 mr-1" />
      Entrar
    </button>
    <ModalLogin isOpen={isModalOpen} onClose={closeModal} />

    {isModalCadastrarOpen && <ModalCadastro isOpen={isModalCadastrarOpen} onClose={closeModalCadastrar} />}
    <button onClick={openModalCadastrar} className="bg-[#0CCA98] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 flex items-center">
      <img src="/icons/more.svg" alt="Cadastro" className="w-4 h-4 mr-1" />
      Cadastrar
    </button>
  </div>
</div>



        </div>
      </main>

      {/* Rodapé Fixo */}
      <footer className="footer">
        <p>SIGA Software v. 1.0.0 - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}