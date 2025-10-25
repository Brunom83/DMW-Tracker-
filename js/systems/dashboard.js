// js/systems/dashboard.js
export class Dashboard {
  constructor(currencySystem) {
    this.currencySystem = currencySystem;
  }

  /**
   * Atualiza os cards do dashboard
   */
  atualizarCards() {
    const sessoes = this.currencySystem.sessoes;
    const totalBits = sessoes.reduce((acc, s) => acc + s.ganhoBits, 0);

    document.getElementById("dashboardTera").innerText = `${Math.floor(totalBits/1_000_000)}T`;
    document.getElementById("dashboardSessoes").innerText = sessoes.length;
    document.getElementById("sidebarTera").innerText = `${Math.floor(totalBits/1_000_000)}T`;
    document.getElementById("sidebarSessoes").innerText = sessoes.length;
  }
}
