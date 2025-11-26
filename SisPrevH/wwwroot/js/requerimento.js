document.addEventListener("DOMContentLoaded", function () {

    // Alternância Fácil / Difícil
    const btnFacil = document.getElementById("btnFacil");
    const btnDificil = document.getElementById("btnDificil");
    const modoFacil = document.getElementById("modoFacil");
    const modoDificil = document.getElementById("modoDificil");

    btnFacil.addEventListener("click", () => {
        modoFacil.classList.remove("escondido");
        modoDificil.classList.add("escondido");
        btnFacil.classList.add("ativo");
        btnDificil.classList.remove("ativo");
    });

    btnDificil.addEventListener("click", () => {
        modoFacil.classList.add("escondido");
        modoDificil.classList.remove("escondido");
        btnFacil.classList.remove("ativo");
        btnDificil.classList.add("ativo");
    });



    // -----------------------------
    //  TUTORIAL
    // -----------------------------

    const passos = [
        {
            seletor: "[data-tutorial='dados']",
            titulo: "Dados Pessoais",
            texto: "Aqui estão seus dados, já preenchidos automaticamente."
        },
        {
            seletor: "[data-tutorial='beneficio']",
            titulo: "Tipo de Aposentadoria",
            texto: "Escolha aqui o tipo de aposentadoria que deseja requerer."
        },
        {
            seletor: "[data-tutorial='documentos']",
            titulo: "Documentos",
            texto: "Se necessário, anexe documentos nesta área."
        },
        {
            seletor: "[data-tutorial='enviar']",
            titulo: "Enviar Requerimento",
            texto: "Quando tudo estiver certo, clique aqui para finalizar."
        }
    ];

    let indexPasso = 0;

    const overlay = document.getElementById("tutorialOverlay");
    const tooltip = document.getElementById("tutorialTooltip");
    const titulo = document.getElementById("tutorialTitulo");
    const texto = document.getElementById("tutorialTexto");

    const btnAjuda = document.getElementById("btnAjuda");
    const btnProximo = document.getElementById("btnProximoTutorial");
    const btnFechar = document.getElementById("btnFecharTutorial");

    function mostrarPasso() {
        const passo = passos[indexPasso];

        document.querySelectorAll(".highlight-focus").forEach(el =>
            el.classList.remove("highlight-focus")
        );

        const alvo = document.querySelector(passo.seletor);
        alvo.classList.add("highlight-focus");

        titulo.textContent = passo.titulo;
        texto.textContent = passo.texto;

        const rect = alvo.getBoundingClientRect();

        tooltip.style.top = window.scrollY + rect.top + rect.height + 15 + "px";
        tooltip.style.left = window.scrollX + rect.left + "px";
    }

    btnAjuda.addEventListener("click", () => {
        overlay.classList.remove("escondido");
        tooltip.classList.remove("escondido");
        indexPasso = 0;

        document.body.classList.add("tutorial-escurecer");

        mostrarPasso();
    });


    btnProximo.addEventListener("click", () => {
        indexPasso++;

        if (indexPasso >= passos.length) {
            fecharTutorial();
            return;
        }

        mostrarPasso();
    });

    function fecharTutorial() {
        overlay.classList.add("escondido");
        tooltip.classList.add("escondido");

        document.body.classList.remove("tutorial-escurecer");

        document.querySelectorAll(".highlight-focus").forEach(el =>
            el.classList.remove("highlight-focus")
        );
    }


    btnFechar.addEventListener("click", fecharTutorial);
});
