import { rtdb } from "./rtdb";
import { ref, onValue } from "firebase/database";

const API_BASE_URL = process.env.RENDER_URL || "https://localhost:3000";

const state = {
  data: {
    //data del State inicial
    playerName: null,
    gameRoomIdFacil: null,
  },

  //GET
  getState() {
    return this.data;
  },

  listeners: [],

  //SET
  setState(newState) {
    console.log("soy state.setState, con newState: ", newState);
    this.data = newState;

    for (const callback of this.listeners) {
      callback();
    }
  },

  //SETEA EL NOMBRE DEL JUGADOR
  setPlayerName(nombre: String) {
    console.log("soy state.setPlayerName, con nombre: ", nombre);

    const currentState = this.getState();
    currentState.playerName = nombre;
    this.setState(currentState);
  },

  //setea el firestore room id corto en el state
  setGameRoomIdCorto(gameRoomId) {
    const currentState = this.getState();
    currentState.gameRoomIdFacil = gameRoomId;
    this.setState(currentState);
  },

  //////////// BACK-END METHODS //////////////

  //1-CREA UN NUEVO USUARIO Y DEVUELVE el id que le asigna firestore
  createNewUser(userData) {
    console.log("soy state.createNewUser con userData", userData);

    return fetch(API_BASE_URL + "/signup", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((finalres) => {
        return finalres;
      });
    // .catch((error) => {
    //   console.error("Se ha producido un error:", error);
    // });
  },

  //2-CREA UNA NUEVA ROOM PONIENDOLO AL USUARIO COMO OWNER
  createNewGameRoom(gameRoomData) {
    console.log("soy state.createNewGameRoom con gameRoomData", gameRoomData);

    return fetch(API_BASE_URL + "/gamerooms", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(gameRoomData),
    })
      .then((res) => {
        return res.json();
      })
      .then((finalres) => {
        return finalres;
      });
    // .catch((error) => {
    //   console.error("Se ha producido un error:", error);
    // });
  },
};

export { state };
