// PaginaBraDraGra.tsx

import React from 'react';
import Silabacao from "../../components/Silabacao.tsx";

const silabasBraDraGra = [
    ['BRA', 'DRA', 'GRA'],
    ['BRE', 'DRE', 'GRE'],
    ['BRI', 'DRI', 'GRI'],
    ['BRO', 'DRO', 'GRO'],
    ['BRU', 'DRU', 'GRU']
];

const PaginaBraDraGra: React.FC = () => {
    return (
        <div className="min-h-screen bg-white p-6">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Silabação: Bra-Dra-Gra</h1>
            <Silabacao silabas={silabasBraDraGra} />
        </div>
    );
};

export default PaginaBraDraGra;
