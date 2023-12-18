import React, { useState } from "react";
import {
  Add,
  DeleteForever,
  Edit,
  EditNote,
  Help,
  ModeEdit,
  SaveAs,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  Auth,
  AuthError,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import "./styles.css";

function ModalRelatorio({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="">
          <Box sx={{ width: 350 }}>
            <div className="flex justify-center">
              <button
                className="bg-[#0CCA98] text-white font-bold py-2 px-4 rounded flex items-center login-button"
                onClick={onClose}
              >
                X
              </button>
            </div>
            <p className="text-2xl text-[#101010]" id="parent-modal-title">
              Essa pagina é direcionada a criação de relatório acompanhado da
              emissão do PDF
            </p>
            <p className="text-[#101010] py-[1%]" id="parent-modal-description">
              Preencha todos os campos referentes a sua documentação desejada.
            </p>
            <p className="text-[#101010]" id="parent-modal-description">
              Após preencher todos os campos,será possivel adicionar esses dados
              a um conjunto de tópicos.
            </p>
            <p className="text-[#101010]" id="parent-modal-description">
              Utilizando o botão:
            </p>
            <Button color="primary" variant="text" startIcon={<Add />}>
              {" "}
              Adicionar{" "}
            </Button>
            <p className="text-[#101010]" id="parent-modal-description">
              Será possivel editar o tópico ja salvo no tópico.Através do botão:
            </p>
            <Button variant="text" startIcon={<ModeEdit />} color="secondary">
              Editar{" "}
            </Button>
            <p className=" py-[2%] text-xs text-[#101010]">
              obs:Não é possivel salvar com campos em branco.
            </p>
            <p className="py-[2%]  text-[#101010]">
              Após realizar a edição,é possivel salvar novamente o tópico ao
              conjunto.Através do botão:
            </p>
            <Button startIcon={<Add />} variant="text" color="primary">
              Concluir
            </Button>
            <p className="py-[2%]  text-[#101010]">
              É possivel excluir através do botão:
            </p>
            <Button
              className="pl-[3%]"
              startIcon={<DeleteForever />}
              variant="text"
              color="error"
            >
              Excluir
            </Button>
            <p className="py-[2%]  text-[#101010]">
              Após concluir é possivel salvar seu conjunto de tópicos através do
              botão:
            </p>
            <Button color="success" variant="text" startIcon={<SaveAs />}>
              Salvar Relatorio
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default ModalRelatorio;