document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("loginContainer");
    const btnAlternar = document.getElementById("btnAlternar");
    const btnAjuda = document.getElementById("btnAjuda");
    const btnAumentar = document.getElementById("btnAumentarFonte");
    const btnDiminuir = document.getElementById("btnDiminuirFonte");
    let tamanhoFonte = 16; // valor base

    // Alternar modo fácil/difícil
    btnAlternar?.addEventListener("click", function () {
        if (container.classList.contains("facil")) {
            container.classList.remove("facil");
            container.classList.add("dificil");
            btnAlternar.textContent = "Tornar Fácil";
            if (btnAjuda) btnAjuda.style.display = "none"; // tutorial desativado no modo difícil
        } else {
            container.classList.remove("dificil");
            container.classList.add("facil");
            btnAlternar.textContent = "Tornar Difícil";
            if (btnAjuda) btnAjuda.style.display = "block"; // tutorial ativo
        }
    });

    // Tutorial apenas no modo fácil
    if (btnAjuda) {
        const passos = [
            { elemento: "#campoUsuario", texto: "Digite seu nome de usuário. Geralmente é seu CPF ou e-mail." },
            { elemento: "#campoSenha", texto: "Digite sua senha pessoal." },
            { elemento: ".btn-login", texto: "Clique em 'Entrar' para acessar o sistema." }
        ];

        let passoAtual = 0;
        const overlay = document.getElementById("tutorialOverlay");
        const box = document.getElementById("tutorialBox");
        const texto = document.getElementById("tutorialTexto");
        const btnProximo = document.getElementById("btnProximo");
        const btnAnterior = document.getElementById("btnAnterior");
        const btnFechar = document.getElementById("btnFechar");

        function mostrarPasso(index) {
            if (!container.classList.contains("facil")) return; // tutorial só no modo fácil
            if (index < 0 || index >= passos.length) return;

            const passo = passos[index];
            const alvo = document.querySelector(passo.elemento);
            if (!alvo) return;

            document.querySelectorAll(".tutorial-highlight").forEach(e => e.classList.remove("tutorial-highlight"));
            alvo.classList.add("tutorial-highlight");

            texto.textContent = passo.texto;
            overlay.style.display = "block";
            box.style.display = "block";

            const rect = alvo.getBoundingClientRect();
            box.style.top = (window.scrollY + rect.top + rect.height + 10) + "px";
            box.style.left = (rect.left + rect.width / 2 - 150) + "px";

            btnAnterior.style.display = index === 0 ? "none" : "inline-block";
            btnProximo.style.display = index === passos.length - 1 ? "none" : "inline-block";
        }

        btnAjuda.addEventListener("click", function () {
            passoAtual = 0;
            mostrarPasso(passoAtual);
        });

        btnProximo.addEventListener("click", function () {
            passoAtual++;
            mostrarPasso(passoAtual);
        });

        btnAnterior.addEventListener("click", function () {
            passoAtual--;
            mostrarPasso(passoAtual);
        });

        function fecharTutorial() {
            overlay.style.display = "none";
            box.style.display = "none";
            document.querySelectorAll(".tutorial-highlight").forEach(e => e.classList.remove("tutorial-highlight"));
        }

        btnFechar.addEventListener("click", fecharTutorial);
        overlay.addEventListener("click", fecharTutorial);
    }

    // Aumentar fonte
    btnAumentar?.addEventListener("click", function () {
        tamanhoFonte += 2;
        if (container) container.style.fontSize = tamanhoFonte + "px";
    });

    // Diminuir fonte
    btnDiminuir?.addEventListener("click", function () {
        if (tamanhoFonte > 10) {
            tamanhoFonte -= 2;
            if (container) container.style.fontSize = tamanhoFonte + "px";
        }
    });
});
