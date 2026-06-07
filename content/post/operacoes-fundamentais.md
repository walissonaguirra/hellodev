---
title: "Operações Fundamentais"
date: 2026-05-30T11:20:00-03:00
draft: false
description: "As quatro operações básicas dos números naturais — adição, subtração, multiplicação e divisão — e ideias derivadas como potenciação, múltiplos e divisores."
tags: ["Matemática Elementar para Computação"]
unlisted: true
math: true
---

O conjunto dos números naturais é:

$$\mathbb{N} = \lbrace 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, \dots \rbrace$$

A partir dele definimos as quatro operações básicas e algumas ideias derivadas como sucessor, antecessor, múltiplos e divisores.

### Adição
Somar é juntar quantidades. Na reta numérica, é avançar para a direita: \(3 + 4\) parte do \(3\) e dá quatro passos até o \(7\).

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 400 115" width="400" role="img" aria-label="Reta numérica mostrando 3 mais 4 igual a 7, com quatro passos de tamanho um" font-family="sans-serif">
  <defs>
    <marker id="ponta" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#333" stroke-width="1.3"/></marker>
  </defs>
  <line x1="30" y1="80" x2="390" y2="80" stroke="#333" stroke-width="1.5"/>
  <g stroke="#333" stroke-width="1.5">
    <line x1="40" y1="74" x2="40" y2="86"/>
    <line x1="80" y1="74" x2="80" y2="86"/>
    <line x1="120" y1="74" x2="120" y2="86"/>
    <line x1="160" y1="74" x2="160" y2="86"/>
    <line x1="200" y1="74" x2="200" y2="86"/>
    <line x1="240" y1="74" x2="240" y2="86"/>
    <line x1="280" y1="74" x2="280" y2="86"/>
    <line x1="320" y1="74" x2="320" y2="86"/>
    <line x1="360" y1="74" x2="360" y2="86"/>
  </g>
  <g font-size="14" fill="#444" text-anchor="middle" font-family="monospace">
    <text x="40" y="104">0</text>
    <text x="80" y="104">1</text>
    <text x="120" y="104">2</text>
    <text x="160" y="104">3</text>
    <text x="200" y="104">4</text>
    <text x="240" y="104">5</text>
    <text x="280" y="104">6</text>
    <text x="320" y="104">7</text>
    <text x="360" y="104">8</text>
  </g>
  <g fill="none" stroke="#2b6cb0" stroke-width="1.5" marker-end="url(#ponta)">
    <path d="M160,74 Q180,44 198,74"/>
    <path d="M200,74 Q220,44 238,74"/>
    <path d="M240,74 Q260,44 278,74"/>
    <path d="M280,74 Q300,44 318,74"/>
  </g>
  <g font-size="13" fill="#2b6cb0" text-anchor="middle">
    <text x="179" y="40">+1</text>
    <text x="219" y="40">+1</text>
    <text x="259" y="40">+1</text>
    <text x="299" y="40">+1</text>
  </g>
</svg>
</div>

A adição em \(\mathbb{N}\) tem quatro propriedades importantes:

1. **Comutatividade** — A ordem não altera o resultado.
2. **Associatividade** — O agrupamento não altera o resultado.
3. **Fechamento** — somar dois naturais sempre resulta num natural.
4. **Elemento neutro** — Na adição é \(0\) pois não altera o resultado.

```go
// comutatividade
1 + 2 == 2 + 1 // true

// associatividade
2 + (3 + 1) == (1 + 2) + 3 // true

// 0 é o elemento neutro
7 + 0 == 7 // true
```

