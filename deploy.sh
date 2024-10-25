#!/bin/bash

# Definir variáveis
LOCAL_BUILD_PATH="./dist"
REMOTE_USER="ubuntu"
REMOTE_SERVER="144.22.133.136"
REMOTE_DIR="/home/ubuntu/frontend/respirar"
SSH_KEY_PATH="C:/Temp/chaves-publicas/oracle-backend/ssh-key-2024-10-14.key"

# Função para exibir mensagens com destaque
function echo_styled {
    echo -e "\n========================================="
    echo -e "$1"
    echo -e "=========================================\n"
}

# Passo 1: Navegar para o diretório do projeto
cd C:/Temp/ws-vscode/my-breathing-app || exit 1  # Altere para o caminho do seu projeto

echo_styled "Gerando o BUILD"

# Passo 3: Executar o comando de build
npm run build

# Passo 4: Verificar se o diretório de build foi criado
if [ ! -d "$LOCAL_BUILD_PATH" ]; then
    echo_styled "Erro: Diretório de build não encontrado!"
    exit 1
fi

echo_styled "Enviando para o Servidor"

# Passo 5: Enviar os arquivos do build para o servidor remoto
scp -i "$SSH_KEY_PATH" -r "$LOCAL_BUILD_PATH"/* "$REMOTE_USER@$REMOTE_SERVER:$REMOTE_DIR"

# Passo 6: Exibir mensagem de conclusão
echo_styled "Deploy realizado com sucesso!"

# Aguardar o pressionamento de uma tecla antes de fechar
echo -e "Pressione qualquer tecla para continuar..."
read -n 1 -s  # -n 1 lê uma única tecla e -s não mostra a tecla pressionada
