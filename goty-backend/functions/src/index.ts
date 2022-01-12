import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
/* ruta al json que generé en Proyecto/Cuentas de usuario,generar clave */
const serviceAccount = require('./serviceAccountKey.json');

/* puedo usar firebase admin y un json como credenciales */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


// FIREBASE FUNCTIONS
/* primero tengo que referenciar a mi FirestoreDB */
const db = admin.firestore();

 export const getGOTY = functions.https.onRequest(
   async (request, response) => {
    /* UNO hay que referenciar una coleccion */
   const gotyCollectionRef = db.collection('goty');
   
   /* DOS capturo una snapshot de la colección en ese momento*/
   const docsSnapshot = await gotyCollectionRef.get();
   
   /* TRES dentro de esa snapshots tengo la propiedad docs con todos los documentos.Pero para leer uno,es decir para leer su contenido se le debe aplicar la funcion data()  */
   const juegos = docsSnapshot.docs.map((doc) => doc.data());
   /* CUATRO ya puedo devolver todos los registros */
   response.status(200).json(juegos);
 });
