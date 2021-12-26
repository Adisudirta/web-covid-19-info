class Statistik {
  static reqBanner() {
    return fetch("https://covid19.mathdro.id/api")
      .then((res) => res.json())
      .then((res) => res);
  }
}

export default Statistik;
