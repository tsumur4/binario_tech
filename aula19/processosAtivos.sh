#!/bin/bash

pm2 save

echo "a configuração para o arranque automático com o sistema foi ativada"
pm2 startup
