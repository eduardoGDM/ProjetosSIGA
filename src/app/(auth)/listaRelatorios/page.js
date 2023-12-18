"use client";
import { db } from '@/services/firebaseConfig';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { MagicMotion } from "react-magic-motion";

const ListarRelatorios = () => {
  const [relatorios, setRelatorios] = useState([]);

  useEffect(() => {
    const getRelatorios = async () => {
      const relatoriosCollectionRef = collection(db, 'relatorios');
      const data = await getDocs(relatoriosCollectionRef);
      setRelatorios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getRelatorios();
  }, []);

  const handleDeleteRelatorio = async (id) => {
    const relatoriosCollectionRef = collection(db, 'relatorios');
    const relatorioDocRef = doc(relatoriosCollectionRef, id);
    await deleteDoc(relatorioDocRef);

    const newRelatorios = relatorios.filter((relatorio) => relatorio.id !== id);
    setRelatorios(newRelatorios);
  };

  return (
    <MagicMotion>
      <div className="pl-[3%] pt-[2%] h-screen">
        <div>
          <h1 className="font-extrabold text-[#251B45] text-3xl">Listar relatórios</h1>
        </div>

        {relatorios.length === 0 && (
          <p>Nenhum relatório cadastrado ainda.</p>
        )}

        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Tópico</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {relatorios.map((relatorio) => (
              <tr key={relatorio.id}>
                <td>{relatorio.titulo}</td>
                <td>{relatorio.topico}</td>
                <td>
                  <button onClick={() => handleDeleteRelatorio(relatorio.id)}>
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MagicMotion>
  );
};

export default ListarRelatorios;
