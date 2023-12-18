import React, { useState } from "react";
import { DeleteForever, EditNote, Help, SaveAs } from "@mui/icons-material";
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

function ModalALuno({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="">
          <Box sx={{ width: 400 }}>
            <p className="text-2xl text-[#101010]" id="parent-modal-title">
              Essa pagina é direcionada ao cadastro de alunos para a futura
              emissão de PDF
            </p>
            <p className="text-[#101010] py-[2%]" id="parent-modal-description">
              Caso não tenha nenhum aluno cadastrado:
            </p>
            <p className="text-[#101010]">
              *Preencha todos os campos e por fim pressione o botão.
            </p>
            <Button color="success" variant="text" startIcon={<SaveAs />}>
              {" "}
              Salvar Cadastro{" "}
            </Button>
            <p className=" py-[2%] text-xs text-[#101010]">
              obs:Não é possivel salvar com campos em branco.
            </p>
            <p className="py-[2%]  text-[#101010]">
              Após cadastrar um aluno é possivel visualizar seus dados na tabela
              abaixo,além de possibilitar a edição desses dados através do
              botão:
            </p>
            <Button startIcon={<EditNote />} variant="text" color="primary">
              Editar
            </Button>
            <p className="py-[2%]  text-[#101010]">
              E excluir através do botão:
            </p>
            <Button
              className="pl-[3%]"
              startIcon={<DeleteForever />}
              variant="text"
              color="error"
            >
              Excluir
            </Button>
          </Box>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-[#0CCA98] text-white font-bold py-2 px-4 rounded flex items-center login-button"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default ModalALuno;
