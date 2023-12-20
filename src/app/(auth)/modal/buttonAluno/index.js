import { DeleteForever, EditNote, SaveAs } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import "./styles.css";

function ModalALuno({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
          <Box sx={{ width: 400 }}>
            <div className="flex justify-end">
            <button
                className="hover:bg-[#0CCA98] text-zinc-500 font-bold px-[0.5%] rounded right-7 login-button"
                onClick={onClose}
              >
                X
              </button>
            </div>
         
            <h2 className="text-3xl text-[#D9D9D9] font-extrabold" id="parent-modal-title">
              Essa pagina é direcionada ao cadastro de alunos para a futura
              emissão de PDF
            </h2>
            <p className="text-[#101010] " id="parent-modal-description">
              Caso não tenha nenhum aluno cadastrado:
            </p>
            <p className="text-[#101010]">
              *Preencha todos os campos e por fim pressione o botão.
            </p>
            <div className="flex justify-center">
            <Button color="success" variant="text" startIcon={<SaveAs />}>
              {" "}
              Salvar Cadastro{" "}
            </Button>

            </div>
            <p className=" text-[#101010]">
              obs: Não é possivel salvar com campos em branco.
            </p>
            <p className="  text-[#101010]">
              Após cadastrar um aluno é possivel visualizar seus dados na tabela
              abaixo, além de possibilitar a edição desses dados através do
              botão:
            </p>
            <div className="flex justify-center">
            <Button id="login-button" startIcon={<EditNote />} variant="text" color="primary">
              Editar
            </Button>
            </div>
            <p className="  text-[#101010]">
              E excluir através do botão:
            </p>

            <div className="flex justify-center">
            <Button
              className="pl-[3%]"
              startIcon={<DeleteForever />}
              variant="text"
              color="error"
            >
              Excluir
            </Button>

            </div>
          </Box>
      </div>
      <div className="flex justify-center">
       
      </div>
    </div>
  );
}

export default ModalALuno;
