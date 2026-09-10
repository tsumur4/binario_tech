#!/bin/bash

# Arquivo de log de saída
LOG_FILE="audit_seguranca.log"

# Limpa/Cria o arquivo de log com o cabeçalho
echo "=== AUDITORIA DE SEGURANÇA BINARIO TECH - $(date) ===" > "$LOG_FILE"
echo "" >> "$LOG_FILE"

echo "Iniciando testes de segurança..."

# 3 Tentativas SEM chave de API (esperado: 401 Unauthorized)
for i in {1..3}; do
  echo "--- Tentativa $i: Acesso SEM chave de API ---" >> "$LOG_FILE"
  curl -i -X GET http://localhost:3000/api/v1/motoristas >> "$LOG_FILE" 2>&1
  echo -e "\n" >> "$LOG_FILE"
done

# 1 Tentativa COM chave de API válida (esperado: 200 OK)
echo "--- Tentativa 4: Acesso COM chave de API válida ---" >> "$LOG_FILE"
curl -i -X GET http://localhost:3000/api/v1/motoristas \
  -H "x-api-key: binario-tech-secret-2026" >> "$LOG_FILE" 2>&1
echo -e "\n" >> "$LOG_FILE"

echo "=== FIM DA AUDITORIA ===" >> "$LOG_FILE"

echo "Testes concluídos! Os resultados foram gravados em $LOG_FILE"
