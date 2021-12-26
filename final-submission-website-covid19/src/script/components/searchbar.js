import Swal from "sweetalert2";
import showAlert from "../view/alert.js";
import Bedroom from "../reqdata/reqBed.js";
import "./hospital-list.js";

class Searchbar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.getProvinsi();
  }

  render() {
    this.innerHTML = `
        <div id="bedinfo" class="container-fluid" style="background-color: rgb(233, 230, 230)">
        <div class="container">
          <div class="row mb-4 pt-3">
            <h4 class="text-center gy-3">Informasi Ketersediaan Kamar Khusus Pasien Covid-19</h4>
          </div>
          <div class="row justify-content-md-center align-items-center pb-4">
            <div class="col-12 col-lg-3 mb-2">
              <strong class="text-muted fw-bold">Provinsi Rumah Sakit:</strong>
              <select id="provinsi" class="form-select form-select-sm" aria-label=".form-select-sm example">
                <option selected>Provinsi</option>
              </select>
            </div>
            <div class="col-12 col-lg-3 mb-2">
              <strong class="text-muted fw-bold">Kota Rumah Sakit:</strong>
              <select id="kota" class="form-select form-select-sm" aria-label=".form-select-sm example" disabled>
                <option selected>Kota</option>
              </select>
            </div>
            <div class="col-12 text-center mb-2 pt-3">
              <button id="search-btn" type="button" class="btn btn-info fw-bold text-light">Cari</button>
            </div>
          </div>
        </div>
      </div>`;

    document.getElementById("provinsi").addEventListener("change", this.getKota);
    document.getElementById("search-btn").addEventListener("click", this.onBtnSubmit);
  }

  async getProvinsi() {
    try {
      const selectProv = document.getElementById("provinsi");

      // request data
      const data = await Bedroom.provinces();

      // generate data pada halaman website
      selectProv.innerHTML =
        `<option selected>Provinsi</option>` +
        data.map((e) => `<option value="${e.id}">${e.name}</option>`).reduce((acc, curr) => acc + curr);
    } catch (err) {
      showAlert("error", "Something Wrong!", err);
    }
  }

  async getKota() {
    try {
      const selectCities = document.getElementById("kota");
      const provValue = document.getElementById("provinsi").value;

      // request data
      const data = await Bedroom.cities(provValue);

      // hidupkan select element
      selectCities.removeAttribute("disabled");

      // generate data pada halaman website
      selectCities.innerHTML =
        `<option selected>Kota</option>` +
        data.map((e) => `<option value="${e.id}">${e.name}</option>`).reduce((acc, curr) => acc + curr);
    } catch (err) {
      showAlert("error", "Something Wrong!", err);
    }
  }

  async onBtnSubmit() {
    try {
      const provValue = document.getElementById("provinsi").value;
      const cityValue = document.getElementById("kota").value;

      // request data
      const data = await Bedroom.hospitals(provValue, cityValue);

      //close loading popup
      Swal.close();

      // hilangkan element h3
      const headerText = document.getElementById("header-text");
      if (headerText) {
        headerText.remove();
      }

      // create element card pada hospital-list
      const containerContent = document.getElementById("container-content");
      const hospitalList = document.querySelector("hospital-list");
      hospitalList.hospitals = data;
      containerContent.innerHTML = "";
      containerContent.appendChild(hospitalList);
    } catch (err) {
      showAlert("error", "Something Wrong!", err);
    }
  }
}

customElements.define("search-bar", Searchbar);
