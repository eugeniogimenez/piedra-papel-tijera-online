import { state } from "../../state";

const piedraIMG = require("url:../../assets/piedra.svg");
const papelIMG = require("url:../../assets/papel.svg");
const tijeraIMG = require("url:../../assets/tijera.svg");
const backgroundIMG = require("url:../../assets/fondo.svg");

class NewRoomPage extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  //Se crea el connectedCallback
  connectedCallback() {
    //renderiza la page
    this.render();
  }

  //LISTENERS
  addListeners() {
    //Listener del boton "nuevo juego";
    const pageForm = this.shadow.querySelector(".page-form") as any;
    pageForm.addEventListener("submit", (e: any) => {
      e.preventDefault();
      const playerName = e.target.playername.value; //input del form

      //Verifica que no se pueda ingresar con un form vacío
      //trim(): elimina al principio y al final los espacios en blanco que pueda
      //introducir el usuario
      if (playerName.trim() !== "") {
        state.setPlayerName(playerName);

        const newUserData = {
          name: playerName,
        };

        const newUserPromise = state.createNewUser(newUserData);

        //Si el nombre existe arroja una advertencia al usuario
        newUserPromise.then((res) => {
          console.log("res: ", res);

          // if (res.message) {
          //   alert(res.message);
          // }
        });
      }
    });
  }

  render() {
    //se crea el div donde se alojara la page
    const mainPage = document.createElement("main");
    mainPage.classList.add("welcome-container");

    //Se renderiza
    mainPage.innerHTML = `
    <welcome-title>Piedra Papel o Tijera</welcome-title>

    <form class="page-form">
      <label class="name-label">Tu Nombre</label>
      <input type="text" class="name-input" name="playername">
      <button class="submit-button">Empezar</button>
    </form>

    <div class="hands-container">
        <img class="welcome-hands" src="${piedraIMG}">
        <img class="welcome-hands" src=${papelIMG}>
        <img class="welcome-hands" src="${tijeraIMG}">
    </div>
    `;

    this.shadow.appendChild(mainPage);

    // STYLES
    var style = document.createElement("style");
    style.textContent = `
      
    .welcome-container {
      padding-top: 30px;
      height: 100vh;
      background-image: url(${backgroundIMG});
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    
    @media (max-width: 330px) {
      .welcome-container {
        padding-top: 0px;
        gap: 0px;
      }
    }
    @media (min-width: 370px) {
      .welcome-container {
        gap: 1%
      }
    }
    @media (min-width: 750px) {
      .welcome-container {
        padding-top: 40px;
        gap: 4%;
      }
    }
    .hands-container {
      display: flex;
      gap: 35px;
      bottom: -5%;
    }
    @media (min-width: 750px) {
      .hands-container {
        bottom: -4%;
        gap: 70px;
      }
    }
    
    @media (max-width: 330px) {
      .welcome-hands {
        height: 120px;
      }
    }
    @media (min-width: 370px) {
      .welcome-hands {
        height: 170px;
      }
    }
    
    @media (min-width: 750px) {
      .welcome-hands {
        height: 190px;
      }
    }
    .page-form{
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    @media (max-width: 400px) {
      .page-form {
       gap: 2px;
      }
    }
    .name-label{
      font-size: 45px;
      text-align: center;
      letter-spacing: 0.05em;
      font-family: Odibee Sans;
      font-size: 45px;
      line-height: 50px;
    }
    .name-input,.submit-button{
      box-sizing: border-box;
      height: 80px;
      width: 310px;
      line-height: 50px;
      font-family: Odibee Sans;
      padding: 0px 10px 0px 10px;
      font-size: 45px;
      cursor: pointer;
      letter-spacing: 1px;
    }
    
    @media (max-width: 330px) {
      .name-input,.submit-button{
        box-sizing: border-box;
        height: 70px;
        width: 300px;
        font-family: Odibee Sans;
        padding: 0px 10px 0px 10px;
        font-size: 35px;
        cursor: pointer;
        letter-spacing: 1px;
      }
    }
    .name-input{
      background: #FFFFFF;
      border: 10px solid #182460;
      border-radius: 10px;
      text-align: center;
    }
    .submit-button{
      background-color: #006CFC;
      border: 10px solid #001997;
      border-radius: 15px;
      color: #D8FCFC;
    }
    .submit-button:active{
      background-color: #001997;
      border: 10px solid #006CFC;
      color: white
    }
    
    @media (min-width: 750px){
      .submit-button,.name-input{
        width: 340px;
      }
    }
    `;
    this.shadow.appendChild(style);

    //Se agregan los listeners
    this.addListeners();
  }
}

customElements.define("newroom-page", NewRoomPage);
