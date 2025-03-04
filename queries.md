

**Queries SQL com Formatação para Duas Casas Decimais:**

**Query 1 (Evolução do atendimento com água e esgoto ao longo dos anos):**

```sql
SELECT
    ano,
    ROUND(AVG(populacao_atendida_agua), 2) AS media_populacao_atendida_agua,
    ROUND(AVG(populacao_atentida_esgoto), 2) AS media_populacao_atendida_esgoto
  FROM
    `basedosdados.br_mdr_snis.municipio_agua_esgoto`
  GROUP BY 1
  ORDER BY
    ano
```

**Query 2 (Atendimento com água e esgoto por estado em 2021):**

```sql
SELECT
    sigla_uf,
    ROUND(AVG(populacao_atendida_agua), 2) AS media_populacao_atendida_agua,
    ROUND(AVG(populacao_atentida_esgoto), 2) AS media_populacao_atendida_esgoto
  FROM
    `basedosdados.br_mdr_snis.municipio_agua_esgoto`
  WHERE ano = 2021
  GROUP BY 1
  ORDER BY
    media_populacao_atendida_agua DESC
```

**Query 3 (Investimento total em saneamento básico por ano):**

```sql
SELECT
    ano,
    ROUND(SUM(investimento_total_prestador), 2) AS investimento_total
  FROM
    `basedosdados.br_mdr_snis.municipio_agua_esgoto`
  GROUP BY 1
  ORDER BY
    ano
```

**Query 4 (Consumo médio de água por habitante por estado em 2021):**

```sql
SELECT
    sigla_uf,
    ROUND(AVG(indice_consumo_agua_per_capita), 2) AS media_consumo_per_capita
  FROM
    `basedosdados.br_mdr_snis.municipio_agua_esgoto`
    WHERE ano = 2021
  GROUP BY 1
  ORDER BY
    media_consumo_per_capita DESC
```

**Query 5 (Índice de perdas de água na distribuição por estado em 2021):**

```sql
SELECT
    sigla_uf,
    ROUND(AVG(indice_perda_distribuicao_agua), 2) AS media_perda_distribuicao
  FROM
    `basedosdados.br_mdr_snis.municipio_agua_esgoto`
    WHERE ano = 2021
  GROUP BY 1
  ORDER BY
    media_perda_distribuicao DESC
```


