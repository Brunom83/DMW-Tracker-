import { Storage } from "../core/storage.js";
import { Utils } from "../core/utils.js";

export class CurrencySystem {
  constructor() {
    this.sessions = Storage.load("currencySessions", []);
  }

  calcularGanhos(antes, depois) {
    const ganhoBits =
      (depois.bits - antes.bits) +
      (depois.mega - antes.mega) * 1000 +
      (depois.tera - antes.tera) * 1_000_000;
    return ganhoBits;
  }

  registrarSessao(antes, depois) {
    const ganho = this.calcularGanhos(antes, depois);
    const sessao = {
      antes,
      depois,
      ganhoBits: ganho,
      data: new Date().toISOString(),
    };
    this.sessions.push(sessao);
    Storage.save("currencySessions", this.sessions);
    return sessao;
  }

  listar() {
    return this.sessions.map(sessao => ({
      ...sessao,
      dataFormatada: Utils.formatDate(sessao.data)
    }));
  }

  limpar() {
    this.sessions = [];
    Storage.clear("currencySessions");
  }
}
