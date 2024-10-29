import React from 'react';
import { Link } from 'react-router-dom'; // Importa o Link
import { Card } from 'flowbite-react'; // Importa o Card do Flowbite

const Home: React.FC = () => {
    return (
        <div className="p-6 md:p-10">
            <h1 className="text-2xl font-bold mb-4">Lista de Exercícios</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/Respiracao3126" className="w-full">
                    <Card className="shadow-lg cursor-pointer">
                        <h2 className="text-lg font-bold mb-2">Exercício de Respiração</h2>
                        <p className="text-gray-700 mb-4">
                            Pratique técnicas de respiração para relaxamento e foco.
                        </p>
                    </Card>
                </Link>

                <Link to="/Pratracra" className="w-full">
                    <Card className="shadow-lg cursor-pointer">
                        <h2 className="text-lg font-bold mb-2">Silabação - Pra-tra-cra</h2>
                        <p className="text-gray-700 mb-4">
                            Exercícios de silabação para desenvolvimento da fala.
                        </p>
                    </Card>
                </Link>

                <Link to="/Bradragra" className="w-full">
                    <Card className="shadow-lg cursor-pointer">
                        <h2 className="text-lg font-bold mb-2">Silabação - Bra-dra-gra</h2>
                        <p className="text-gray-700 mb-4">
                            Exercícios de silabação para desenvolvimento da fala.
                        </p>
                    </Card>
                </Link>
            </div>
        </div>
    );
};

export default Home;
