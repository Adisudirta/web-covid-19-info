import hospitalImg from "../../images/hospitals-room.jpg";

class HospitalList extends HTMLElement {
  set hospitals(hospitals) {
    this._hospitals = hospitals;
    this.render();
    this.renderImg();
  }

  render() {
    this.innerHTML = `
    <div class="container pt-5">
        <h4 class="fw-bold text-center">Ditemukan ${this._hospitals.length} Rumah Sakit</h4>
    </div>
    <div class="container-fluid py-3">
        <div class="row gy-3 p-3 container-hospitals">
        </div>
    </div>`;

    const container = document.querySelector(".container-hospitals");
    container.innerHTML = "";
    this._hospitals.forEach((e) => {
      container.innerHTML += `<div class="col-12 col-sm-6 col-md-auto col-lg-4 col-xl-3">
        <div class="card" style="width: 18rem">
          <img id="card-img" class="card-img-top" alt="..." />
          <div class="card-body">
            <h4 class="card-title">${e.name}</h4>
            <h6 class="card-subtitle text-muted mb-3">${e.address}</h6>
            <div class="card mb-3">
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Ketersediaan Kamar: </strong>${e.bed_availability}</li>
                <li class="list-group-item"><strong>Antrian : </strong>${e.queue}</li>
                <li class="list-group-item"><strong>No Telp: </strong>${e.phone}</li>
                <li class="list-group-item">${e.info}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>`;
    });
  }

  renderImg() {
    [...document.querySelectorAll("#card-img")].forEach((e) => (e.src = hospitalImg));
  }
}

customElements.define("hospital-list", HospitalList);
