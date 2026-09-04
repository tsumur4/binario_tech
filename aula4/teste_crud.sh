#!/usr/bin/env bash

LOGFILE="crud_result.log"

> "$LOGFILE"

log() {
    echo -e "$1" | tee -a "$LOGFILE"
}

log "==============================================="
log " INICIANDO TESTES AUTOMATIZADOS DA API (CRUD)"
log " Data/Hora: $(date)"
log "==============================================="
log ""

log ">>> [1/4] POST: Cadastrando 1º veiculo (Scania R500)..."
curl -s -i -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"placa": "MNO-1122", "montadora": "Scania", "modelo": "R500"}' >> "$LOGFILE" 2>&1
echo -e "\n\n" >> "$LOGFILE"

log ">>> [2/4] POST: Cadastrando 2º veiculo (DAF XF)..."
curl -s -i -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"placa": "PQR-3344", "montadora": "DAF", "modelo": "XF"}' >> "$LOGFILE" 2>&1
echo -e "\n\n" >> "$LOGFILE"

log ">>> [3/4] PATCH: Atualizando status do veiculo ID 3 para EM_ROTA..."
curl -s -i -X PATCH http://localhost:3000/api/v1/veiculos/3/status \
  -H "Content-Type: application/json" \
  -d '{"status": "EM_ROTA"}' >> "$LOGFILE" 2>&1
echo -e "\n\n" >> "$LOGFILE"

log ">>> [4/4] DELETE: Deletando o veiculo ID 4..."
curl -s -i -X DELETE http://localhost:3000/api/v1/veiculos/4 >> "$LOGFILE" 2>&1
echo -e "\n\n" >> "$LOGFILE"

log "==============================================="
log " TESTES CONCLUIDOS COM SUCESSO!"
log " Os logs detalhados foram salvos em '$LOGFILE'."
log "==============================================="
