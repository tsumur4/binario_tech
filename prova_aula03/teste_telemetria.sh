#!/bin/bash
echo "======================"
echo "auditoria prova_aula03"
echo "======================"

echo -e "\n[1] testando rota scania"
curl -s http://localhost:3019/api/v1/scania | jq .

echo -e "\n[2] Testando rota Mercedes-Benz..."
curl -s http://localhost:3019/api/v1/mercedes | jq .

echo -e "\n[3] Testando rota Volkswagen..."
curl -s http://localhost:3019/api/v1/vw | jq .

echo -e "\n[4] Testando rota Volvo..."
curl -s http://localhost:3019/api/v1/volvo | jq .

echo -e "\n-----------------------------------------"
echo "Auditoria finalizada com sucesso!"

