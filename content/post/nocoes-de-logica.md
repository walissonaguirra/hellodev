---
title: "Noções de Lógica"
date: 2026-05-29T06:00:00-03:00
draft: false
description: "Introdução à lógica proposicional: proposições, tabelas verdade e os conectivos lógicos (negação, conjunção, disjunção, condicional e bicondicional) e sua aplicação na programação."
tags: ["Matemática Elementar para Computação"]
unlisted: true
math: true
---

### Lógica Proposicional
Esta é a forma mais simples de lógica. Nela os fatos do mundo real são apresentados como sentenças bivalentes, que também podem ser chamadas de Proposições.

### Proposição
É uma sentença declarativa que só pode ser **verdadeira (V)** ou **falsa (F)**, mas nunca ambas ao mesmo tempo.

### Proposição simples
Não contém nenhum conectivo lógico e representa uma ideia única. (vamos falar mais sobre conectivos abaixo).

Exemplos:

- **V** - "O número é par"
- **V** - "Curitiba fica no Paraná"
- **F** - "A terra é plana" - Será? 🤔
- **F** - "5 é número par"

Não são proposições:

- **?** - "Feche a porta" - Ordem
- **?** - "Que horas são?" - Pergunta
- **?** - "x + 1 = 5" - Sentença aberta (depende de x)

### Proposição composta
É formada pela combinação de duas ou mais proposições simples por meio de conectivos lógicos (\(\sim\), \(\land\), \(\lor\), \(\rightarrow\), \(\leftrightarrow\)). Seu valor lógico depende dos valores das proposições que a compõem e do conectivo usado.

Exemplos:

| Valor | Sentença | Notação |
|:-----:|:---------|:-------:|
| **V** | "2 é par **e** 3 é ímpar." | \(p \land q\) |
| **F** | "2 é par **e** 5 é par." | \(p \land q\) |
| **V** | "Terra é plana **ou** 2 é par." | \(p \lor q\) |
| **V** | "**Se** chove, **então** o chão molha." | \(p \rightarrow q\) |
| **F** | "**Não** é verdade que 2 é par." | \(\sim p\) |

### Tabela verdade
É uma forma de listar todas as combinações possíveis de valores lógicos (V ou F) de uma ou mais proposições e mostra o resultado para cada combinação.

A regra é simples: para \(n\) proposições, a tabela tem \(2^n\) linhas. Com 1 proposição são 2 linhas, com 2 são 4, com 3 são 8, e assim por diante.

Exemplo com duas proposições \(p\) e \(q\):

| \(p\) | \(q\) |
|:---:|:---:|
|  V  |  V  |
|  V  |  F  |
|  F  |  V  |
|  F  |  F  |

A partir dessas combinações conseguimos avaliar qualquer proposição composta formada por \(p\) e \(q\).

### Conectivos lógicos
São os símbolos que ligam (ou modificam) proposições para formar proposições compostas. 

#### Negação — \(\sim p\)
Inverte o valor lógico da proposição. Se \(p\) tem o valor **V**, \(\sim p\) inverte o valor para **F**; e vice-versa.

| \(p\) | \(\sim p\) |
|:---:|:--------:|
|  V  |    F     |
|  F  |    V     |

Exemplo: _p_ = "2 é par" (**V**) — \(\sim p\) = "2 não é par" (**F**).

#### Conjunção — \(p \land q\) ("e")
Só é **V** quando **as duas** proposições são verdadeiras.

| \(p\) | \(q\) | \(p \land q\) |
|:---:|:---:|:-----------:|
|  V  |  V  |      V      |
|  V  |  F  |      F      |
|  F  |  V  |      F      |
|  F  |  F  |      F      |

Exemplo: "2 é par **e** 3 é ímpar." — **V**

#### Disjunção — \(p \lor q\) ("ou")
É **V** quando **pelo menos uma** proposição é verdadeira. Só é **F** quando as duas são falsas.

| \(p\) | \(q\) | \(p \lor q\) |
|:---:|:---:|:----------:|
|  V  |  V  |     V      |
|  V  |  F  |     V      |
|  F  |  V  |     V      |
|  F  |  F  |     F      |

Exemplo: "Terra é plana **ou** 2 é par" — **V** (basta uma ser verdadeira).

#### Condicional — \(p \rightarrow q\) ("se... então")
Só é **F** quando \(p\) é verdadeiro e \(q\) é falso. Lê-se como "se \(p\), então \(q\)".

| \(p\) | \(q\) | \(p \rightarrow q\) |
|:---:|:---:|:-----------------:|
|  V  |  V  |         V         |
|  V  |  F  |         F         |
|  F  |  V  |         V         |
|  F  |  F  |         V         |

Exemplo: "**Se** chove, **então** o chão molha." Se chover e o chão não molhar, a afirmação é falsa. Nos outros casos, é verdadeira.

Acho este conectivo bastante confuso quando explicado na teoria. Talvez seja interessante ver exemplos práticos para entender melhor.

Pense assim: se a hipótese nem aconteceu (\(p\)), a promessa (\(q\)) não foi quebrada, então o resultado é **V**.

#### Bicondicional — \(p \leftrightarrow q\) ("se e somente se")
É **V** quando as duas proposições têm o **mesmo** valor lógico.

| \(p\) | \(q\) | \(p \leftrightarrow q\) |
|:---:|:---:|:---------------------:|
|  V  |  V  |           V           |
|  V  |  F  |           F           |
|  F  |  V  |           F           |
|  F  |  F  |           V           |

Exemplo: "Um número é par **se e somente se** é divisível por 2."

#### Ordem de precedência
Quando uma expressão combina vários conectivos, a ordem de avaliação (do mais forte para o mais fraco) é:

| Precedência | 1º | 2º | 3º | 4º | 5º |
|:-----------:|:-:|:-:|:-:|:-:|:-:|
| Conectivo | \(\sim\) | \(\land\) | \(\lor\) | \(\rightarrow\) | \(\leftrightarrow\) |

Na dúvida, use parênteses.

### Aplicações na programação
A lógica proposicional é praticamente a base das estruturas de decisão. Todo `if`, `while` ou expressão booleana está avaliando uma proposição.

Os conectivos aparecem quase idênticos na maioria das linguagens:

| Lógica          | Operador (Go, C, JS...) |
|:---------------:|:-----------------------------:|
| \(\sim p\)        | `!p`                          |
| \(p \land q\)     | `p && q`                      |
| \(p \lor q\)      | `p \|\| q`                    |
| \(p \rightarrow q\) | `!p \|\| q` _(equivalente)_ |
| \(p \leftrightarrow q\) | `p == q`                |

Exemplo em Go:

```go
idade := 20
temCarteira := true

if idade >= 18 && temCarteira {
    fmt.Println("Pode dirigir")
}
```

A condição do `if` é a proposição composta \(p \land q\), onde \(p\) = "idade maior ou igual a 18" e \(q\) = "tem carteira".

## Referências
- [Programação Dinamica - Noções de Lógica](https://matematica.pgdinamica.com/logica.html)
- [Apostila de Lógica Proposicional
(Fundamentos Básicos)](https://www.facom.ufu.br/~gustavo/Logica/Apostila_LogicaProposicional.pdf)
- [Avaliação de curto-circuito](https://pt.wikipedia.org/wiki/Avalia%C3%A7%C3%A3o_de_curto-circuito#:~:text=Avalia%C3%A7%C3%A3o%20de%20curto-circuito%2C%20avalia%C3%A7%C3%A3o,da%20express%C3%A3o:%20quando%20o%20primeiro)


