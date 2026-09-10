#!/bin/bash

echo "=============================================="
echo " AUDITORIA DE DOCUMENTOS NOSQL - BINARIO TECH"
echo "=============================================="

echo -e "\n[1] criando Alerta Critico no mongoDB..."
curl -s -X POST http://localhost:3019/api/v1/alertas \
	-H "Content-Type: application/json" \
	-d '{ "equipamentoId": "SCANIA-R500-01"
	"nivelSeveridade": "Critico",
	"temperaturaMedida": 102.5,
	"metadados": {
	"localizacao": "Rod. Anhanguera - Km 88",
	"motorista": "Carlos Silva" }
}' | jq .

echo -e "\n[2] Consultando Coleção de Alerta..."
curl - s http://localhost:3019/api/v1/alertas \ jq .
