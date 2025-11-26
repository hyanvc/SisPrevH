document.addEventListener("DOMContentLoaded", function () {

    // ==========================
    // Alternância Fácil / Difícil
    // ==========================
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


    // ==========================
    // TUTORIAL
    // ==========================

    const passos = [
        {
            seletor: "[data-tutorial='dados']",
            titulo: "Dados Pessoais",
            texto: "Aqui você vê seus dados já preenchidos automaticamente."
        },
        {
            seletor: "[data-tutorial='beneficio']",
            titulo: "Tipo de Aposentadoria",
            texto: "Selecione aqui o tipo de aposentadoria que deseja requerer."
        },
        {
            seletor: "[data-tutorial='documentos']",
            titulo: "Envio de Documentos",
            texto: "Se necessário, você pode anexar documentos aqui."
        },
        {
            seletor: "[data-tutorial='enviar']",
            titulo: "Finalizar Pedido",
            texto: "Clique aqui para enviar o requerimento."
        }
    ];

    let indexPasso = 0;

    const overlay = document.getElementById("tutorialOverlay");
    const tutorialBox = document.getElementById("tutorialBox");
    const titulo = document.getElementById("tutorialTitulo");
    const texto = document.getElementById("tutorialTexto");
    const btnProximo = document.getElementById("btnProximoTutorial");
    const btnFechar = document.getElementById("btnFecharTutorial");
    const btnAjuda = document.getElementById("btnAjuda");

    function mostrarPasso() {
        const passo = passos[indexPasso];

        // Remove highlight anterior
        document.querySelectorAll(".highlight-focus").forEach(el => {
            el.classList.remove("highlight-focus");
        });

        // Elemento a destacar
        const alvo = document.querySelector(passo.seletor);
        alvo.classList.add("highlight-focus");

        // Texto
        titulo.textContent = passo.titulo;
        texto.textContent = passo.texto;

        // Posiciona a caixa do tutorial ao lado
        const rect = alvo.getBoundingClientRect();
        tutorialBox.style.top = (rect.top + window.scrollY + 20) + "px";
        tutorialBox.style.left = (rect.left + rect.width + 20) + "px";
    }

    // Iniciar tutorial
    btnAjuda.addEventListener("click", () => {
        overlay.classList.remove("escondido");
        indexPasso = 0;
        mostrarPasso();
    });

    // Avançar
    btnProximo.addEventListener("click", () => {
        indexPasso++;

        if (indexPasso >= passos.length) {
            fecharTutorial();
            return;
        }

        mostrarPasso();
    });

    // Fechar
    function fecharTutorial() {
        overlay.classList.add("escondido");
        document.querySelectorAll(".highlight-focus").forEach(el => {
            el.classList.remove("highlight-focus");
        });
    }

    btnFechar.addEventListener("click", fecharTutorial);
});
