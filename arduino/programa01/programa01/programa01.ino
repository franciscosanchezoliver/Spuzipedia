/**
 * Este programa enciende y apaga un led cada x tiempo
 */

/**
 * Este código se ejecutara una sola vez
 */
void setup() {
  // Ponemos el pin 13 (el pin digital para salida)
  pinMode(13, OUTPUT);
}

/**
 * Este código se ejecutara constantemente
 */
void loop() {
  // Para encender la salida (que en nuestro caso la hemos
  // puesto en el pin digital número 13
  digitalWrite(13, HIGH);
  //Esperamos un tiempo (en milisengudos)
  delay(1000);

  // Apagamos el led
  digitalWrite(13, LOW);
  delay(1000); //esperamos un segundo
}
