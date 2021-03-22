////Code developed by Steve Hudak to be used//////
////with Sheridan IxD Thinger guide 2////////

#include <ThingerESP8266.h>
#include <ESP8266WiFi.h>
#include <Servo.h>

#define USERNAME "Gergox96"
#define DEVICE_ID "esp8266"
#define DEVICE_CREDENTIAL "VIQwr&_i6!EjVksq"

#define SSID "Stewie"
#define SSID_PASSWORD "tsifree1"

ThingerESP8266 thing(USERNAME, DEVICE_ID, DEVICE_CREDENTIAL);

// digital pin, pin that goes to your LED
#define LED1 13
#define LED2 12
#define SERVO1_PIN 16
#define SERVO2_PIN 4
#define SERVO3_PIN 5
#define SERVO4_PIN 2

Servo servo1;
Servo servo2;
Servo servo3;
Servo servo4;

int i = 0;

void setup() {
  Serial.begin(115200);
  
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(SERVO1_PIN, OUTPUT);
  pinMode(SERVO2_PIN, OUTPUT);
  pinMode(SERVO3_PIN, OUTPUT);
  pinMode(SERVO4_PIN, OUTPUT);

  servo1.attach(SERVO1_PIN);
  servo1.attach(SERVO2_PIN);
  servo1.attach(SERVO3_PIN);
  servo1.attach(SERVO4_PIN);

  thing.add_wifi(SSID, SSID_PASSWORD);

  // pin control example (i.e. turning on/off a light, a relay, etc)
  thing["led1"]<< digitalPin(LED1);
  thing["led2"]<< digitalPin(LED2);

  // SERVO CONTROL //
  ///// stop speed
  thing["stop"] << [] (pson & in) {

    if (!in.is_empty()) {

      servo1.detach();
      servo2.detach();
      servo3.detach();
      servo4.detach();

      servo1.attach(SERVO1_PIN);
      servo2.attach(SERVO2_PIN);
      servo3.attach(SERVO3_PIN);
      servo4.attach(SERVO4_PIN);
    }
    in = false;
  };

  ///// slow forward speed
  thing ["forward"] << [] (pson & in) {

    if (!in.is_empty()) {
      servo1.write(5);             
      servo2.write(10);    
      servo3.write(30);
      servo4.write(90); 
    }
    in = false;
  };

   thing ["backward"] << [] (pson & in) {

    if (!in.is_empty()) {

      for (int i = 0; i < 180; i++) {
      servo1.write(i);             
      servo2.write(i);    
      servo3.write(i);
      servo4.write(i);        
    delay(10);                     
  }
    for (i = 180; i > 0; i--) {
       servo1.write(i);               
       servo2.write(i);    
       servo3.write(i);
       servo4.write(i);         
    delay(10);                     
  }
    }
    in = false;
  };
  
}

void loop() {
  thing.handle();

// THIS IS HOW THE CODE WORKED FROM V1 OF CLICKRACE  
//  for (int i = 0; i < 180; i++) {
//      servo1.write(i);             
//      servo2.write(i);    
//      servo3.write(i);
//      servo4.write(i);        
//    delay(10);                     
//  }
//    for (i = 180; i > 0; i--) {
//       servo1.write(i);               
//       servo2.write(i);    
//       servo3.write(i);
//       servo4.write(i);         
//    delay(10);                     
//  }

}
