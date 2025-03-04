// script-analises-SNIS.js
// Implementação dos gráficos interativos para a página de análises
// Autor: Eric Pimentel

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de análises SNIS carregado!');

    // Configuração de cores temáticas
    const coresPrimarias = {
        agua: 'rgba(33, 150, 243, 0.8)',    // Azul para água
        esgoto: 'rgba(76, 175, 80, 0.8)',   // Verde para esgoto
        investimento: 'rgba(255, 193, 7, 0.8)', // Amarelo para investimento
        consumo: 'rgba(156, 39, 176, 0.8)', // Roxo para consumo
        perdas: 'rgba(244, 67, 54, 0.8)'    // Vermelho para perdas
    };
    
    const coresSecundarias = {
        agua: 'rgba(33, 150, 243, 0.2)',
        esgoto: 'rgba(76, 175, 80, 0.2)',
        investimento: 'rgba(255, 193, 7, 0.2)',
        consumo: 'rgba(156, 39, 176, 0.2)',
        perdas: 'rgba(244, 67, 54, 0.2)'
    };
    
    const bordas = {
        agua: 'rgba(33, 150, 243, 1)',
        esgoto: 'rgba(76, 175, 80, 1)',
        investimento: 'rgba(255, 193, 7, 1)',
        consumo: 'rgba(156, 39, 176, 1)',
        perdas: 'rgba(244, 67, 54, 1)'
    };

    // Opções comuns para todos os gráficos
    const opcoesComuns = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#E87E04',
                bodyColor: '#FFFFFF',
                borderColor: '#2196F3',
                borderWidth: 1,
                padding: 10,
                titleFont: {
                    size: 14,
                    weight: 'bold',
                    family: "'Roboto Condensed', sans-serif"
                },
                bodyFont: {
                    size: 13,
                    family: "'Roboto Condensed', sans-serif"
                },
                displayColors: true,
                caretSize: 6,
                cornerRadius: 4
            },
            legend: {
                position: 'top',
                align: 'center',
                labels: {
                    color: '#FFFFFF',
                    padding: 15,
                    font: {
                        size: 12,
                        family: "'Roboto Condensed', sans-serif"
                    },
                    boxWidth: 15
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#FFFFFF',
                    font: {
                        size: 11,
                        family: "'Roboto Condensed', sans-serif"
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#FFFFFF',
                    font: {
                        size: 11,
                        family: "'Roboto Condensed', sans-serif"
                    }
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutQuart'
        }
    };

    // Função para aplicar efeitos Star Wars aos gráficos
    function aplicarEfeitosStarWars(grafico) {
        grafico.options.plugins.title = {
            display: true,
            text: grafico.options.plugins.title.text || '',
            color: '#E87E04',
            font: {
                size: 16,
                family: "'Roboto Condensed', sans-serif",
                weight: 'bold'
            },
            padding: 20
        };

        grafico.update();
    }

    // 1. Gráfico de Evolução do Atendimento com Água e Esgoto
    async function carregarGraficoEvolucaoAtendimento() {
        try {
            console.log('Carregando gráfico de evolução de atendimento com dados do JSON local');
            
            // Carregando o arquivo JSON local
            const response = await fetch('./dados/Evolução-do-atendimento-com-água-e-esgoto-ao-longo-dos-ano.json');
            if (!response.ok) {
                throw new Error(`Falha ao carregar os dados: ${response.status} ${response.statusText}`);
            }
            
            const dados = await response.json();
            console.log('Dados carregados para evolução de atendimento:', dados);
            
            // Extraindo os dados do JSON
            const anos = dados.map(item => item.ano.toString());
            const populacaoAgua = dados.map(item => item.media_populacao_atendida_agua);
            const populacaoEsgoto = dados.map(item => item.media_populacao_atendida_esgoto);
            
            // Verificando se o elemento do canvas existe
            const canvasElement = document.getElementById('graficoEvolucaoAtendimento');
            if (!canvasElement) {
                console.error('Elemento canvas #graficoEvolucaoAtendimento não encontrado!');
                return;
            }
            
            const ctx = canvasElement.getContext('2d');
            
            const chartData = {
                labels: anos,
                datasets: [
                    {
                        label: 'População Atendida com Água',
                        data: populacaoAgua,
                        backgroundColor: coresSecundarias.agua,
                        borderColor: bordas.agua,
                        borderWidth: 2,
                        pointBackgroundColor: bordas.agua,
                        pointRadius: 4,
                        tension: 0.4
                    },
                    {
                        label: 'População Atendida com Esgoto',
                        data: populacaoEsgoto,
                        backgroundColor: coresSecundarias.esgoto,
                        borderColor: bordas.esgoto,
                        borderWidth: 2,
                        pointBackgroundColor: bordas.esgoto,
                        pointRadius: 4,
                        tension: 0.4
                    }
                ]
            };
            
            const chartOptions = {
                ...opcoesComuns,
                plugins: {
                    ...opcoesComuns.plugins,
                    title: {
                        display: true,
                        text: 'Evolução do Atendimento com Água e Esgoto no Brasil',
                        color: '#E87E04'
                    },
                    tooltip: {
                        ...opcoesComuns.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y.toLocaleString('pt-BR')} habitantes`;
                            }
                        }
                    }
                }
            };
            
            const chart = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: chartOptions
            });
            
            aplicarEfeitosStarWars(chart);
            console.log('Gráfico de evolução de atendimento carregado com sucesso!');
        } catch (error) {
            console.error('Erro ao carregar o gráfico de evolução:', error);
            document.getElementById('graficoEvolucaoAtendimento').insertAdjacentHTML('afterend', 
                `<p class="erro-grafico">Erro ao carregar dados JSON: ${error.message}</p>`);
        }
    }
    
    // 2. Gráfico de Atendimento com Água e Esgoto por Estado (2022)
    async function carregarGraficoAtendimentoPorEstado() {
        try {
            console.log('Carregando gráfico de atendimento por estado com dados do JSON local');
            
            // Carregando o arquivo JSON local
            const response = await fetch('./dados/Atendimento-com-água-e-esgoto-por-estado-em-2022.json');
            if (!response.ok) {
                throw new Error(`Falha ao carregar os dados: ${response.status} ${response.statusText}`);
            }
            
            const dados = await response.json();
            console.log('Dados carregados para atendimento por estado:', dados);
            
            // Extraindo os dados do JSON
            const estados = dados.map(item => item.sigla_uf);
            const populacaoAgua = dados.map(item => item.media_populacao_atendida_agua);
            const populacaoEsgoto = dados.map(item => item.media_populacao_atendida_esgoto);
            
            // Verificando se o elemento do canvas existe
            const canvasElement = document.getElementById('graficoAtendimentoPorEstado');
            if (!canvasElement) {
                console.error('Elemento canvas #graficoAtendimentoPorEstado não encontrado!');
                return;
            }
            
            const ctx = canvasElement.getContext('2d');
            
            const chartData = {
                labels: estados,
                datasets: [
                    {
                        label: 'População Atendida com Água',
                        data: populacaoAgua,
                        backgroundColor: coresPrimarias.agua,
                        borderColor: bordas.agua,
                        borderWidth: 1
                    },
                    {
                        label: 'População Atendida com Esgoto',
                        data: populacaoEsgoto,
                        backgroundColor: coresPrimarias.esgoto,
                        borderColor: bordas.esgoto,
                        borderWidth: 1
                    }
                ]
            };
            
            const chartOptions = {
                ...opcoesComuns,
                plugins: {
                    ...opcoesComuns.plugins,
                    title: {
                        display: true,
                        text: 'Atendimento com Água e Esgoto por Estado (2022)',
                        color: '#E87E04'
                    },
                    tooltip: {
                        ...opcoesComuns.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y.toLocaleString('pt-BR')} habitantes`;
                            }
                        }
                    }
                }
            };
            
            const chart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: chartOptions
            });
            
            aplicarEfeitosStarWars(chart);
            console.log('Gráfico de atendimento por estado carregado com sucesso!');
        } catch (error) {
            console.error('Erro ao carregar o gráfico por estado:', error);
            document.getElementById('graficoAtendimentoPorEstado').insertAdjacentHTML('afterend', 
                `<p class="erro-grafico">Erro ao carregar dados JSON: ${error.message}</p>`);
        }
    }
    
    // 3. Gráfico de Investimento em Saneamento Básico por Ano
    async function carregarGraficoInvestimento() {
        try {
            console.log('Carregando gráfico de investimento em saneamento com dados do JSON local');
            
            // Carregando o arquivo JSON local
            const response = await fetch('./dados/Investimento-total-em-saneamento-básico-por-ano.json');
            if (!response.ok) {
                throw new Error(`Falha ao carregar os dados: ${response.status} ${response.statusText}`);
            }
            
            const dados = await response.json();
            console.log('Dados carregados para investimento:', dados);
            
            // Extraindo os dados do JSON
            const anos = dados.map(item => item.ano.toString());
            const investimentos = dados.map(item => item.investimento_total / 1000000); // Convertendo para milhões
            
            // Verificando se o elemento do canvas existe
            const canvasElement = document.getElementById('graficoInvestimento');
            if (!canvasElement) {
                console.error('Elemento canvas #graficoInvestimento não encontrado!');
                return;
            }
            
            const ctx = canvasElement.getContext('2d');
            
            const chartData = {
                labels: anos,
                datasets: [
                    {
                        label: 'Investimento Total (em milhões R$)',
                        data: investimentos,
                        backgroundColor: coresPrimarias.investimento,
                        borderColor: bordas.investimento,
                        borderWidth: 1
                    }
                ]
            };
            
            const chartOptions = {
                ...opcoesComuns,
                plugins: {
                    ...opcoesComuns.plugins,
                    title: {
                        display: true,
                        text: 'Investimento em Saneamento Básico por Ano',
                        color: '#E87E04'
                    },
                    tooltip: {
                        ...opcoesComuns.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `Investimento: R$ ${context.parsed.y.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })} milhões`;
                            }
                        }
                    }
                }
            };
            
            const chart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: chartOptions
            });
            
            aplicarEfeitosStarWars(chart);
            console.log('Gráfico de investimento carregado com sucesso!');
        } catch (error) {
            console.error('Erro ao carregar o gráfico de investimento:', error);
            document.getElementById('graficoInvestimento').insertAdjacentHTML('afterend', 
                `<p class="erro-grafico">Erro ao carregar dados JSON: ${error.message}</p>`);
        }
    }
    
    // 4. Gráfico de Consumo Médio de Água por Habitante por Estado (2022)
    async function carregarGraficoConsumoAgua() {
        try {
            console.log('Carregando gráfico de consumo de água com dados do JSON local');
            
            // Carregando o arquivo JSON local
            const response = await fetch('./dados/Consumo-médio-de-água-por-habitante-por-estado-em-2022.json');
            if (!response.ok) {
                throw new Error(`Falha ao carregar os dados: ${response.status} ${response.statusText}`);
            }
            
            const dados = await response.json();
            console.log('Dados carregados para consumo de água:', dados);
            
            // Extraindo os dados do JSON
            const estados = dados.map(item => item.sigla_uf);
            const consumos = dados.map(item => item.media_consumo_per_capita);
            
            // Verificando se o elemento do canvas existe
            const canvasElement = document.getElementById('graficoConsumoAgua');
            if (!canvasElement) {
                console.error('Elemento canvas #graficoConsumoAgua não encontrado!');
                return;
            }
            
            const ctx = canvasElement.getContext('2d');
            
            const chartData = {
                labels: estados,
                datasets: [
                    {
                        label: 'Consumo Médio (litros/habitante/dia)',
                        data: consumos,
                        backgroundColor: coresPrimarias.consumo,
                        borderColor: bordas.consumo,
                        borderWidth: 1
                    }
                ]
            };
            
            const chartOptions = {
                ...opcoesComuns,
                plugins: {
                    ...opcoesComuns.plugins,
                    title: {
                        display: true,
                        text: 'Consumo Médio de Água por Habitante por Estado (2022)',
                        color: '#E87E04'
                    },
                    tooltip: {
                        ...opcoesComuns.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `Consumo: ${context.parsed.y.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })} L/hab/dia`;
                            }
                        }
                    }
                },
                scales: {
                    ...opcoesComuns.scales,
                    y: {
                        ...opcoesComuns.scales.y,
                        title: {
                            display: true,
                            text: 'Litros por habitante/dia',
                            color: '#FFFFFF',
                            font: {
                                size: 12,
                                family: "'Roboto Condensed', sans-serif"
                            }
                        }
                    }
                }
            };
            
            const chart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: chartOptions
            });
            
            aplicarEfeitosStarWars(chart);
            console.log('Gráfico de consumo de água carregado com sucesso!');
        } catch (error) {
            console.error('Erro ao carregar o gráfico de consumo:', error);
            document.getElementById('graficoConsumoAgua').insertAdjacentHTML('afterend', 
                `<p class="erro-grafico">Erro ao carregar dados JSON: ${error.message}</p>`);
        }
    }
    
    // 5. Gráfico de Índice de Perdas de Água na Distribuição por Estado (2022)
    async function carregarGraficoPerdas() {
        try {
            console.log('Carregando gráfico de perdas de água com dados do JSON local');
            
            // Carregando o arquivo JSON local
            const response = await fetch('./dados/Índice-de-perdas-de-água-na-distribuição-por-estado-em-2022.json');
            if (!response.ok) {
                throw new Error(`Falha ao carregar os dados: ${response.status} ${response.statusText}`);
            }
            
            const dados = await response.json();
            console.log('Dados carregados para perdas de água:', dados);
            
            // Extraindo os dados do JSON
            const estados = dados.map(item => item.sigla_uf);
            const perdas = dados.map(item => item.media_perda_distribuicao);
            
            // Verificando se o elemento do canvas existe
            const canvasElement = document.getElementById('graficoPerdas');
            if (!canvasElement) {
                console.error('Elemento canvas #graficoPerdas não encontrado!');
                return;
            }
            
            const ctx = canvasElement.getContext('2d');
            
            const chartData = {
                labels: estados,
                datasets: [
                    {
                        label: 'Índice de Perdas (%)',
                        data: perdas,
                        backgroundColor: coresPrimarias.perdas,
                        borderColor: bordas.perdas,
                        borderWidth: 1
                    }
                ]
            };
            
            const chartOptions = {
                ...opcoesComuns,
                plugins: {
                    ...opcoesComuns.plugins,
                    title: {
                        display: true,
                        text: 'Índice de Perdas de Água na Distribuição por Estado (2022)',
                        color: '#E87E04'
                    },
                    tooltip: {
                        ...opcoesComuns.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `Perdas: ${context.parsed.y.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}%`;
                            }
                        }
                    }
                },
                scales: {
                    ...opcoesComuns.scales,
                    y: {
                        ...opcoesComuns.scales.y,
                        title: {
                            display: true,
                            text: 'Percentual de perda (%)',
                            color: '#FFFFFF',
                            font: {
                                size: 12,
                                family: "'Roboto Condensed', sans-serif"
                            }
                        }
                    }
                }
            };
            
            const chart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: chartOptions
            });
            
            aplicarEfeitosStarWars(chart);
            console.log('Gráfico de perdas de água carregado com sucesso!');
        } catch (error) {
            console.error('Erro ao carregar o gráfico de perdas:', error);
            document.getElementById('graficoPerdas').insertAdjacentHTML('afterend', 
                `<p class="erro-grafico">Erro ao carregar dados JSON: ${error.message}</p>`);
        }
    }
    
    // Adicionar mensagem sobre a origem dos dados
    function adicionarMensagemDados() {
        const sections = document.querySelectorAll('.analise-section');
        sections.forEach(section => {
            const container = section.querySelector('.canvas-container');
            if (container) {
                const infoEl = document.createElement('div');
                infoEl.className = 'dados-info';
                infoEl.innerHTML = '<small>Dados reais obtidos do Sistema Nacional de Informações sobre Saneamento (SNIS) via BigQuery.</small>';
                infoEl.style.textAlign = 'center';
                infoEl.style.color = '#999';
                infoEl.style.fontSize = '0.8rem';
                infoEl.style.marginTop = '10px';
                container.appendChild(infoEl);
            }
        });
    }
    
    // Verificar qual seção está visível na viewport
    function verificarSecaoVisivel() {
        const sections = document.querySelectorAll('.analise-section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLinks[index]) {
                    navLinks[index].classList.add('active');
                }
            }
        });
    }
    
    // Adicionar comportamento de rolagem suave aos links de navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Adicionar event listener para o evento de scroll
    window.addEventListener('scroll', verificarSecaoVisivel);
    
    // Adicionar estilo para mensagem de erro no gráfico
    const style = document.createElement('style');
    style.textContent = `
        .erro-grafico {
            color: #ff6b6b;
            background-color: rgba(255, 107, 107, 0.1);
            border-left: 3px solid #ff6b6b;
            padding: 10px 15px;
            margin-top: 10px;
            font-size: 14px;
            border-radius: 0 4px 4px 0;
        }
    `;
    document.head.appendChild(style);

    // Carregar todos os gráficos
    console.log('Iniciando carregamento dos gráficos com dados dos arquivos JSON locais...');
    carregarGraficoEvolucaoAtendimento();
    carregarGraficoAtendimentoPorEstado();
    carregarGraficoInvestimento();
    carregarGraficoConsumoAgua();
    carregarGraficoPerdas();
    
    // Adicionar mensagem sobre a origem dos dados
    adicionarMensagemDados();
    
    // Verificar qual seção está visível inicialmente
    verificarSecaoVisivel();
});