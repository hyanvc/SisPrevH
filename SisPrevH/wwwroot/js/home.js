//document.addEventListener("DOMContentLoaded", function () {
//    // elementos
//    const saldoEl = document.getElementById("saldoTotal");
//    const contribEl = document.getElementById("contribMensal");
//    const tempoEl = document.getElementById("tempoContrib");
//    const beneficioEl = document.getElementById("beneficioEstimado");
//    const atualizadoEl = document.getElementById("saldoAtualizado");
//    const historyBody = document.getElementById("historyBody");
//    const btnAtualizar = document.getElementById("btnAtualizar");
//    const btnToggleStream = document.getElementById("btnToggleStream");

//    // estado inicial (simulado)
//    let state = {
//        saldo: randomBetween(20000, 120000),
//        contrib: randomBetween(200, 1200),
//        anos: randomBetween(2, 35),
//        beneficio: randomBetween(1500, 6000),
//        history: generateHistory(5)
//    };

//    let running = true;
//    let timer = null;

//    // render inicial
//    renderAll();

//    // atualiza a cada 6s se estiver rodando
//    timer = setInterval(() => {
//        if (running) tick();
//    }, 6000);

//    // botões
//    btnAtualizar?.addEventListener("click", () => { tick(); });
//    btnToggleStream?.addEventListener("click", () => {
//        running = !running;
//        btnToggleStream.textContent = running ? "Pausar atualizações" : "Retomar atualizações";
//    });

//    // tick: pequenas variações e re-render
//    function tick() {
//        // pequenas flutuações realistas
//        state.saldo = Math.max(0, state.saldo + randomBetween(-500, 1500));
//        state.contrib = Math.max(50, state.contrib + randomBetween(-20, 50));
//        state.anos = Math.max(0, state.anos + (Math.random() < 0.05 ? 1 : 0));
//        state.beneficio = Math.max(200, state.beneficio + randomBetween(-50, 120));

//        // empurra novo item no histórico às vezes
//        if (Math.random() < 0.4) {
//            const now = new Date();
//            state.history.unshift({
//                date: now.toLocaleDateString(),
//                desc: randomChoice(["Contribuição mensal", "Ajuste de correção", "Crédito disponibilizado", "Aviso de benefício"]),
//                valor: randomCurrency(randomBetween(-500, 1500)),
//                situ: randomChoice(["Concluído", "Pendente", "Aviso"])
//            });
//            if (state.history.length > 10) state.history.pop();
//        }

//        renderAll(true);
//    }

//    // render tudo
//    function renderAll(animated = false) {
//        animateNumber(saldoEl, state.saldo, animated, "R$ ");
//        animateNumber(contribEl, state.contrib, animated, "R$ ");
//        tempoEl.textContent = `${state.anos} anos`;
//        animateNumber(beneficioEl, state.beneficio, animated, "R$ ");
//        atualizadoEl.textContent = new Date().toLocaleTimeString();

//        // histórico
//        historyBody.innerHTML = "";
//        state.history.forEach(h => {
//            const tr = document.createElement("tr");
//            tr.innerHTML = `<td>${h.date}</td><td>${h.desc}</td><td>${h.valor}</td><td>${h.situ}</td>`;
//            historyBody.appendChild(tr);
//        });
//    }

//    // anima número simples (incremental)
//    function animateNumber(el, target, animated, prefix = "") {
//        if (!animated) {
//            el.textContent = formatCurrency(target, prefix);
//            return;
//        }
//        const start = parseNumberFromEl(el) || 0;
//        const steps = 20;
//        const delta = (target - start) / steps;
//        let current = start;
//        let i = 0;
//        const iv = setInterval(() => {
//            current += delta;
//            el.textContent = formatCurrency(Math.round(current), prefix);
//            i++;
//            if (i >= steps) {
//                clearInterval(iv);
//                el.textContent = formatCurrency(target, prefix);
//            }
//        }, 30);
//    }

