---
title: "Noções de Lógica"
date: 2026-05-29T06:00:00-03:00
draft: false
description: "Entenda o que são proposições e como funcionam os conectivos lógicos (negação, conjunção, disjunção, condicional e bicondicional), com tabelas-verdade, precedência, montagem de fórmulas compostas e a avaliação de curto-circuito no código."
images:
  - https://cdn.walissonaguirra.dev/og-nocoes-de-logica.png
tags: ["Matemática Elementar para Computação"]
unlisted: true
math: true
---

### Lógica Proposicional

Esta é a forma mais simples de lógica. Nela os fatos do mundo real são apresentados como sentenças bivalentes, que também podem ser chamadas de Proposições.

### Proposição

Uma **proposição** é uma frase declarativa que pode ser classificada como **verdadeira (\(V\))** ou **falsa (\(F\))**, sem meio-termo e nunca as duas ao mesmo tempo.

### Proposição simples

Não contém nenhum conectivo lógico e representa uma ideia única. (vamos falar mais sobre conectivos abaixo).

São proposições:

- **V**: *"Curitiba fica no Paraná"*
- **V**: *"2 é um número par"*
- **F**: *"A Terra é plana"*
- **F**: *"5 é par"*

Não são proposições:

- **?**: *"Feche a porta!"* (uma ordem)
- **?**: *"Que horas são?"* (uma pergunta)
- **?**: *"\(x + 1 = 5\)"* (uma sentença aberta: depende de quem é \(x\))

### Símbolos proposicionais

Para falar de qualquer proposição sem repetir a frase inteira, escrevemos cada uma como uma letra maiúscula: \(P\), \(Q\), \(R\), \(S\), \(P_1\), \(P_2\), \(P_3\)... São as **variáveis proposicionais**, cada uma um "lugar reservado" que pode receber qualquer proposição concreta. 

A letra \(P\) vem de *proposição*; as outras só acompanham a ordem do alfabeto.

- \(P\): *"Está chovendo"* 
- \(Q\): *"Peguei o guarda-chuva"*

### Conectivos lógicos

São cinco conectivos no total, e é com eles que montamos qualquer proposição composta.

| Símbolo | Conectivo | Lê-se |
|:---:|:---:|:---|
| \(\sim\) | negação | "não" |
| \(\land\) | conjunção | "e" |
| \(\lor\) | disjunção | "ou" |
| \(\rightarrow\) | condicional | "se... então" |
| \(\leftrightarrow\) | bicondicional | "se e somente se" |

### Proposição composta
É formada pela combinação de duas ou mais proposições simples por meio de conectivos lógicos. Seu valor lógico depende dos valores das proposições que a compõem e do conectivo usado.

Exemplos:

| Valor | Sentença | Notação |
|:-----:|:---------|:-------:|
| **V** | "2 é par **e** 3 é ímpar." | \(p \land q\) |
| **F** | "2 é par **e** 5 é par." | \(p \land q\) |
| **V** | "Terra é plana **ou** 2 é par." | \(p \lor q\) |
| **V** | "**Se** chove, **então** o chão molha." | \(p \rightarrow q\) |
| **F** | "**Não** é verdade que 2 é par." | \(\sim p\) |

### Negação
É o conectivo mais simples, escrito \(\sim\) (lê-se "não"). Ele age sobre uma única proposição e apenas **inverte** o seu valor: troca \(V\) por \(F\) e \(F\) por \(V\). Se \(P\) é *"Está chovendo"*, então \(\sim P\) é *"Não está chovendo"*.

| \(P\) | \(\sim P\) |
|:---:|:---:|
| V | F |
| F | V |

Exemplo: _p_ = "2 é par" (**V**); \(\sim p\) = "2 não é par" (**F**).

### Conjunção
É o "e", escrito \(\land\). \(P \land Q\) só é verdadeira quando \(P\) **e** \(Q\) são, ao mesmo tempo, verdadeiras. Basta uma das duas ser falsa para o resultado ser falso.

