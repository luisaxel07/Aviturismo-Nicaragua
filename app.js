// app.js

// ------- Datos de ejemplo (puedes migrarlos a Firebase luego) -------
const birds = [
  {
    id: 1,
    name: "Guacamaya Roja",
    scientificName: "Ara macao",
    description: "Ave emblemática de Nicaragua, colorida y grande, habita en bosques tropicales húmedos.",
    photo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ed1a3850-3cea-42ff-b56e-c55b6875943c.png",
    type: "resident"
  },
  {
    id: 2,
    name: "Chorlo Nevado",
    scientificName: "Pluvialis squatarola",
    description: "Ave migratoria que visita las costas nicaragüenses durante el invierno boreal.",
    photo: "https://inaturalist-open-data.s3.amazonaws.com/photos/227950/original.jpg",
    type: "migratory"
  },
  {
    id: 3,
    name: "Trogón Esmeralda",
    scientificName: "Trogon caligatus",
    description: "Ave tropical con plumaje verde brillante y pico grande.",
    photo: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/458284821/1200",
    type: "resident"
  },
  {
    id: 4,
    name: "Guardabarranco (Turquoise-browed Motmot)",
    scientificName: "Eumomota superciliosa",
    description: "Ave emblemática de Nicaragua, frecuente en bordes de bosque y zonas abiertas.",
    photo: "https://cdn0.bioenciclopedia.com/es/posts/1/7/9/guardabarranco_o_momoto_cejiazul_971_600_square.jpg",
    type: "resident"
  },
  {
    id: 5,
    name: "Grajo / Tordo de Nicaragua ",
    scientificName: "Quiscalus nicaraguensis",
    description: "Tordo de distribución restringida al oeste de Nicaragua; habita humedales y bordes de lagunas.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/0/03/Shiny_cowbird_%28Molothrus_bonariensis%29_male.JPG",
    type: "endemic"
  },
  {
    id: 6,
    name: "Águila Harpía",
    scientificName: "Harpia harpyja",
    description: "Una de las rapaces más grandes de América; registrada en bosques tropicales densos de Nicaragua.",
    photo: "https://s3sdghub.s3.eu-west-1.amazonaws.com/core-cms/public/styles/media_image_large/public/images/projects/harpia.jpg?itok=A9E3G30H",
    type: "resident"
  },
  {
    id: 7,
    name: "Reinita Amarilla ",
    scientificName: "Setophaga petechia",
    description: "Pequeña ave migratoria que pasa el invierno en Centroamérica.",
    photo: "https://cdn.download.ams.birds.cornell.edu/api/v2/asset/639564193/900",
    type: "migratory"
  },
  {
    id: 8,
    name: "Zorzal Migratorio ",
    scientificName: "Catharus ustulatus",
    description: "Migrante neotropical que usa bosques y parches de bosque en Nicaragua como áreas de reposo.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Turdus-migratorius-002.jpg",
    type: "migratory"
  },
  {
    id: 9,
    name: "Gavilán Aliancho ",
    scientificName: "Buteo platypterus",
    description: "Rapaz migratoria que recorre largas distancias y se puede ver durante la migración.",
    photo: "https://sao.org.co/wp-content/uploads/2021/11/gavilan-aliancho-Buteo-platypterus.jpg",
    type: "migratory"
  }

];
// Agrega este CSS para asegurar que las imágenes de aves se ubiquen bien en su contenedor
const style = document.createElement('style');
style.innerHTML = `
  .card img {
    width: 100%;
    height: 13rem; /* igual a h-52 de Tailwind */
    object-fit: cover;
    border-radius: 0.5rem; /* igual a rounded */
    display: block;
    background: #f3f4f6; /* opcional: fondo gris claro */
  }
`;
document.head.appendChild(style);

