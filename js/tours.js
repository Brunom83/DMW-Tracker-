// js/tours.js
export class ToursManager {
    constructor() {
        this.toursConfig = this.carregarConfig();
        this.inicializar();
    }

    inicializar() {
        this.atualizarListaHorarios();
        this.atualizarProximosTours();
        this.atualizarHistoricoTours();

        // Atualiza próximos tours a cada minuto
        setInterval(() => this.atualizarProximosTours(), 60000);
    }

    // Carregar config do localStorage
    carregarConfig() {
        const config = localStorage.getItem('dmwToursConfig');
        return config ? JSON.parse(config) : { horarios: { forest: [], bless: [] }, historico: [] };
    }

    salvarConfig() {
        localStorage.setItem('dmwToursConfig', JSON.stringify(this.toursConfig));
    }

    adicionarHorario(tipo, horarioStr) {
        if (!horarioStr) return;
        const [hours, minutes] = horarioStr.split(':').map(Number);
        const horarioObj = { hours, minutes, tipo, id: Date.now() };
        if (!this.toursConfig.horarios[tipo]) this.toursConfig.horarios[tipo] = [];
        this.toursConfig.horarios[tipo].push(horarioObj);
        this.salvarConfig();
        this.atualizarListaHorarios();
        this.atualizarProximosTours();
    }

    removerHorario(tipo, id) {
        if (this.toursConfig.horarios[tipo]) {
            this.toursConfig.horarios[tipo] = this.toursConfig.horarios[tipo].filter(h => h.id !== id);
            this.salvarConfig();
            this.atualizarListaHorarios();
            this.atualizarProximosTours();
        }
    }

    registrarTour(tipo, teraGanho, details, seals) {
        const tourData = {
            tipo,
            tera: teraGanho,
            details,
            seals,
            data: new Date().toLocaleString('pt-PT'),
            timestamp: Date.now()
        };
        this.toursConfig.historico.unshift(tourData);
        if (this.toursConfig.historico.length > 50) this.toursConfig.historico = this.toursConfig.historico.slice(0, 50);
        this.salvarConfig();
        this.atualizarHistoricoTours();
    }

    atualizarListaHorarios() {
        const lista = document.getElementById('listaHorarios');
        if (!lista) return;
        let html = '<h6>Horários Configurados:</h6>';
        let temHorarios = false;

        Object.keys(this.toursConfig.horarios).forEach(tipo => {
            if (this.toursConfig.horarios[tipo].length > 0) {
                temHorarios = true;
                const tipoNome = tipo === 'forest' ? '🌲 Forest Tour' : '🙏 Bless Tour';
                html += `<div class="mb-2"><strong>${tipoNome}:</strong><br>`;
                this.toursConfig.horarios[tipo].forEach(horario => {
                    const horaFormatada = `${horario.hours.toString().padStart(2,'0')}:${horario.minutes.toString().padStart(2,'0')}`;
                    html += `<span class="badge bg-secondary me-1 mb-1">${horaFormatada} 
                             <button class="btn btn-sm btn-outline-light ms-1" onclick="toursManager.removerHorario('${tipo}', ${horario.id})">×</button></span>`;
                });
                html += '</div>';
            }
        });

        if (!temHorarios) html = '<p class="text-muted">Nenhum horário configurado...</p>';
        lista.innerHTML = html;
    }

    atualizarProximosTours() {
        const container = document.getElementById('proximosTours');
        if (!container) return;

        const agora = new Date();
        const agoraMinutos = agora.getHours() * 60 + agora.getMinutes();
        let proximos = [];

        Object.keys(this.toursConfig.horarios).forEach(tipo => {
            this.toursConfig.horarios[tipo].forEach(horario => {
                let diff = horario.hours * 60 + horario.minutes - agoraMinutos;
                if (diff < 0) diff += 1440;
                proximos.push({ tipo, horario: `${horario.hours.toString().padStart(2,'0')}:${horario.minutes.toString().padStart(2,'0')}`, minutosFaltando: diff });
            });
        });

        proximos.sort((a,b) => a.minutosFaltando - b.minutosFaltando);

        let html = '';
        if (proximos.length > 0) {
            html += '<div class="list-group">';
            proximos.slice(0,3).forEach(tour => {
                const tipoNome = tour.tipo === 'forest' ? '🌲 Forest' : '🙏 Bless';
                const h = Math.floor(tour.minutosFaltando/60);
                const m = tour.minutosFaltando % 60;
                html += `<div class="list-group-item d-flex justify-content-between">
                            <span>${tipoNome}</span>
                            <small>${h>0? h+'h ':' '}${m}m</small>
                         </div>`;
            });
            html += '</div>';
        } else html = '<p class="text-muted mb-0">Nenhum tour configurado...</p>';

        container.innerHTML = html;
    }

    atualizarHistoricoTours() {
        const container = document.getElementById('historicoTours');
        if (!container) return;

        if (this.toursConfig.historico.length === 0) {
            container.innerHTML = '<p class="text-muted">Nenhum tour registrado ainda...</p>';
            return;
        }

        let html = '<div class="table-responsive"><table class="table table-sm table-striped"><thead><tr><th>Data</th><th>Tour</th><th>Detalhes</th><th>Tera</th><th>Seals</th></tr></thead><tbody>';
        this.toursConfig.historico.slice(0,10).forEach(tour => {
            const tipoNome = tour.tipo === 'forest' ? '🌲 Forest' : '🙏 Bless';
            html += `<tr>
                        <td><small>${tour.data}</small></td>
                        <td>${tipoNome}</td>
                        <td>${tour.details}</td>
                        <td><strong>${tour.tera.toFixed(1)}T</strong></td>
                        <td>${tour.seals}</td>
                     </tr>`;
        });
        html += '</tbody></table></div>';
        container.innerHTML = html;
    }
}

// Tornar global para index.html
window.toursManager = new ToursManager();
