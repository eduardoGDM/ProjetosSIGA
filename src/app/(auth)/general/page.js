"use client";
import { auth, db, firestore } from "@/services/firebaseConfig";
import {
	collection,
	getDocs
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function General() {
  const [nome, setNome] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [relatorios, setRelatorios] = useState([]);
  const alunosCollectionRef = collection(db, "aluno");
  const relatoriosCollectionRef = collection(db, "relatorios");

  // Fetch alunos and relatórios outside of the user data fetch
  useEffect(() => {
    const getAlunos = async () => {
      const data = await getDocs(alunosCollectionRef);
      setAlunos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAlunos();

    const getRelatorios = async () => {
      const data = await getDocs(relatoriosCollectionRef);
      setRelatorios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getRelatorios();
  }, []);

  useEffect(() => {
    const isUserLoggedIn = auth.currentUser != null;

    if (isUserLoggedIn) {
      const fetchUserAndAlunos = async () => {
        const currentUser = auth.currentUser;

        if (currentUser && currentUser.uid) {
          const userRef = firestore.collection("professor").doc(currentUser.uid);

          // Obter o nome do usuário diretamente
          const nomeSnapshot = await userRef.get();
          const nome = nomeSnapshot.data()?.nome;
          setNome(nome);
        }
      };

      fetchUserAndAlunos();
    }
  }, []);

	return (
		<div className="bg-[#ffff] h-screen ">
			<div className="flex">
				<img className="p-[6%] scale-25" src="interview.svg" />
				<div className="flex flex-col py-[10%] font-bold">
					<h1 className="text-[#251B45] text-3xl ">Olá, {nome}</h1>
			<span className="text-[#828282] py-[2%]">
			  Resumo Geral do seu gerenciamento na instituição
			</span>
			<button
			  type="button"
			  disabled
			  className="text-[#828282] font-bold bg-[#D9D9D9] rounded-lg px-[10%]text-center inline-flex items-center mr-10 mb-2">
			  <img
				className="w-6 h-6 mr-2 whitespace-nowrap"
				src="school 2.svg"
			  />
			  Colégio Estadual Cívico-Militar General Antônio Sampaio
			</button>
		  </div>
		</div>
		<div className="flex">
		  <button
			type="button"
			disabled
			className="text-[#0CCA98] font-bold bg-[#251B45] rounded-lg  text-center inline-flex items-center ml-[7%]">
			<img className="scale-50 " src="homezinho.svg" />
			<span className="text-5xl">{alunos.length}</span>
			<span className="text-white flex p-[1%] font-bold text-2xl ">
			  Alunos Cadastrados
			</span>
		  </button>
  
		  <button
			type="button"
			disabled
			className="text-[#0CCA98] font-bold bg-[#251B45] rounded-lg text-center inline-flex items-center ml-[3%]">
			<img className="scale-50 " src="report 2.svg" />
			<span className="text-5xl">{relatorios.length} </span>
			<span className="text-white flex p-[1%] font-bold text-2xl  ">
			 Relatórios Anuais Emitidos
					</span>
				</button>
			</div>
			
		</div>
	);
}