const reserves = [
  {
    id: 1,
    name: "Reserva Biológica Indio Maíz",
    description: "Una de las reservas más grandes y biodiversas de Nicaragua.",
    location: "Región Autónoma del Caribe Sur",
    activities: ["Aviturismo", "Senderismo", "Observación de fauna"],
    photo: "https://ondalocalni.com/media/articles/portada_5.jpg"
  },
  {
    id: 2,
    name: "Reserva Natural Cerro Silva",
    description: "Bosques nubosos y gran variedad de aves endémicas.",
    location: "Jinotega",
    activities: ["Aviturismo", "Fotografía", "Educación ambiental"],
    photo: "https://www.mapanicaragua.com/wp-content/uploads/2020/06/Nueva-Guinea-Rio-Punta-gorda.jpg"
  },
  {
    id: 3,
    name: "Reserva Silvestre Privada Montibelli",
    description: "Reserva privada cerca de Managua, bosque tropical seco con senderos y abundante avifauna; ideal para observar guardabarrancos, colibríes, trogones, entre otras especies.",
    location: "Ticuantepe, Departamento de Managua",
    activities: ["Aviturismo", "Senderismo", "Naturaleza", "Fotografía"],
    photo: "https://travelmademedoit.com/wp-content/uploads/2022/04/DSC06709-1024x683.jpg.webp" // ← revisar licencia / usar galería oficial
  },
  {
    id: 4,
    name: "Reserva de la Biósfera Bosawás",
    description: "Una de las reservas más grandes del país, selvas muy extensas, enorme diversidad de aves residentes y migratorias; pulmón del norte de Nicaragua.",
    location: "Jinotega, Región Autónoma Costa Caribe Norte",
    activities: ["Aviturismo", "Exploración de bosque húmedo", "Senderismo profundo", "Educación ambiental"],
    photo: "https://www.mapanicaragua.com/wp-content/uploads/2020/06/Area-protegida_bosawas-1.jpg" // ← placeholder, ubicar foto con licencia
  },
  {
    id: 5,
    name: "Reserva Natural Laguna de Apoyo",
    description: "Lago de cráter volcánico con bosque a su alrededor; excelente para observación de aves, caminatas suaves, vistas panorámicas y contacto con naturaleza cercana a Granada/Masaya.",
    location: "Entre Masaya y Granada",
    activities: ["Aviturismo", "Natación", "Kayak", "Fotografía"],
    photo: "https://paradisonicaragua.com/wp-content/uploads/2020/02/laguna-de-apoyo-1024x683.jpg" // ← verificar fuente/licencia
  },
  {
    id: 6,
    name: "Reserva Natural Cerro Wawashang",
    description: "Reserva costera y bosques lluviosos con manglares, ríos, muy buena diversidad de aves residentes y migratorias; excelente para aviturismo y ecoturismo en la Costa Caribe Sur.",
    location: "Región Autónoma del Caribe Sur",
    activities: ["Aviturismo", "Senderismo", "Observación de manglares", "Observación de fauna"],
    photo: "https://www.visitanicaragua.com/wp-content/uploads/2023/10/Reserva-Natural-Wawashang-Laguna-de-Perlas.jpg" // ← revisar fuente/licencia
  },
  {
    id: 7,
    name: "Reserva Natural Privada Hato Nuevo",
    description: "Reserva privada en Chinandega que promueve turismo sostenible, conservación de aves como guardabarrancos, loros de nuca amarilla; bosque/restauración natural.",
    location: "El Viejo, Chinandega",
    activities: ["Aviturismo", "Ecoturismo", "Senderismo", "Educación ambiental"],
    photo: "https://www.marena.gob.ni/wp-content/uploads/2025/04/421099.jpg" // ← placeholder o foto oficial
  },
  {
    id: 8,
    name: "Reserva Natural Península de Chiltepe",
    description: "Península volcánica al borde del Lago Managua; ofrece observaciones de aves acuáticas, aves de ribera, bordes de lago, manglares, etc.",
    location: "Departamento Managua",
    activities: ["Aviturismo", "Senderismo ligero", "Paisaje lacustre", "Fotografía"],
    photo: "https://www.mapanicaragua.com/wp-content/uploads/2020/05/Laguna-de-Nejapa-Managua.jpg" // de Wikimedia (ver licencia)
  }
];

const events = [
  { id: 1, title: "Festival de Aves Migratorias", date: "2025-10-15", description: "Celebración de la llegada de aves migratorias con actividades." },
  { id: 2, title: "Conteo Ciudadano de Aves", date: "2025-05-20", description: "Participación de la comunidad en conteo de especies locales." },
  { id: 3, title: "Taller de Guías Certificados", date: "2025-07-10", description: "Capacitación en prácticas sostenibles y conocimiento de hábitats." }
];

const guides = [
  { id: 1, name: "Juan Pérez", certified: true },
  { id: 2, name: "María López", certified: true },
  { id: 3, name: "Carlos Gómez", certified: true }
];

let currentUser = null;

// ------- Utilidades -------
function $(id) { return document.getElementById(id); }

function formatDateISOToES(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('es-ES');
  } catch { return dateStr; }
}

// ------- Menú móvil -------
function toggleMenu() {
  const menu = $("mobile-menu");
  menu.classList.toggle("hidden");
}

