import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CircleAnimation = () => {
    const [isGrowing, setIsGrowing] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsGrowing(prev => !prev);
        }, 2000); // Altera a cada 2 segundos
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            animate={{ scale: isGrowing ? 1.5 : 1 }} // O círculo vai crescer até 1.5x e depois voltar para 1
            transition={{ duration: 1, ease: "easeInOut" }} // Duração da animação e suavização
            style={{
                width: '100px', // Largura do círculo
                height: '100px', // Altura do círculo
                borderRadius: '50%', // Faz o elemento ser um círculo
                backgroundColor: '#007BFF', // Cor do círculo
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto' // Centraliza o círculo
            }}
        >
            {/* Você pode adicionar conteúdo dentro do círculo se quiser */}
        </motion.div>
    );
};

export default CircleAnimation;
