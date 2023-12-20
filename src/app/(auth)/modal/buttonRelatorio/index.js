import {
  Add,
  DeleteForever,
  GroupAdd,
  ModeEdit,
  PictureAsPdf,
  SaveAs
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import "./styles.css";

function ModalRelatorio({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
      <div className="flex justify-end">
            <button
                className="hover:bg-[#0CCA98] text-zinc-500  font-bold px-[0.5%] rounded right-7 login-button"
                onClick={onClose}
              >
                X
              </button>
            </div>
        <div className="">
          
          <Box sx={{ width: 380 }}>
         
            <h2 className="text-1xl text-[#D9D9D9] text-center font-extrabold " id="parent-modal-title">
              Essa pagina é direcionada a criação de relatório acompanhado da
              emissão do PDF
            </h2>
            <p className="text-[#101010] py-[1%]" id="parent-modal-description">
              Preencha todos os campos referentes a sua documentação desejada.
            </p>
            <p className="text-[#101010]" id="parent-modal-description">
              Após preencher todos os campos, será possivel adicionar esses dados
              a um conjunto de tópicos.
            </p>
            <p className="text-[#101010]" id="parent-modal-description">
              Utilizando o botão:
            </p>
            <div className="flex justify-center">
            <Button id="button-alert" color="primary" variant="text" startIcon={<Add />}>
              {" "}
              Adicionar{" "}
            </Button>

            </div>
            <p className="text-[#101010]" id="parent-modal-description">
              Será possivel editar o tópico ja salvo no tópico.Através do botão:
            </p>
            <div className="flex justify-center">
            <Button variant="text" startIcon={<ModeEdit />} color="secondary">
              Editar{" "}
            </Button>

            </div>

            <p className=" py-[2%] text-xs text-[#101010]">
              obs:Não é possivel salvar com campos em branco.
            </p>
            <p className="py-[2%]  text-[#101010]">
              Após realizar a edição, é possivel salvar novamente o tópico ao
              conjunto.Através do botão:
            </p>
            <div className="flex justify-center">
            <Button startIcon={<Add />} variant="text" color="primary">
              Concluir
            </Button>

            </div>
            <p className="py-[2%]  text-[#101010]">
              É possivel excluir o tópico do conjunto através do botão:
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
            <p className="py-[2%]  text-[#101010]">
              Após concluir, é possivel salvar seu conjunto de tópicos através do
              botão:
            </p>
            <div className="flex justify-center">
            <Button color="success" variant="text" startIcon={<SaveAs />}>
              Salvar Relatorio
            </Button>

            </div>
            <p>É possivel selecionar através da tabela ao lado, um aluno para formar seu cabeçalho a partir de seus dados, pressionando o botão:</p>
            <div className="flex justify-center">

            <Button
                          className=""
                          startIcon={<GroupAdd/>}
                          variant="text"
                          color="primary"
                        >
                          Cabeçalho
                        </Button>
            </div>

                        <p>Após selecionar um aluno, será disponibilizado a emissão do seu documento em formato PDF, através do botão:</p>
                        <div className="flex justify-center">
                        <Button
                          color="error"
                          variant="text"
                          startIcon={<PictureAsPdf />}
                        >
                          Emitir PDF
                        </Button>

                        </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default ModalRelatorio;