// ------- Navegación -------
function showSection(sectionId) {
  const sections = document.querySelectorAll("main > section");
  sections.forEach(s => s.classList.add("hidden"));
  $(sectionId).classList.remove("hidden");

  // activar links
  document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
  document.querySelectorAll(`a[href='#${sectionId}']`).forEach(a => a.classList.add("active"));
}

// ------- Poblar contenido -------
function populateBirds() {
  const container = $("birds-container");
  container.innerHTML = "";
  birds.forEach(bird => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3 class="text-xl font-bold mb-2">${bird.name}</h3>
      <p><strong>Nombre Científico:</strong> ${bird.scientificName}</p>
      <img src="${bird.photo}" alt="Foto de ${bird.name}" class="rounded mb-3 w-full h-52 object-cover">
      <p class="mb-2">${bird.description}</p>
      <p><strong>Tipo:</strong> ${
      bird.type === 'endemic' ? 'Endémica' :
      bird.type === 'migratory' ? 'Migratoria' :
      bird.type === 'resident' ? 'Residente' :
      bird.type
      }</p>
    `;
    container.appendChild(card);
  });
  filterBirds();
}

function filterBirds() {
  const filter = $("bird-filter").value;
  const term = ($("bird-search").value || "").toLowerCase().trim();
  const cards = document.querySelectorAll("#birds-container .card");

  birds.forEach((bird, i) => {
    const matchType = (filter === "all") || (bird.type === filter);
    const matchText = bird.name.toLowerCase().includes(term) || bird.scientificName.toLowerCase().includes(term);
    cards[i].style.display = (matchType && matchText) ? "block" : "none";
  });
}

function populateReserves() {
  const container = $("reserves-container");
  container.innerHTML = "";
  reserves.forEach(reserve => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3 class="text-xl font-bold mb-2">${reserve.name}</h3>
      <img src="${reserve.photo}" alt="Reserva ${reserve.name}" class="rounded mb-3 w-full h-52 object-cover">
      <p><strong>Ubicación:</strong> ${reserve.location}</p>
      <p class="mb-2">${reserve.description}</p>
      <p><strong>Actividades:</strong> ${reserve.activities.join(", ")}</p>
      <button onclick="showSection('reservations')" class="btn-primary mt-3">Reservar Visita</button>
    `;
    container.appendChild(div);
  });
}

function populateEvents() {
  const container = $("events-container");
  container.innerHTML = "";
  events.forEach(ev => {
    const item = document.createElement("div");
    item.className = "mb-4 p-4 border-l-4 border-green-500 bg-gray-50";
    item.innerHTML = `
      <h4 class="text-lg font-bold text-green-700">${ev.title}</h4>
      <p><strong>Fecha:</strong> ${formatDateISOToES(ev.date)}</p>
      <p>${ev.description}</p>
    `;
    container.appendChild(item);
  });
}

function populateReservationForm() {
  const reserveSelect = $("reserve-select");
  const guideSelect = $("guide-select");
  if (!reserveSelect || !guideSelect) return;

  reserveSelect.innerHTML = '<option value="">--Selecciona Reserva--</option>';
  reserves.forEach(r => reserveSelect.innerHTML += `<option value="${r.id}">${r.name}</option>`);

  guideSelect.innerHTML = '<option value="">--Selecciona Guía--</option>';
  guides.forEach(g => guideSelect.innerHTML += `<option value="${g.id}">${g.name} (Certificado)</option>`);
}

// ------- Registro / Login -------
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function handleRegister(e) {
  e.preventDefault();
  const username = $("reg-username").value.trim();
  const email = $("reg-email").value.trim();
  const pass = $("reg-password").value;
  const pass2 = $("reg-password2").value;

  if (!validateEmail(email)) {
    $("register-message").innerHTML = '<p class="error">Correo inválido.</p>';
    return;
  }
  if (pass.length < 6) {
    $("register-message").innerHTML = '<p class="error">La contraseña debe tener al menos 6 caracteres.</p>';
    return;
  }
  if (pass !== pass2) {
    $("register-message").innerHTML = '<p class="error">Las contraseñas no coinciden.</p>';
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find(u => u.username === username)) {
    $("register-message").innerHTML = '<p class="error">Usuario ya existe.</p>';
    return;
  }

  users.push({ username, email, password: pass });
  localStorage.setItem("users", JSON.stringify(users));
  $("register-message").innerHTML = '<p class="success">Registro exitoso. Ya puedes iniciar sesión.</p>';
  $("register-form").reset();
}

