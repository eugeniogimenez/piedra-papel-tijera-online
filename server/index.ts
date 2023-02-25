import { firestore, rtdb } from "./db";

import * as express from "express";

const app = express();
const port = process.env.PORT || 3000;

const usersCollectionRef = firestore.collection("users");
const gameroomsCollectionRef = firestore.collection("gamerooms");

//es para que cada endpoint pueda recibir los "req"
app.use(express.json());

//EndPoint para probar deploy
app.get("/env", (req, res) => {
  res.json({
    environment: process.env.ENV,
  });
});

//ENDPOINTS

//1-SIGNUP (Crea un usuario en Firestore)
app.post("/signup", (req, res) => {
  const userEmail = req.body.email;
  const userNombre = req.body.nombre;

  usersCollectionRef
    .where("email", "==", userEmail)
    .get()
    .then((searchResponse) => {
      //Verifica que no haya un user con el mismo email
      if (searchResponse.empty) {
        //si está vacío (empty), lo agrega.
        usersCollectionRef
          .add({ email: userEmail, nombre: userNombre })
          .then((newUserRef) => {
            //Devuelve un objeto con el id de usuario correspondiente
            res.status(200).json({
              id: newUserRef.id,
              new: true,
            });
          });
      } else {
        //Si el email ya estaba registrado en "users", devuelve un mensaje
        res.status(400).json({
          message: "el usuario ya está registrado",
        });
      }
    });
});

//API LISTEN
app.listen(port, () => {
  console.log(`Estamos conectados al puerto: ${port}`);
  console.log("process.env.PORT ", process.env.PORT);
});
