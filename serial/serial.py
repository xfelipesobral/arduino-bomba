import serial
import requests

# Define as variaveis iniciais
porta = "COM3" # Porta em que a placa esta conectada
transmissao = 9600 # Taxa de transmissao que a placa esta configurada
identificador = "1" # Identificador gerado pela interface
socket = "" # Endereco que ira receber o socket

# Abre porta serial para leitura
ser = serial.Serial(porta, transmissao, timeout = 1)

# Entra em looping infinito
while(True):
    linha = str(ser.readline()) # Lendo cada linha ...
    if (len(linha) > 0): # Quando ter alguma informacao na linha
        requests.post(socket, json = {identificador: linha}) # Envia mensagem para o socket