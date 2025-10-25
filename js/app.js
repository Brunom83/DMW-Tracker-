import { UI } from "./core/ui.js";
import { CurrencySystem } from "./systems/currency.js";
import { Storage } from "./core/storage.js";
import { Utils } from "./core/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  UI.init();
  const moedas = new CurrencySystem();

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
    document.getElementById("resultadoGanhos").innerText = `+${Utils.formatCurrency(sessao.ganhoBits)}`;
  });

  console.log("✅ DMW Tracker inicializado");
});
