#!/bin/bash

# Define as rotas que serão testadas
ROTAS=("/status" "/scania/info" "/vw/info")
URL_BASE="http://localhost:3000"

echo "=========================================="
echo "   INICIANDO TESTES DO SERVIDOR NODE.JS   "
echo "=========================================="
echo ""

for ROTA in "${ROTAS[@]}"; do
  # Captura a data e hora atual no formato HH:MM:SS
  HORARIO=$(date +"%H:%M:%S")
  
  echo "------------------------------------------"
  echo "[$HORARIO] Testando rota: $ROTA"
  echo "------------------------------------------"
  
  # Executa a requisição usando httpie (ou curl)
  http GET "$URL_BASE$ROTA"

done

echo "=========================================="
echo "         TESTES CONCLUÍDOS!"
echo "=========================================="
