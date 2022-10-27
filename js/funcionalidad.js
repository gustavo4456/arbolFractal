const btnGenerarArbol = document.getElementById("btnGenerarArbol");
const btnLimpiar = document.getElementById("btnLimpiar");

const coordX = document.getElementById("coordX");
const coordY = document.getElementById("coordY");
const longitud = document.getElementById("longitud");
const angulo = document.getElementById("angulo");
const anchoRama = document.getElementById("anchoRama");
const color = document.getElementById("color");

parseInt(coordY.value) < 0 ||
  parseInt(coordY.value) > 1000 ||
  parseInt(longitud.value) < 0 ||
  parseInt(longitud.value) > 1000 ||
  parseInt(angulo.value) < 0 ||
  parseInt(angulo.value) > 1000 ||
  parseInt(anchoRama.value) < 0 ||
  parseInt(anchoRama.value) > 1000;

function validar() {
  if (parseInt(coordX.value) < 0 || parseInt(coordX.value) > 1000) {
    alert("Ingrese un valor para la coordenada x entre 0 y 1000.");
  }
  if (parseInt(coordY.value) < 0 || parseInt(coordY.value) > 800) {
    alert("Ingrese un valor para la coordenada y entre 0 y 800.");
  }
  if (parseInt(longitud.value) < 30 || parseInt(longitud.value) > 200) {
    alert("Ingrese un valor para la longitud entre 30 y 200.");
  }
  if (parseInt(angulo.value) < -360 || parseInt(angulo.value) > 360) {
    alert("Ingrese un valor para la coordenada x entre -360 y 360.");
  }
  if (parseInt(anchoRama.value) < 1 || parseInt(anchoRama.value) > 100) {
    alert("Ingrese un valor para la coordenada x entre 1 y 100.");
  }

  if (
    parseInt(coordX.value) < 0 ||
    parseInt(coordX.value) > 1000 ||
    parseInt(coordY.value) < 0 ||
    parseInt(coordY.value) > 800 ||
    parseInt(longitud.value) < 30 ||
    parseInt(longitud.value) > 200 ||
    parseInt(angulo.value) < -360 ||
    parseInt(angulo.value) > 360 ||
    parseInt(anchoRama.value) < 1 ||
    parseInt(anchoRama.value) > 100
  ) {
    return false;
  }

  return true;
}

let myCanvas = document.getElementById("my_canvas");
let ctx = myCanvas.getContext("2d");
function draw(startX, startY, len, angle, branchWidth) {
  ctx.lineWidth = branchWidth;

  ctx.beginPath();
  ctx.save();

  // ctx.strokeStyle = "green";
  // ctx.fillStyle = "green";
  ctx.strokeStyle = color.value;
  ctx.fillStyle = color.value;

  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();

  ctx.shadowBlur = 15;
  ctx.shadowColor = "rgba(0,0,0,0.8)";

  if (len < 10) {
    ctx.restore();
    return;
  }

  draw(0, -len, len * 0.8, angle - 15, branchWidth * 0.8);
  draw(0, -len, len * 0.8, angle + 15, branchWidth * 0.8);

  ctx.restore();


}
// draw(400, 600, 120, 0, 10);

btnGenerarArbol.addEventListener("click", function () {
  if (
    coordX.value &&
    coordY.value &&
    longitud.value &&
    angulo.value &&
    anchoRama.value &&
    color.value
  ) {
    if (validar()) {
      draw(
        parseInt(coordX.value),
        parseInt(coordY.value),
        parseInt(longitud.value),
        parseInt(angulo.value),
        parseInt(anchoRama.value)
      );
    }
  } else {
    alert("Rellene todos los campos.");
  }
});

btnLimpiar.addEventListener("click", function () {
  // Store the current transformation matrix
  ctx.save();

  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  // Restore the transform
  ctx.restore();
});
