"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const express = require("express");
const path = require("path");
const cors = require("cors"); //importo cors (permite al navegador usar apis)
const nanoid_1 = require("nanoid");
// const nanoid = require("nanoid");
const app = express();
const port = process.env.PORT || 3000;
//CORS
app.use(cors()); //permite al navegador usar apis
const usersCollectionRef = db_1.firestore.collection("users");
const gameroomsCollectionRef = db_1.firestore.collection("gamerooms");
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
    const userNombre = req.body.nombre;
    usersCollectionRef
        .where("nombre", "==", userNombre)
        .get()
        .then((searchResponse) => {
        //Verifica que no haya un user con el mismo email
        if (searchResponse.empty) {
            //si está vacío (empty), lo agrega.
            usersCollectionRef.add({ nombre: userNombre }).then((newUserRef) => {
                //Devuelve un objeto con el id de usuario correspondiente
                res.status(200).json({
                    id: newUserRef.id,
                    new: true,
                });
            });
        }
        else {
            //Si el email ya estaba registrado en "users", devuelve un mensaje
            res.status(400).json({
                message: "el usuario ya está registrado",
            });
        }
    });
});
//2-CREA UN NUEVO GAMEROOM
// Crea una nueva sala de juego en Firebase RTDB y Firestore y la vincula con el
//usuario que la creó.
app.post("/gamerooms", (req, res) => {
    const { userId } = req.body; //le doy el id de firestore/users
    const { ownerName } = req.body; //le doy el id de firestore/users
    usersCollectionRef
        .doc(userId.toString()) //Crea un documento
        .get()
        .then((doc) => {
        // VERIFICA QUE EL USUARIO EXISTA EN FIRESTORE USANDO EL ID
        // Si el usuario existe, se crea un nuevo gameroom en Firebase Realtime
        if (doc.exists) {
            //CREAMOS LA REFERENCIA DEL NUEVO ROOM
            //APARECE LA RTDB
            const roomsRtdbRef = db_1.rtdb.ref("gamerooms/" + (0, nanoid_1.nanoid)(8));
            roomsRtdbRef
                //se establece un Objeto de juego predeterminado con dos jugadores
                //con valores iniciales en la sala de juego.
                .set({
                currentgame: {
                    player1: {
                        choice: "undefined",
                        online: false,
                        start: false,
                        playerName: "none",
                        playerScore: 0,
                    },
                    player2: {
                        choice: "undefined",
                        online: false,
                        start: false,
                        playerName: "none",
                        playerScore: 0,
                    },
                },
                //se establece el propietario de la sala de juego
                owner: ownerName,
                ownerId: userId,
            })
                .then(() => {
                //Guarda el ID largo, y crea un Id corto para guardar en Firestore
                const rtdbRoomsLongId = roomsRtdbRef.key; //me da el id de rtdb
                //creo un id facil para el room
                const roomIdFacil = 1000 + Math.floor(Math.random() * 999);
                const roomId = "GR" + roomIdFacil.toString();
                // se crea un documento en las gamerooms, que vincula el ID aleatorio
                // (generado en la RTDB) con un ID fácilmente recordable
                //(por ejemplo, "GR1001"). Esto se hace para que el usuario pueda
                //recordar fácilmente el ID de la sala de juego y buscarlo más tarde.
                gameroomsCollectionRef
                    .doc(roomIdFacil.toString()) //creo un documento
                    .set({
                    rtdbRoomId: rtdbRoomsLongId,
                    score: {
                        player1: {
                            name: ownerName,
                            score: 0,
                        },
                        player2: {
                            name: "none",
                            score: "none",
                        },
                    },
                })
                    //Finalmente, se devuelve el ID fácilmente recordable de la sala de
                    //juego al cliente como una respuesta JSON.
                    .then(() => {
                    res.json({
                        //el id del room en firestore es el nro facil
                        id: roomId.toString(),
                    });
                });
            });
        }
        else {
            res.status(401).json({
                message: "no exists",
            });
        }
    });
});
//EXPRESS STATIC
//Express sirve también el front (en Render). Sirve la carpte "dist"
//sin esta línea de código Render no nos daría el front
app.use(express.static(path.join(__dirname, "../dist")));
//RETURN TO INDEX.HTML
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});
//API LISTEN
app.listen(port, () => {
    console.log(`Estamos conectados al puerto: ${port}`);
    console.log("process.env.PORT ", process.env.PORT);
});
