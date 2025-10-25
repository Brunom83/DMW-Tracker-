// js/systems/eggs.js
import { CurrencySystem } from "./currency.js";

export class EggSystem {
  constructor() {
    this.eggs = []; // lista de eggs adicionados
  }

  /**
   * Adiciona egg
   */
  addEgg(tipoBits, quantidade) {
    const egg = { tipoBits: Number(tipoBits), quantidade: Number(quantidade) };
    this.eggs.push(egg);
    return egg;
  }

  /**
   * Calcula total em Bits/Mega/Tera
   */
  calcularTotais() {
    const totalBits = this.eggs.reduce((acc, e) => acc + e.tipoBits * e.quantidade, 0);
    return CurrencySystem.fromBits(totalBits);
  }

  /**
   * Formata total para string
   */
  formatTotais() {
    const { tera, mega, bits } = this.calcularTotais();
    return `${tera}T ${mega}M ${bits}Bits`;
  }

  /**
   * Copia total para inputs "Depois"
   */
  copiarParaDepois() {
    const { tera, mega, bits } = this.calcularTotais();
    document.getElementById("depoisTera").value = tera;
    document.getElementById("depoisMega").value = mega;
    document.getElementById("depoisBits").value = bits;
  }
}
