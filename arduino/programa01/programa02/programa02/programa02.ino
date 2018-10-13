int PIN_SALIDA = 3;

void setup() {
  pinMode(PIN_SALIDA ,OUTPUT);
  digitalWrite(PIN_SALIDA, LOW); // Para que empiece en pagado
}

void loop() {
    if( digitalRead(PIN_SALIDA) == HIGH ){
      digitalWrite(PIN_SALIDA, LOW);
    }
    else{
      digitalWrite(PIN_SALIDA, HIGH);
    }
    delay(1000);
}
