// js/systems/tours.js
export class TourSystem {
    constructor() {
      this.tours = [];
    }
  
    addTour(nome, horario) {
      this.tours.push({ nome, horario });
    }
  
    /**
     * Renderiza próximos tours
     */
    renderizar() {
      const container = document.getElementById("proximosToursDashboard");
      container.innerHTML = "";
      if (this.tours.length === 0) {
        container.innerHTML = `<div class="empty-state"><i class="fas fa-route"></i><p>Configure os horários na aba Tours</p></div>`;
        return;
      }
      this.tours.forEach(t => {
        const div = document.createElement("div");
        div.classList.add("tour-item");
        div.innerText = `${t.nome} - ${t.horario}`;
        container.appendChild(div);
      });
    }
  }
  