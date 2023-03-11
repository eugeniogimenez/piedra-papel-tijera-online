console.log("soy rtdb");

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, onValue } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "7kmFDlHlyJksezOqDM8al53hTJjrUXeiIb0bRmLv",
  authDomain: "dwf-m6-desafio-final-elg.firebaseapp.com",
  databaseURL: "https://dwf-m6-desafio-final-elg-default-rtdb.firebaseio.com",
};

//Inicializamos firebase
const app = initializeApp(firebaseConfig);

// Llamamos a la funcion getDatabase para llamar a la rtdb
const rtdb = getDatabase(app);

export { rtdb };

// const gameRoomsRef = ref(rtdb, "/gamerooms/2d6AakVq");

// //Con onValue escucho los cambios en la rtdb
// onValue(gameRoomsRef, (snapshot) => {
//   const valor = snapshot.val();
//   console.log("snapshot.val: ", valor);
// });
