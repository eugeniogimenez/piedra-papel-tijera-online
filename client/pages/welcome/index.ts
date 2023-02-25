import { Router } from "@vaadin/router";

const piedraIMG = require("url:../../assets/piedra.svg");
const papelIMG = require("url:../../assets/papel.svg");
const tijeraIMG = require("url:../../assets/tijera.svg");
const backgroundIMG = require("url:../../assets/fondo.svg");

class Home extends HTMLElement {
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

  addListeners() {
    //Listener del boton "nuevo juego";
    const newGameButton = this.shadow.querySelector(".newgame-button");
    newGameButton.addEventListener("click", () => {
      Router.go("./newroom");
    });
  }

  render() {
    //se crea el div donde se alojara la page
    const mainPage = document.createElement("main");
    mainPage.classList.add("welcome-container");

    //Se renderiza
    mainPage.innerHTML = `
    <welcome-title>Piedra Papel o Tijera</welcome-title>
    <div class="menu-div">
        <menu-button class="newgame-button">Nuevo juego</menu-button>
        <menu-button class="enter-room-button">Ingresar a una sala</menu-button>
    </div>
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
      
      .welcome-container{
        border: solid;
        background-color: blue;
        padding-top: 30px;
        height: 100vh;
        background-image: url(${backgroundIMG});
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 4%;
      }

      @media (min-width: 310px){
        .welcome-container{
          background-color: red;
          padding-top: 0px;
          gap: 10px;
        }
      }
      @media (min-width: 370px){
        .welcome-container{
          background-color: yellow;
          padding-top: 30px;
          gap: 3%;
        }
      }
      @media (min-width: 750px){
        .welcome-container{
          background-color: green;
          padding-top: 40px;
          gap: 4%;
        }
      }

      
      .hands-container{
        border: solid;
        background-color: pink;
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
      .menu-div{
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      @media (max-width: 400px) {
        .menu-div {
         gap: 2px;
        }
      }
    `;

    //Agrego los estilos
    this.shadow.appendChild(style);

    //Se agregan los listeners
    this.addListeners();
  }
}

customElements.define("home-page", Home);
