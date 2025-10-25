import { Storage } from "../core/storage.js";
import { Utils } from "../core/utils.js";

export class ToursSystem {
  constructor() {
    this.tours = Storage.load("tours", []);
  }

  adicionarTour(tipo, ganhoTera, ganhoBits, data = new Date()) {
    const tour = { tipo, ganhoTera, ganhoBits, data: data.toISOString() };
    this.tours.push(tour);
    Storage.save("tours", this.tours);
  }

  listar() {
    return this.tours.map(t => ({
      ...t,
      dataFormatada: Utils.formatDate(t.data)
    }));
  }

  calcularTotal() {
    let totalTera = 0;
    let totalBits = 0;
    this.tours.forEach(t => {
      totalTera += t.ganhoTera;
      totalBits += t.ganhoBits;
    });
    return {
      tera: totalTera,
      bits: totalBits,
      formatado: `${totalTera}T + ${Utils.formatCurrency(totalBits)}`
    };
  }
}
