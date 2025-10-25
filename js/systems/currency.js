// js/systems/currency.js
export class CurrencySystem {
    constructor() {
      this.sessoes = []; // Armazena todas as sessões
    }
  
    /**
     * Converte Tera, Mega, Bits em total de Bits
     */
    static toBits({ tera = 0, mega = 0, bits = 0 }) {
      return tera * 1_000_000 + mega * 1_000 + bits;
    }
  
    /**
     * Converte Bits em Tera, Mega, Bits
     */
    static fromBits(totalBits) {
      const tera = Math.floor(totalBits / 1_000_000);
      const mega = Math.floor((totalBits % 1_000_000) / 1_000);
      const bits = totalBits % 1_000;
      return { tera, mega, bits };
    }
  
    /**
     * Formata para string tipo "0T 0M 0Bits"
     */
    static formatCurrency(totalBits) {
      const { tera, mega, bits } = CurrencySystem.fromBits(totalBits);
      return `${tera}T ${mega}M ${bits}Bits`;
    }
  
    /**
     * Registra uma sessão de farm
     */
    registrarSessao(antes, depois) {
      const totalAntes = CurrencySystem.toBits(antes);
      const totalDepois = CurrencySystem.toBits(depois);
      const ganhoBits = totalDepois - totalAntes;
  
      const sessao = { antes, depois, ganhoBits, timestamp: new Date() };
      this.sessoes.push(sessao);
      return sessao;
    }
  }
  