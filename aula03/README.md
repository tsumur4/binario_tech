telemetria.js: Script principal em Node.js responsável por processar os dados de telemetria dos veículos (como mercedes.json e scania.json), calcular estatísticas (quilometragem, consumo, alertas) e gerar logs ou relatórios do sistema.

app.get(...)
É o método do Express usado para definir uma rota HTTP do tipo GET.
O que faz: Ele diz ao servidor: "Quando alguém tentar acessar/ler a URL especificada no navegador ou via chamada HTTP GET, execute o código que está aqui dentro".

app.get('/caminho-da-rota', (req, res) => { ... });
Exemplo de uso: No seu projeto, app.get('/api/v1/scania', ...) define que requisições enviadas para a URL /api/v1/scania serão processadas por essa função.

(req, res)
São os dois parâmetros principais da função de callback que lida com a rota. Eles representam a Requisição e a Resposta da comunicação HTTP.

req:
Representa o que o cliente enviou para o servidor.
Contém informações como: parâmetros da URL (req.params), dados enviados na busca (req.query), cabeçalhos, corpo da mensagem (req.body), endereço IP do cliente, etc.

res:
Representa o que o servidor vai responder de volta para o cliente.
É através do objeto res que você define o status HTTP (ex: 200, 404, 500), os cabeçalhos de resposta e o conteúdo devolvido (texto, HTML, JSON, etc.).

res.json(...)
É um método do objeto de resposta (res) fornecido pelo Express para enviar dados formatados em JSON
Define o cabeçalho HTTP da resposta como Content-Type: application/json, avisando quem fez a requisição que o formato retornado é JSON.
Finaliza e envia a resposta para o cliente.

______________________________________

mercedes.json: Arquivo de dados em formato JSON contendo leituras de telemetria específicas de veículos da marca Mercedes (ex.: velocidade, consumo de combustível, temperatura do motor, coordenadas).

scania.json: Arquivo JSON com a estrutura de dados de telemetria relativa aos veículos da marca Scania.

package.json: Manifesto do Node.js que define as metadados do projeto, dependências instaladas, scripts de execução e configurações de ambiente.

package-lock.json: Registra a árvore exata de dependências e versões instaladas pelo npm, garantindo replicabilidade entre diferentes ambientes de desenvolvimento.

testar_telemetria.sh: Shell script executável responsável por automatizar o disparo de testes, simular o envio/processamento de dados ou rodar requisições para o script principal.

relatorio.log: Arquivo de registro de log gerado após a execução dos testes ou do processamento de dados, contendo timestamps, eventos e possíveis erros.



npm install

node telemetria.js


permissão de execução ao script
chmod +x testar_telemetria.sh



Execute o script de teste:
./testar_telemetria.sh



Verifique os resultados gravados no arquivo de log:
cat relatorio.log
