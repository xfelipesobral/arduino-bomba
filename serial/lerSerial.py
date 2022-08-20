import serial
# import requests

# Define as variaveis iniciais
porta = "/dev/cu.usbmodem11201" # Porta em que a placa esta conectada
transmissao = 9600 # Taxa de transmissao que a placa esta configurada
identificador = "1" # Identificador gerado pela interface
socket = "" # Endereco que ira receber o socket
conectado = False

while(conectado == False):
    try:
        # Abre porta serial para leitura
        ser = serial.Serial(porta, transmissao)
        print("Conectado em: "+ser.name)
        conectado = True
    except:
        print("Tentando se conectar...")

# Entra em looping infinito
while(True):
    linha = str(ser.readline()) # Lendo cada linha ...
    if (len(linha) > 0): # Quando ter alguma informacao na linha
        print(linha)
        #    requests.post(socket, json = {identificador: linha}) # Envia mensagem para o socket