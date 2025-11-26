document.addEventListener("DOMContentLoaded", function () {

    // ========== ELEMENTOS DO MODO FÁCIL ==========
    const modoFacil = document.getElementById("modoFacil");
    const btnAtualizar_f = document.getElementById("btnAtualizar_f");
    const btnToggleStream_f = document.getElementById("btnToggleStream_f");

    // ========== ELEMENTOS DO MODO DIFÍCIL ==========
    const modoDificil = document.getElementById("modoDificil");
    const dif_btnAtualizar = document.getElementById("dif_btnAtualizar");
    const dif_btnToggleStream = document.getElementById("dif_btnToggleStream");

    // ========== BOTÃO DE TROCA DE MODO ==========
    const btnToggleModo = document.getElementById("btnToggleModo");

    let streamAtivo = true;
    let atualizacaoInterval;
    var dificil = window.modoDificil;

    // =====================================================
    // FUNÇÃO QUE MUDA ENTRE FÁCIL <-> DIFÍCIL
    // =====================================================
    if (dificil) {
        modoFacil.style.display = "none";
        modoDificil.style.display = "block";

        btnToggleModo.textContent = "Modo Fácil";
    }

    btnToggleModo.onclick = function () {
        const facilVisivel = modoFacil.style.display !== "none";

        if (facilVisivel) {
            // Indo para MODO DIFÍCIL
            debugger;
            modoFacil.style.display = "none";
            modoDificil.style.display = "block";

            btnToggleModo.textContent = "Modo Fácil";
        } else {
            
            // Voltando para MODO FÁCIL
            modoFacil.style.display = "block";
            modoDificil.style.display = "none";

            btnToggleModo.textContent = "Modo Difícil";
        }
    };

    // =====================================================
    // SIMULAÇÃO DE ATUALIZAÇÃO DOS VALORES
    // =====================================================
    function atualizarValores() {
        const agora = new Date().toLocaleTimeString();

        // Modo Fácil
        document.getElementById("saldoTotal_f").textContent = "R$ " + (1000 + Math.random() * 9000).toFixed(2);
        document.getElementById("saldoAtualizado_f").textContent = agora;

        document.getElementById("contribMensal_f").textContent = "R$ " + (200 + Math.random() * 200).toFixed(2);
        document.getElementById("proximoDebito_f").textContent = "10/12/2025";

        document.getElementById("tempoContrib_f").textContent = Math.floor(Math.random() * 30) + " anos";
        document.getElementById("beneficioEstimado_f").textContent = "R$ " + (1000 + Math.random() * 2000).toFixed(2);

        // Modo Difícil
        document.getElementById("dif_saldoTotal").textContent = document.getElementById("saldoTotal_f").textContent;
        document.getElementById("dif_saldoAtualizado").textContent = agora;

        document.getElementById("dif_contribMensal").textContent = document.getElementById("contribMensal_f").textContent;
        document.getElementById("dif_proximoDebito").textContent = "10/12/2025";

        document.getElementById("dif_tempoContrib").textContent = document.getElementById("tempoContrib_f").textContent;
        document.getElementById("dif_beneficioEstimado").textContent = document.getElementById("beneficioEstimado_f").textContent;

        // Adiciona historico
        adicionarNoHistorico("Atualização automática " + agora);
    }

    function adicionarNoHistorico(info) {
        const linha = `
            <tr>
                <td>${new Date().toLocaleString()}</td>
                <td>${info}</td>
                <td>R$ ${(Math.random() * 500).toFixed(2)}</td>
                <td>OK</td>
            </tr>`;

        document.getElementById("historyBody_f").innerHTML += linha;
        document.getElementById("dif_historyBody").innerHTML += linha;
    }

    // =====================================================
    // BOTÕES
    // =====================================================
    btnAtualizar_f.onclick = atualizarValores;
    btnToggleStream_f.onclick = function () {
        streamAtivo = !streamAtivo;
        btnToggleStream_f.textContent = streamAtivo ? "Pausar atualizações" : "Retomar atualizações";

        if (streamAtivo) iniciarStream();
        else clearInterval(atualizacaoInterval);
    };

    dif_btnAtualizar.onclick = atualizarValores;
    dif_btnToggleStream.onclick = function () {
        streamAtivo = !streamAtivo;
        dif_btnToggleStream.textContent = streamAtivo ? "Pausar atualizações" : "Retomar atualizações";

        if (streamAtivo) iniciarStream();
        else clearInterval(atualizacaoInterval);
    };

    // =====================================================
    // INICIAR STREAM AUTOMÁTICO
    // =====================================================
    function iniciarStream() {
        atualizacaoInterval = setInterval(atualizarValores, 5000);
    }

    iniciarStream(); // começa ao carregar
});
