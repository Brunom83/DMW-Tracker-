import { Storage } from "../core/storage.js";
import { Utils } from "../core/utils.js";

export class EggsSystem {
  constructor() {
    this.eggs = Storage.load("crackedEggs", []);
    this.eggValues = {
      common: 50_000_000,
      rare: 120_000_000,
      epic: 250_000_000,
      ultimate: 500_000_000,
      special: 1_000_000_000,
      blessing: 1_500_000_000,
      event: 2_000_000_000,
    };
  }

  adicionarEgg(tipo, quantidade = 1) {
    const existente = this.eggs.find(e => e.tipo === tipo);
    if (existente) existente.quantidade += quantidade;
    else this.eggs.push({ tipo, quantidade });
    Storage.save("crackedEggs", this.eggs);
  }

  removerEgg(tipo, quantidade = 1) {
    const existente = this.eggs.find(e => e.tipo === tipo);
    if (existente) {
      existente.quantidade -= quantidade;
      if (existente.quantidade <= 0) {
        this.eggs = this.eggs.filter(e => e.tipo !== tipo);
      }
      Storage.save("crackedEggs", this.eggs);
    }
  }

  calcularTotal() {
    let totalBits = 0;
    this.eggs.forEach(e => {
      const valor = this.eggValues[e.tipo] || 0;
      totalBits += valor * e.quantidade;
    });
    return {
      bits: totalBits,
      formatado: Utils.formatCurrency(totalBits)
    };
  }

  listar() {
    return this.eggs;
  }
}
