#include <Keypad.h>

// Teclado
const byte LINHAS = 4;
const byte COLUNAS = 3;

// Buzzer e leds
const int BUZZER = 13;
const int LEDVERMELHO = 11;
const int LEDVERDE = 12;

// Intervalo do ciclo (1 segundo)
const int INTERVALO = 1000;

// Senha do desarme
const String AVALIACAO[4] = {"5", "0", "#", "1"};

// Matriz do teclado
char teclas[LINHAS][COLUNAS] = {
  {'1', '2', '3'},
  {'4', '5', '6'},
  {'7', '8', '9'},
  {'*', '0', '#'}
};

// Define pinos do teclado
byte pinosLinha[LINHAS] = {7, 2, 3, 5};
byte pinosColuna[COLUNAS] = {6, 8, 4};

// Inicializa teclado
Keypad teclado = Keypad(makeKeymap(teclas), pinosLinha, pinosColuna, LINHAS, COLUNAS);

// Estados
unsigned long ultimoTempo = 0; // Salva ultimo tempo para calcular o proximo ciclo
int ciclo = 1; // Quantidade de ciclos rodados (Max: 60 = 1 minuto)
bool notificouConectado = false; // Se notificou quando a placa foi conectada
bool notificouStatusFinal = false;
String digitado[4] = {"", "", "", ""}; // Estado da resposta atual
int situacao = 0; // 0 -> Contando para explosao, 1 -> Explodiu, 2 -> Conseguiu desarmar
String mensagem = ""; // Escrever mensagem na serial

// Manipula os ciclos, tocando o buzzer.. contando.. notificando..
void manipulaCiclo(unsigned long tempoAtual) {
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

    tone(BUZZER, 1000, 100);
  }
}

// Pega campo vazio da resposta para poder inserir a sequencia
int campoVazio() {
  for (int i = 0; i < 4; i++) {
    if (digitado[i] == "") {
      return i;
    }
  }

  return 4;
}

// Quando a bomba esta armada, roda ciclo
void rodaCiclo() {
  // Pega tecla do tick
  char tecla = teclado.getKey();

  // Conta um novo ciclo
  manipulaCiclo(millis());

  // Se clicou em uma tecla
  if (tecla) {
    mensagem = "teclas=";

    int indiceCampoVazio = campoVazio();

    if (indiceCampoVazio != 4) {
      digitado[indiceCampoVazio] = tecla;
    }

    // Confere o estado
    for (int i = 0; i < 4; i++) {
      if (digitado[i] != "") {

        if (digitado[i] != AVALIACAO[i]) {
          situacao = 1;
        } else if (i == 3) {
          situacao = 2;
        }

      }

      mensagem += digitado[i];
    }

    mensagem += "=";

    digitalWrite(LEDVERDE, HIGH); // Sinaliza que o evento foi computado
    Serial.println(mensagem + situacao);
  }
}

// Bomba desarmada
void desarmou() {
  digitalWrite(LEDVERDE, HIGH);
  digitalWrite(LEDVERMELHO, LOW);

  tone(BUZZER, 500, 100);
  delay(200);
  tone(BUZZER, 500, 100);
}

// Bomba explodiu
void explodiu() {
  digitalWrite(LEDVERMELHO, HIGH);
  digitalWrite(LEDVERDE, LOW);
  tone(BUZZER, 100, 100000);
}

// Inicializa placa
void setup() {
  pinMode(BUZZER, OUTPUT);

  pinMode(LEDVERMELHO, OUTPUT);
  pinMode(LEDVERDE, OUTPUT);

  digitalWrite(LEDVERDE, HIGH);

  Serial.begin(9600);
}

// Inicia bomba...
void loop() {
  // Tempo maximo
  if (ciclo > 60) {
    situacao = 1
  }
  
  // Checar status
  if (situacao != 0) {
    if (!notificouStatusFinal) {
      notificouStatusFinal = true;
      mensagem = "situacao=";
      Serial.println(mensagem + situacao);

      if (situacao == 2) {
        desarmou();
      } else {
        explodiu();
      }
    }
  } else {
    rodaCiclo();
  }
}
