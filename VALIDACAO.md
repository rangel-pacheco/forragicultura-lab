# Verificação da versão 0.1.0 — 27/10/2026

## Motor

`node --test test-engine.cjs`: oito testes, oito aprovações. Verificados: suporte por área, reserva, demanda em UA, déficit, reserva comprometida, soma de múltiplas categorias/áreas, reconciliação financeira, denominadores nulos, validação de entradas, sobreposição simultânea e sucessão sazonal, e estrutura mínima de importação.

## Interface

Conferência manual no navegador local:

- Exemplo fictício carregado como cenário separado, preservando o projeto inicial.
- Duplicação de cenário e mudança do suporte de inverno da área de campo nativo de 0,5 para 1 UA/ha. Saldo de inverno passou de −6,85 UA para +5,90 UA; comparação exibiu −6,9 e +5,9, respectivamente.
- Após recarga, o cenário ativo e os cálculos editados permaneceram disponíveis.
- Área física reduzida de 50 para 49 ha com 50 ha ativos: bloqueio de cálculo e aviso de sobreposição. Restaurar 50 ha restabeleceu o cálculo.
- Exportar acionou o download de projeto JSON e apresentou confirmação na interface.
- Exemplo: pastagens R$12.400; outras despesas R$28.800; custos totais R$41.200; receitas R$96.000; resultado R$54.800; resultado/ha R$1.096. Valores fictícios do exercício.
- Apresentação visual conferida em navegador desktop. Não foi realizada verificação em dispositivo móvel real.

## Limites da verificação

Não houve ensaio de campo, validação agronômica, avaliação discente ou comparação integral de todos os resultados com a planilha. A importação foi validada estruturalmente no motor; o ciclo completo de upload pela interface e a saída final da impressão/PDF não foram conferidos nesta entrega. O calendário é descritivo. Não estão implementadas evolução demográfica automática, suplementação, dietas, autenticação ou sincronização entre dispositivos.

Esta documentação descreve verificação de implementação, não certificação ou garantia de pontuação CAPES.
