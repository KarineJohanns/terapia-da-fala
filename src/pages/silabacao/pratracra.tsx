// PaginaPraTraCra.tsx

import React from 'react';
import Silabacao from "../../components/Silabacao.tsx";

const silabasPraTraCra = [
    ['PRA', 'TRA', 'CRA'],
    ['PRE', 'TRE', 'CRE'],
    ['PRI', 'TRI', 'CRI'],
    ['PRO', 'TRO', 'CRO'],
    ['PRU', 'TRU', 'CRU']
];

const PaginaPraTraCra: React.FC = () => {
    return (
        <div className="min-h-screen bg-white p-6">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Silabação: Pra-Tra-Cra</h1>
            <Silabacao silabas={silabasPraTraCra} />
        </div>
    );
};

export default PaginaPraTraCra;
