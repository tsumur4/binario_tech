#!/bin/bash

# Arquivo de saída
LOG_FILE="auditoria.log"

# URL base do servidor
BASE_URL="http://localhost:3000/api/v1/telemetria"

# Função para registrar e executar as requisições
executar_teste() {
  local descricao="$1"
  local metodo="$2"
  local endpoint="$3"
  local dados="$4"

  echo "========================================" >> "$LOG_FILE"
  echo "Data/Hora: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_FILE"
  echo "Teste: $descricao" >> "$LOG_FILE"
  echo "Requisição: $metodo $endpoint" >> "$LOG_FILE"
  echo "----------------------------------------" >> "$LOG_FILE"

  if [ -n "$dados" ]; then
    curl -s -X "$metodo" "$BASE_URL$endpoint" \
      -H "Content-Type: application/json" \
      -d "$dados" -w "\nStatus HTTP: %{http_code}\n" >> "$LOG_FILE"
  else
    curl -s -X "$metodo" "$BASE_URL$endpoint" \
      -w "\nStatus HTTP: %{http_code}\n" >> "$LOG_FILE"
  fi

  echo "" >> "$LOG_FILE"
}

# Limpa ou cria o arquivo de log do zero
echo "--- INÍCIO DA AUDITORIA DE ROTAS ---" > "$LOG_FILE"

# 1. Rotas da Scania
executar_teste "Listar frota Scania" "GET" "/scania"
executar_teste "Buscar Scania por ID" "GET" "/scania/1"
executar_teste "POST Scania - VIN Inválido (Deve falhar)" "POST" "/scania" '{"modelo": "R450", "vin": "123INVALIDO"}'
executar_teste "POST Scania - VIN Válido" "POST" "/scania" '{"modelo": "R450", "vin": "ABC123456789"}'

# 2. Rotas da Mercedes-Benz
executar_teste "Listar frota Mercedes" "GET" "/mercedes"
executar_teste "Listar apenas Actros" "GET" "/mercedes?modelo=Actros"
executar_teste "Buscar Mercedes por ID" "GET" "/mercedes/1"
executar_teste "POST Mercedes - VIN Inválido (Deve falhar)" "POST" "/mercedes" '{"modelo": "Atego", "vin": "CURTO"}'
executar_teste "POST Mercedes - VIN Válido" "POST" "/mercedes" '{"modelo": "Actros", "versao": "2651", "vin": "123456789012"}'

# 3. Teste de Rota Inexistente (404)
executar_teste "Testar Rota 404" "GET" "/volvo"

echo "Auditoria concluída! Resultados salvos em '$LOG_FILE'."
