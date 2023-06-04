#include <Arduino.h>
#include <WiFi.h>
#include <FirebaseESP32.h>


//Change to your Firebase RTDB project ID e.g. Your_Project_ID.firebaseio.com
#define FIREBASE_HOST "כאן לשים כתובת השרת" 
//Change to your Firebase RTDB secret password
#define FIREBASE_AUTH "כאן לשים מפתח סודי של שרת"


#define WIFI_SSID "Kinneret College"
#define WIFI_PASSWORD "סיסמת אינטרנט"


#define ledpin 2


//Define Firebase Data objects
FirebaseData fbdo;
int FromFB,Fromsensor;
bool a=false;



/*  ------------- functions decleration---------------------*/
void blink1();


/*-----------------------------------------------------------*/


void setup()
{
  pinMode(ledpin,OUTPUT);
  Serial.begin(115200);



  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();


 Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
 Firebase.reconnectWiFi(true);


}


void loop()
{
 //פה אנחנו מושיכם מספר שלם מהפיירבייס ומדפיסים אותו על המסך הסריאלי
    if (Firebase.getInt(fbdo,"שם משתנה שמגיע מהפיירביס"))
   {
           FromFB = fbdo.intData();
             Serial.println(FromFB);
      }
  delay(2);
//בחלק זה אנחנו מעלים אל הפיירבייס מספר שלם שעולה באחד כל חצי שניה, מגיע עד 179 ואז מתאפס
for(int i=0; i<180;i++){
    Firebase.setInt(fbdo, "שם ענף המקבל מידע בפיירבייס", i);
 delay(500);
}
  fbdo.clear();
    blink1();

}


/*------------------------functions---------------------------*/


void blink1()
{
  a=not a;
  if (a==true)
  {
    digitalWrite(ledpin,HIGH);


  }
  else
  {
    digitalWrite(ledpin,LOW);


  }
}


