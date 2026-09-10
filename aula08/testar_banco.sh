echo "=================================================="
echo " Auditoria de Bano de dados sqlite - binario tech"
echo "=================================================="

echo -e "\n[1] Cadastrando veiculos Scania..."
curl -s -X POST http://localhost:3019/api/v1/veiculos \
	-H "Content-Type: application/json" \
	-d '{"placa":"SCA-2026","montadora":"Scania","modelo":"R500"}' | jq . 

echo -e "\n[2] Cadastrando veiuclo Mercedes-benz..."
curl -s -X POST http://localhost:3019/api/v1/veiculos \
	-H "Content-Type: application/json" \
	-d '{"placa":"MBB-2026","montadora":"Mercedes-Benz","modelo":"Actross 2651"}' | jq . 

echo -e "\n[3] Listando todos os veiculos gravados no banco relacional..."
curl -s http://localhost:3019/api/v1/veiculos | jq . 
