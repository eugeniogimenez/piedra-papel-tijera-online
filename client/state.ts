const API_BASE_URL = process.env.RENDER_URL || "https://localhost:3000";

console.log("API_BASE_URL: ", API_BASE_URL);

const state = {
  data: {
    //data del State inicial
    playerName: null,
  },

  //SETEA EL NOMBRE DEL JUGADOR
  setPlayerName(nombre: String) {
    console.log("soy state.setPlayerName, con nombre: ", nombre);
  },

  //////////// BACK-END METHODS //////////////

  //CREA UN NUEVO USUARIO Y DEVUELVE SU ID
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
  },
};

export { state };
