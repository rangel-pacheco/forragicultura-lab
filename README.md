# Forragicultura Lab

Protótipo pedagógico para estudantes construírem e compararem planejamentos forrageiros de bovinocultura de corte.

**Versão 0.1.0 — em validação pelo docente.** Concepção pedagógica e planilha de origem: Rangel Fernandes Pacheco. Implementação com assistência de IA.

## Funcionalidades

- Cadastro de cenários, áreas e coeficientes de suporte por estação.
- Composição sazonal do rebanho, com quantidades e pesos informados pelo estudante.
- Suporte em UA, reserva de suporte, demanda e saldo por estação.
- Despesas, receitas e resultado anual.
- Comparação de cenários, justificativas e relatório para impressão.
- Salvamento no navegador, exportação e importação JSON.

## Usar

Abra o endereço publicado no GitHub Pages ou baixe os arquivos e abra `index.html`. Não exige instalação, login no aplicativo ou dependências externas.

Os cenários são armazenados localmente no navegador, sem sincronização. Exporte o JSON para guardar ou entregar o exercício. Projetos criados em localhost não migram automaticamente para o endereço público; exporte e importe-os.

## Método e limites

Suporte bruto = soma de área × coeficiente sazonal. Suporte disponível = suporte bruto × (1 − reserva/100). Demanda = soma de cabeças × peso médio / peso da UA.

Os coeficientes e custos iniciais foram extraídos da planilha de autoria do docente; a origem e o hash estão em `origem.json`. São hipóteses de exercício, não recomendações universais ou preços atuais. Estoques animais por estação são informados pelo estudante. O calendário é descritivo e não altera automaticamente o suporte.

Não estão implementadas evolução demográfica automática, formulação de dietas, recomendação de suplementação ou todos os módulos da planilha original. Resultado econômico considera apenas os fluxos informados. A validação do código não substitui validação técnica, de campo ou pedagógica. Consulte `VALIDACAO.md`.

## Testes

Com Node.js instalado: `node --test test-engine.cjs`.

## Publicação no GitHub Pages

Em **Settings → Pages**, selecione **Deploy from a branch**, branch **main**, pasta **/(root)** e salve. O arquivo `.nojekyll` permite servir os arquivos estáticos diretamente. A publicação usa os arquivos na raiz deste repositório.

Não foram incluídos documentos do Lattes ou dados de estudantes. Nenhuma licença de redistribuição foi escolhida pelo autor nesta etapa; não presuma uma licença aberta apenas porque o repositório é público.
