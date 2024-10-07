// Adicione esta linha no topo do seu arquivo
"use client";

import React, { useState, useEffect } from "react";

import tasksData from "./data/tasks.json";

// Define a interface para a tarefa
interface Task {
  title: string;
  author: string;
  dateStart: string;
  dateDue: string;
  duration: number;
  description: string;
  comments: Comment[];
}

// Define a interface para o comentário
interface Comment {
  body: string;
  author: string;
  dateCreated: string;
}

const PAGE_SIZE = 100; // Número de itens por página

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>(""); // Estado para o filtro
  const [totalPages, setTotalPages] = useState<number>(0); // Estado para o total de páginas

  // Filtra os dados da página atual com base no filtro
  useEffect(() => {
    const filteredData = (tasksData as Task[]).filter((task) =>
      task.title.toLowerCase().includes(filter.toLowerCase())
    );
    
    // Calcula o número total de páginas
    setTotalPages(Math.ceil(filteredData.length / PAGE_SIZE));

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    setData(filteredData.slice(startIndex, endIndex));
  }, [currentPage, filter]); // Atualiza quando currentPage ou filter muda

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value); // Atualiza o filtro com o valor do input
    setCurrentPage(1); // Reinicia a página ao aplicar um novo filtro
  };

  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <h1>Pesquisar</h1>

        {/* Campo de filtro */}
        <input
          type="text"
          placeholder="Search by title..."
          value={filter}
          onChange={handleFilterChange}
          className="w-72 ml-8 text-black p-2"
        />
      </div>

      <ul>
        {data.map((task, index) => (
          <div key={index}>
            <div>
              <div className="flex flex-col justify-center bg-sky-700 items-center">
                <h2>{task.title}</h2>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>
                  <strong>Author:</strong> {task.author}
                </p>
                <p>
                  <strong>Start Date:</strong> {task.dateStart}
                </p>
                <p>
                  <strong>Due Date:</strong> {task.dateDue}
                </p>
                <p>
                  <strong>Duration:</strong> {task.duration} minutes
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center center border-2 border-inherit h-full m-12 p-12">
              <h3>Description:</h3>
              {/* Renderizando o HTML contido na descrição */}
              <div dangerouslySetInnerHTML={{ __html: task.description }} />
            </div>
          </div>
        ))}
      </ul>

      {/* Indicador de paginação */}
      <div className="flex flex-row justify-center items-center mb-4">
        <span>Página {currentPage} de {totalPages}</span>
      </div>

      {/* Botões de navegação */}
      <div className="flex flex-row justify-center items-center mb-32">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="bg-sky-700 p-2 m-2">
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-sky-700 p-2 m-2">
          Next Page
        </button>
      </div>
    </div>
  );
};

export default App;
