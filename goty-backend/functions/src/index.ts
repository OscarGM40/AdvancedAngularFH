import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
/* dado que estoy en un ambiente node puedo instalar lo que quiera en este backend(que además usa typescript,ojo) */
import * as express from "express";
import * as cors from "cors";
const app = express();
app.use(cors({ origin: true }));


/* ruta al json que generé en Proyecto/Cuentas de usuario,generar clave */
const serviceAccount = require('./serviceAccountKey.json');

/* puedo usar firebase admin y un json como credenciales */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/* ======== FIREBASE FUNCTIONS =========== */
/* primero tengo que referenciar a mi FirestoreDB */
const db = admin.firestore();
/* no usaré functions sino un servidor express para tener más control sobre middlewares,tokens... */
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

app.get('/goty', async (req, res) => {
  /* UNO hay que referenciar una coleccion */
  const gotyCollectionRef = db.collection('goty');

  /* DOS capturo una snapshot de la colección en ese momento*/
  const docsSnapshot = await gotyCollectionRef.get();

  /* TRES leo todos los docs con la funcion data()  */
  const juegos = docsSnapshot.docs.map((doc) => doc.data());

  /* CUATRO ya puedo devolver todos los registros */
  res.status(200).json(juegos);
})

app.post('/goty/:id', async (req, res) => {
  const id = req.params.id;
  /* UNO referencio al game, no sólo a la collection */
  const gameRef = db.collection('goty').doc(id);

  /* DOSleo el game */
  /* recuerda que son los métodos get,delete,update,etc los que realmente se comunican con Firebase y por ende son Promises asíncronas */
  try {
    const gameSnap = await gameRef.get();
    /* si no existe el game */
    if (!gameSnap.exists) {
      return res.status(404).json({
        ok: false,
        message: 'No existe un juego con ese ID'
      });
    }
    /* si existe el game */
    const antes = gameSnap.data() || { votos: 0 };
    /* de nuevo update es una Promise */
    await gameRef.update({
      votos: +antes!.votos + 1
    });
    return res.json({
      ok: true,
      mensaje: `Gracias por tu voto a ${antes!.name}!`
    })

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }


})

export const api = functions.https.onRequest(app);