| \(P\) | \(Q\) | \(P \land Q\) |
|:---:|:---:|:---:|
| V | V | V |
| V | F | F |
| F | V | F |
| F | F | F |

Exemplo: "2 é par **e** 3 é ímpar" é **V**.

### Disjunção
É o "ou", escrito \(\lor\). \(P \lor Q\) é verdadeira quando **pelo menos uma** das proposições é verdadeira. Só dá falso quando as duas falham juntas.

| \(P\) | \(Q\) | \(P \lor Q\) |
|:---:|:---:|:---:|
| V | V | V |
| V | F | V |
| F | V | V |
| F | F | F |

Exemplo: "Terra é plana **ou** 2 é par" é **V** (basta uma ser verdadeira).

### Condicional
É o "se... então", escrito \(P \rightarrow Q\). Só é **F** quando \(p\) é verdadeiro e \(q\) é falso. Lê-se como "se \(p\), então \(q\)".

| \(P\) | \(Q\) | \(P \rightarrow Q\) |
|:---:|:---:|:---:|
| V | V | V |
| V | F | F |
| F | V | V |
| F | F | V |

Exemplo: "**Se** chove, **então** o chão molha." Se chover e o chão não molhar, a afirmação é falsa. Nos outros casos, é verdadeira.

### Bicondicional
É o "se e somente se", escrito \(P \leftrightarrow Q\). Ele é verdadeiro quando os dois lados têm o **mesmo** valor (ambos verdadeiros ou ambos falsos) e falso quando eles discordam.

| \(P\) | \(Q\) | \(P \leftrightarrow Q\) |
|:---:|:---:|:---:|
| V | V | V |
| V | F | F |
| F | V | F |
| F | F | V |

Exemplo: "Um número é par **se e somente se** é divisível por 2."

### Precedência dos conectivos
Escrever parênteses em tudo cansa, então existe uma ordem de **precedência** que diz quem "amarra mais forte" quando eles faltam. É a mesma ideia de \(2 + 3 \times 4\) valer \(14\), porque o \(\times\) age antes do \(+\). Do mais forte (1º) para o mais fraco (5º):

| Precedência | 1º | 2º | 3º | 4º | 5º |
|:---:|:---:|:---:|:---:|:---:|:---:|
| Conectivo | \(\sim\) | \(\land\) | \(\lor\) | \(\rightarrow\) | \(\leftrightarrow\) |

Na prática, é só agrupar primeiro o que liga mais forte (em azul):

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 360 226" width="360" role="img" aria-label="Exemplos de precedência: a parte que liga mais forte recebe os parênteses primeiro" font-family="Georgia, 'Times New Roman', serif" font-size="17">
  <g text-anchor="middle">
    <text x="32" y="38" fill="#2b6cb0">∼P</text>
    <text x="58" y="38" fill="#222">∨</text>
    <text x="84" y="38" fill="#222">Q</text>
    <text x="32" y="92" fill="#222">P</text>
    <text x="58" y="92" fill="#222">∨</text>
    <text x="84" y="92" fill="#2b6cb0">Q</text>
    <text x="110" y="92" fill="#2b6cb0">∧</text>
    <text x="136" y="92" fill="#2b6cb0">R</text>
    <text x="32" y="146" fill="#2b6cb0">P</text>
    <text x="58" y="146" fill="#2b6cb0">∨</text>
    <text x="84" y="146" fill="#2b6cb0">Q</text>
    <text x="110" y="146" fill="#222">→</text>
    <text x="136" y="146" fill="#222">R</text>
    <text x="32" y="200" fill="#2b6cb0">∼P</text>
    <text x="58" y="200" fill="#222">∧</text>
    <text x="84" y="200" fill="#222">Q</text>
    <text x="110" y="200" fill="#222">↔</text>
    <text x="136" y="200" fill="#222">R</text>
  </g>
  <g fill="none" stroke="#2b6cb0" stroke-width="1.3">
    <path d="M20,46 v5 H44 V46 M32,51 v4"/>
    <path d="M71,100 v5 H149 V100 M110,105 v4"/>
    <path d="M20,154 v5 H96 V154 M58,159 v4"/>
    <path d="M20,208 v5 H44 V208 M32,213 v4"/>
  </g>
  <g fill="#999" text-anchor="middle">
    <text x="180" y="38">≡</text>
    <text x="180" y="92">≡</text>
    <text x="180" y="146">≡</text>
    <text x="180" y="200">≡</text>
  </g>
  <g fill="#222" text-anchor="start">
    <text x="205" y="38">(∼P) ∨ Q</text>
    <text x="205" y="92">P ∨ (Q ∧ R)</text>
    <text x="205" y="146">(P ∨ Q) → R</text>
    <text x="205" y="200">((∼P) ∧ Q) ↔ R</text>
  </g>
