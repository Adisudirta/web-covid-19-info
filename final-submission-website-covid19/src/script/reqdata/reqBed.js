import Swal from "sweetalert2";

class Bedroom {
  static provinces() {
    return fetch("https://rs-bed-covid-api.vercel.app/api/get-provinces")
      .then((res) => res.json())
      .then((res) => res.provinces);
  }

  static cities(provId) {
    return fetch(`https://rs-bed-covid-api.vercel.app/api/get-cities?provinceid=${provId}`)
      .then((res) => res.json())
      .then((res) => res.cities);
  }

  static hospitals(provId, cityId) {
    Swal.fire({
      title: "loading...",
      showConfirmButton: false,
    });
    return fetch(`https://rs-bed-covid-api.vercel.app/api/get-hospitals?provinceid=${provId}&cityid=${cityId}&type=1`)
      .then((res) => res.json())
      .then((res) => {
        if (res.hospitals.length === 0) {
          throw new Error("Rumah Sakit tidak ditemukan!");
        } else {
          return res.hospitals;
        }
      });
  }
}

export default Bedroom;
