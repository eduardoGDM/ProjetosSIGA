"use client";

import {
	getDocs
} from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";

export default function Aluno() {
	const [users, setUsers] = useState([]);
	const usersCollectionRef = collection(db, "aluno");

	useEffect(() => {
		const getUsers = async () => {
		  const data = await getDocs(usersCollectionRef);
		  setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
	
		getUsers();
	  }, []);
  
	return (
		<Fragment>
			<div className="p-[4%] w-screen">
			{users.map((user) => {
			return <div> 
			  {" "}
			  <span>ALunos Cadastrados</span>
			  <h1>Name: {user.nome}</h1>
			  <h1>Idade: {user.idade}</h1>
			  <h1>Matricula: {user.matricula}</h1>
			  <h1>Telefone: {user.telefone}</h1>
			  <h1>Serie: {user.serie} ª</h1>
			  <h1>Mae: {user.mae}</h1>
			  <h1>Pai: {user.pai}</h1>
			  {/* <button onClick={() => {
				updateUser(user.id, user.age);
			  }}>Increase </button> */}
			</div>
		  })}
			</div>
		</Fragment>
	);
}


{/* <div className="">
					<h1 className="text-[#251B45] font-bold text-4xl whitespace-nowrap ">
						Gerenciamento De Alunos
					</h1>
					<span className="text-[#828282] whitespace-nowrap">
						Adicione e edite os alunos da instituição de ensino
					</span>
					<div className="py-[2%]">
						<Link href="/cadastroAluno">
							<button
								type="button"
								className="text-[#251B45] bg-[#0CCA98] rounded-lg text-1xl px-2 py-2 text-center inline-flex items-center mr-2 mb-2">
								+ Cadastrar Aluno
							</button>
						</Link>
						<input
							type="text"
							id="instituicao"
							className=" text-center rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block px-[5%] py-[1%] mt-[2%]"
							placeholder="Pesquisar aluno..."></input>
					</div>
				</div>

				<div>
					<table className="table-auto w-full">
						<thead>
							<a className=" grid grid-cols-8  gap-x-[17%] bg-[#251B45] text-[#FBFAFC]  rounded-t-lg  ">
								<th className="">Nome</th>
								<th>Série/Turno</th>
								<th>Telefone</th>
								<th className="">Nascimento</th>
							</a>
						</thead>
						<tbody className="bg-[#0CCA98] ">
							{dados.map((aluno) => (
								<td className=" grid grid-cols-6 border-b-2" key={aluno.id}>
									<td className="">{aluno.nome}</td>
									<td>{aluno.turno}</td>
									<td>{aluno.telefone}</td>
									<td>{aluno.nascimento}</td>

									<img className="bg-blue cursor-pointer" src="edit.svg"></img>
									<Link href="/cadasaoRelatorios">
										<img className="cursor-pointer " src="docs.svg"></img>
									</Link>
								</td>
							))}
						</tbody>
					</table>
				</div> */}