"use client";

import ButtonRelatorio from "@/app/(auth)/modal/buttonRelatorio";
import { db } from "@/services/firebaseConfig";
import {
  Add,
  DeleteForever,
  GroupAdd,
  Help,
  ModeEdit,
  PictureAsPdf,
  SaveAs,
} from "@mui/icons-material";
import { Button, TextareaAutosize } from "@mui/material";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MagicMotion } from "react-magic-motion";
import Swal from "sweetalert2";
import search from "/public/search.svg";
import ModalLogin from "@/app/(auth)/modal/buttonRelatorio";
import ModalRelatorio from "@/app/(auth)/modal/buttonRelatorio";

function App() {
  const [relatorios, setRelatorios] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [tituloDocumento, setTituloDocumento] = useState("");
  const [topico, setTopico] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const alunosCollectionRef = collection(db, "aluno");
  const [alunos, setAlunos] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  function handleSelectAluno(aluno) {
    Swal.fire({
      title: "Aluno selecionado com sucesso!",
      icon: "success",
    });

    setSelectedAluno(aluno);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const newArray = [...relatorios];
      newArray[editingIndex] = { tituloDocumento, titulo, topico };
      setRelatorios(newArray);
      setEditingIndex(null);
    } else {
      setRelatorios([...relatorios, { tituloDocumento, titulo, topico }]);
    }
    setTitulo("");
    setTituloDocumento("");
    setTopico("");
  };
  const handleEdit = (index) => {
    setTituloDocumento(relatorios[index].tituloDocumento);
    setTitulo(relatorios[index].titulo);
    setTopico(relatorios[index].topico);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newArray = [...relatorios];
    newArray.splice(index, 1);
    setRelatorios(newArray);
  };

  const saveRelatorios = async () => {
    try {
      const relatoriosRef = collection(db, "aluno");
      const newDocumentRef = doc(relatoriosRef, "g2onPwzJaWEZrl0Fznue");
      const relatoriosObject = { relatorios };
      await setDoc(newDocumentRef, relatoriosObject);

      Swal.fire({
        title: "Salvo com sucesso!",
        text: "Relatório foi salvo!",
        icon: "success",
      });
    } catch (error) {
      console.error("Erro ao salvar dados: ", error);
    }
  };

  console.log(relatorios);

  useEffect(() => {
    const getAlunos = async () => {
      const data = await getDocs(alunosCollectionRef);
      setAlunos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAlunos();
  }, []);

  const filterAlunos = (alunos, filter) => {
    if (!filter) {
      return alunos;
    }

    return alunos.filter((aluno) => {
      // Verificar se aluno e aluno.nome são definidos
      if (aluno && aluno.nome) {
        return aluno.nome.toLowerCase().includes(filter.toLowerCase());
      }

      return false; // Se aluno ou aluno.nome não estiverem definidos, não incluir no filtro
    });
  };

  console.log(selectedAluno);
  return (
    <MagicMotion>
      <div className="h-screen flex">
        <div className="pl-[3%] pt-[2%] ">
          <div>
            <div className="flex">
              <h1 className="font-extrabold text-[#251B45] text-4xl">
                Cadastro De Relátorio
              </h1>

              <div className="flex mt-2">
                <Button endIcon={<Help />} onClick={openModal}></Button>
                <ModalRelatorio isOpen={isModalOpen} onClose={closeModal} />
              </div>
            </div>
          </div>

          <div className="">
            <form onSubmit={handleSubmit}>
              <h1 className="font-extrabold text-[#251B45] text-2xl pt-[2%] pb-[1%]">
                Titulo Do Documento{" "}
              </h1>
              <input
                type="text"
                value={tituloDocumento}
                onChange={(e) => setTituloDocumento(e.target.value)}
                className="border border-gray-500 rounded-xl bg-gray-300 px-4 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-96 "
                required
              />
              <h1 className="font-extrabold text-[#251B45] text-2xl pt-[2%] pb-[1%]">
                Titulo do Tópico{" "}
              </h1>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="border border-gray-500 rounded-xl bg-gray-300 px-4 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-96 "
                required
              />
              <h1 className="font-extrabold text-[#251B45] text-3xl pt-[2%] pb-[1%]">
                Descrição/Tópico
              </h1>
              <TextareaAutosize
                style={{ width: "700px", height: "200px" }}
                type="text"
                value={topico}
                onChange={(e) => setTopico(e.target.value)}
                className="border border-gray-500 rounded-xl bg-gray-300 px-4 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block resize "
                required
              />
              <div>
                <div className="py-[1%]">
                  <Button
                    disabled={tituloDocumento === "" || topico === ""}
                    variant="text"
                    startIcon={<Add />}
                    type="submit"
                  >
                    {" "}
                    {editingIndex !== null ? "Concluir" : "Adicionar"}
                  </Button>
                </div>
              </div>
            </form>
            <Button
              disabled={relatorios == ""}
              color="success"
              variant="text"
              startIcon={<SaveAs />}
              onClick={saveRelatorios}
            >
              Salvar Relatorio
            </Button>
            <div>
              <div></div>
            </div>

            {/* <div className="ml-[2%]">
<div className="">
      <span className="font-extrabold text-[#251B45] text-3xl "> {relatorios[0] !==  relatorios[1] ? 'Topicos salvos listado:': 'Não há topicos salvos!' }</span>
      </div>
      <div className="ml-[10%] pt-[2%] ">
        {relatorios.map((relatorio, index) => (
          <div className="grid grid-cols-1 mr-[10%] w-40" key={index}>
            <h3 className="font-extrabold">{index+1}-{relatorio.titulo}</h3>
            <p className="text-orange-500 ">{relatorio.topico}</p>
            <div className="flex pl-[5%] py-[8%]">
              <div >
            <Button  variant="text" startIcon={<ModeEdit />}  color="secondary" onClick={() => handleEdit(index)}>Editar</Button>
            </div>
            <div className="pl-2">

            <Button  variant="text" startIcon={<DeleteForever />} color="error" onClick={() => handleDelete(index)}>Deletar</Button>
            </div>
            </div>
          </div>
        ))}
      
      </div>
      </div> */}
            <div>
              <div></div>
            </div>
          </div>

          <div></div>
          <div>
            <div className="ml-[2%]">
              <span className="font-extrabold text-[#251B45] text-3xl ">
                {" "}
                {relatorios[0] !== relatorios[1]
                  ? "Topicos salvos listados:"
                  : "Não há topicos salvos!"}
              </span>
            </div>
            <div className=" flex flex-wrap px-[2%]">
              {relatorios.map((relatorio, index) => (
                <div>
                  <div className="grid  px-[2%] py-[1%]" key={index}>
                    <h3 className="font-extrabold">
                      {index + 1}-{relatorio.titulo.slice(0, 10)}...
                    </h3>
                    <p className=" ">{relatorio.topico.slice(0, 20)}...</p>
                    <div className="flex pl-[2%] ">
                      <div>
                        <Button
                          variant="text"
                          startIcon={<ModeEdit />}
                          color="secondary"
                          onClick={() => handleEdit(index)}
                        >
                          Editar
                        </Button>
                      </div>
                      <div className="">
                        <Button
                          variant="text"
                          startIcon={<DeleteForever />}
                          color="error"
                          onClick={() => handleDelete(index)}
                        >
                          Deletar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ml-[60%] fixed my-[3%]">
          <div>
            <div className="relative flex-col">
              <div className="my-[1%] ">
                <div>
                  <h1 className="font-extrabold text-[#251B45] text-1xl">
                    Selecione o aluno destinado ao Relatório
                  </h1>
                </div>
                <input
                  type="text"
                  placeholder="Pesquisar aluno..."
                  className=" pl-12 pr-4 py-4 font-bold rounded-lg bg-white focus:outline-none focus:shadow-outline"
                  onChange={(e) => setFilter(e.target.value)}
                />
                <Image
                  src={search}
                  alt="search"
                  width={15}
                  height={15}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2"
                />
              </div>
            </div>
          </div>
          <div className="search-container"></div>
          <table className="table-auto w-full">
            <thead className=" bg-[#251B45]">
              <tr className="">
                <th className="rounded-tl-lg  px-4  text-[#FBFAFC]">Nome</th>
                <th className=" py-2 text-[#FBFAFC]">Matricula</th>
                <th className=" px-4  text-[#FBFAFC]">Selecionar</th>
                <th className="rounded-tr-lg px-4  text-[#FBFAFC]"></th>
              </tr>
            </thead>
            <tbody>
              {filterAlunos(alunos, filter).map((aluno, index) => {
                return (
                  <tr key={aluno.matricula}>
                    <td className="border pl-2 py-2 pr-10 font-bold">
                      {aluno.nome}
                    </td>
                    <td className="border pl-4 py-2 font-bold">
                      {aluno.matricula}
                    </td>

                    <div className="flex p-[8%]">
                      <div className="">
                        <Button
                          className=""
                          startIcon={<GroupAdd />}
                          variant="text"
                          color="primary"
                          onClick={() => handleSelectAluno(aluno)}
                        >
                          Cabeçalho
                        </Button>
                        <Button
                          disabled={selectedAluno === null}
                          color="error"
                          variant="text"
                          startIcon={<PictureAsPdf />}
                          onClick={(e) => relatoriosPDF(relatorios)}
                        >
                          Emitir PDF
                        </Button>
                      </div>
                      <div></div>
                    </div>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div></div>
        </div>
      </div>
    </MagicMotion>
  );
}

export default App;
