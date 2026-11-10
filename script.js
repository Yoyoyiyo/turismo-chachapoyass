
/* =========================================================
   1. ANIMACIÓN DE LAS VENTANAS DE ENTRADA
========================================================= */

const ventanas = document.querySelector("#ventanas");

window.addEventListener("load", function() {

    setTimeout(function() {

        ventanas?.classList.add("abierto");

    }, 500);

});


/* =========================================================
   2. BOTÓN PRINCIPAL: EXPLORAR
========================================================= */

const botonExplorar = document.querySelector(".hero-cta");

if (botonExplorar) {

    botonExplorar.addEventListener("click", function(event) {

        event.preventDefault();

        const desplazamiento = Math.max(
            500,
            window.innerHeight * 1.5
        );

        window.scrollTo({
            top: window.scrollY + desplazamiento,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   3. ELEMENTOS PRINCIPALES DEL CARRUSEL
========================================================= */

const experiencia = document.querySelector(".experiencia");
const pista = document.querySelector(".pista-tarjetas");
const plaza = document.querySelector(".plaza");
const texto = document.querySelector(".plaza .contenido");

const contenedorPuntos = document.querySelector(".contenedor-puntos");
const tarjetas = document.querySelectorAll(".tarjeta");

const linea = document.querySelector(".linea-relleno");


/* =========================================================
   4. CREAR LOS PUNTOS DEL CARRUSEL AUTOMÁTICAMENTE
========================================================= */

if (contenedorPuntos) {

    tarjetas.forEach(function(tarjeta, indice) {

        const punto = document.createElement("span");

        punto.classList.add("punto");

        const posicion = tarjetas.length === 1
            ? 50
            : (indice / (tarjetas.length - 1)) * 100;

        punto.style.left = posicion + "%";

        contenedorPuntos.appendChild(punto);

    });

}


/* =========================================================
   5. ANIMACIÓN DE LA PLAZA Y MOVIMIENTO DEL CARRUSEL
========================================================= */

function moverTarjetas() {

    // Comprobar que existan los elementos necesarios

    if (!experiencia || !pista || !plaza || tarjetas.length === 0) {
        return;
    }

    const rect = experiencia.getBoundingClientRect();

    const recorridoTotal = Math.max(
        1,
        experiencia.offsetHeight - window.innerHeight
    );

    // PROGRESO GENERAL DEL SCROLL: 0 A 1

    const progreso = Math.max(
        0,
        Math.min(1, -rect.top / recorridoTotal)
    );


    /* -----------------------------------------------------
       PRIMERA ETAPA: LA PLAZA SE REDUCE
    ----------------------------------------------------- */

    const reducir = Math.min(1, progreso / 0.25);

    const ancho = 100 - (55 * reducir);
    const alto = 100 - (50 * reducir);

    plaza.style.width = ancho + "vw";
    plaza.style.height = alto + "vh";

    plaza.style.borderRadius = (15 * reducir) + "px";


    /* -----------------------------------------------------
       EL TEXTO DESAPARECE
    ----------------------------------------------------- */

    if (texto) {

        texto.style.opacity = 1 - reducir;

    }


    /* -----------------------------------------------------
       LA PLAZA SE DESPLAZA HACIA EL LATERAL
    ----------------------------------------------------- */

    pista.style.paddingLeft = (8 * reducir) + "vw";


    /* -----------------------------------------------------
       SEGUNDA ETAPA: EL CARRUSEL SE MUEVE
    ----------------------------------------------------- */

    const avance = Math.max(
        0,
        Math.min(1, (progreso - 0.25) / 0.75)
    );

    const distancia = Math.max(
        0,
        pista.scrollWidth - window.innerWidth
    );

    pista.style.transform =
        `translateX(${-avance * distancia}px)`;


    /* -----------------------------------------------------
       INDICADOR DE PROGRESO
    ----------------------------------------------------- */

    const puntos = document.querySelectorAll(
        ".contenedor-puntos .punto"
    );

    const centroPantalla = window.innerWidth / 2;

    let menorDistancia = Infinity;
    let indiceActivo = 0;

    const centros = [];


    // BUSCAR LA TARJETA MÁS CERCANA AL CENTRO

    tarjetas.forEach(function(tarjeta, indice) {

        const posicion = tarjeta.getBoundingClientRect();

        const centroTarjeta = posicion.left + posicion.width / 2;

        centros.push(centroTarjeta);

        const distanciaCentro = Math.abs(
            centroPantalla - centroTarjeta
        );

        if (distanciaCentro < menorDistancia) {

            menorDistancia = distanciaCentro;

            indiceActivo = indice;

        }

        tarjeta.classList.remove("activa");

    });


    // ILUMINAR LA TARJETA CENTRAL

    tarjetas[indiceActivo]?.classList.add("activa");


    // ACTIVAR EL PUNTO CORRESPONDIENTE

    puntos.forEach(function(punto, indice) {

        punto.classList.toggle(
            "activo",
            indice === indiceActivo
        );

    });


    /* -----------------------------------------------------
       CALCULAR EL AVANCE ENTRE LOS PUNTOS
    ----------------------------------------------------- */

    let progresoIndicador = indiceActivo;

    if (indiceActivo < centros.length - 1) {

        const inicio = centros[indiceActivo];
        const final = centros[indiceActivo + 1];

        const porcentaje = Math.max(
            0,
            Math.min(
                1,
                (centroPantalla - inicio) / (final - inicio)
            )
        );

        progresoIndicador += porcentaje;

    }


    /* -----------------------------------------------------
       ACTUALIZAR LA LÍNEA DE PROGRESO
    ----------------------------------------------------- */

    const porcentajeLinea = tarjetas.length > 1
        ? (progresoIndicador / (tarjetas.length - 1)) * 100
        : 100;

    if (linea) {

        linea.style.width = porcentajeLinea + "%";

    }

}


/* =========================================================
   6. OPTIMIZAR LA ACTUALIZACIÓN DEL CARRUSEL
========================================================= */

let pendiente = false;

function actualizar() {

    if (!pendiente) {

        requestAnimationFrame(function() {

            moverTarjetas();

            pendiente = false;

        });

        pendiente = true;

    }

}

window.addEventListener("scroll", actualizar);
window.addEventListener("resize", actualizar);
window.addEventListener("load", moverTarjetas);


/* =========================================================
   7. INFORMACIÓN DE TODOS LOS DESTINOS
========================================================= */

const destinos = {

    /* -----------------------------------------------------
       CHACHAPOYAS
    ----------------------------------------------------- */

    chachapoyas: {

        categoria: "AMAZONAS - PERÚ / CIUDAD",

        titulo: "Ciudad de Chachapoyas",

        subtitulo: "Tradición, historia y cultura",

        portada: "imagen/chachaplaza.jpg",

        etiqueta: "CONOCE LA CIUDAD",

        tituloInfo: "El encanto de Chachapoyas",

        descripcion1: "Chachapoyas es la capital de la región Amazonas. Destaca por su arquitectura tradicional, sus calles y su riqueza cultural.",

        descripcion2: "Además de su encanto arquitectónico y cultural, Chachapoyas es un importante punto de partida para explorar los maravillosos atractivos turísticos de la región Amazonas. Desde aquí, los visitantes pueden organizar recorridos hacia lugares emblemáticos como la fortaleza de Kuélap, la impresionante catarata de Gocta, los sarcófagos de Karajía y el cañón del Sonche. Sus alrededores ofrecen una gran variedad de paisajes naturales, sitios arqueológicos y experiencias culturales que permiten descubrir la riqueza histórica y natural de esta región del Perú.",

        galeria: [
            "imagen/chachaplaza.jpg",
            "imagen/Chachapoyas.jpg",
            "imagen/gall-chcha1.webp",
            "imagen/gall-chacha2.webp"
        ],

        maps: "https://www.google.com/maps?q=Plaza+de+Armas+de+Chachapoyas",

        datos: [

            [
                "UBICACIÓN",
                "Se encuentra en la provincia y distrito de Chachapoyas, a una altitud de 2,335 metros sobre el nivel del mar."
            ],

            [
                "TIPO DE DESTINO",
                "Chachapoyas es una ciudad que combina historia, arquitectura tradicional y cultura. Sus calles, casonas y balcones conservan parte de la identidad histórica de la región."
            ],

            [
                "ATRACTIVO",
                "Su principal encanto está en su riqueza cultural, sus construcciones tradicionales y su cercanía a importantes destinos turísticos como Kuélap, Gocta y Karajía."
            ]

        ]

    },


    /* -----------------------------------------------------
       KUÉLAP
    ----------------------------------------------------- */

    kuelap: {

        categoria: "AMAZONAS - PERÚ / HISTORIA",

        titulo: "Fortaleza de Kuélap",

        subtitulo: "El legado de la cultura Chachapoya",

        portada: "imagen/gall-kue1.jpeg",

        etiqueta: "DESCUBRE SU HISTORIA",

        tituloInfo: "Una ciudad entre las nubes",

        descripcion1: "Kuélap es uno de los complejos arqueológicos más impresionantes del Perú. Fue construido por la cultura Chachapoya sobre una montaña, rodeado de paisajes naturales y enormes murallas de piedra.",

        descripcion2: "Al recorrer Kuélap, es posible apreciar sus enormes murallas de piedra, sus viviendas circulares y los detalles de una arquitectura única desarrollada por la cultura Chachapoya. Este antiguo complejo arqueológico permite conocer cómo vivían sus habitantes y descubrir parte de la historia de una de las civilizaciones más fascinantes del antiguo Perú.",

        galeria: [
            "imagen/gall-kue1.jpeg",
            "imagen/kue.jpeg",
            "imagen/gall-kue2.jpeg",
            "imagen/gall-kue3.jpeg"
        ],

        maps: "https://www.google.com/maps?q=Fortaleza+de+Kuelap+Amazonas+Peru",

        datos: [

            [
                "UBICACIÓN",
                "Se encuentra en la provincia de Luya, región Amazonas, sobre una montaña a aproximadamente 3,000 metros sobre el nivel del mar."
            ],

            [
                "TIPO DE DESTINO",
                "Es un importante destino de turismo arqueológico e histórico, reconocido por sus enormes murallas de piedra, construcciones circulares y antiguos recintos."
            ],

            [
                "CULTURA",
                "Fue construido por la cultura Chachapoya, una antigua civilización que habitó los bosques nubosos del nororiente peruano y dejó un importante legado arquitectónico y cultural."
            ]

        ]

    },


    /* -----------------------------------------------------
       GOCTA
    ----------------------------------------------------- */

    gocta: {

        categoria: "AMAZONAS - PERÚ / NATURALEZA",

        titulo: "Catarata de Gocta",

        subtitulo: "Una maravilla natural entre montañas",

        portada: "imagen/gocta.jpg",

        etiqueta: "DESCUBRE LA NATURALEZA",

        tituloInfo: "La impresionante catarata de Gocta",

        descripcion1: "Gocta es una impresionante caída de agua rodeada de abundante vegetación y montañas de la región Amazonas.",

        descripcion2: "Durante la visita, los viajeros pueden disfrutar de una caminata rodeada de vegetación, escuchar el sonido de la caída del agua y contemplar la impresionante belleza de Gocta. Es un lugar ideal para quienes buscan aventura, contacto con la naturaleza y paisajes inolvidables en la región Amazonas.",

        galeria: [
            "imagen/gall-goc1.jpg.jpeg",
            "imagen/gall-goc2.jpg.jpeg",
            "imagen/gall-goc3.jpg.jpeg",
            "imagen/gall-goc4.jpg.jpeg"
        ],

        maps: "https://maps.app.goo.gl/Gh73zZMYsHgq2MJH7",

        datos: [

            [
                "UBICACIÓN",
                "Se encuentra en el distrito de Valera, provincia de Bongará, región Amazonas, rodeada de montañas y abundante vegetación."
            ],

            [
                "TIPO DE DESTINO",
                "Es un atractivo turístico natural reconocido por su impresionante catarata, sus paisajes montañosos y su entorno de bosque nuboso."
            ],

            [
                "ACTIVIDAD",
                "Los visitantes pueden realizar caminatas por senderos naturales, observar la catarata, tomar fotografías y disfrutar de la biodiversidad del entorno."
            ]

        ]

    },


    /* -----------------------------------------------------
       KARAJÍA
    ----------------------------------------------------- */

    karajia: {

        categoria: "AMAZONAS - PERÚ / ARQUEOLOGÍA",

        titulo: "Sarcófagos de Karajía",

        subtitulo: "El misterio funerario de los Chachapoya",

        portada: "imagen/karajia.jpg.jpeg",

        etiqueta: "DESCUBRE SU HISTORIA",

        tituloInfo: "Guardianes de los antiguos Chachapoya",

        descripcion1: "Karajía es conocido por sus impresionantes sarcófagos funerarios ubicados en lo alto de un acantilado.",

        descripcion2: "Estas impresionantes figuras funerarias fueron colocadas en lo alto de un acantilado como parte de las antiguas tradiciones de la cultura Chachapoya. Su particular forma, tamaño y ubicación reflejan las creencias y costumbres de esta civilización, convirtiendo a Karajía en uno de los testimonios arqueológicos más sorprendentes de la región Amazonas.",

        galeria: [
            "imagen/gall-kara1.jpeg",
            "imagen/gall-kara2.jpeg",
            "imagen/gall-kara3.jpeg",
            "imagen/gall-kara4.jpeg"
        ],

        maps: "https://maps.app.goo.gl/weEWG8NDmGxyqqpu5",

        datos: [

            [
                "UBICACIÓN",
                "Se encuentran cerca de la comunidad de Cruzpata, en el distrito de Trita, provincia de Luya, región Amazonas."
            ],

            [
                "TIPO DE DESTINO",
                "Es un importante atractivo arqueológico y funerario, conocido por sus enormes sarcófagos antropomorfos ubicados sobre un acantilado."
            ],

            [
                "CULTURA",
                "Pertenecen a la cultura Chachapoya, cuyos antiguos habitantes desarrollaron singulares prácticas funerarias para conservar y rendir homenaje a sus difuntos."
            ]

        ]

    },


    /* -----------------------------------------------------
       QUIOCTA
    ----------------------------------------------------- */

    quiocta: {

        categoria: "AMAZONAS - PERÚ / AVENTURA",

        titulo: "Cavernas de Quiocta",

        subtitulo: "Un mundo subterráneo por descubrir",

        portada: "imagen/caberna.jpg.jpeg",

        etiqueta: "EXPLORA EL INTERIOR",

        tituloInfo: "Las formaciones de Quiocta",

        descripcion1: "Las cavernas de Quiocta permiten descubrir un impresionante entorno subterráneo con formaciones naturales.",

        descripcion2: "En su interior, los visitantes pueden descubrir impresionantes formaciones de estalactitas y estalagmitas que han sido moldeadas lentamente por la naturaleza. Recorrer sus galerías permite apreciar un paisaje subterráneo fascinante y vivir una experiencia diferente, ideal para quienes disfrutan de la aventura y la exploración.",

        galeria: [
            "imagen/gall-quio1.jpeg",
            "imagen/gall-quio2.jpeg",
            "imagen/gall-quio3.jpeg",
            "imagen/gall-quio4.jpeg",
            "imagen/gall-quio5.jpeg"
        ],

        maps: "https://maps.app.goo.gl/P8qtm9QnhSgsACpn8",

        datos: [

            [
                "UBICACIÓN",
                "Se encuentran en el distrito de Lamud, provincia de Luya, región Amazonas."
            ],

            [
                "TIPO DE DESTINO",
                "Es un atractivo turístico natural subterráneo, reconocido por sus galerías y formaciones rocosas de gran belleza."
            ],

            [
                "ACTIVIDAD",
                "Los visitantes pueden realizar recorridos por el interior de las cavernas, observar estalactitas y estalagmitas y explorar sus diferentes espacios subterráneos."
            ]

        ]

    },


    /* -----------------------------------------------------
       CAÑÓN DEL SONCHE
    ----------------------------------------------------- */

    sonche: {

        categoria: "AMAZONAS - PERÚ / PAISAJES",

        titulo: "Cañón de Huancas - Sonche",

        subtitulo: "Un mirador hacia paisajes extraordinarios",

        portada: "imagen/canon-sonche.jpg.jpeg",

        etiqueta: "ADMIRA EL PAISAJE",

        tituloInfo: "La inmensidad del Cañón de Huancas",

        descripcion1: "El Cañón del Sonche ofrece vistas impresionantes de un profundo paisaje natural rodeado de montañas.",

        descripcion2: "Además de sus impresionantes paisajes y profundos acantilados, la visita al Cañón del Sonche permite conocer la riqueza cultural del distrito de Huancas. Este lugar es reconocido por su tradición alfarera, donde los artesanos elaboran piezas de cerámica utilizando técnicas tradicionales transmitidas de generación en generación. Así, los visitantes pueden disfrutar de la naturaleza y descubrir las costumbres y expresiones culturales de sus habitantes.",

        galeria: [
            "imagen/gall-canon1.jpeg",
            "imagen/gall-canon2.jpeg",
            "imagen/gall-canon3.jpeg",
            "imagen/gall-canon4.jpeg",
            "imagen/gall-canon5.jpeg",
            "imagen/gall-canon6.jpeg"
        ],

        maps: "https://maps.app.goo.gl/GeAnndZp5xzPfcRE9",

        datos: [

            [
                "UBICACIÓN",
                "Se encuentra en el distrito de Huancas, provincia de Chachapoyas, región Amazonas, desde donde se pueden apreciar impresionantes vistas del cañón."
            ],

            [
                "TIPO DE DESTINO",
                "Es un atractivo de paisaje natural que destaca por sus profundos acantilados, formaciones geológicas y miradores naturales."
            ],

            [
                "ACTIVIDAD",
                "Los visitantes pueden recorrer los miradores, tomar fotografías, contemplar el paisaje y conocer la tradición alfarera de Huancas, donde los artesanos elaboran cerámicas con técnicas ancestrales."
            ]

        ]

    }

};


/* =========================================================
   8. ELEMENTOS DE LA VENTANA DE DETALLES
========================================================= */

const detalle = document.querySelector("#detalleDestino");

const botonVolver = document.querySelector("#volver");

const botonVolverFinal = document.querySelector("#volverFinal");

let recorteDeRegreso = "";


/* =========================================================
   9. ABRIR LAS FICHAS DE LOS DESTINOS
========================================================= */

document.querySelectorAll(".tarjeta[data-destino]").forEach(function(tarjeta) {

    tarjeta.addEventListener("click", function() {

        if (!detalle) {
            return;
        }


        /* -------------------------------------------------
           CAPTURAR LA POSICIÓN DE LA TARJETA
        ------------------------------------------------- */

        const rect = tarjeta.getBoundingClientRect();

        const arriba = rect.top;

        const izquierda = rect.left;

        const derecha = window.innerWidth - rect.right;

        const abajo = window.innerHeight - rect.bottom;

        recorteDeRegreso =
            `inset(${arriba}px ${derecha}px ${abajo}px ${izquierda}px round 12px)`;


        /* -------------------------------------------------
           OBTENER EL DESTINO SELECCIONADO
        ------------------------------------------------- */

        const nombreDestino = tarjeta.dataset.destino;

        const destino = destinos[nombreDestino];

        if (!destino) {
            return;
        }


        /* -------------------------------------------------
           CARGAR LA PORTADA
        ------------------------------------------------- */

        const imagenPortada = document.querySelector("#imagenPortada");

        if (imagenPortada) {

            imagenPortada.src = destino.portada;

            imagenPortada.alt = destino.titulo;

        }

        document.querySelector("#categoriaDestino").textContent =
            destino.categoria;

        document.querySelector("#tituloDestino").textContent =
            destino.titulo;

        document.querySelector("#subtituloDestino").textContent =
            destino.subtitulo;


        /* -------------------------------------------------
           CARGAR LA INTRODUCCIÓN
        ------------------------------------------------- */

        document.querySelector("#etiquetaIntroduccion").textContent =
            destino.etiqueta;

        document.querySelector("#tituloIntroduccion").textContent =
            destino.tituloInfo;

        document.querySelector("#descripcionUno").textContent =
            destino.descripcion1;

        document.querySelector("#descripcionDos").textContent =
            destino.descripcion2;


        /* -------------------------------------------------
           CARGAR LA GALERÍA
        ------------------------------------------------- */

        const galeria = document.querySelector("#galeriaImagenes");

        if (galeria) {

            galeria.innerHTML = "";

            destino.galeria.forEach(function(imagen) {

                const img = document.createElement("img");

                img.src = imagen;

                img.alt = destino.titulo;

                img.loading = "lazy";

                galeria.appendChild(img);

            });

        }


        /* -------------------------------------------------
           CARGAR LOS DATOS DEL DESTINO
        ------------------------------------------------- */

        const datos = document.querySelector("#datosDestino");

        if (datos) {

            datos.innerHTML = "";

            destino.datos.forEach(function(dato) {

                const tarjetaDato = document.createElement("div");

                tarjetaDato.classList.add("dato");

                tarjetaDato.innerHTML = `
                    <span>${dato[0]}</span>
                    <h3>${dato[1]}</h3>
                `;


                // SI ES UBICACIÓN, MOSTRAR MINI MAPA

                if (dato[0] === "UBICACIÓN" && destino.maps) {

                    const busquedaMapa = encodeURIComponent(
                        destino.titulo + ", Amazonas, Perú"
                    );

                    tarjetaDato.innerHTML += `
                        <a
                            href="${destino.maps}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="mapa-enlace"
                        >
                            <iframe
                                src="https://maps.google.com/maps?q=${busquedaMapa}&output=embed"
                                loading="lazy"
                                title="Mapa de ${destino.titulo}"
                            ></iframe>

                            <p>Ver en Google Maps ↗</p>
                        </a>
                    `;

                }

                datos.appendChild(tarjetaDato);

            });

        }


        /* -------------------------------------------------
           MOSTRAR LA FICHA Y ANIMAR SU EXPANSIÓN
        ------------------------------------------------- */

        detalle.style.clipPath = recorteDeRegreso;

        detalle.style.display = "block";

        detalle.scrollTop = 0;

        // Forzar al navegador a reconocer el tamaño inicial

        detalle.offsetWidth;

        // Comenzar la expansión

        requestAnimationFrame(function() {

            detalle.style.clipPath = "inset(0px 0px 0px 0px round 0px)";

        });

    });

});


/* =========================================================
   10. REGRESAR AL CARRUSEL
========================================================= */

function regresarCarrusel() {

    if (!detalle) {
        return;
    }

    // Volver al inicio de la ficha

    detalle.scrollTop = 0;

    // Contraer la página

    detalle.style.clipPath = recorteDeRegreso;

    // Ocultar después de terminar la animación

    setTimeout(function() {

        detalle.style.display = "none";

    }, 1000);

}


// Botón superior

botonVolver?.addEventListener("click", regresarCarrusel);

// Botón inferior

botonVolverFinal?.addEventListener("click", regresarCarrusel);


/* =========================================================
   11. DIRECTORIO FOTOGRÁFICO DE LOS 21 DISTRITOS
========================================================= */

// Las fotografías enlazadas desde la web requieren Internet.

const distritosChachapoyas = [

    {
        nombre: "Asunción",
        imagen: "imagen/1.21.png",
        nota: "Un destino de tranquilidad y tradición andina, rodeado de paisajes naturales que invitan a explorar."
    },

    {
        nombre: "Balsas",
        imagen: "imagen/2.21.png",
        nota: "Tierra de clima cálido y paisajes singulares, donde la naturaleza y la aventura se encuentran."
    },

    {
        nombre: "Chachapoyas",
        imagen: "imagen/3.21.png",
        nota: "Una ciudad llena de historia, tradición y encanto colonial, donde cada rincón guarda una historia por descubrir."
    },

    {
        nombre: "Cheto",
        imagen: "imagen/4.21.png",
        nota: "Un pequeño rincón de los Andes que conserva la esencia de sus costumbres y la belleza de sus paisajes."
    },

    {
        nombre: "Chiliquín",
        imagen: "imagen/5.21.png",
        nota: "Un destino rodeado de montañas y naturaleza, ideal para quienes buscan tranquilidad y conexión con el campo."
    },

    {
        nombre: "Chuquibamba",
        imagen: "imagen/6.21.png",
        nota: "Un lugar de encanto rural, donde las tradiciones y los paisajes andinos crean una experiencia especial."
    },

    {
        nombre: "Granada",
        imagen: "imagen/7.21.png",
        nota: "Un pueblo acogedor que invita a descubrir la sencillez de la vida rural y la belleza de sus alrededores."
    },

    {
        nombre: "Huancas",
        imagen: "imagen/8.21.png",
        nota: "Famoso por sus impresionantes miradores y su tradición alfarera, ofrece vistas inolvidables del cañón del Sonche."
    },

    {
        nombre: "La Jalca",
        imagen:"imagen/9.21.png",
        nota: "Cuna de historia y cultura ancestral, donde las tradiciones de sus antepasados siguen vivas"
    },

    {
        nombre: "Leimebamba",
        imagen: "imagen/10.21.png",
        nota: "Tierra de historia prehispánica y paisajes fascinantes, ideal para los amantes de la cultura y la naturaleza."
    },

    {
        nombre: "Levanto",
        imagen: "imagen/11.21.png",
        nota: "Un destino de herencia colonial y vestigios arqueológicos, rodeado de verdes montañas y hermosos caminos.."
    },

    {
        nombre: "Magdalena",
        imagen: "imagen/12.21.png",
        nota: "Un lugar donde la tranquilidad de sus paisajes y la riqueza de sus tradiciones cautivan a sus visitantes."
    },

    {
        nombre: "Mariscal Castilla",
        imagen: "imagen/13.21.png",
        nota: "Un rincón de naturaleza y encanto rural que conserva la esencia de los pueblos de Amazonas."
    },

    {
        nombre: "Molinopampa",
        imagen: "imagen/14.21.png",
        nota: "Tierra de extensos pastizales, hermosas lagunas y paisajes que transmiten paz y libertad.."
    },

    {
        nombre: "Montevideo",
        imagen: "imagen/15.21.png",
        nota: "Un destino de belleza natural y ambiente tranquilo, perfecto para descubrir la vida de los Andes."
    },

    {
        nombre: "Olleros",
        imagen: "imagen/16.21.png",
        nota: "Un pueblo de paisajes montañosos y tradiciones rurales que conserva el encanto de la vida andina.."
    },

    {
        nombre: "Quinjalca",
        imagen: "imagen/17.21.png",
        nota: "Un lugar de verdes montañas y caminos naturales que invitan a vivir nuevas aventuras."
    },

    {
        nombre: "San Francisco de Daguas",
        imagen: "imagen/18.21.png",
        nota: "Un destino apacible donde la naturaleza y las costumbres locales crean un ambiente acogedor."
    },

    {
        nombre: "San Isidro de Maino",
        imagen: "imagen/19.21.png",
        nota: "Un rincón andino de paisajes encantadores, ideal para disfrutar de la tranquilidad y el contacto con la naturaleza."
    },

    {
        nombre: "Soloco",
        imagen: "imagen/20.21.png",
        nota: "Tierra de montañas, cuevas y misteriosos paisajes naturales que despiertan el espíritu aventurero.."
    },

    {
        nombre: "Sonche",
        imagen: "imagen/21.21.png",
        nota: "Un pequeño destino lleno de encanto rural, donde los paisajes naturales y la tranquilidad son protagonistas.."
    }

];


/* =========================================================
   12. ELEMENTOS DEL MODAL DE DISTRITOS
========================================================= */

const distritosGrid = document.querySelector("#distritosGrid");

const modalDistrito = document.querySelector("#modalDistrito");

const modalDistritoTitulo = document.querySelector("#modalDistritoTitulo");

const modalMapa = document.querySelector("#modalMapa");

const modalDistritoImagen = document.querySelector("#modalDistritoImagen");

const modalDistritoNota = document.querySelector("#modalDistritoNota");


/* =========================================================
   13. GENERAR LAS TARJETAS DE LOS DISTRITOS
========================================================= */

if (distritosGrid) {

    distritosChachapoyas.forEach(function(distrito, indice) {

        const tarjeta = document.createElement("button");

        tarjeta.type = "button";

        tarjeta.className = "distrito-card";


        // CONTENIDO DE LA TARJETA

        tarjeta.innerHTML = `
            <span class="distrito-numero">
                ${String(indice + 1).padStart(2, "0")}
            </span>

            <img
                class="distrito-foto"
                src="${distrito.imagen}"
                alt="${distrito.nombre}"
                loading="lazy"
            >

            <span class="distrito-nombre">
                ${distrito.nombre}
            </span>

            <span class="distrito-flecha">↗</span>
        `;


        // SI LA IMAGEN FALLA, UTILIZAR UNA IMAGEN LOCAL

        const foto = tarjeta.querySelector(".distrito-foto");

        foto.addEventListener("error", function() {

            foto.src = "imagen/Chachapoyas.jpg";

            foto.alt = `Imagen referencial de ${distrito.nombre}`;

        }, { once: true });


        // ABRIR EL MODAL AL HACER CLIC

        tarjeta.addEventListener("click", function() {

            if (!modalDistrito) {
                return;
            }

            if (modalDistritoTitulo) {

                modalDistritoTitulo.textContent = distrito.nombre;

            }

            if (modalDistritoImagen) {

                modalDistritoImagen.src = distrito.imagen;

                modalDistritoImagen.alt =
                    `${distrito.nombre}, provincia de Chachapoyas`;

            }

            if (modalDistritoNota) {

                modalDistritoNota.textContent = distrito.nota;

            }

            if (modalMapa) {

                modalMapa.href =
                    `https://www.google.com/maps/search/?api=1&query=${
                        encodeURIComponent(
                            distrito.nombre +
                            ", provincia de Chachapoyas, Amazonas, Perú"
                        )
                    }`;

            }

            modalDistrito.classList.add("visible");

            modalDistrito.setAttribute("aria-hidden", "false");

            document.body.classList.add("sin-scroll");

        });


        // AGREGAR TARJETA AL DIRECTORIO

        distritosGrid.appendChild(tarjeta);

    });

}


/* =========================================================
   14. CERRAR EL MODAL DE DISTRITOS
========================================================= */

function cerrarModalDistrito() {

    modalDistrito?.classList.remove("visible");

    modalDistrito?.setAttribute("aria-hidden", "true");

    document.body.classList.remove("sin-scroll");

}


// Botón para cerrar

document.querySelector("#cerrarDistrito")
    ?.addEventListener("click", cerrarModalDistrito);


// Cerrar al hacer clic fuera del contenido

modalDistrito?.addEventListener("click", function(event) {

    if (event.target === modalDistrito) {

        cerrarModalDistrito();

    }

});


/* =========================================================
   15. VISOR DE FOTOGRAFÍAS AMPLIADAS
========================================================= */

const visorImagen = document.querySelector("#visorImagen");

const imagenAmpliada = document.querySelector("#imagenAmpliada");


/* ---------------------------------------------------------
   ABRIR UNA IMAGEN DE LA GALERÍA
--------------------------------------------------------- */

document.querySelector("#galeriaImagenes")
    ?.addEventListener("click", function(event) {

        if (event.target.tagName !== "IMG") {
            return;
        }

        if (!visorImagen || !imagenAmpliada) {
            return;
        }

        imagenAmpliada.src = event.target.src;

        imagenAmpliada.alt =
            event.target.alt || "Fotografía del destino";

        visorImagen.classList.add("visible");

        visorImagen.setAttribute("aria-hidden", "false");

    });


/* ---------------------------------------------------------
   CERRAR EL VISOR
--------------------------------------------------------- */

function cerrarVisor() {

    visorImagen?.classList.remove("visible");

    visorImagen?.setAttribute("aria-hidden", "true");

}


// Botón para cerrar

document.querySelector("#cerrarVisor")
    ?.addEventListener("click", cerrarVisor);


// Cerrar al hacer clic fuera de la imagen

visorImagen?.addEventListener("click", function(event) {

    if (event.target === visorImagen) {

        cerrarVisor();

    }

});


/* =========================================================
   16. CERRAR MODALES CON LA TECLA ESCAPE
========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        cerrarModalDistrito();

        cerrarVisor();

    }

});
