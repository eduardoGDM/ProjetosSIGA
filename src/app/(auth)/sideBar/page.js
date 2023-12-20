"use client";
import Link from "next/link";
import { Fragment, useState } from "react";

export default function sideBar() {
	const Menu = [
		{ title: "Dashboard", src: "quadradino", link: "/general" },
		{ title: "Cadastro de Alunos", src: "chapeuzinho", link: "/cadastroAluno" },
		{ title: "Criação de Relatórios", src: "docs", link: "/cadastroRelatorios" },
		{ title: "Lista de Relatórios", src: "list-svgrepo-com", link: "/listaRelatorios" },
	];

	const [page, setPage] = useState("general");

	const [open, setOpen] = useState(false);

	return (
		<Fragment>
				<div 
					className={`${ 
						open ? "w-72 h-screen"  : "w-20"
					} duration-300 bg-[#251B45] relative pt-12 p-2 `}>
					<img
						onClick={() => setOpen(!open)}
						src="next.svg"
						className={`absolute cursor-pointer right-5 top-[20%] w-7 ${
							!open && "rotate-180 right-[10%] scale-75 py-2 top-[6%]"
						}`}
					/>
					<Link href="/">
						<img
							className="mx-auto my-auto p-[8%] font-bold"
							src="logo.svg"
							alt="image description"
						/>
					</Link>
					<div className="flex gap-x-4 items-center"></div>
					<ul className="pt-20">
						{Menu.map((menu, index) => (
							<a
								href={menu.link}
								key={index}
								className="text-sm flex items-center gap-x-2 cursor-pointer py-[15%] px-[10%] rounded-xl hover:bg-[#0CCA98] ">
								<img className="px-2 py-2  text-white" src={`/${menu.src}.svg`} />
								<span className={`${!open && "hidden"} text-white`}>
									{menu.user}
								</span>
								<span className={`${!open && "hidden"} text-white`}>
									{menu.title}
								</span>
							</a>
						))}
					</ul>
					
				</div>
				<div></div>
		</Fragment>
	);
}
