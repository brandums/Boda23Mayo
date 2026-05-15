jQuery(document).ready(function ($) {
    $('img[title]').each(function () {
        $(this).removeAttr('title');
    });
});

(function () {
    if (document.body.classList.contains('elementor-editor-active')) return;

    window.scrollTo(0, 0);

    const UI = {
        botonEntrar: document.querySelector('.v2-boton-entrar'),
        seccionBloqueo: document.getElementById('v2-capa-bloqueo'),
        musica: document.getElementById('v2-musica'),
        botonMusica: document.getElementById('v2-boton-control')
    };

    if (UI.botonEntrar && UI.seccionBloqueo) {
        UI.botonEntrar.addEventListener('click', function (e) {
            e.preventDefault();

            const docElm = document.documentElement;
            const entrarFS = docElm.requestFullscreen ||
                docElm.webkitRequestFullscreen ||
                docElm.msRequestFullscreen ||
                docElm.mozRequestFullScreen;
            if (entrarFS) {
                entrarFS.call(docElm).catch(function (err) {
                    console.warn("FS denegado:", err.message);
                });
            }

            if (UI.musica) {
                UI.musica.play().catch(function (err) {
                    console.log("Reproducción bloqueada por navegador");
                });
            }

            if (UI.botonMusica) {
                UI.botonMusica.style.display = 'flex';
                setTimeout(function () {
                    UI.botonMusica.style.opacity = '1';
                }, 100);
            }

            UI.seccionBloqueo.classList.add('v2-abrir');

            setTimeout(function () {
                document.body.style.overflow = 'auto';
            }, 1000);

            setTimeout(function () {
                UI.seccionBloqueo.style.display = 'none';
            }, 1500);
        });
    }

    if (UI.botonMusica && UI.musica) {
        UI.botonMusica.addEventListener('click', function (e) {
            e.stopPropagation();
            if (UI.musica.paused) {
                UI.musica.play();
                UI.botonMusica.classList.remove('paused');
            } else {
                UI.musica.pause();
                UI.botonMusica.classList.add('paused');
            }
        });
    }
})();

