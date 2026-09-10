#!/bin/bash

echo "==================================================="
echo "  Resetando Ambiente de Testes - Binario Tech     "
echo "==================================================="

echo -e "\n[1] Encerrando processo Node.js..."
# Tenta matar o processo escutando na porta 3000 ou o processo node em geral
if fuser -k 3000/tcp > /dev/null 2>&1 || pkill -f "node" > /dev/null 2>&1; then
    echo "   -> Processo do Node.js encerrado."
else
    echo "   -> Nenhum processo Node.js ativo foi encontrado."
fi

echo -e "\n[2] Removendo base de dados local (ocorrencias.json)..."
if [ -f "ocorrencias.json" ]; then
    rm -f ocorrencias.json
    echo "   -> Arquivo ocorrencias.json removido com sucesso."
else
    echo "   -> O arquivo ocorrencias.json nao existia."
fi

echo -e "\n==================================================="
echo "  Ambiente limpo! Pronto para reiniciar os testes. "
echo "==================================================="
