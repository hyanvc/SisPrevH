document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // VARIÁVEL PARA DEFINIR MODO INICIAL
    // ==========================================
    var modoDificil = window.modoDificil;

    const container = document.getElementById("cadastroContainer");
    const form = document.getElementById("formCadastro");
    const btnAlternar = document.getElementById("btnAlternar");
    const btnAjuda = document.getElementById("btnAjuda");

    // ==========================================
    // FORÇA O ESTADO INICIAL COM BASE NA VARIÁVEL
    // ==========================================
    if (modoDificil && container) {
        container.classList.remove("facil");
        container.classList.add("dificil");

        if (btnAlternar) btnAlternar.innerText = "Tornar Fácil";
        if (btnAjuda) btnAjuda.style.display = "none";
    }

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
    // Envio do cadastro via POST
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
