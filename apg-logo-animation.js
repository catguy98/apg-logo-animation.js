(function () {
  class ApgLogoAnimation extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div style="
          width:100%;
          height:500px;
          background:#d8f5f1;
          border:3px solid #2fbdb5;
          border-radius:20px;
          display:flex;
          align-items:center;
          justify-content:center;
          font:32px Arial;
          color:#062644;
        ">
          APG custom element loaded
        </div>
      `;

      console.log("APG custom element loaded successfully");
    }
  }

  customElements.define("apg-logo-animation", ApgLogoAnimation);
})();