### Subtração
Diferente da adição, a subtração **não é comutativa** e nem sempre fica dentro de \(\mathbb{N}\). Na reta numérica, subtrair é andar para a esquerda; se o caminho passa do \(0\), o resultado cai fora dos naturais, como em \(3 - 7\):

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 420 130" width="420" role="img" aria-label="Reta numérica mostrando 3 menos 7 igual a menos 4, abaixo de zero e fora dos naturais" font-family="sans-serif">
  <defs>
    <marker id="setaesq" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#c0392b" stroke-width="1.3"/></marker>
  </defs>
  <rect x="18" y="64" width="132" height="32" fill="#f2f2f2"/>
  <text x="84" y="120" text-anchor="middle" font-size="12" fill="#aaa">fora de ℕ</text>
  <line x1="20" y1="80" x2="400" y2="80" stroke="#333" stroke-width="1.5"/>
  <g stroke="#333" stroke-width="1.5">
    <line x1="30" y1="75" x2="30" y2="85"/>
    <line x1="60" y1="75" x2="60" y2="85"/>
    <line x1="90" y1="75" x2="90" y2="85"/>
    <line x1="120" y1="75" x2="120" y2="85"/>
    <line x1="150" y1="75" x2="150" y2="85"/>
    <line x1="180" y1="75" x2="180" y2="85"/>
    <line x1="210" y1="75" x2="210" y2="85"/>
    <line x1="240" y1="75" x2="240" y2="85"/>
    <line x1="270" y1="75" x2="270" y2="85"/>
    <line x1="300" y1="75" x2="300" y2="85"/>
    <line x1="330" y1="75" x2="330" y2="85"/>
    <line x1="360" y1="75" x2="360" y2="85"/>
    <line x1="390" y1="75" x2="390" y2="85"/>
  </g>
  <g font-size="12" text-anchor="middle" font-family="monospace">
    <text x="30" y="102" fill="#bbb">-4</text>
    <text x="60" y="102" fill="#bbb">-3</text>
    <text x="90" y="102" fill="#bbb">-2</text>
    <text x="120" y="102" fill="#bbb">-1</text>
    <text x="150" y="102" fill="#444">0</text>
    <text x="180" y="102" fill="#444">1</text>
    <text x="210" y="102" fill="#444">2</text>
    <text x="240" y="102" fill="#444">3</text>
    <text x="270" y="102" fill="#444">4</text>
    <text x="300" y="102" fill="#444">5</text>
    <text x="330" y="102" fill="#444">6</text>
    <text x="360" y="102" fill="#444">7</text>
    <text x="390" y="102" fill="#444">8</text>
  </g>
  <path d="M240,74 Q135,18 30,74" fill="none" stroke="#c0392b" stroke-width="1.5" marker-end="url(#setaesq)"/>
  <text x="135" y="22" text-anchor="middle" font-size="13" fill="#c0392b">− 7</text>
  <circle cx="240" cy="80" r="5" fill="#2b6cb0"/>
  <circle cx="30" cy="80" r="5" fill="#c0392b"/>
</svg>
</div>

Em código:

```go
8 - 0 // 8
7 - 3 // 4

// não é comutativa
3 - 7 // -4 — sai do conjunto dos naturais
```

Ou seja, a subtração não tem fechamento em \(\mathbb{N}\).

### Multiplicação
Multiplicar é somar a mesma parcela várias vezes. Pensando num retângulo de \(3\) por \(4\), são \(12\) pontos, e contar por linhas (\(3 \times 4\)) ou por colunas (\(4 \times 3\)) dá o mesmo total:

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 300 175" width="300" role="img" aria-label="Retângulo de 3 linhas por 4 colunas, totalizando 12 pontos" font-family="sans-serif">
  <text x="160" y="22" text-anchor="middle" font-size="13" fill="#666">4 colunas</text>
  <text x="22" y="95" text-anchor="middle" font-size="13" fill="#666" transform="rotate(-90 22 95)">3 linhas</text>
  <g fill="#333">
    <circle cx="80" cy="45" r="9"/>
    <circle cx="130" cy="45" r="9"/>
    <circle cx="180" cy="45" r="9"/>
    <circle cx="230" cy="45" r="9"/>
    <circle cx="80" cy="90" r="9"/>
    <circle cx="130" cy="90" r="9"/>
    <circle cx="180" cy="90" r="9"/>
    <circle cx="230" cy="90" r="9"/>
    <circle cx="80" cy="135" r="9"/>
    <circle cx="130" cy="135" r="9"/>
    <circle cx="180" cy="135" r="9"/>
    <circle cx="230" cy="135" r="9"/>
  </g>
  <text x="160" y="168" text-anchor="middle" font-size="15" fill="#111">3 × 4 = 12</text>
</svg>
</div>

Vale para a multiplicação as mesmas quatro propriedades da adição, com uma diferença: o elemento neutro é o \(1\).

A multiplicação tem ainda uma propriedade extra que liga ela à adição: a **distributividade**. Multiplicar um número por uma soma dá o mesmo resultado de multiplicar pelas duas parcelas separadas e somar depois: \(a \times (b + c) = a \times b + a \times c\).

```go
// comutatividade
7 * 8 == 8 * 7 // true

// associatividade
(7 * 8) * 9 == 8 * (7 * 9) // true

// elemento neutro
1 * 5 == 5 // true

// distributividade
2 * (3 + 4) == 2*3 + 2*4 // true
```

### Divisão
A divisão envolve quatro elementos:

- **dividendo** — O número que está sendo dividido
- **divisor** — Por quem se divide
- **quociente** — O resultado inteiro da divisão
- **resto** — O que sobra

Em \(8 \div 2\), temos dividendo \(8\), divisor \(2\), quociente \(4\) e resto \(0\). Como o resto é zero, dizemos que \(2\) **divide** \(8\), ou que \(8\) **é divisível** por \(2\).

