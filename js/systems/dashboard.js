import { CurrencySystem } from "./currency.js";
import { EggsSystem } from "./eggs.js";
import { ToursSystem } from "./tours.js";
import { Utils } from "../core/utils.js";

export class Dashboard {
  constructor() {
    this.moedas = new CurrencySystem();
    this.ovos = new EggsSystem();
    this.tours = new ToursSystem();
  }

  atualizar() {
    const ganhosHoje = this.moedas.listar().filter(sessao => {
      const hoje = new Date().toISOString().split("T")[0];
      return sessao.data.startsWith(hoje);
    });

    const totalHoje = ganhosHoje.reduce((acc, s) => acc + s.ganhoBits, 0);
    const eggsTotal = this.ovos.calcularTotal();
    const toursTotal = this.tours.calcularTotal();

    document.getElementById("dashMoedas").innerText = Utils.formatCurrency(totalHoje);
    document.getElementById("dashEggs").innerText = eggsTotal.formatado;
    document.getElementById("dashTours").innerText = toursTotal.formatado;
  }
}
