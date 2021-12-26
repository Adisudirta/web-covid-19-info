import showAlert from "../view/alert.js";
import logo from "../../images/logo.svg";

class Navbar extends HTMLElement {
  connectedCallback() {
    this.stat = this.getAttribute("stat") || "#";
    this.bed = this.getAttribute("bed") || "#";
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
      <div class="container">
        <a class="navbar-brand" href="./index.html">
          <img id="covid-logo" alt="logo" width="35" />
          <span id="brand" class="fw-bolder">COVID-19 INFO</span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 120px">
            <li class="nav-item mx-3">
              <a class="nav-link fw-bold" aria-current="page" href="${this.stat}">Statistik</a>
            </li>
            <li class="nav-item mx-3">
              <a class="nav-link fw-bold" href="${this.bed}">Ketersediaan Kamar</a>
            </li>
            <li class="nav-item mx-3">
              <a id="about" class="nav-link fw-bold" href="#">Tentang</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;

    const navLogo = document.getElementById("covid-logo");
    navLogo.src = logo;

    const about = document.getElementById("about");
    about.addEventListener("click", function () {
      showAlert(
        "info",
        "Tentang Web Ini",
        "Semua data yang ditampilkan pada website ini merupakan hasil dari data John Hopkins University CSSE dan Satyawikananda."
      );
    });
  }
}

customElements.define("nav-bar", Navbar);
