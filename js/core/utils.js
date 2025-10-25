// Funções de conversão e formatação genéricas
export const Utils = {
    bitsToMega(bits) {
      return bits / 1000;
    },
    megaToTera(mega) {
      return mega / 1000;
    },
    teraToMega(tera) {
      return tera * 1000;
    },
    megaToBits(mega) {
      return mega * 1000;
    },
    formatCurrency(bits) {
      const tera = Math.floor(bits / 1_000_000_000);
      const mega = Math.floor((bits % 1_000_000_000) / 1_000_000);
      const rest = bits % 1_000_000;
      return `${tera}T ${mega}M ${rest}Bits`;
    },
    formatDate(dateString) {
      const d = new Date(dateString);
      return d.toLocaleString("pt-PT", { hour12: false });
    }
  };
  