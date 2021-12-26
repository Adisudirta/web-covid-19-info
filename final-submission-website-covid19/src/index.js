// import regenerator
import "regenerator-runtime";

// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import css
import "./styles/style.css";

// import components
import "./script/components/navbar.js";
import "./script/components/banner.js";
import "./script/components/searchbar.js";
import "./script/components/hospital-list.js";

//memasang logo pada title
import logo from "./images/logo.svg";
document.getElementById("icon").href = logo;
