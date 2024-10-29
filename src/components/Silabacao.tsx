import React, { useState, useEffect } from 'react';

interface SilabacaoProps {
    silabas: string[][]; // Vetor de vetores de sílabas
}

const Silabacao: React.FC<SilabacaoProps> = ({ silabas }) => {
    const [isRunning, setIsRunning] = useState(false); // Controle do início da contagem
    const [highlightIndex, setHighlightIndex] = useState({ row: 0, col: 0 }); // Índice da sílaba
    const [phase, setPhase] = useState(1); // Fase atual: 1 ou 2

    // Função para iniciar ou pausar a contagem
    const toggleHighlight = () => {
        setIsRunning((prev) => !prev);
    };

    // Função para parar a contagem e resetar o índice
    const stopHighlight = () => {
        setIsRunning(false);
        setHighlightIndex({ row: 0, col: 0 });
        setPhase(1); // Reseta a fase para 1
    };

    // Função assíncrona para iterar sobre os índices e aplicar o destaque
    const iterateIndices = async (totalRows: number, totalCols: number) => {
        for (let row = 0; row < totalRows; row++) {
            for (let rep = 1; rep <= 3; rep++) { // Três iterações para cada linha
                for (let col = 0; col < totalCols; col++) {
                    if (!isRunning) return; // Interrompe caso isRunning seja false
                    setHighlightIndex({ row, col });
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa de 1s
                }
            }
        }
        setIsRunning(false); // Para a execução quando as iterações terminarem
    };

    // Efeito para iniciar as iterações conforme a fase
    useEffect(() => {
        if (!isRunning) return;

        const totalRows = silabas.length;
        const totalCols = silabas[0].length;

        if (phase === 1) {
            const interval = setInterval(() => {
                setHighlightIndex((prevIndex) => {
                    const { row, col } = prevIndex;
                    let nextRow = row + 1;
                    let nextCol = col;

                    // Se alcançou a última linha, reseta a linha e avança para a próxima coluna
                    if (nextRow >= totalRows) {
                        nextRow = 0;
                        nextCol += 1;
                    }

                    // Se também alcançou a última coluna, muda para a fase 2
                    if (nextCol >= totalCols) {
                        clearInterval(interval);
                        setPhase(2);
                        return { row: 0, col: 0 }; // Reseta para a próxima fase
                    }

                    return { row: nextRow, col: nextCol };
                });
            }, 1000);

            return () => clearInterval(interval); // Limpeza do intervalo ao sair do componente ou parar a contagem
        } else if (phase === 2) {
            iterateIndices(totalRows, totalCols); // Inicia a fase 2 com a função assíncrona
        }
    }, [isRunning, phase, silabas]);

    // Função para reiniciar a contagem
    const restart = () => {
        setIsRunning(true);
        setHighlightIndex({ row: 0, col: 0 });
        setPhase(1); // Reseta a fase para 1
    };

    return (
        <div className="w-full max-w-md mx-auto my-8 bg-gray-50 p-4 rounded shadow-md">
            <div className="grid grid-cols-3 gap-2 text-center text-gray-800">
                {silabas.map((linha, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        {linha.map((silaba, colIndex) => (
                            <div
                                key={colIndex}
                                className={`py-4 rounded-md transition-all duration-300 ${
                                    highlightIndex.row === rowIndex && highlightIndex.col === colIndex
                                        ? 'bg-blue-200 text-blue-700 font-bold'
                                        : 'bg-white border border-gray-300'
                                }`}
                            >
                                {silaba}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <div className="flex justify-center gap-4 mt-6">
                {!isRunning && phase === 2 ? (
                    <button
                        onClick={restart}
                        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 transition duration-300 flex items-center gap-2"
                    >
                        <span className="material-icons">restart_alt</span>
                        Reiniciar
                    </button>
                ) : (
                    <>
                        <button
                            onClick={toggleHighlight}
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition duration-300 flex items-center gap-2"
                        >
                            <span className="material-icons">
                                {isRunning ? 'pause' : 'play_arrow'}
                            </span>
                            {isRunning ? 'Pausar' : 'Iniciar'}
                        </button>
                        {isRunning && (
                            <button
                                onClick={stopHighlight}
                                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition duration-300 flex items-center gap-2"
                            >
                                <span className="material-icons">stop</span>
                                Parar
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Silabacao;
