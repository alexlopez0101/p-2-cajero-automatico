// Creación de usuarios, contraseñas y saldos
const accounts = [
  { name: "paola", balance: 500, password: '1234' },
  { name: "karen", balance: 260, password: '1234' },
  { name: "yander", balance: 168, password: '1234' },
];

// Bloque para ocultar la validación de usuario
// Selecciona los elementos y los oculta inicialmente
document.getElementById("balance").style.display = "none"; // Oculta la sección de saldo
document.getElementById("incorrect_user").style.display = "none"; // Oculta el mensaje de usuario incorrecto
document.getElementById("correct_user").style.display = "none"; // Oculta el mensaje de usuario válido
document.getElementById("info").style.display = "none"; // Oculta la sección de información adicional

// Función para el inicio de sesión
function enter() {
  const user = document.getElementById("usuario").value;
  const password = document.getElementById('password').value;

  valideUserLogin(user, password); // Llama a la función para validar el inicio de sesión del usuario
}

// Función para validar el inicio de sesión del usuario
function valideUserLogin(user, contra) {
  let userValidate = false;
  for (let x in accounts) {
    if (user === accounts[x].name && contra === accounts[x].password) {
      userValidate = true;
      document.getElementById("login").style.display = "none"; // Oculta la sección de inicio de sesión
      showMenuHTML(x); // Llama a la función para mostrar el menú principal
      state = x; // Variable global para mantener el estado del usuario
      return;
    }
  }

  // Mostrar mensaje de usuario o contraseña incorrectos
  if (!userValidate) {
    document.getElementById("incorrect_user").style.display = "block"; // Muestra el mensaje de usuario incorrecto
    document.getElementById("incorrect_user").style.color = "white";
  }
}

// Función para mostrar el menú principal y la información del usuario
function showMenuHTML(state) {
  const username = accounts[state].name;
  const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

  document.getElementById("balance").style.display = "block"; // Muestra la sección de saldo
  document.getElementById("info").style.display = "block"; // Muestra la sección de información adicional
  document.getElementById("nombre-usuario").innerText = capitalizedUsername; // Muestra el nombre del usuario actual con la primera letra en mayúscula

  // Agrega un evento al botón 'Consultar' para mostrar el saldo actual del usuario
  document.getElementById("consultar").addEventListener('click', function () {
    document.getElementById("info").innerText = `${capitalizedUsername}, Tu saldo actual es de ${accounts[state].balance}`;
  });
}

// Función para realizar una consignación de dinero
function deposit() {
  const depositmoneys = document.getElementById("depositmoneys").value;
  const total2 = Number(accounts[state].balance) + Number(depositmoneys);

  if (total2 > 990) {
    document.getElementById("info").innerText = 'Ingresa un valor nuevamente, recuerda que el saldo máximo es de $990';
  } else {
    document.getElementById("info").innerText = `${accounts[state].name}, tu saldo actual es de $${total2} después de la consignación de $${depositmoneys}`;
  }
}

// Función para realizar un retiro de dinero
function withdraw() {
  const withdrawmoneys = document.getElementById("withdrawmoneys").value;
  const total1 = accounts[state].balance - withdrawmoneys;

  if (total1 < 10) {
    document.getElementById("info").innerText = 'El valor a retirar es superior al monto permitido. Recuerda que el saldo mínimo debe ser de $10';
  } else {
    document.getElementById("info").innerText = `${accounts[state].name}, tu saldo actual es de $${total1} después del retiro de $${withdrawmoneys}`;
  }
}
document.getElementById("password").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) { // 13 es el código de tecla para "Enter"
    event.preventDefault(); // Evita que se envíe el formulario por defecto
    enter(); // Llama a la función enter() para realizar el login
  }
});