Já em \(9 \div 2\), o quociente é \(4\) e o resto é \(1\): formam-se \(4\) grupos de \(2\) e sobra \(1\).

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 340 140" width="340" role="img" aria-label="Nove pontos repartidos em quatro grupos de dois, sobrando um como resto" font-family="sans-serif">
  <text x="150" y="20" text-anchor="middle" font-size="13" fill="#666">4 grupos de 2</text>
  <g fill="none" stroke="#333" stroke-width="1.3">
    <rect x="18" y="35" width="58" height="50" rx="6"/>
    <rect x="86" y="35" width="58" height="50" rx="6"/>
    <rect x="154" y="35" width="58" height="50" rx="6"/>
    <rect x="222" y="35" width="58" height="50" rx="6"/>
  </g>
  <g fill="#333">
    <circle cx="35" cy="60" r="8"/>
    <circle cx="59" cy="60" r="8"/>
    <circle cx="103" cy="60" r="8"/>
    <circle cx="127" cy="60" r="8"/>
    <circle cx="171" cy="60" r="8"/>
    <circle cx="195" cy="60" r="8"/>
    <circle cx="239" cy="60" r="8"/>
    <circle cx="263" cy="60" r="8"/>
  </g>
  <circle cx="312" cy="60" r="8" fill="#c0392b"/>
  <text x="312" y="100" text-anchor="middle" font-size="12" fill="#c0392b">resto 1</text>
  <text x="170" y="128" text-anchor="middle" font-size="15" fill="#111">9 ÷ 2 = 4 (resto 1)</text>
</svg>
</div>

```go
8 / 2 // 4 — quociente
9 / 2 // 4 — quociente, resto 1
9 % 2 // 1 — resto da divisão com o operador %
```

### Potenciação
A potenciação é uma multiplicação repetida. Em \(a^n\), \(a\) é a **base** e \(n\) é o **expoente**, e o resultado é \(a\) multiplicado por ele mesmo \(n\) vezes:

$$a^n = \underbrace{a \times a \times \cdots \times a}_{n \text{ vezes}}$$

Por exemplo, \(2^3\) multiplica o \(2\) três vezes:

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 320 120" width="320" role="img" aria-label="Dois ao cubo igual a dois vezes dois vezes dois, três fatores, igual a oito" font-family="sans-serif">
  <g font-size="20" fill="#333" text-anchor="middle">
    <text x="40" y="55">2</text>
    <text x="78" y="55">×</text>
    <text x="116" y="55">2</text>
    <text x="154" y="55">×</text>
    <text x="192" y="55">2</text>
    <text x="240" y="55">=</text>
    <text x="282" y="55">8</text>
  </g>
  <path d="M28,68 V76 H204 V68 M116,76 V84" fill="none" stroke="#2b6cb0" stroke-width="1.3"/>
  <text x="116" y="102" text-anchor="middle" font-size="13" fill="#2b6cb0">3 fatores (expoente)</text>
</svg>
</div>

Dois casos especiais: \(a^1 = a\) e \(a^0 = 1\) (qualquer número elevado a zero é \(1\)).

### Antecessor
O antecessor de \(n\) é \(n - 1\). Mas o \(0\) não tem antecessor em \(\mathbb{N}\).

### Múltiplos
Os múltiplos de um número \(n\) são todos os naturais da forma \(n \times \text{algumacoisa}\) ou, os números divisíveis por \(n\).

Por exemplo, \(8\) é múltiplo de \(2\) porque \(8 = 2 \times 4\).

### Divisores
O divisor de um número natural \(n\) é um número que **divide** \(n\), ou seja, \(n\) é divisível por ele. Por exemplo, os divisores de \(12\) são \(1, 2, 3, 4, 6\) e \(12\), porque cada um deles divide \(12\) sem deixar resto.

### Na prática, com código
Toda linguagem traz essas operações prontas. Em Go, a divisão inteira e o resto vêm separados:

```go
package main

import "fmt"

func main() {
	// as três operações diretas
	fmt.Println(3 + 4) // 7  (soma)
	fmt.Println(7 - 4) // 3  (diferença)
	fmt.Println(3 * 4) // 12 (produto)

	// divisão inteira (quociente) e resto vêm em par
	fmt.Println(13 / 4) // 3  (quociente)
	fmt.Println(13 % 4) // 1  (resto)

	// dividendo = divisor × quociente + resto
	fmt.Println(4*3 + 1) // 13

	// potenciação é só repetir a multiplicação
	potencia := 1
	for i := 0; i < 3; i++ {
		potencia *= 2 // 2 × 2 × 2
	}
	fmt.Println(potencia) // 8

	// 4 é divisor de 12? resto zero significa que sim
	fmt.Println(12%4 == 0) // true
}
```

### Resumo
Cada operação direta repete a anterior, e cada uma tem uma inversa que a desfaz:

| Camada | Operação direta | É repetir... | Inversa |
|:---:|:---|:---|:---|
| 1 | Adição | a contagem | Subtração |
| 2 | Multiplicação | a adição | Divisão |
| 3 | Potenciação | a multiplicação | Radiciação |

## Referências
- [Programação Dinâmica - Aritmética com Números Naturais](https://matematica.pgdinamica.com/conjuntos_e_operacoes_basicas/001operacoesfundamentais.html)
- [Universidade Estadual de Londrina - Introdução aos números naturais](https://www.uel.br/projetos/matessencial/basico/fundamental/naturais1.html)

