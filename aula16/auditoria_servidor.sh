#!/bin/bash

LOG="processos.log"

echo "===========AUDITORIA-PROCESSOS===========" > "$LOG"
echo " " >> "$LOG"

echo "Iniciando processo de log da auditoria" 

ps aux | grep node >> "$LOG"

sleep 2
echo "fim dos testes, os processos foram salvos em $LOG"

cat $LOG

