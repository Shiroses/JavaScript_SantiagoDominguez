/**
 * CONFIGURACIÓN Y ESTADO
 */
const API_KEY = "VuMeXGWEvW0tFgIcPyfDBipJ1dmPkPtqmPaWz2JW"; 
const BASE_URL = "https://api.nasa.gov/planetary/apod";
const gallery = document.getElementById("gallery");
const statusContainer = document.getElementById("statusContainer");
const todayStr = new Date().toISOString().split("T")[0];
if(document.getElementById("start")) document.getElementById("start").max = todayStr;
if(document.getElementById("end")) document.getElementById("end").max = todayStr;

/**
 * SERVICIOS (LÓGICA DE DATOS)
 */
async function apiCall(params = "") {
    showLoading(true);
    try {
        const response = await fetch(`${BASE_URL}?api_key=${API_KEY}${params}`);
        if (response.status === 403) {
            showToast("🔑 Error: API Key inválida o límite excedido");
            throw new Error("Acceso denegado por la API");
        }

        if (!response.ok) throw new Error("Error en la respuesta de la NASA");
        
        const data = await response.json();
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        if (!error.message.includes("Acceso denegado")) {
            showToast("🚀 Error de conexión con los servidores");
        }
        console.error("Detalle del error:", error);
        return [];
    } finally {
        showLoading(false);
    }
}

/**
 * UI HELPERS
 */
function showToast(msg) {
    const t = document.getElementById("toast");
    t.innerText = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 3000);
}

function showLoading(isLoading) {
    statusContainer.innerHTML = isLoading ? '<div class="loader">Sincronizando con satélites...</div>' : '';
}


/**
 * MODIFICACIÓN EN RENDERIZADO
 */
function renderGallery(items, append = false) {
    if (!append) {
        gallery.innerHTML = "";
        currentPage = 1;
    }

    if (items.length === 0 && !append) {
        gallery.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>No se encontraron resultados.</p>";
        return;
    }

    items.forEach(createCard);
    updatePaginationButton();
}

/**
 * COMPONENTES - Renderizado inteligente de Media
 */
function createCard(data) {
    const card = document.createElement("div");
    card.className = "card";

    const isYouTube = data.media_type === "video" && data.url.includes("youtube.com") || data.url.includes("youtu.be");
    
    let mediaElement = "";

    if (isYouTube) {
        const videoId = data.url.split('embed/')[1]?.split('?')[0] || data.url.split('v=')[1]?.split('&')[0];
        const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        
        mediaElement = `
            <div class="video-container">
                <img src="${thumb}" alt="${data.title}" loading="lazy">
                <div class="play-overlay">▶ YouTube</div>
            </div>`;
    } else if (data.media_type === "video") {
        // CASO B: Video Directo (MP4/WebM)
        mediaElement = `
            <video class="card-video" muted loop onmouseover="this.play()" onmouseout="this.pause()">
                <source src="${data.url}" type="video/mp4">
            </video>
            <div class="video-badge">▶ Video</div>`;
    } else {
        // CASO C: Imagen
        mediaElement = `<img src="${data.url}" alt="${data.title}" loading="lazy">`;
    }

    card.innerHTML = `
        <div class="card-img-container">
            ${mediaElement}
        </div>
        <div class="card-content">
            <small>${data.date}</small>
            <h3>${data.title}</h3>
        </div>
    `;

    card.onclick = () => openModal(data);
    gallery.appendChild(card);
}

/**
 * MODAL - Aquí sí forzamos el iframe para reproducción
 */
function openModal(data) {
    const isFavorite = checkIfFavorite(data.date);
    const isYouTube = data.media_type === "video" && (data.url.includes("youtube") || data.url.includes("youtu.be"));
    
    let mediaHtml = "";

    if (isYouTube) {
        mediaHtml = `<iframe src="${data.url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="width:100%; aspect-ratio:16/9; border-radius:12px;"></iframe>`;
    } else if (data.media_type === "video") {
        mediaHtml = `<video autoplay loop src="${data.url}" style="width:100%; border-radius:12px;"></video>`;
    } else {
        mediaHtml = `<img src="${data.hdurl || data.url}" style="width:100%; border-radius:12px;">`;
    }

    document.getElementById("modalBody").innerHTML = `
        <small style="color:var(--primary)">${data.date}</small>
        <h2 style="margin:10px 0">${data.title}</h2>
        ${mediaHtml}
        <p style="line-height:1.6; color:#cbd5e1; margin: 20px 0">${data.explanation}</p>
        <div style="display:flex; gap:10px">
            <button class="btn" style="background:${isFavorite ? '#ef4444':'#22c55e'}; color:white" 
                onclick='toggleFavorite(${JSON.stringify(data).replace(/'/g, "&apos;")})'>
                ${isFavorite ? '🗑️ Quitar' : '❤️ Guardar'}
            </button>
        </div>
    `;
    document.getElementById("modal").classList.add("active");
}

function closeModal() {
    document.getElementById("modal").classList.remove("active");
}

/**
 * GESTIÓN DE FAVORITOS
 */
function getFavorites() {
    return JSON.parse(localStorage.getItem("nasa_favs")) || [];
}

function checkIfFavorite(date) {
    return getFavorites().some(f => f.date === date);
}

function toggleFavorite(data) {
    let favs = getFavorites();
    const index = favs.findIndex(f => f.date === data.date);

    if (index === -1) {
        favs.push(data);
        showToast("Guardado en favoritos 🚀");
    } else {
        favs.splice(index, 1);
        showToast("Eliminado de favoritos");
    }

    localStorage.setItem("nasa_favs", JSON.stringify(favs));
    closeModal();
    if (gallery.dataset.view === "favorites") showFavorites();
}

function showFavorites() {
    gallery.dataset.view = "favorites";
    const favs = getFavorites();
    renderGallery(favs);
}

/**
 * ACCIONES PRINCIPALES
 */
async function loadToday() {
    gallery.dataset.view = "all";
    const data = await apiCall();
    renderGallery(data);
}

/**
 * ACTUALIZACIÓN DE ACCIONES (loadRange)
 */
async function loadRange() {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    
    if (!start || !end) return showToast("Faltan fechas");

    gallery.dataset.view = "all";
    const data = await apiCall(`&start_date=${start}&end_date=${end}`);
    allData = data.reverse(); 
    renderGallery(allData.slice(0, itemsPerPage));
}

async function loadToday() {
    gallery.dataset.view = "all";
    allData = await apiCall();
    renderGallery(allData.slice(0, itemsPerPage));
}

// Carga inicial
loadToday();

/**
 * ESTADO GLOBAL DE PAGINACIÓN
 */
let allData = [];
let currentPage = 1;
const itemsPerPage = 6;



function updatePaginationButton() {
    let btnMore = document.getElementById("loadMoreBtn");
    const hasMore = (currentPage * itemsPerPage) < allData.length;

    if (hasMore) {
        if (!btnMore) {
            btnMore = document.createElement("button");
            btnMore.id = "loadMoreBtn";
            btnMore.className = "btn btn-primary";
            btnMore.style.margin = "20px auto";
            btnMore.innerText = "🚀 Explorar más";
            btnMore.onclick = loadNextPage;
            gallery.after(btnMore);
        }
        btnMore.style.display = "flex";
    } else if (btnMore) {
        btnMore.style.display = "none";
    }
}

function loadNextPage() {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const nextBatch = allData.slice(start, end);
    
    currentPage++;
    renderGallery(nextBatch, true);
}