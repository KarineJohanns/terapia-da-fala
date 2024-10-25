import React, { useState, useEffect, useRef } from "react";

const ExercicioRespiracao: React.FC = () => {
    const [fase, setFase] = useState<string>("Inalar");
    const [contador, setContador] = useState<number>(3);
    const [repeticoes, setRepeticoes] = useState<number>(1);
    const [descanso, setDescanso] = useState<boolean>(false);
    const [repsCompletas, setRepsCompletas] = useState<number>(0);
    const [iniciado, setIniciado] = useState<boolean>(false);
    const [pausado, setPausado] = useState<boolean>(false);

    const tempoInalar = 3;
    const tempoSegurar = 12;
    const tempoExalar = 6;

    const audioRef = useRef<HTMLAudioElement | null>(null); // Reference for the audio element

    const handleMudancaReps = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeticoes(parseInt(event.target.value, 10));
    };

    const obterEscalaCirculo = (): number => {
        if (fase === "Inalar") {
            return 1 + (2 - 1) * (1 - contador / tempoInalar);
        }
        if (fase === "Segurar") {
            return 2;
        }
        if (fase === "Exalar") {
            return Math.max(1, 2 * (contador / tempoExalar));
        }
        return 1;
    };

    const obterDuracaoTransicao = (): string => {
        if (fase === "Inalar") {
            return `${tempoInalar}s`;
        } else if (fase === "Exalar") {
            return `${tempoExalar}s`;
        }
        return "0s"; // Sem transição durante "Segurar"
    };

    useEffect(() => {
        if (!iniciado || pausado) return;

        let timer: ReturnType<typeof setTimeout>;
        if (descanso) {
            timer = setTimeout(() => {
                setDescanso(false);
                setFase("Inalar");
                setContador(tempoInalar);
            }, 5000);
        } else if (repsCompletas < repeticoes) {
            timer = setTimeout(() => {
                if (contador > 0) {
                    setContador(contador - 1);
                } else {
                    if (fase === "Inalar") {
                        setFase("Segurar");
                        setContador(tempoSegurar);
                    } else if (fase === "Segurar") {
                        setFase("Exalar");
                        setContador(tempoExalar);
                    } else if (fase === "Exalar") {
                        setRepsCompletas(repsCompletas + 1);
                        setDescanso(true);
                        setFase("Descanso");
                    }
                }
            }, 1000);
        }

        return () => clearTimeout(timer);
    }, [contador, fase, repsCompletas, repeticoes, descanso, iniciado, pausado]);

    const iniciarExercicio = () => {
        setIniciado(true);
        setPausado(false);
        if (audioRef.current) {
            audioRef.current.play(); // Play audio when exercise starts
        }
    };

    const pausarExercicio = () => {
        setPausado((prev) => !prev);
        if (audioRef.current) {
            if (pausado) {
                audioRef.current.play(); // Resume audio if paused
            } else {
                audioRef.current.pause(); // Pause audio if not paused
            }
        }
    };

    const pararExercicio = () => {
        setIniciado(false);
        setContador(3);
        setRepeticoes(1);
        setRepsCompletas(0);
        setDescanso(false);
        setFase("Inalar");
        setPausado(false);
        if (audioRef.current) {
            audioRef.current.pause(); // Pause audio when exercise stops
            audioRef.current.currentTime = 0; // Reset audio to the beginning
        }
    };

    const repetirExercicio = () => {
        setRepsCompletas(0);
        setIniciado(true);
        setPausado(false);
        setContador(tempoInalar);
        setFase("Inalar");
    };

    return (
        <div
            className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-blue-100 to-green-200 p-4">
            <div className="flex flex-col items-center mb-4 text-purple-700">
                <h2 className="text-4xl font-bold mb-6 text-purple-700 text-center">Exercício de Respiração</h2>
                <div className="flex items-center mb-2">
                    <label htmlFor="reps" className="text-xl mr-2">
                        Número de repetições:
                    </label>
                    <input
                        type="number"
                        id="reps"
                        min="1"
                        value={repeticoes}
                        onChange={handleMudancaReps}
                        className="border border-white p-1 rounded-md shadow-sm w-20 text-center text-black"
                    />
                </div>
                <div className="text-lg text-center">
                    <p>Repetições completas: {repsCompletas}/{repeticoes}</p>
                </div>
            </div>

            <div className="flex flex-col items-center mt-8 w-full">
                <div
                    className={`w-40 h-40 bg-yellow-500 rounded-full shadow-lg flex items-center justify-center transition-transform duration-500 ease-in-out`}
                    onClick={iniciarExercicio}
                    style={{
                        cursor: 'pointer',
                        transition: `transform ${obterDuracaoTransicao()}`,
                        transform: `scale(${obterEscalaCirculo()})`,
                        marginBottom: '20px',
                    }}
                >
                    {!iniciado ? (
                        <div className="flex flex-col items-center">
                            <span className="material-icons text-purple-700" style={{fontSize: '48px'}}>play_arrow</span>
                            <p className="text-xl text-purple-700">Iniciar</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            {repsCompletas < repeticoes ? (
                                <>
                                    <h3 className="text-2xl font-bold text-purple-700">{fase}</h3>
                                    <p className="text-xl text-purple-700">{contador} segundos</p>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    )}
                    {repsCompletas >= repeticoes && (
                        <div
                            onClick={repetirExercicio}
                            className="flex flex-col items-center cursor-pointer absolute bottom-10 left-1/2 transform -translate-x-1/2"
                        >
                            <span className="material-icons text-purple-700" style={{fontSize: '48px'}}>replay</span>
                            <p className="text-xl text-purple-700">Repetir</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-8 pb-10 flex justify-center space-x-6 w-full">
                <div onClick={pausarExercicio} className="cursor-pointer">
                    <span className="material-icons text-purple-700" style={{fontSize: '56px'}}>
                        {pausado ? 'play_arrow' : 'pause_circle'}
                    </span>
                </div>

                <div onClick={pararExercicio} className="cursor-pointer">
                    <span className="material-icons text-purple-700" style={{fontSize: '56px'}}>stop_circle</span>
                </div>
            </div>

            {/* Elemento de áudio */}
            <audio ref={audioRef} loop>
                <source src="/musica-de-fundo.mp3" type="audio/mpeg" />
                Seu navegador não suporta o elemento de áudio.
            </audio>
        </div>
    );
};

export default ExercicioRespiracao;
