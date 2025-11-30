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



    const btnAdd = document.querySelector("[data-add='dependente']");
    const card = btnAdd.closest(".card");

    // Cria área onde a listagem será exibida
    const lista = document.createElement("div");
    lista.classList.add("lista-dependentes");
    lista.style.marginTop = "20px";
    card.insertBefore(lista, btnAdd);

    btnAdd.addEventListener("click", (e) => {
        e.preventDefault();

        const linha = card.querySelector(".linha");

        const nome = linha.querySelector("input[type='text']").value.trim();
        const parentesco = linha.querySelector("select").value;
        const data = linha.querySelector("input[type='date']").value;

        if (nome === "" || data === "") {
            alert("Preencha todos os campos do dependente.");
            return;
        }

        // Monta o item visual
        const item = document.createElement("div");
        item.classList.add("item-dependente");
        item.style.padding = "8px 0";
        item.style.borderBottom = "1px solid #ddd";

        item.innerHTML = `
            <strong>${nome}</strong> — ${parentesco} — ${data}
        `;

        lista.appendChild(item);

        // Limpa inputs
        linha.querySelector("input[type='text']").value = "";
        linha.querySelector("input[type='date']").value = "";
        linha.querySelector("select").selectedIndex = 0;
    });



    const btnVinculo = document.querySelector(".btn-mini");
    const cardVinculo = btnVinculo.closest(".card");

    // Área onde os vínculos aparecerão
    const listaVinculos = document.createElement("div");
    listaVinculos.classList.add("lista-vinculos");
    listaVinculos.style.marginTop = "20px";
    cardVinculo.insertBefore(listaVinculos, btnVinculo);

    btnVinculo.addEventListener("click", (e) => {
        e.preventDefault();

        const linhas = cardVinculo.querySelectorAll(".linha");

        const cargo = linhas[0].querySelector("input[type='text']").value.trim();
        const ingresso = linhas[0].querySelector("input[type='date']").value;
        const saida = linhas[0].querySelectorAll("input[type='date']")[1].value;
        const tempoServico = linhas[1].querySelector("input[type='number']").value;

        if (cargo === "" || ingresso === "" || tempoServico === "") {
            alert("Preencha todos os campos obrigatórios do vínculo.");
            return;
        }

        const item = document.createElement("div");
        item.classList.add("item-vinculo");
        item.style.padding = "8px 0";
        item.style.borderBottom = "1px solid #ddd";

        item.innerHTML = `
            <strong>${cargo}</strong> — Ingresso: ${ingresso} — Saída: ${saida || "—"} — ${tempoServico} anos
        `;

        listaVinculos.appendChild(item);

        // Limpa campos
        linhas[0].querySelector("input[type='text']").value = "";
        linhas[0].querySelector("input[type='date']").value = "";
        linhas[0].querySelectorAll("input[type='date']")[1].value = "";
        linhas[1].querySelector("input[type='number']").value = "";
    });


});
