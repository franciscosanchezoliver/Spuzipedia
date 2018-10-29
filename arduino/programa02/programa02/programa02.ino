int PIN_ENTRADA = 4; //entrada para el pulsador
int PIN_SALIDA = 8;
int pulsado = LOW; // indicamos que al principio no esta pulsado el boton

void setup() {
  pinMode(PIN_ENTRADA, INPUT);
  pinMode(PIN_SALIDA, OUTPUT);
  Serial.begin(9600);      // open the serial port at 9600 bps:  
}

void loop() {
  pulsado = digitalRead(PIN_ENTRADA);
  if(pulsado == LOW){
    digitalWrite(PIN_SALIDA, HIGH);
  }else{
    digitalWrite(PIN_SALIDA, LOW);
  }
  Serial.print(pulsado);
  Serial.print("\n");
}
