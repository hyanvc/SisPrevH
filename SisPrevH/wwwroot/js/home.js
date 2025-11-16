document.addEventListener("DOMContentLoaded", function () {

    // elementos do modo fácil
    const saldoEl = document.getElementById("saldoTotal_f");
    const contribEl = document.getElementById("contribMensal_f");
    const tempoEl = document.getElementById("tempoContrib_f");
    const beneficioEl = document.getElementById("beneficioEstimado_f");
    const atualizadoEl = document.getElementById("saldoAtualizado_f");
    const historyBody = document.getElementById("historyBody_f");
    const btnAtualizar = document.getElementById("btnAtualizar_f");
    const btnToggleStream = document.getElementById("btnToggleStream_f");

    // estado inicial (fake)
    let state = {
        saldo: randomBetween(20000, 120000),
        contrib: randomBetween(200, 1200),
        anos: randomBetween(2, 35),
        beneficio: randomBetween(1500, 6000),
        history: generateHistory(5),
        contribSeries: Array.from({ length: 12 }, () => randomBetween(800, 1700)),
        meses: generateMonthsLabels(12),
        composicao: [55, 25, 20] // renda fixa / ações / fundos
    };

    let running = true;

    // inicializa gráficos
    let chartContrib = initContribChart(state.meses, state.contribSeries);
    let chartCompos = initComposChart(state.composicao);

    renderAll();

    setInterval(() => {
        if (running) tick();
    }, 6000);

    // BOTÕES
    btnAtualizar?.addEventListener("click", () => tick());

    btnToggleStream?.addEventListener("click", () => {
        running = !running;
        btnToggleStream.textContent = running ? "Pausar atualizações" : "Retomar atualizações";
    });

    // TICK (atualizações contínuas)
    function tick() {
        state.saldo += randomBetween(-500, 1500);
        state.contrib += randomBetween(-20, 50);
        state.beneficio += randomBetween(-50, 120);

        // série de contribuições
        state.contribSeries.shift();
        state.contribSeries.push(randomBetween(800, 2000));

        // composição
        if (Math.random() < 0.15) {
            const delta = randomBetween(-5, 5);
            state.composicao[0] = Math.max(10, state.composicao[0] + delta);
            const restante = 100 - state.composicao[0];
            state.composicao[1] = Math.round(restante * Math.random());
            state.composicao[2] = 100 - state.composicao[0] - state.composicao[1];
        }

        // histórico
        if (Math.random() < 0.4) {
            const now = new Date();
            state.history.unshift({
                date: now.toLocaleDateString(),
                desc: randomChoice(["Contribuição mensal", "Ajuste de correção", "Crédito disponibilizado", "Aviso de benefício"]),
                valor: randomCurrency(randomBetween(-500, 1500)),
                situ: randomChoice(["Concluído", "Pendente", "Aviso"])
            });
            if (state.history.length > 10) state.history.pop();
        }

        renderAll(true);
        chartContrib.updateSeries([{ data: state.contribSeries }]);
        chartCompos.updateSeries(state.composicao);
    }

    // RENDER
    function renderAll(animated = false) {
        animateNumber(saldoEl, state.saldo, animated, "R$ ");
        animateNumber(contribEl, state.contrib, animated, "R$ ");
        animateNumber(beneficioEl, state.beneficio, animated, "R$ ");
        tempoEl.textContent = `${state.anos} anos`;
        atualizadoEl.textContent = new Date().toLocaleTimeString();

        historyBody.innerHTML = "";
        state.history.forEach(h => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${h.date}</td><td>${h.desc}</td><td>${h.valor}</td><td>${h.situ}</td>`;
            historyBody.appendChild(tr);
        });
    }

    // --- GRÁFICOS (ApexCharts) ---
    function initContribChart(categories, seriesData) {
        const options = {
            chart: { type: 'bar', height: 280, toolbar: { show: false } },
            series: [{ name: 'Contribuição', data: seriesData }],
            plotOptions: { bar: { borderRadius: 6, columnWidth: '60%' } },
            colors: ['#20c997'],
            xaxis: { categories },
            yaxis: { labels: { formatter: v => "R$ " + v.toLocaleString('pt-BR') } }
        };
        const chart = new ApexCharts(document.querySelector("#chartContribuicoes_f"), options);
        chart.render();
        return chart;
    }

    function initComposChart(series) {
        const options = {
            chart: { type: 'donut', height: 280 },
            series,
            labels: ['Renda Fixa', 'Ações', 'Fundos'],
            legend: { position: 'bottom' }
        };
        const chart = new ApexCharts(document.querySelector("#chartComposicao_f"), options);
        chart.render();
        return chart;
    }

    // HELPERS
    function randomBetween(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function randomCurrency(v) { return (v >= 0 ? "R$ " : "-R$ ") + Math.abs(v).toLocaleString('pt-BR'); }

    function animateNumber(el, target, animated, prefix = "") {
        if (!animated) {
            el.textContent = prefix + target.toLocaleString('pt-BR');
            return;
        }
        let start = Number(el.textContent.replace(/\D/g, "")) || 0;
        const steps = 20;
        const diff = (target - start) / steps;
        let i = 0;
        const iv = setInterval(() => {
            start += diff;
            el.textContent = prefix + Math.round(start).toLocaleString('pt-BR');
            if (++i >= steps) clearInterval(iv);
        }, 30);
    }

    function generateHistory(n) {
        const arr = [];
        for (let i = 0; i < n; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i * 7);
            arr.push({
                date: d.toLocaleDateString(),
                desc: randomChoice(["Contribuição mensal", "Crédito", "Reajuste", "Notificação"]),
                valor: randomCurrency(randomBetween(-300, 1200)),
                situ: randomChoice(["Concluído", "Pendente", "Aviso"])
            });
        }
        return arr;
    }

    function generateMonthsLabels(n) {
        const labels = [];
        const now = new Date();
        for (let i = n - 1; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            labels.push(String(d.getMonth() + 1).padStart(2, '0') + '/' + String(d.getFullYear()).slice(-2));
        }
        return labels;
    }

});
