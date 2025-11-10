document.addEventListener("DOMContentLoaded", function () {
    const btnAlternarModo = document.getElementById("btnAlternarModo");
    const btnAumentarFonte = document.getElementById("btnAumentarFonte");
    const btnDiminuirFonte = document.getElementById("btnDiminuirFonte");

    // Função para ajustar tamanho da fonte
    function ajustarFonte(delta) {
        const html = document.querySelector("html");
        const estiloAtual = window.getComputedStyle(html).fontSize;
        const tamanhoAtual = parseFloat(estiloAtual);
        html.style.fontSize = `${tamanhoAtual + delta}px`;
    }

    // Só adiciona listeners se os botões existirem (para evitar erro)
    if (btnAumentarFonte) btnAumentarFonte.addEventListener("click", () => ajustarFonte(1));
    if (btnDiminuirFonte) btnDiminuirFonte.addEventListener("click", () => ajustarFonte(-1));
    if (btnAlternarModo) {
        btnAlternarModo.addEventListener("click", () => {
            document.body.classList.toggle("modo-dificil");
        });
    }
});
