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

    

});