function handleLogin(e) {
  e.preventDefault();
  const username = $("login-username").value.trim();
  const password = $("login-password").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    currentUser = user;
    updateUIAfterLogin();
    $("login-message").innerHTML = '<p class="success">Sesión iniciada.</p>';
    showSection("home");
  } else {
    $("login-message").innerHTML = '<p class="error">Credenciales incorrectas.</p>';
  }
}

function checkUserSession() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    currentUser = user;
    updateUIAfterLogin();
  }
}

function updateUIAfterLogin() {
  // Top nav
  $("nav-register").classList.add("hidden");
  $("nav-login").classList.add("hidden");
  $("user-info").classList.remove("hidden");
  $("username-display").innerText = currentUser.username;
  $("nav-reservations").classList.remove("hidden");

  // Mobile nav
  $("mobile-nav-register").classList.add("hidden");
  $("mobile-nav-login").classList.add("hidden");
  $("mobile-nav-reservations").classList.remove("hidden");

  // Booking section
  $("login-required").classList.add("hidden");
  $("reservation-form").classList.remove("hidden");
  $("user-reservations").classList.remove("hidden");

  loadUserReservations();
}

function logout() {
  localStorage.removeItem("currentUser");
  currentUser = null;

  // Top nav
  $("user-info").classList.add("hidden");
  $("nav-register").classList.remove("hidden");
  $("nav-login").classList.remove("hidden");
  $("nav-reservations").classList.add("hidden");

  // Mobile nav
  $("mobile-nav-register").classList.remove("hidden");
  $("mobile-nav-login").classList.remove("hidden");
  $("mobile-nav-reservations").classList.add("hidden");

  // Booking section
  $("login-required").classList.remove("hidden");
  $("reservation-form").classList.add("hidden");
  $("user-reservations").classList.add("hidden");

  showSection("home");
}

// ------- Reservas -------
function handleReservation(e) {
  e.preventDefault();
  const reserveId = parseInt($("reserve-select").value, 10);
  const guideId = parseInt($("guide-select").value, 10);
  const date = $("reservation-date").value;
  const notes = $("additional-notes").value;

  if (!reserveId || !guideId || !date) return;

  const reservation = {
    id: Date.now(),
    reserveId, guideId, date, notes,
    user: currentUser.username
  };

  let reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  reservations.push(reservation);
  localStorage.setItem("reservations", JSON.stringify(reservations));

  $("reservation-message").innerHTML = '<p class="success">Reserva realizada exitosamente.</p>';
  $("reservation-form").reset();
  loadUserReservations();
}

function loadUserReservations() {
  const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  if (!currentUser) return;
  const userReservations = reservations.filter(r => r.user === currentUser.username);
  const container = $("reservations-list");
  container.innerHTML = "";

  if (userReservations.length === 0) {
    container.innerHTML = "<p>No tienes reservas aún.</p>";
    return;
  }

  userReservations.forEach(res => {
    const reserveName = reserves.find(r => r.id === res.reserveId)?.name || "N/D";
    const guideName = guides.find(g => g.id === res.guideId)?.name || "N/D";
    const card = document.createElement("div");
    card.className = "card mb-3";
    card.innerHTML = `
      <p><strong>Reserva:</strong> ${reserveName}</p>
      <p><strong>Guía:</strong> ${guideName}</p>
      <p><strong>Fecha:</strong> ${res.date}</p>
      ${res.notes ? `<p><strong>Notas:</strong> ${res.notes}</p>` : ""}
      <button class="mt-3 bg-red-500 text-white px-3 py-1 rounded" onclick="cancelReservation(${res.id})">Cancelar</button>
    `;
    container.appendChild(card);
  });
}

function cancelReservation(resId) {
  let reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  reservations = reservations.filter(r => r.id !== resId);
  localStorage.setItem("reservations", JSON.stringify(reservations));
  loadUserReservations();
}

// ------- Inicio -------
window.addEventListener("DOMContentLoaded", () => {
  // Listeners de formularios y filtros
  $("register-form").addEventListener("submit", handleRegister);
  $("login-form").addEventListener("submit", handleLogin);
  $("reservation-form").addEventListener("submit", handleReservation);
  $("bird-filter").addEventListener("change", filterBirds);
  $("bird-search").addEventListener("input", filterBirds);

  // Poblar contenido
  populateBirds();
  populateReserves();
  populateEvents();
  populateReservationForm();

  // Sesión + sección inicial
  checkUserSession();
  showSection("home");
});
