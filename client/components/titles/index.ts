class WelcomePageTitle extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    var shadow = this.attachShadow({ mode: "open" });

    //texto
    var text = document.createElement("h1");
    text.classList.add("title");
    text.textContent = this.textContent;

    shadow.appendChild(text);

    // STYLES
    var style = document.createElement("style");
    style.textContent = `
      
    .title{
      margin: 0;
      box-sizing: border-box;
      font-family: 'Zilla Slab', serif;
      font-weight: 700;
      text-shadow: 0 0 2px black;
      font-size: 75px;
      color: #009048;
      width: 260px;
      letter-spacing: 2px
    }
    @media (min-width: 750px){
          .title{
            font-size: 80px;
            width: 270px;
          }
    }
    `;
    shadow.appendChild(style);
  }
}

customElements.define("welcome-title", WelcomePageTitle);
