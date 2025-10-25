// js/app.js
import { CurrencySystem } from "./systems/currency.js";
import { EggSystem } from "./systems/eggs.js";
import { Dashboard } from "./systems/dashboard.js";
import { TourSystem } from "./systems/tours.js";

document.addEventListener("DOMContentLoaded", () => {
  const moedas = new CurrencySystem();
  const eggs = new EggSystem();
  const dashboard = new Dashboard(moedas);
  const tours = new TourSystem();

  // botão calcular moedas
  document.getElementById("calcularBtn").addEventListener("click", () => {
    const antes = {
      tera: parseFloat(document.getElementById("antesTera").value) || 0,
      mega: parseFloat(document.getElementById("antesMega").value) || 0,
      bits: parseFloat(document.getElementById("antesBits").value) || 0,
    };
    const depois = {
      tera: parseFloat(document.getElementById("depoisTera").value) || 0,
      mega: parseFloat(document.getElementById("depoisMega").value) || 0,
      bits: parseFloat(document.getElementById("depoisBits").value) || 0,
    };

    const sessao = moedas.registrarSessao(antes, depois);
    document.getElementById("resultadoGanhos").innerText = `+${CurrencySystem.formatCurrency(sessao.ganhoBits)}`;
    dashboard.atualizarCards();
    console.log("Sessão salva:", sessao);
  });

  // botão adicionar egg
  document.getElementById("adicionarEgg").addEventListener("click", () => {
    const tipo = document.getElementById("tipoEgg").value;
    const quantidade = document.getElementById("quantidadeEgg").value;
    eggs.addEgg(tipo, quantidade);
    const totais = eggs.calcularTotais();
    document.getElementById("totalBitsEggs").innerText = totais.bits;
    document.getElementById("totalMegaEggs").innerText = totais.mega;
    document.getElementById("totalTeraEggs").innerText = totais.tera;
  });

  // copiar para depois
  document.getElementById("copiarParaDepois").addEventListener("click", () => {
    eggs.copiarParaDepois();
  });

  console.log("DMW Tracker modular carregado 🚀");
});
