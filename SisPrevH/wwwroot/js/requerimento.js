document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // VARIÁVEL: define o modo inicial
    // ===============================
    var modoDificil = window.modoDificil; 

    const btnFacil = document.getElementById("btnFacil");
    const btnDificil = document.getElementById("btnDificil");
    const modoFacil = document.getElementById("modoFacil");
    const modoDificilEl = document.getElementById("modoDificil");

    if (modoDificil) {
        if (modoFacil) modoFacil.classList.add("escondido");
        if (modoDificilEl) modoDificilEl.classList.remove("escondido");
        if (btnDificil) btnDificil.classList.add("ativo");
        if (btnFacil) btnFacil.classList.remove("ativo");
    } else {
        if (modoFacil) modoFacil.classList.remove("escondido");
        if (modoDificilEl) modoDificilEl.classList.add("escondido");
        if (btnFacil) btnFacil.classList.add("ativo");
        if (btnDificil) btnDificil.classList.remove("ativo");
    }

    // listeners de alternância
    btnFacil?.addEventListener("click", () => {
        // atualiza exibição (o comportamento do modoDificil pode permanecer apenas como "inicial")
        if (modoFacil) modoFacil.classList.remove("escondido");
        if (modoDificilEl) modoDificilEl.classList.add("escondido");
        if (btnFacil) btnFacil.classList.add("ativo");
        if (btnDificil) btnDificil.classList.remove("ativo");
    });

    btnDificil?.addEventListener("click", () => {
        debugger;
        if (modoFacil) modoFacil.classList.add("escondido");
        if (modoDificilEl) modoDificilEl.classList.remove("escondido");
        if (btnFacil) btnFacil.classList.remove("ativo");
        if (btnDificil) btnDificil.classList.add("ativo");
    });

    // ------------------------------------------
    //  TUTORIAL
    // ------------------------------------------

    const passos = [
        {
            seletor: "[data-tutorial='dados']",
            titulo: "Dados Pessoais",
            texto: "Aqui estão seus dados, já preenchidos automaticamente."
        },
        {
            seletor: "[data-tutorial='beneficio']",
            titulo: "Tipo de Aposentadoria",
            texto: "Escolha o tipo de aposentadoria que deseja requerer."
        },
        {
            seletor: "[data-tutorial='documentos']",
            titulo: "Documentos",
            texto: "Se necessário, anexe documentos nesta área."
        },
        {
            seletor: "[data-tutorial='enviar']",
            titulo: "Enviar Requerimento",
            texto: "Ao finalizar tudo, clique para enviar seu requerimento."
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
        if (!alvo) return;

        alvo.classList.add("highlight-focus");

        titulo.textContent = passo.titulo;
        texto.textContent = passo.texto;

        const rect = alvo.getBoundingClientRect();

        tooltip.style.top = window.scrollY + rect.bottom + 15 + "px";
        tooltip.style.left = window.scrollX + rect.left + "px";
    }

    // Se o modo inicial for difícil, podemos esconder o botão de ajuda (opcional)
    // Aqui apenas um exemplo — comente se não quiser esconder o botão
    if (modoDificil && btnAjuda) {
        // btnAjuda.style.display = "none";
        // caso prefira manter visível, comente a linha acima
    }

    btnAjuda?.addEventListener("click", () => {
        // opcional: só permite abrir tutorial se não estiver no modo difícil inicial
        // se quiser bloquear o tutorial totalmente no modo difícil, descomente:
        // if (modoDificil) return;

        if (overlay) overlay.classList.remove("escondido");
        if (tooltip) tooltip.classList.remove("escondido");

        document.body.classList.add("tutorial-escurecer");

        indexPasso = 0;
        mostrarPasso();
    });

    btnProximo?.addEventListener("click", () => {
        indexPasso++;

        if (indexPasso >= passos.length) {
            fecharTutorial();
            return;
        }

        mostrarPasso();
    });

    btnFechar?.addEventListener("click", fecharTutorial);

    function fecharTutorial() {
        if (overlay) overlay.classList.add("escondido");
        if (tooltip) tooltip.classList.add("escondido");

        document.body.classList.remove("tutorial-escurecer");

        document.querySelectorAll(".highlight-focus").forEach(el =>
            el.classList.remove("highlight-focus")
        );
    }

});
