import numeral from "numeral";
import showAlert from "../view/alert.js";
import Statistik from "../reqdata/reqStat.js";
import hero from "../../images/person-fight-covid.jpg";

class Banner extends HTMLElement {
  connectedCallback() {
    this.render();
    this.getData();
  }

  render() {
    this.innerHTML = `
        <div id="statistik" class="banner container">
        <div class="row">
          <div class="col">
            <h6 id="last-update" class="text-muted text-center">Update Terakhir Data Statistik: ...</h6>
          </div>
        </div>
        <div class="row align-items-center">
          <!-- Hero Image -->
          <div class="col-12 col-lg-7">
            <img id="hero" alt="person-fight-covid" style="width: 100%" />
          </div>
          <!-- --- -->
  
          <!-- List Data Banner -->
          <div class="col-12 col-lg-5">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <h4 class="fw-bold">Statistik Global COVID-19</h4>
                </div>
                <div class="col-12 my-2">
                  <!-- Card Positif Section -->
                  <div class="card bg-warning bg-gradient shadow">
                    <div class="card-body">
                      <h6 class="card-title fw-bold">Positif:</h6>
                      <div id="confirmed">
                        <div class="d-flex align-items-center">
                          <strong class="text-light">Menyiapkan Data...</strong>
                          <div class="spinner-border text-light ms-auto" role="status" aria-hidden="true"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- --- -->
                </div>
                <div class="col-12 my-2">
                  <!-- Card Recovered Section -->
                  <div class="card bg-success bg-gradient shadow">
                    <div class="card-body">
                      <h6 class="card-title fw-bold">Sembuh:</h6>
                      <div id="recovered">
                        <div class="d-flex align-items-center">
                          <strong class="text-light">Menyiapkan Data...</strong>
                          <div class="spinner-border text-light ms-auto" role="status" aria-hidden="true"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- --- -->
                </div>
                <div class="col-12 my-2">
                  <!-- Card Deaths Section -->
                  <div class="card bg-danger bg-gradient shadow">
                    <div class="card-body">
                      <h6 class="card-title fw-bold">Meninggal:</h6>
                      <div id="deaths">
                        <div class="d-flex align-items-center">
                          <strong class="text-light">Menyiapkan Data...</strong>
                          <div class="spinner-border text-light ms-auto" role="status" aria-hidden="true"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- --- -->
                </div>
              </div>
            </div>
          </div>
          <!-- ---- -->
        </div>
      </div>`;

    document.getElementById("hero").src = hero;
  }

  async getData() {
    try {
      const lastUpdate = document.getElementById("last-update");
      const confirmed = document.getElementById("confirmed");
      const recovered = document.getElementById("recovered");
      const deaths = document.getElementById("deaths");

      // request data
      const data = await Statistik.reqBanner();

      // rapikan format angka
      const confirmedValue = numeral(data.confirmed.value).format("0,0");
      const recoveredValue = numeral(data.recovered.value).format("0,0");
      const deathsValue = numeral(data.deaths.value).format("0,0");

      lastUpdate.innerHTML = `Update Terakhir Data Statistik: ${data.lastUpdate.slice(0, 10)}`;
      confirmed.innerHTML = `<h3 class="text-light fw-bolder">${confirmedValue}</h3>`;
      recovered.innerHTML = `<h3 class="text-light fw-bolder">${recoveredValue}</h3>`;
      deaths.innerHTML = `<h3 class="text-light fw-bolder">${deathsValue}</h3>`;
    } catch (err) {
      showAlert("error", "Something Wrong!", err);
    }
  }
}

customElements.define("statistik-banner", Banner);
