/* =========================
   LOCAL STORAGE ANALISIS
========================= */

const textareas = document.querySelectorAll("textarea");

const saveStatus = document.getElementById("saveStatus");

textareas.forEach(textarea => {

    // CARGAR CONTENIDO

    const savedText =
    localStorage.getItem(textarea.id);

    if(savedText){

        textarea.value = savedText;

    }

    // GUARDADO AUTOMÁTICO

    textarea.addEventListener("input", () => {

        localStorage.setItem(
            textarea.id,
            textarea.value
        );

        if(saveStatus){

            saveStatus.textContent =
            "Cambios guardados automáticamente.";

        }

    });

});

/* =========================
   ESCRITURA
========================= */

const storyEditor =
document.getElementById("storyEditor");

const wordCount =
document.getElementById("wordCount");

const charCount =
document.getElementById("charCount");

const downloadBtn =
document.getElementById("downloadBtn");

const clearBtn =
document.getElementById("clearBtn");

/* SOLO SI EXISTE EL EDITOR */

if(storyEditor){

    // CARGAR TEXTO

    const savedStory =
    localStorage.getItem("storyEditor");

    if(savedStory){

        storyEditor.value = savedStory;

        updateStats();
    }

    // GUARDAR AUTOMÁTICAMENTE

    storyEditor.addEventListener("input", () => {

        localStorage.setItem(
            "storyEditor",
            storyEditor.value
        );

        updateStats();

    });

}

/* CONTADORES */

function updateStats(){

    const text =
    storyEditor.value.trim();

    const words =
    text.length > 0
    ? text.split(/\s+/).length
    : 0;

    wordCount.textContent = words;

    charCount.textContent =
    storyEditor.value.length;
}

/* DESCARGAR TXT */

if(downloadBtn){

    downloadBtn.addEventListener("click", () => {

        const text =
        storyEditor.value;

        const blob =
        new Blob([text], {
            type:"text/plain"
        });

        const link =
        document.createElement("a");

        link.href =
        URL.createObjectURL(blob);

        link.download =
        "reinterpretacion.txt";

        link.click();

    });

}

/* LIMPIAR */

if(clearBtn){

    clearBtn.addEventListener("click", () => {

        const confirmClear =
        confirm(
            "¿Deseas borrar todo el texto?"
        );

        if(confirmClear){

            storyEditor.value = "";

            localStorage.removeItem(
                "storyEditor"
            );

            updateStats();

        }

    });

}/* =========================
   MUSIC TOGGLE
========================= */

const music =
document.getElementById("bgMusic");

const musicToggle =
document.getElementById("musicToggle");

if(music && musicToggle){

    // volumen inicial

    music.volume = 0.3;

    // iniciar silenciado OFF

    music.muted = false;

    // intentar reproducir

    music.play().catch(() => {

        console.log(
            "Autoplay bloqueado por navegador"
        );

    });

    // botón

    musicToggle.addEventListener("click", () => {

        // alternar mute

        if(music.muted){

            music.muted = false;

            musicToggle.textContent = "🎵";

        }else{

            music.muted = true;

            musicToggle.textContent = "🔇";

        }

    });

}

const interpretationBox =
document.getElementById(
    "studentInterpretation"
);

const saveInterpretation =
document.getElementById(
    "saveInterpretation"
);

if(
    interpretationBox &&
    saveInterpretation
){

    saveInterpretation.addEventListener(
        "click",
        () => {

            localStorage.setItem(
                "interpretacionCiudadPerros",
                interpretationBox.value
            );

            alert(
                "Interpretación guardada."
            );

        }
    );

}

const loadedInterpretation =
document.getElementById(
    "loadedInterpretation"
);

if(loadedInterpretation){

    const data =
    localStorage.getItem(
        "interpretacionCiudadPerros"
    );

    if(data){

        loadedInterpretation.textContent =
        data;

    }

}