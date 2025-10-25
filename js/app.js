// js/app.js
import { Moedas } from './moedas.js';
import { Eggs } from './eggs.js';
import { ToursManager } from './tours.js';

class DMWTracker {
    constructor() {
        this.eggs = [];
        this.tours = window.toursManager; // link para ToursManager
        this.inicializar();
    }

    atualizarDashboard() {
        this.atualizarGanhosMoedasDashboard();
        this.atualizarEggsDashboard();
        this.atualizarProximosToursDashboard();
        this.atualizarHistoricoToursDashboard();
    }
    
    // Moedas
    atualizarGanhosMoedasDashboard() {
        document.getElementById('resultadoAntesDash').textContent = document.getElementById('resultadoAntes').textContent;
        document.getElementById('resultadoDepoisDash').textContent = document.getElementById('resultadoDepois').textContent;
        document.getElementById('resultadoGanhosDash').textContent = document.getElementById('resultadoGanhos').textContent;
    }
    
    // Eggs
    atualizarEggsDashboard() {
        document.getElementById('totalBitsEggsDash').textContent = document.getElementById('totalBitsEggs').textContent;
        document.getElementById('totalMegaEggsDash').textContent = document.getElementById('totalMegaEggs').textContent;
        document.getElementById('totalTeraEggsDash').textContent = document.getElementById('totalTeraEggs').textContent;
    }
    
    // Próximos Tours
    atualizarProximosToursDashboard() {
        const container = document.getElementById('proximosToursDashboard');
        container.innerHTML = document.getElementById('proximosTours').innerHTML;
    }
    
    // Histórico resumido
    atualizarHistoricoToursDashboard() {
        const container = document.getElementById('historicoToursDashboard');
        container.innerHTML = document.getElementById('historicoTours').innerHTML;
    }
    

    inicializar() {
        this.carregarDados();
        this.inicializarEventos();
        this.atualizarCalculadoraEggs();
        this.atualizarDashboard();
        setInterval(() => this.atualizarDashboard(), 60000);
    }

    inicializarEventos() {
        // Botões de moedas e eggs
        this.addEventListener('calcularBtn','click',()=>this.calcularGanhos());
        this.addEventListener('adicionarEgg','click',()=>this.adicionarEgg());
        this.addEventListener('quantidadeEgg','keypress',(e)=>{ if(e.key==='Enter') this.adicionarEgg(); });
        this.addEventListener('copiarParaDepois','click',()=>this.copiarParaDepois());
        this.addEventListener('adicionarHorarioBtn','click',() => {
            const tipo = document.getElementById('tipoTour').value;
            const horario = document.getElementById('horarioTour').value;
            this.tours.adicionarHorario(tipo, horario);
        });
        
        this.addEventListener('registrarTourBtn','click',() => {
            const tipo = document.getElementById('tipoTourRegistrar').value;
            const tera = parseFloat(document.getElementById('teraGanho').value) || 0;
            const detalhes = document.getElementById('detalhesTour').value;
            const seals = parseInt(document.getElementById('sealsTour').value) || 0;
            this.tours.registrarTour(tipo, tera, detalhes, seals);
        });
    }

    addEventListener(id, evento, callback) {
        const el = document.getElementById(id);
        if(el) el.addEventListener(evento, callback);
    }    

    atualizarDashboard() {
        this.atualizarResumoDia();
        this.tours.atualizarProximosTours(); // mostra próximos tours no dashboard
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.dmwTracker = new DMWTracker();
});

window.switchToTab = function(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('d-none'));
    const tab = document.getElementById(tabName);
    if(tab) tab.classList.remove('d-none');
};