</svg>
</div>

Quando o **mesmo** conectivo se repete, entra a **associatividade**, que diz por qual lado começar. A conjunção e a disjunção associam **à esquerda**; o condicional e o bicondicional, **à direita**:

$$P \land Q \land R \equiv (P \land Q) \land R$$

$$P \rightarrow Q \rightarrow R \equiv P \rightarrow (Q \rightarrow R)$$

Na dúvida, ponha os parênteses: eles nunca mudam o sentido de uma fórmula já correta, só deixam a leitura explícita.

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

### Aplicações na programação
A lógica proposicional é praticamente a base das estruturas de decisão: todo `if`, `while` ou expressão booleana está avaliando uma proposição. E os conectivos aparecem quase idênticos na maioria das linguagens:

| Lógica | Operador (Go, C, JS...) |
|:---:|:---:|
| \(\sim p\) | `!p` |
| \(p \land q\) | `p && q` |
| \(p \lor q\) | `p \|\| q` |
| \(p \rightarrow q\) | `!p \|\| q` *(equivalente)* |
| \(p \leftrightarrow q\) | `p == q` |

Há ainda um detalhe esperto. Olhe de novo as tabelas: na conjunção, **se o primeiro lado já é falso, o resultado é falso**, não importa o segundo; na disjunção, se o primeiro já é verdadeiro, o resultado é verdadeiro. As linguagens aproveitam isso e nem avaliam o segundo lado, é a [avaliação de curto-circuito]({{< ref "short-circuit-evaluation-golang.md" >}}):

```go
package main

import "fmt"

type Usuario struct {
	Ativo bool
}

func main() {
	var usuario *Usuario // nulo: nenhum usuário carregado

	// Em p && q, como o primeiro lado é falso (usuario != nil é falso),
	// o segundo nem é avaliado: NÃO estouramos ao ler usuario.Ativo.
	if usuario != nil && usuario.Ativo {
		fmt.Println("usuário ativo")
	} else {
		fmt.Println("sem usuário") // sem usuário
	}

	chovendo := true

	// Em p || q, como o primeiro lado já é verdadeiro, o segundo é
	// ignorado: precisaConsultarPrevisao() nunca chega a rodar.
	if chovendo || precisaConsultarPrevisao() {
		fmt.Println("vou levar o guarda-chuva") // vou levar o guarda-chuva
	}
}

func precisaConsultarPrevisao() bool {
	fmt.Println("consultando a previsão...") // nunca é impresso
	return false
}
```

Cada conectivo é uma regra sobre esses dois valores, a tabela-verdade é o mapa dessas regras, e o computador só consulta esse mapa por nós.

## Referências
- [Programação Dinamica - Noções de Lógica](https://matematica.pgdinamica.com/logica.html)
- [Apostila de Lógica Proposicional (Fundamentos Básicos)](https://www.facom.ufu.br/~gustavo/Logica/Apostila_LogicaProposicional.pdf)
- [Wikipedia - Tabela verdade](https://en.wikipedia.org/wiki/Truth_table)
