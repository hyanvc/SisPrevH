document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("cadastroContainer");
    const form = document.getElementById("formCadastro");
    const btnAlternar = document.getElementById("btnAlternar");
    const btnAjuda = document.getElementById("btnAjuda");

    // ==============================
    // Alternar Fácil / Difícil
    // ==============================
    if (btnAlternar && container) {
        btnAlternar.addEventListener("click", function () {
            container.classList.toggle("facil");
            container.classList.toggle("dificil");

            btnAlternar.innerText = container.classList.contains("facil")
                ? "Tornar Difícil"
                : "Tornar Fácil";

            if (btnAjuda) btnAjuda.style.display = container.classList.contains("facil") ? "block" : "none";
        });
    }

    // ==============================
    // Cria overlay/box do tutorial (se não existir)
    // ==============================
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
                <button id="btnFecharCadastro" class="btn-tut">Fechar ✖</button>
            </div>
        `;
        document.body.appendChild(box);
    }

    // Agora os refs aos botões (após criação)
    const texto = document.getElementById("tutorialTextoCadastro");
    const btnAnterior = document.getElementById("btnAnteriorCadastro");
    const btnProximo = document.getElementById("btnProximoCadastro");
    const btnFechar = document.getElementById("btnFecharCadastro");

    // ==============================
    // Configura etapas do tutorial
    // ==============================
    const etapas = [
        { elemento: "#Nome", texto: "Digite seu nome completo aqui." },
        { elemento: "#Email", texto: "Informe um e-mail válido para contato." },
        { elemento: "#Usuario", texto: "Escolha um nome de usuário exclusivo." },
        { elemento: "#Senha", texto: "Crie uma senha segura, com pelo menos 6 caracteres." },
        { elemento: ".btn-login", texto: "Clique aqui para concluir o cadastro." }
    ];

    let etapaAtual = 0;

    function limparDestaques() {
        document.querySelectorAll(".tutorial-highlight").forEach(el => el.classList.remove("tutorial-highlight"));
    }

    function posicionarBox(perfilEl) {
        // tenta posicionar a box abaixo do elemento; se estiver fora da tela, ajusta
        const rect = perfilEl.getBoundingClientRect();
        const top = window.scrollY + rect.bottom + 10;
        let left = window.scrollX + rect.left;
        // limita left para não ultrapassar a largura da janela
        const maxLeft = window.innerWidth - box.offsetWidth - 10;
        if (left > maxLeft) left = Math.max(10, maxLeft);
        box.style.top = top + "px";
        box.style.left = left + "px";
    }

    function mostrarEtapa() {
        const etapa = etapas[etapaAtual];
        if (!etapa) return;

        const elemento = document.querySelector(etapa.elemento);
        if (!elemento) {
            // se o elemento não existe, apenas atualiza o texto e centraliza a caixa
            texto.innerText = etapa.texto || "";
            box.style.display = "block";
            box.style.top = (window.scrollY + 100) + "px";
            box.style.left = Math.max(10, (window.innerWidth - box.offsetWidth) / 2) + "px";
            return;
        }

        // destacar
        limparDestaques();
        elemento.classList.add("tutorial-highlight");

        // mostrar overlay + box
        overlay.style.display = "block";
        box.style.display = "block";

        // texto
        texto.innerText = etapa.texto || "";

        // posiciona box (posiciona e rola até o elemento se necessário)
        const rect = elemento.getBoundingClientRect();
        const visibleTop = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (!visibleTop) {
            // rola até o elemento suavemente antes de posicionar
            elementScrollToView(elemento, function () {
                posicionarBox(elemento);
            });
        } else {
            posicionarBox(elemento);
        }

        // atualiza visibilidade dos botões
        btnAnterior.style.display = etapaAtual === 0 ? "none" : "inline-block";
        btnProximo.style.display = etapaAtual === etapas.length - 1 ? "none" : "inline-block";
    }

    function elementScrollToView(el, callback) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // small timeout to let scroll finish then callback
        setTimeout(function () {
            if (typeof callback === "function") callback();
        }, 300);
    }

    function iniciarTutorial() {
        etapaAtual = 0;
        mostrarEtapa();
    }

    function fecharTutorial() {
        overlay.style.display = "none";
        box.style.display = "none";
        limparDestaques();
        etapaAtual = 0;
    }

    // ==============================
    // Event listeners seguros
    // ==============================
    btnAjuda?.addEventListener("click", function () {
        // só abre se container estiver em modo fácil
        if (container && container.classList.contains("facil")) iniciarTutorial();
    });

    btnProximo?.addEventListener("click", function () {
        if (etapaAtual < etapas.length - 1) {
            etapaAtual++;
            mostrarEtapa();
        } else {
            fecharTutorial();
        }
    });

    btnAnterior?.addEventListener("click", function () {
        if (etapaAtual > 0) {
            etapaAtual--;
            mostrarEtapa();
        }
    });

    btnFechar?.addEventListener("click", fecharTutorial);

    overlay.addEventListener("click", fecharTutorial);

    // teclado: Esc fecha, Enter = próximo
    document.addEventListener("keydown", function (ev) {
        if (box.style.display === "block") {
            if (ev.key === "Escape") fecharTutorial();
            if (ev.key === "Enter") {
                ev.preventDefault();
                if (etapaAtual < etapas.length - 1) {
                    etapaAtual++;
                    mostrarEtapa();
                } else {
                    fecharTutorial();
                }
            }
        }
    });

    // ==============================
    // Enviar cadastro via POST JSON (mantive seu envio)
    // ==============================
    form?.addEventListener("submit", async function (e) {
        e.preventDefault();

        const dados = {
            nome: document.getElementById("Nome").value,
            email: document.getElementById("Email").value,
            usuario: document.getElementById("Usuario").value,
            senha: document.getElementById("Senha").value
        };

        try {
            const resposta = await fetch('/Cadastro/Salvar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();
            alert(resultado.message);
            if (resultado.success) form.reset();
        } catch (err) {
            alert('Erro ao cadastrar: ' + (err.message || err));
        }
    });
});
