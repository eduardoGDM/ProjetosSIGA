"use client";

import { db } from "@/services/firebaseConfig";
import { Button } from "@mui/material";

import { DeleteForever, EditNote, Help, SaveAs } from "@mui/icons-material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import search from "/public/search.svg";
import ModalRelatorio from "../modal/buttonRelatorio";
const Swal = require("sweetalert2");

export default function CadastroAluno() {
  const [newNome, setNewNome] = useState("");
  const [newIdade, setNewIdade] = useState("");
  const [newTelefone, setNewTelefone] = useState();
  const [newSerie, setNewSerie] = useState();
  const [newTurno, setNewTurno] = useState("");
  const [newMae, setNewMae] = useState("");
  const [newPai, setNewPai] = useState("");
  const [newRepetencias, setNewRepetencias] = useState("");
  const [newDiagnostico, setNewDiagnostico] = useState("");
  const [newProfessorSRM, setNewProfessorSRM] = useState("");
  const [newMatricula, setNewMatricula] = useState();
  const [newDataNascimento, setNewDataNascimento] = useState("");
  const [filter, setFilter] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingAluno, setEditingAluno] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const alunosCollectionRef = collection(db, "aluno");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // nascimentoo: newNascimento, phone: newPhone, serie: newSerie, turno: newTurno, mae:newMae, pai:newPai, matricula:newMatricula,
  const createAluno = async (event) => {
    event.preventDefault();

    await addDoc(alunosCollectionRef, {
      nome: newNome,
      dataNascimento: newDataNascimento,
      matricula: newMatricula,
      telefone: newTelefone,
      serie: newSerie,
      turno: newTurno,
      mae: newMae,
      pai: newPai,
      repetencias: newRepetencias,
      professorSRM: newProfessorSRM,
      diagnostico: newDiagnostico,
    });
    Swal.fire({
      title: "Sucesso!!!",
      text: "Aluno Cadastrado",
      icon: "success",
    });
    setNewNome("");
    setNewIdade("");
    setNewTelefone("");
    setNewSerie("");
    setNewTurno("");
    setNewMae("");
    setNewPai("");
    setNewMatricula("");
    setNewProfessorSRM("");
    setNewRepetencias("");
    setNewDiagnostico("");
    setTimeout(function () {
      location.reload();
    }, 2000);
  };

  const editAluno = (aluno) => {
    setEditingAluno(aluno);
    // Preencha os campos de edição com os dados do aluno selecionado
    setNewNome(aluno.nome);
    setNewIdade(aluno.idade);
    setNewMatricula(aluno.matricula);
    setNewTelefone(aluno.telefone);
    setNewSerie(aluno.serie);
    setNewTurno(aluno.turno);
    setNewMae(aluno.mae);
    setNewPai(aluno.pai);
    setNewRepetencias(aluno.repetencias);
    setNewProfessorSRM(aluno.professorSRM);
    setNewDiagnostico(aluno.diagnostico);
  };

  const finishEdit = async () => {
    try {
      if (editingAluno) {
        const alunoDocRef = firestoreDoc(db, "aluno", editingAluno.id);

        await updateDoc(alunoDocRef, {
          nome: newNome,
          idade: newIdade,
          matricula: newMatricula,
          telefone: newTelefone,
          serie: newSerie,
          turno: newTurno,
          mae: newMae,
          pai: newPai,
          repetencias: newRepetencias,
          professorSRM: newProfessorSRM,
          diagnostico: newDiagnostico,
          // ... (atualize outros campos conforme necessário)
        });

        Swal.fire({
          title: "Sucesso!!!",
          text: "Aluno Atualizado",
          icon: "success",
        });

        cancelEdit();
        setTimeout(function () {
          location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
    }
  };

  const cancelEdit = () => {
    setEditingAluno(null);
    // Limpe os campos de edição
    setNewNome("");
    setNewIdade("");
    setNewMatricula("");
    setNewTelefone("");
    setNewSerie("");
    setNewTurno("");
    setNewMae("");
    setNewPai("");
    setNewRepetencias("");
    setNewProfessorSRM("");
    setNewDiagnostico("");
  };
  const deleteAluno = async (id) => {
    Swal.fire({
      title: "Você realmente quer excluir esses dados?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Excluir",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const alunoDoc = doc(db, "aluno", id);
        deleteDoc(alunoDoc);
        Swal.fire("Dados Excluidos!", "", "success");
        setTimeout(function () {
          location.reload();
        }, 1000);
      } else if (result.isDenied) {
        Swal.fire("Nada alterado", "", "info");
      }
    });
  };

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
    return alunos.filter((aluno) =>
      aluno.nome.toLowerCase().includes(filter.toLowerCase())
    );
  };

  console.log(alunos);

  return (
    <div className="pl-[2%] pt-[1.5%] h-screen">
      <div>
        <div className="flex flex-wrap">
          <div>
            <div className="flex">
              <h1 className="font-extrabold text-[#251B45] text-4xl">
                Cadastro De Alunos
              </h1>
              <div className="flex mt-2">
                <Button endIcon={<Help />} onClick={openModal}></Button>
                <ModalRelatorio isOpen={isModalOpen} onClose={closeModal} />
              </div>
            </div>

            <span className="text-[#828282] whitespace-nowrap text-1xl">
              Visualize e edite as informações sobre o aluno
            </span>
          </div>
        </div>
      </div>
      <div className="">
        <form onSubmit={createAluno}>
          <div className=" flex  ">
            <div>
              <span className="font-bold">Nome Completo:</span>
              <input
                className=" text-center border-gray-500 rounded-xl bg-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block px-[5%] py-[1%] mb-[2%]"
                value={newNome}
                onChange={(event) => {
                  setNewNome(event.target.value);
                }}
              />
              <span className="font-bold">Data de Nascimento:</span>
              <input
                className=" text-center border-gray-500 rounded-xl bg-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block px-[5%] py-[1%] mb-[2%]"
                type="date"
                value={newDataNascimento}
                placeholder="Data de Nascimento"
                onChange={(event) => setNewDataNascimento(event.target.value)}
              />{" "}
              <span className="font-bold">Matricula:</span>
              <input
                className=" text-center border-gray-500 rounded-xl bg-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block px-[5%] py-[1%] mb-[2%]"
                type="number"
                value={newMatricula}
                onChange={(event) => {
                  setNewMatricula(event.target.value);
                }}
              />
              <span className="font-bold">Telefone:</span>
              <ReactInputMask
                mask="(99) 99999-9999"
                className=" text-center border-gray-500 rounded-xl bg-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block px-[5%] py-[1%] mb-[2%]"
                value={newTelefone}
                onChange={(event) => {
                  setNewTelefone(event.target.value);
                }}
              />
            </div>
            <div className="ml-[5%]">
              <span className="font-bold">Série:</span>
              <input
                className=" text-center border-gray-500 rounded-xl bg-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block px-[5%] py-[1%] mb-[2%]"
                type="number"
                value={newSerie}
                onChange={(event) => {
                  setNewSerie(event.target.value);
                }}
              />
              <span className="font-bold">TURNO/SRM:</span>
              <input
                className=" text-center border-gray-500 rounded-xl bg-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block px-[5%] py-[1%] mb-[2%]"
                type="text"
                value={newTurno}
                onChange={(event) => {
                  setNewTurno(event.target.value);
                }}
              />
              <span className="font-bold">Pai:</span>
              <input
                className=" text-center border-gray-500 rounded-xl bg-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block px-[5%] py-[1%] mb-[2%]"
                type="text"
                value={newPai}
                onChange={(event) => {
                  setNewPai(event.target.value);
                }}
              />
              <span className="font-bold">Mãe:</span>
              <input
                className=" text-center border-gray-500 rounded-xl bg-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block px-[5%] py-[1%] mb-[2%]"
                type="text"
                value={newMae}
                onChange={(event) => {
                  setNewMae(event.target.value);
                }}
              />
            </div>
            <div className="ml-[5%]">
              <span className="font-bold">Repetências:</span>
              <input
                className=" text-center border-gray-500 rounded-xl bg-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block px-[5%] py-[1%] mb-[2%]"
                type="text"
                value={newRepetencias}
                onChange={(event) => {
                  setNewRepetencias(event.target.value);
                }}
              />
              <span className="font-bold">Professor da SRM:</span>
              <input
                className=" text-center border-gray-500 rounded-xl bg-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block px-[5%] py-[1%] mb-[2%]"
                type="text"
                value={newProfessorSRM}
                onChange={(event) => {
                  setNewProfessorSRM(event.target.value);
                }}
              />
              <span className="font-bold">Diagnóstico registrado no SERE:</span>
              <input
                className=" text-center border-gray-500 rounded-xl bg-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block px-[5%] py-[1%] mb-[2%]"
                type="text"
                value={newDiagnostico}
                onChange={(event) => {
                  setNewDiagnostico(event.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <Button
              disabled={newNome == "" || newDiagnostico == ""}
              type="submit"
              color="success"
              variant="text"
              startIcon={<SaveAs />}
            >
              {" "}
              Salvar Cadastro{" "}
            </Button>
          </div>
        </form>

        <div>
          <div>
            <div className="relative flex-col">
              <div className="my-[1%]">
                <input
                  type="text"
                  placeholder="Pesquisar aluno..."
                  className=" pl-12 pr-4 py-1 font-bold rounded-lg bg-white focus:outline-none focus:shadow-outline"
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
            <div className="search-container"></div>
            <table className="table-auto w-full">
              <thead className=" bg-[#251B45]">
                <tr className="">
                  <th className="rounded-tl-lg  px-4  text-[#FBFAFC]">Nome</th>
                  <th className=" px-4  text-[#FBFAFC]">Série/turno</th>
                  <th className=" px-4  text-[#FBFAFC]">Telefone</th>
                  <th className=" py-2 text-[#FBFAFC]">Matricula</th>
                  <th className=" px-4  text-[#FBFAFC]">Ações</th>
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
                      <td className="border pl-2 py-2 font-bold">
                        {aluno.serie}º/{aluno.turno}
                      </td>
                      <td className="border pl-4 py-2 font-bold">
                        {aluno.telefone}
                      </td>
                      <td className="border pl-4 py-2 font-bold">
                        {aluno.matricula}
                      </td>

                      <div className="flex p-[8%]">
                        <div className="">
                          <Button
                            className=""
                            startIcon={<EditNote />}
                            variant="text"
                            color="primary"
                            onClick={() => editAluno(aluno, index)}
                            disabled={editingIndex !== null}
                          >
                            Editar
                          </Button>
                        </div>
                        <div className="ml-[2%]">
                          <Button
                            className="pl-[3%]"
                            startIcon={<DeleteForever />}
                            variant="text"
                            color="error"
                            onClick={() => {
                              deleteAluno(aluno.id);
                            }}
                          >
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 		 
		  <h2 className="text-[rgb(37,27,69)] font-bold text-3xl py-[3%]">Alunos já cadastrados</h2>
		  <Image src={search} alt="search" width={15} height={15} className="absolute top-1/2 left-4 transform -translate-y-1/2" />

		  <table className="table-auto w-full">
            <thead className=" rounded-lg bg-[#251B45]">
                <tr className="">
                    <th className="  px-4 py-2 text-[#FBFAFC]">Nome</th>
                    <th className=" px-4 py-2 text-[#FBFAFC]">Série/turno</th>
                    <th className=" px-4 py-2 text-[#FBFAFC]">Telefone</th>
                    <th className=" px-4 py-2 text-[#FBFAFC]">Matrícula</th>
					<th className=" rounded-tr-lg py-2 text-[#FBFAFC]">Ações</th>
                </tr>
            </thead>
            <tbody>
			
			{filterAlunos(alunos, filter).map((aluno, index) => {
          return (
            <tr key={aluno.matricula}>
							<td className="border pl-10 py-2">{aluno.nome}</td>
                            <td className="border pl-10 py-2">{aluno.serie}º/{aluno.turno}</td>
                            <td className="border pl-10 py-2">{aluno.telefone}</td>
                            <td className="border pl-10 py-2">{aluno.matricula}</td>
                            <div className="flex">
							<button className="text-white font-bold bg-[#ca0c0c] rounded-lg text-1xl px-[4%] ml-5 py-1 mt-2 text-center inline-flex items-center   " onClick={() => {deleteAluno(aluno.id)}}>Excluir  </button>
              <button
                className="text-white font-bold bg-[#3B82F6] rounded-lg text-1xl ml-5 px-[6%] py-1 mt-2 text-center inline-flex items-center"
                onClick={() => editAluno(aluno, index)}
                disabled={editingIndex !== null}
              >
                Editar 
              </button>
                            </div>
            </tr>
          );
        })}
            </tbody>
        </table>
 */}

        {/* {alunos.map((aluno) => {
			return <div className="grid grid-cols-4 gap-y-4 bg-slate-300 px-[3%] py-[3%] rounded"> 
			  {" "}
			  
			  <h1><b>Nome completo:</b>{aluno.nome}</h1>
			  <h1><b>Idade:</b> {aluno.idade}</h1>
			  <h1><b>Matricula:</b> {aluno.matricula}</h1>
			  <h1><b>Telefone:</b> {aluno.telefone}</h1>
			  <h1><b>Série:</b> {aluno.serie}ª</h1>
			  <h1><b>Mãe:</b> {aluno.mae}</h1>
			  <h1><b>Pai:</b> {aluno.pai}</h1>
			 
			  <div className="flex gap-2 align-items-start flex-wrap nowrap mt-4">
        <button className="text-white font-bold bg-[#0CCA98] rounded-lg text-1xl px-5 py-2 text-center inline-flex items-center mr-2 mb-[6%]" onClick={(e) => relatoriosPDF(aluno)}>Criar Relatorio</button>
        <button className="text-white font-bold bg-[#ca0c0c] rounded-lg text-1xl px-5 py-2 text-center inline-flex items-center mr-2 mb-[6%]" onClick={() => { deleteAluno(aluno.id) }}>Excluir Aluno</button>
      </div>

			   <button onClick={() => {
				updateAluno(aluno.id, aluno.nome);
			  }}></button>
			</div>
		  })} */}
      </div>
    </div>
  );
}