//    // helpers
//    function randomBetween(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
//    function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
//    function randomCurrency(v) { return (v >= 0 ? "R$ " : "-R$ ") + Math.abs(v).toLocaleString('pt-BR'); }
//    function formatCurrency(v, prefix = "") {
//        // v may be integer
//        if (typeof v === "number") return prefix + v.toLocaleString('pt-BR');
//        return v;
//    }
//    function parseNumberFromEl(el) {
//        if (!el) return 0;
//        const txt = el.textContent.replace(/[^\d\-]/g, '');
//        return parseInt(txt) || 0;
//    }
//    function generateHistory(n) {
//        const arr = [];
//        for (let i = 0; i < n; i++) {
//            const d = new Date();
//            d.setDate(d.getDate() - i * 7);
//            arr.push({
//                date: d.toLocaleDateString(),
//                desc: randomChoice(["Contribuição mensal", "Crédito", "Reajuste", "Notificação"]),
//                valor: randomCurrency(randomBetween(-300, 1200)),
//                situ: randomChoice(["Concluído", "Pendente", "Aviso"])
//            });
//        }
//        return arr;
//    }
//});


document.addEventListener("DOMContentLoaded", function () {
    // elementos
    const saldoEl = document.getElementById("saldoTotal");
    const contribEl = document.getElementById("contribMensal");
    const tempoEl = document.getElementById("tempoContrib");
    const beneficioEl = document.getElementById("beneficioEstimado");
    const atualizadoEl = document.getElementById("saldoAtualizado");
    const historyBody = document.getElementById("historyBody");
    const btnAtualizar = document.getElementById("btnAtualizar");
    const btnToggleStream = document.getElementById("btnToggleStream");

    // estado inicial (simulado)
    let state = {
        saldo: randomBetween(20000, 120000),
        contrib: randomBetween(200, 1200),
        anos: randomBetween(2, 35),
        beneficio: randomBetween(1500, 6000),
        history: generateHistory(5),
        // dados do gráfico de contribuições (12 meses)
        contribSeries: Array.from({ length: 12 }, () => randomBetween(800, 1700)),
        meses: generateMonthsLabels(12),
        // composição inicial
        composicao: [55, 25, 20] // renda fixa, ações, fundos
    };

    let running = true;
    let timer = null;

    // inicializa charts
    let chartContrib = initContribChart(state.meses, state.contribSeries);
    let chartCompos = initComposChart(state.composicao);

    // render inicial
    renderAll();

    // atualiza a cada 6s se estiver rodando
    timer = setInterval(() => {
        if (running) tick();
    }, 6000);

    // botões
    btnAtualizar?.addEventListener("click", () => { tick(); });
    btnToggleStream?.addEventListener("click", () => {
        running = !running;
        btnToggleStream.textContent = running ? "Pausar atualizações" : "Retomar atualizações";
    });

    // tick: pequenas variações e re-render
    function tick() {
        // pequenas flutuações realistas
        state.saldo = Math.max(0, state.saldo + randomBetween(-500, 1500));
        state.contrib = Math.max(50, state.contrib + randomBetween(-20, 50));
        state.anos = Math.max(0, state.anos + (Math.random() < 0.05 ? 1 : 0));
        state.beneficio = Math.max(200, state.beneficio + randomBetween(-50, 120));

        // atualizar série de contribuições: remove último e adiciona à frente para simular mês novo
        if (Math.random() < 0.7) {
            state.contribSeries.shift();
            state.contribSeries.push(randomBetween(800, 2000));
        } else {
            // pequena variação nos existentes
            state.contribSeries = state.contribSeries.map(v => Math.max(100, v + randomBetween(-50, 80)));
        }

        // atualiza composição ocasionalmente
        if (Math.random() < 0.15) {
            // ligeira rotação entre categorias
            const delta = randomBetween(-5, 5);
            state.composicao[0] = Math.max(10, state.composicao[0] + delta);
            // ajusta os outros proporcionalmente
            const restante = 100 - state.composicao[0];
            state.composicao[1] = Math.max(5, Math.round(restante * Math.random()));
            state.composicao[2] = Math.max(5, 100 - state.composicao[0] - state.composicao[1]);
        }

        // empurra novo item no histórico às vezes
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

        // re-render e atualizar charts
        renderAll(true);
        updateContribChart(chartContrib, state.contribSeries);
        updateComposChart(chartCompos, state.composicao);
    }

    // render tudo
    function renderAll(animated = false) {
        animateNumber(saldoEl, state.saldo, animated, "R$ ");
        animateNumber(contribEl, state.contrib, animated, "R$ ");
        tempoEl.textContent = `${state.anos} anos`;
        animateNumber(beneficioEl, state.beneficio, animated, "R$ ");
        atualizadoEl.textContent = new Date().toLocaleTimeString();

        // histórico
        historyBody.innerHTML = "";
        state.history.forEach(h => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${h.date}</td><td>${h.desc}</td><td>${h.valor}</td><td>${h.situ}</td>`;
            historyBody.appendChild(tr);
        });
    }

    // ---------- Charts (ApexCharts) ----------
    function initContribChart(categories, seriesData) {
        const options = {
            chart: { type: 'bar', height: 280, toolbar: { show: false }, sparkline: { enabled: false } },
            series: [{ name: 'Contribuição', data: seriesData }],
            plotOptions: { bar: { borderRadius: 6, columnWidth: '60%' } },
            colors: ['#20c997'],
            xaxis: { categories: categories, labels: { rotate: -45 } },
            yaxis: { labels: { formatter: val => 'R$ ' + Math.round(val).toLocaleString('pt-BR') } },
            tooltip: { y: { formatter: val => 'R$ ' + Number(val).toLocaleString('pt-BR') } }
        };
        const chart = new ApexCharts(document.querySelector("#chartContribuicoes"), options);
        chart.render();
        return chart;
    }

    function updateContribChart(chart, newData) {
        if (!chart) return;
        chart.updateSeries([{ data: newData }], true);
    }

    function initComposChart(series) {
        const options = {
            chart: { type: 'donut', height: 280 },
            series: series,
            labels: ['Renda Fixa', 'Ações', 'Fundos'],
            colors: ['#20c997', '#007bff', '#ffc107'],
            legend: { position: 'bottom' },
            tooltip: { y: { formatter: val => val + '%' } }
        };
        const chart = new ApexCharts(document.querySelector("#chartComposicao"), options);
        chart.render();
        return chart;
    }

    function updateComposChart(chart, newSeries) {
        if (!chart) return;
        chart.updateSeries(newSeries, true);
    }

    // anima número simples (incremental)
    function animateNumber(el, target, animated, prefix = "") {
        if (!el) return;
        if (!animated) {
            el.textContent = formatCurrency(target, prefix);
            return;
        }
        const start = parseNumberFromEl(el) || 0;
        const steps = 20;
        const delta = (target - start) / steps;
        let current = start;
        let i = 0;
        const iv = setInterval(() => {
            current += delta;
            el.textContent = formatCurrency(Math.round(current), prefix);
            i++;
            if (i >= steps) {
                clearInterval(iv);
                el.textContent = formatCurrency(target, prefix);
            }
        }, 30);
    }

    // helpers
    function randomBetween(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function randomCurrency(v) { return (v >= 0 ? "R$ " : "-R$ ") + Math.abs(v).toLocaleString('pt-BR'); }
    function formatCurrency(v, prefix = "") {
        if (typeof v === "number") return prefix + v.toLocaleString('pt-BR');
        return v;
    }
    function parseNumberFromEl(el) {
        if (!el) return 0;
        const txt = el.textContent.replace(/[^\d\-]/g, '');
        return parseInt(txt) || 0;
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
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            labels.push(mm + '/' + String(d.getFullYear()).slice(-2));
        }
        return labels;
    }
});
