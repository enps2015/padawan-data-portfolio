## Documento de Análise de Dados do SNIS (Saneamento Básico no Brasil)

**Autor:** Eric Pimentel 

**Data:** Março de 2025

**Objetivo:** Investigar a evolução do saneamento básico no Brasil ao longo dos anos, identificando tendências, desafios e oportunidades para melhorias no setor.

**Fonte de Dados:** Sistema Nacional de Informações sobre Saneamento (SNIS) - Base dos Dados (BigQuery)

**Tecnologias:** BigQuery (ETL), Google Drive (Armazenamento), Chart.js (Visualização)


### 1. Introdução

O saneamento básico é um direito humano fundamental e essencial para a saúde, o bem-estar e o desenvolvimento socioeconômico de uma população.  No entanto, milhões de pessoas no Brasil ainda não têm acesso a serviços adequados de água e esgoto.  Este documento apresenta uma análise exploratória dos dados do SNIS, visando compreender a evolução do saneamento básico no país e fornecer insights para a tomada de decisões e o desenvolvimento de políticas públicas mais eficazes.

### 2. Perguntas de Pesquisa

Esta análise busca responder às seguintes perguntas:

*   Como evoluiu o atendimento com água e esgoto no Brasil ao longo dos anos?
*   Quais regiões ou estados apresentam os maiores desafios em relação ao saneamento básico?
*   Qual o investimento em saneamento básico ao longo dos anos, e como ele se distribui entre as regiões?
*   Como o consumo de água varia entre as regiões do Brasil?
*   Qual o índice de perdas de água no sistema de distribuição, e como ele varia entre as regiões?

### 3. Metodologia

Os dados do SNIS foram extraídos do BigQuery, processados e agregados para gerar as métricas de interesse.  Os resultados foram exportados para arquivos CSV e armazenados no Google Drive.  Para a visualização dos dados, utilizaremos a biblioteca Chart.js, que permite criar gráficos interativos e dinâmicos.

### 4. Análises e Visualizações

**4.1. Evolução do Atendimento com Água e Esgoto:**

**Link do dataset CSV:** https://drive.google.com/file/d/16Kv2LsoiHqvFfbd7No1uLFNiRkwhDb9U/view?usp=sharing

**Gráfico:**  Gráfico de linhas com dois eixos Y, mostrando a evolução da média da população atendida com água e esgoto ao longo dos anos.


**Insights Esperados:**  Identificar tendências de crescimento ou decréscimo no atendimento com água e esgoto ao longo do tempo.


**4.2. Atendimento com Água e Esgoto por Estado (2022):**

**Link do dataset CSV:** https://drive.google.com/file/d/1yj_iaHc_6xxGndoC8dh1Bc3soBJz-SwR/view?usp=sharing

**Gráfico:** Gráfico de barras, mostrando a média da população atendida com água e esgoto por estado em 2021.


**Insights Esperados:**  Comparar o atendimento entre os estados e identificar aqueles com maior ou menor cobertura de serviços de saneamento básico.


**4.3. Investimento em Saneamento Básico por Ano:**

**Link do dataset CSV:** https://drive.google.com/file/d/1PdGQxyY01Nmpy8wYFNHImSxgQ8KsmhJQ/view?usp=sharing

**Gráfico:** Gráfico de barras, mostrando o investimento total em saneamento básico por ano.


**Insights Esperados:** Analisar a evolução dos investimentos em saneamento básico ao longo do tempo e identificar possíveis correlações com o atendimento à população.


**4.4. Consumo Médio de Água por Habitante por Estado (2022):**

**Link do dataset CSV:** https://drive.google.com/file/d/15pa3wjU8aOpiDInN22Edgzyq6wZ1PR_C/view?usp=sharing

**Gráfico:** Gráfico de barras, mostrando o consumo médio de água por habitante em cada estado em 2021.


**Insights Esperados:** Comparar o consumo de água entre os estados e identificar aqueles com maior ou menor consumo per capita.


**4.5. Índice de Perdas de Água na Distribuição por Estado (2022):**

**Link do dataset CSV:** https://drive.google.com/file/d/1USN8xQo2PdpwdDz4QqNwt8ebIIqHTD9F/view?usp=sharing

**Gráfico:** Gráfico de barras, mostrando o índice médio de perdas de água na distribuição por estado em 2021.


**Insights Esperados:** Identificar os estados com maior índice de perdas de água, o que pode indicar ineficiências no sistema de distribuição e a necessidade de investimentos em melhorias.


### 5. Conclusão

As análises apresentadas neste documento fornecem um panorama da evolução do saneamento básico no Brasil, com foco nas perguntas de pesquisa definidas.  Os gráficos interativos permitem uma exploração mais detalhada dos dados, possibilitando a identificação de tendências e insights relevantes para o desenvolvimento de políticas públicas e ações que visem o acesso universal a serviços de saneamento básico.

**Próximos Passos:**

*   Implementar os gráficos interativos na página de análises do site portfólio.
*   Adicionar mais análises e visualizações, explorando outras variáveis do dataset do SNIS.
*   Integrar os dados com outras fontes de informação para enriquecer a análise.
*   Desenvolver um modelo preditivo para estimar a evolução do saneamento básico nos próximos anos.


Que a Força dos Dados esteja com você, Padawan! 🚀

