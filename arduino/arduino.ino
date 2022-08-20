#include <Keypad.h>

const byte LINHAS = 4;
const byte COLUNAS = 3;

const int BUZZER = 13;
const int LEDVERMELHO = 11;
const int LEDVERDE = 12;

const int INTERVALO = 1000;

char teclas[LINHAS][COLUNAS] = {
  {'1','2','3'},
  {'4','5','6'},
  {'7','8','9'},
  {'*','0','#'}
};

byte pinosLinha[LINHAS] = {7, 2, 3, 5};
byte pinosColuna[COLUNAS] = {6, 8, 4};

Keypad teclado = Keypad(makeKeymap(teclas), pinosLinha, pinosColuna, LINHAS, COLUNAS);

unsigned long ultimoTempo = 0;
int ciclo = 1;
bool notificouConectado = false;

void setup() {
  pinMode(BUZZER, OUTPUT);

  pinMode(LEDVERMELHO, OUTPUT);
  pinMode(LEDVERDE, OUTPUT);

  digitalWrite(LEDVERDE, HIGH);

  Serial.begin(9600);
}

void loop() {
  char tecla = teclado.getKey();
  unsigned long tempoAtual = millis();
  String mensagem = "";

  bool deuIntervalo = tempoAtual - ultimoTempo >= INTERVALO;
  bool meioIntervalo = tempoAtual - ultimoTempo >= (INTERVALO / 2);

  int estadoLedVermelho = digitalRead(LEDVERMELHO);
  int estadoLedVerde = digitalRead(LEDVERDE);

  if (!notificouConectado) {
    Serial.println("conectado");
    notificouConectado = true;
  }

  if (meioIntervalo && estadoLedVermelho) {
    digitalWrite(LEDVERMELHO, LOW);
    digitalWrite(LEDVERDE, LOW);
  }

  if (deuIntervalo) {
    mensagem = "ciclo=";
    Serial.println(mensagem + ciclo);
    ciclo += 1;
    
    digitalWrite(LEDVERMELHO, HIGH);
    
    ultimoTempo = tempoAtual;

    tone(BUZZER, 600, 100);
  }

  if (tecla) {
    digitalWrite(LEDVERDE, HIGH);    
    Serial.println(tecla);
  }
}
