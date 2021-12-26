// import sweetalert2
import Swal from "sweetalert2";

// function untuk memanggil sweetalert2
function showAlert(icon, title, text = "") {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
  });
}

export default showAlert;
