document.addEventListener("DOMContentLoaded", function () {

    var modoDificil = window.modoDificil;

    const container = document.getElementById("cadastroContainer");
    const form = document.getElementById("formCadastro");
    const btnAlternar = document.getElementById("btnAlternar");
    const btnAjuda = document.getElementById("btnAjuda");

    // Aplica o modo inicial
    if (modoDificil && container) {
        container.classList.remove("facil");
        container.classList.add("dificil");

        if (btnAlternar) btnAlternar.innerText = "Tornar Fácil";
        if (btnAjuda) btnAjuda.style.display = "none";
    }

    // ======================================
    // TUTORIAL (mantive idêntico ao seu)
    // ======================================

    let overlay = document.getElementById("tutorialOverlayCadastro");
    let box = document.getElementById("tutorialBoxCadastro");

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "tutorialOverlayCadastro";
        overlay.className = "tutorial-overlay";
        overlay.style.display = "none";
        document.body.appendChild(overlay);
    }

    if (!box) {
        box = document.createElement("div");
        box.id = "tutorialBoxCadastro";
        box.className = "tutorial-box";
        box.style.display = "none";
        box.innerHTML = `
            <p id="tutorialTextoCadastro" style="margin:0 0 8px 0;"></p>
            <div class="tutorial-controls">
                <button id="btnAnteriorCadastro" class="btn-tut">⬅ Anterior</button>
                <button id="btnProximoCadastro" class="btn-tut">Próximo ➡</button>
                <button id="btnFecharCadastro" class="btn-tut btn-fechar">Fechar ✖</button>
            </div>
        `;
        document.body.appendChild(box);
    }

    const texto = document.getElementById("tutorialTextoCadastro");
    const btnAnterior = document.getElementById("btnAnteriorCadastro");
    const btnProximo = document.getElementById("btnProximoCadastro");
    const btnFechar = document.getElementById("btnFecharCadastro");

    // Etapas (mantive igual)
    const etapas = [
        { elemento: "#Nome", texto: "Digite seu nome completo aqui." },
        { elemento: "#Email", texto: "Informe um e-mail válido para contato." },
        { elemento: "#Usuario", texto: "Escolha um nome de usuário exclusivo." },
        { elemento: "#Senha", texto: "Crie uma senha segura, com pelo menos 6 caracteres." },

        // NOVOS CAMPOS
        { elemento: "#CPF", texto: "Informe seu CPF no formato correto (somente números)." },
        { elemento: "#DataNascimento", texto: "Selecione sua data de nascimento." },
        { elemento: "#Endereco", texto: "Digite seu endereço completo." },

        { elemento: ".btn-login", texto: "Clique aqui para concluir o cadastro." }
    ];


    let etapaAtual = 0;

    function limparDestaques() {
        document.querySelectorAll(".tutorial-highlight").forEach(el => el.classList.remove("tutorial-highlight"));
    }

    function posicionarBox(el) {
        const rect = el.getBoundingClientRect();
        const top = window.scrollY + rect.bottom + 10;
        let left = window.scrollX + rect.left;

        const maxLeft = window.innerWidth - box.offsetWidth - 10;
        if (left > maxLeft) left = Math.max(10, maxLeft);

        box.style.top = top + "px";
        box.style.left = left + "px";
    }

    function mostrarEtapa() {
        const etapa = etapas[etapaAtual];
        if (!etapa) return;

        const elemento = document.querySelector(etapa.elemento);

        limparDestaques();

        if (elemento) {
            elemento.classList.add("tutorial-highlight");
            posicionarBox(elemento);
        }

        overlay.style.display = "block";
        box.style.display = "block";

        texto.innerText = etapa.texto;

        btnAnterior.style.display = etapaAtual === 0 ? "none" : "inline-block";
        btnProximo.style.display = etapaAtual === etapas.length - 1 ? "none" : "inline-block";
    }

    function iniciarTutorial() {
        etapaAtual = 0;
        mostrarEtapa();
    }

    function fecharTutorial() {
        overlay.style.display = "none";
        box.style.display = "none";
        limparDestaques();
    }

    btnAjuda?.addEventListener("click", function () {
        if (container.classList.contains("facil")) iniciarTutorial();
    });

    btnProximo?.addEventListener("click", function () {
        etapaAtual++;
        if (etapaAtual >= etapas.length) fecharTutorial();
        else mostrarEtapa();
    });

    btnAnterior?.addEventListener("click", function () {
        etapaAtual--;
        if (etapaAtual < 0) etapaAtual = 0;
        mostrarEtapa();
    });

    btnFechar?.addEventListener("click", fecharTutorial);
    overlay.addEventListener("click", fecharTutorial);

    // Alternar fácil/difícil
    if (btnAlternar) {
        btnAlternar.addEventListener("click", () => {
            container.classList.toggle("facil");
            container.classList.toggle("dificil");

            btnAlternar.innerText = container.classList.contains("facil")
                ? "Tornar Difícil"
                : "Tornar Fácil";

            btnAjuda.style.display = container.classList.contains("facil")
                ? "block"
                : "none";
        });
    }

    // ======================================
    // ENVIO DO FORMULÁRIO (AJUSTADO)
    // ======================================

    form?.addEventListener("submit", async function (e) {
        e.preventDefault();

        const dados = {
            Nome: document.getElementById("Nome").value,
            Email: document.getElementById("Email").value,
            Usuario: document.getElementById("Usuario").value,
            Senha: document.getElementById("Senha").value,

            // novos campos
            CPF: document.getElementById("CPF").value,
            DataNascimento: document.getElementById("DataNascimento").value,
            Endereco: document.getElementById("Endereco").value
        };

        try {
            const resp = await fetch("/Cadastro/Salvar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            const resultado = await resp.json();
            alert(resultado.message);

            if (resultado.success) form.reset();

        } catch (err) {
            alert("Erro ao cadastrar: " + err.message);
        }
    });
});