document.addEventListener("DOMContentLoaded", function () {
    const elementos = document.querySelectorAll(".zoom-animar");

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("zoom-in");
                entry.target.classList.remove("zoom-out");
            } else {
                entry.target.classList.remove("zoom-in");
                entry.target.classList.add("zoom-out");
            }
        });
    }, { threshold: 0.25 });

    elementos.forEach(function (el) {
        observer.observe(el);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (e) {
        const boton = e.target.closest('.btn-mapa-dinamico');

        if (boton) {
            let info = boton.getAttribute('data-coords');

            if (info) {
                if (info.includes('google.com/maps')) {
                    const match = info.match(/q=([^&]+)/) || info.match(/place\/([^/]+)/);
                    if (match) {
                        info = match[1];
                    }
                }

                setTimeout(function () {
                    const iframe = document.querySelector('#mapa-dinamico iframe');
                    if (iframe) {
                        const nuevaUrl = 'https://maps.google.com/maps?q=' + info + '&t=m&z=16&output=embed';
                        iframe.src = nuevaUrl;
                    }
                }, 500);
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const btnEntrar = document.getElementById("btnIngresar");
    const secciones = document.querySelectorAll(".seccion-invitacion");
    const musica = document.getElementById("musica");
    const botonFlotante = document.getElementById("botonMusica");

    secciones.forEach(function (sec) {
        sec.style.display = "none";
    });

    if (btnEntrar) {
        btnEntrar.addEventListener("click", function () {
            const portada = btnEntrar.closest(".elementor-section, .e-con");
            if (portada) portada.style.display = "none";

            secciones.forEach(function (sec) {
                sec.style.display = "block";
            });

            if (botonFlotante) botonFlotante.style.display = "flex";

            if (musica) {
                musica.play().catch(function (err) {
                    console.log("El navegador bloqueó el auto-play inicial");
                });
            }
        });
    }

    if (botonFlotante && musica) {
        botonFlotante.addEventListener("click", function () {
            if (musica.paused) {
                musica.play();
                botonFlotante.classList.remove("paused");
            } else {
                musica.pause();
                botonFlotante.classList.add("paused");
            }
        });
    }
});

(function () {
    const lazyloadRunObserver = function () {
        const lazyloadBackgrounds = document.querySelectorAll('.e-con.e-parent:not(.e-lazyloaded)');
        const lazyloadBackgroundObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyloadBackground = entry.target;
                    if (lazyloadBackground) {
                        lazyloadBackground.classList.add('e-lazyloaded');
                    }
                    lazyloadBackgroundObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px 0px 200px 0px' });

        lazyloadBackgrounds.forEach(function (lazyloadBackground) {
            lazyloadBackgroundObserver.observe(lazyloadBackground);
        });
    };

    const events = ['DOMContentLoaded', 'elementor/lazyload/observe'];
    events.forEach(function (event) {
        document.addEventListener(event, lazyloadRunObserver);
    });
})();

(function () {
    if ("querySelector" in document && "addEventListener" in window) {
        var e = document.body;
        e.addEventListener("pointerdown", function () {
            e.classList.add("using-mouse");
        }, { passive: true });
        e.addEventListener("keydown", function () {
            e.classList.remove("using-mouse");
        }, { passive: true });
    }
})();

// Countdown Timer
document.addEventListener('DOMContentLoaded', function () {
    const targetDate = new Date(2026, 4, 23, 20, 0, 0).getTime();

    const daysEl = document.querySelector('.elementor-countdown-days');
    const hoursEl = document.querySelector('.elementor-countdown-hours');
    const minutesEl = document.querySelector('.elementor-countdown-minutes');
    const secondsEl = document.querySelector('.elementor-countdown-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            return;
        }

        daysEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        hoursEl.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        minutesEl.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        secondsEl.innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// ─── RSVP: Token, Fetch y Formulario ──────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // ✅ URL del backend en producción
    const API_BASE_URL = 'https://backend-boda-crisdani.fly.dev/api';

    const nameDisplay = document.getElementById('guest-name-display');
    const ticketsDisplay = document.getElementById('guest-tickets-display');
    const formNombre = document.getElementById('form-field-nombre');
    const formAsistencia = document.getElementById('form-field-asistencia');
    const busContainer = document.getElementById('bus-field-container');
    const form = document.getElementById('guest-rsvp-form');
    let btnSubmit = null;
    if (form) {
        btnSubmit = form.querySelector('button[type="submit"]');
    }

    let guestData = null;

    if (token) {
        // API connection removed - we now show a generic invitation to everyone.
    } else {
        // ...
    }

    // Control del campo Bus según asistencia seleccionada
    if (formAsistencia) {
        formAsistencia.addEventListener('change', function () {
            const busSelect = document.getElementById('form-field-bus');
            const noAsiste = this.value === "0" || this.value === "No podré, lo siento";

            if (noAsiste) {
                if (busContainer) busContainer.style.display = 'block';
                if (busSelect) {
                    // Forzar "No" cuando no asiste
                    let noOption = Array.from(busSelect.options).find(opt =>
                        opt.value === "No" || opt.text.toLowerCase() === "no"
                    );
                    if (!noOption) {
                        noOption = document.createElement('option');
                        noOption.value = "No";
                        noOption.innerText = "No";
                        busSelect.appendChild(noOption);
                    }
                    busSelect.value = noOption.value;
                    busSelect.disabled = true;
                }
            } else {
                if (busContainer) busContainer.style.display = 'block';
                if (busSelect) busSelect.disabled = false;
            }
        });

        if (!token) {
            formAsistencia.dispatchEvent(new Event('change'));
        }
    }

    // Envío del formulario
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            if (btnSubmit) {
                btnSubmit.disabled = true;
                const textSpan = btnSubmit.querySelector('.elementor-button-text');
                if (textSpan) textSpan.innerText = "Enviando...";
            }

            const formData = new FormData(form);
            const asistenciaVal = formData.get('form_fields[asistencia]');
            const busSelect = document.getElementById('form-field-bus');
            const busVal = busSelect ? busSelect.value : (formData.get('form_fields[bus]') || "");

            // ✅ Convertir "Si"/"Ire en auto"/"No" al boolean que espera el backend
            const iraEnBus = busVal === "Si";

            const dataToSubmit = {
                token: token,
                asistencia: asistenciaVal,   // "2", "1", "0"
                iraEnBus: iraEnBus,           // true / false
                mensaje: formData.get('form_fields[mensaje]') || ""
            };

            try {
                const postResponse = await fetch(`${API_BASE_URL}/confirmar`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataToSubmit)
                });

                if (!postResponse.ok) {
                    throw new Error("Error en servidor: " + postResponse.status);
                }

                form.innerHTML = "<h3 style='text-align: center; color: #333;'>¡Gracias por confirmar tu asistencia! Hemos registrado tus datos.</h3>";
            } catch (error) {
                console.error("Error enviando RSVP:", error);
                alert("Hubo un problema guardando tu confirmación. Intenta más tarde.");
                if (btnSubmit) {
                    btnSubmit.disabled = false;
                    const textSpan = btnSubmit.querySelector('.elementor-button-text');
                    if (textSpan) textSpan.innerText = "Enviar";
                }
            }
        });
    }
});