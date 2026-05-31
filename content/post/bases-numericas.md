---
title: "Bases Numéricas"
date: 2026-05-31T13:38:00-03:00
draft: false
description: "Entenda o que são bases numéricas e como funcionam decimal, binário, octal e hexadecimal, com conversões entre bases pela notação posicional e divisões sucessivas."
images:
  - https://cdn.walissonaguirra.dev/og-bases-numericas.png
tags: ["Matemática Elementar para Computação"]
unlisted: true
math: true
---

Uma **base numérica** é a quantidade de símbolos diferentes que usamos para escrever números. No dia a dia usamos dez símbolos (\(0\) a \(9\)), e por isso chamamos esse sistema de **base 10** ou **decimal**. Mas nada nos obriga a usar dez. Poderíamos usar dois, oito, dezesseis símbolos, e é exatamente isso que acontece dentro de um computador.

O segredo é que todos esses sistemas compartilham a mesma ideia: a **notação posicional**. O valor de um algarismo não depende só dele, mas também da **posição** que ele ocupa. Cada casa vale uma potência da base.

Veja o número \(253\) na base 10:

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 360 140" width="360" role="img" aria-label="Decomposição posicional do número 253 na base 10" font-family="sans-serif">
  <!-- potências -->
  <text x="95"  y="22" text-anchor="middle" font-size="15" fill="#666">10²</text>
  <text x="185" y="22" text-anchor="middle" font-size="15" fill="#666">10¹</text>
  <text x="275" y="22" text-anchor="middle" font-size="15" fill="#666">10⁰</text>
  <!-- caixas -->
  <rect x="60"  y="38" width="70" height="56" fill="#f2f2f2" stroke="#333" stroke-width="1.5"/>
  <rect x="150" y="38" width="70" height="56" fill="#f2f2f2" stroke="#333" stroke-width="1.5"/>
  <rect x="240" y="38" width="70" height="56" fill="#f2f2f2" stroke="#333" stroke-width="1.5"/>
  <!-- dígitos -->
  <text x="95"  y="78" text-anchor="middle" font-size="30" font-family="monospace" fill="#111">2</text>
  <text x="185" y="78" text-anchor="middle" font-size="30" font-family="monospace" fill="#111">5</text>
  <text x="275" y="78" text-anchor="middle" font-size="30" font-family="monospace" fill="#111">3</text>
  <!-- valores -->
  <text x="95"  y="122" text-anchor="middle" font-size="15" fill="#444">= 200</text>
  <text x="185" y="122" text-anchor="middle" font-size="15" fill="#444">= 50</text>
  <text x="275" y="122" text-anchor="middle" font-size="15" fill="#444">= 3</text>
</svg>
</div>

Ou seja:

$$253_{10} = 2 \times 10^2 + 5 \times 10^1 + 3 \times 10^0 = 200 + 50 + 3$$

Essa mesma regra vale para **qualquer** base. Basta trocar o \(10\) pela base que estivermos usando. É só isso que precisamos guardar para entender o resto do post.

### Decimal
É a base \(10\), a que usamos sem perceber. Tem dez algarismos:

$$\lbrace 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 \rbrace$$

Quando chegamos no maior algarismo (\(9\)) e precisamos contar mais um, "viramos a casa": somamos \(1\) na posição à esquerda e voltamos a contagem da posição atual para \(0\). É por isso que depois do \(9\) vem o \(10\). Esse "virar a casa" acontece toda vez que estouramos a base, e é o mesmo mecanismo em binário, octal ou hexadecimal.

### Binário
É a base \(2\). Só existem dois algarismos, chamados de **bits** (de _binary digit_):

$$\lbrace 0, 1 \rbrace$$

O computador usa essa base porque ela combina perfeitamente com a eletrônica: cada bit é um interruptor que está **ligado (1)** ou **desligado (0)**. Não há meio-termo, o que torna o circuito simples e confiável.

Como só temos dois símbolos, "viramos a casa" muito rápido. Contando de zero: \(0, 1, 10, 11, 100, 101, \dots\). Cada casa vale uma potência de \(2\): \(1, 2, 4, 8, 16, 32, \dots\).

Por exemplo, o número \(10011_2\) se decompõe assim:

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 360 140" width="360" role="img" aria-label="Decomposição posicional do binário 10011" font-family="sans-serif">
  <text x="56"  y="22" text-anchor="middle" font-size="14" fill="#666">2⁴</text>
  <text x="116" y="22" text-anchor="middle" font-size="14" fill="#666">2³</text>
  <text x="176" y="22" text-anchor="middle" font-size="14" fill="#666">2²</text>
  <text x="236" y="22" text-anchor="middle" font-size="14" fill="#666">2¹</text>
  <text x="296" y="22" text-anchor="middle" font-size="14" fill="#666">2⁰</text>
  <g fill="#f2f2f2" stroke="#333" stroke-width="1.5">
    <rect x="30"  y="36" width="52" height="52"/>
    <rect x="90"  y="36" width="52" height="52"/>
    <rect x="150" y="36" width="52" height="52"/>
    <rect x="210" y="36" width="52" height="52"/>
    <rect x="270" y="36" width="52" height="52"/>
  </g>
  <g font-size="28" font-family="monospace" fill="#111" text-anchor="middle">
    <text x="56"  y="73">1</text>
    <text x="116" y="73">0</text>
    <text x="176" y="73">0</text>
    <text x="236" y="73">1</text>
    <text x="296" y="73">1</text>
  </g>
  <g font-size="14" fill="#444" text-anchor="middle">
    <text x="56"  y="112">16</text>
    <text x="116" y="112">0</text>
    <text x="176" y="112">0</text>
    <text x="236" y="112">2</text>
    <text x="296" y="112">1</text>
  </g>
</svg>
</div>

$$10011_2 = 1{\times}2^4 + 0{\times}2^3 + 0{\times}2^2 + 1{\times}2^1 + 1{\times}2^0 = 16 + 2 + 1 = 19_{10}$$

### Octal
É a base \(8\). Usa oito algarismos, de \(0\) a \(7\):

$$\lbrace 0, 1, 2, 3, 4, 5, 6, 7 \rbrace$$

Aqui não existe o algarismo \(8\) nem o \(9\): depois do \(7\) já viramos a casa e vem o \(10_8\) (que vale oito em decimal). Cada casa vale uma potência de \(8\): \(1, 8, 64, 512, \dots\).

A graça do octal é que ele se relaciona diretamente com o binário: como \(8 = 2^3\), **cada algarismo octal equivale a exatamente 3 bits**. Isso torna a conversão entre os dois quase instantânea, como veremos mais adiante.

### Hexadecimal
É a base \(16\). Como precisamos de dezesseis símbolos e só temos dez algarismos, pegamos emprestadas as letras de \(A\) a \(F\) para representar os valores de \(10\) a \(15\):

| Hex | \(A\) | \(B\) | \(C\) | \(D\) | \(E\) | \(F\) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Decimal | 10 | 11 | 12 | 13 | 14 | 15 |

Cada casa vale uma potência de \(16\): \(1, 16, 256, 4096, \dots\). E, assim como o octal, ele tem uma ligação direta com o binário: \(16 = 2^4\), então **cada algarismo hexadecimal equivale a exatamente 4 bits**.

É por isso que o hexadecimal aparece tanto em computação: cores em CSS (`#FF8800`), endereços de memória, códigos de bytes. Ele é uma forma compacta de escrever binário: dois algarismos hex representam um byte inteiro (\(8\) bits).

### Conversão de outra base para decimal
Esse é o caminho mais fácil, e a receita é sempre a mesma: **decompor pela notação posicional**. Multiplicamos cada algarismo pelo peso da sua casa (uma potência da base) e somamos tudo.

**Binário \(\to\) decimal.** Pesos são potências de \(2\):

$$10011_2 = 1{\times}2^4 + 0{\times}2^3 + 0{\times}2^2 + 1{\times}2^1 + 1{\times}2^0 = 19_{10}$$

**Octal \(\to\) decimal.** Pesos são potências de \(8\):

$$137_8 = 1{\times}8^2 + 3{\times}8^1 + 7{\times}8^0 = 64 + 24 + 7 = 95_{10}$$

**Hexadecimal \(\to\) decimal.** Pesos são potências de \(16\) (lembrando que \(F = 15\) e \(A = 10\)):

$$1FA_{16} = 1{\times}16^2 + 15{\times}16^1 + 10{\times}16^0 = 256 + 240 + 10 = 506_{10}$$

### Conversão de decimal para outra base
Aqui o caminho é o inverso: usamos **divisões sucessivas** pela base. Dividimos o número pela base, anotamos o resto, e repetimos com o quociente até chegar a zero. No fim, lemos os restos **de baixo para cima**.

Vamos converter \(19_{10}\) para binário, dividindo sempre por \(2\):

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 380 230" width="380" role="img" aria-label="Divisões sucessivas de 19 por 2" font-family="monospace">
  <defs>
    <marker id="seta" markerWidth="8" markerHeight="8" refX="4" refY="2" orient="auto">
      <path d="M0,0 L4,4 L8,0" fill="none" stroke="#333" stroke-width="1.5"/>
    </marker>
  </defs>
  <g font-size="17" fill="#111" text-anchor="end">
    <text x="250" y="42">19 ÷ 2 = 9 &#160;&#160;resto</text>
    <text x="250" y="74"> 9 ÷ 2 = 4 &#160;&#160;resto</text>
    <text x="250" y="106"> 4 ÷ 2 = 2 &#160;&#160;resto</text>
    <text x="250" y="138"> 2 ÷ 2 = 1 &#160;&#160;resto</text>
    <text x="250" y="170"> 1 ÷ 2 = 0 &#160;&#160;resto</text>
  </g>
  <g font-size="18" font-weight="bold" fill="#111" text-anchor="middle">
    <text x="282" y="42">1</text>
    <text x="282" y="74">1</text>
    <text x="282" y="106">0</text>
    <text x="282" y="138">0</text>
    <text x="282" y="170">1</text>
  </g>
  <!-- seta de leitura, de baixo para cima -->
  <line x1="320" y1="176" x2="320" y2="32" stroke="#333" stroke-width="1.5" marker-end="url(#seta)"/>
  <text x="340" y="108" font-size="12" fill="#666" font-family="sans-serif" transform="rotate(90 340 108)" text-anchor="middle">ler de baixo para cima</text>
  <line x1="40" y1="195" x2="340" y2="195" stroke="#ccc" stroke-width="1"/>
  <text x="190" y="220" font-size="16" fill="#111" text-anchor="middle" font-family="sans-serif">19₁₀ = 10011₂</text>
</svg>
</div>

O mesmo método funciona para qualquer base, só mudando o divisor.

**Decimal \(\to\) octal** (divide por \(8\)):

$$95 \div 8 = 11 \text{ resto } 7 \quad\to\quad 11 \div 8 = 1 \text{ resto } 3 \quad\to\quad 1 \div 8 = 0 \text{ resto } 1$$

Lendo os restos de baixo para cima: \(95_{10} = 137_8\).

**Decimal \(\to\) hexadecimal** (divide por \(16\), trocando restos \(\geq 10\) pela letra correspondente):

$$506 \div 16 = 31 \text{ resto } 10\,(A) \quad\to\quad 31 \div 16 = 1 \text{ resto } 15\,(F) \quad\to\quad 1 \div 16 = 0 \text{ resto } 1$$

Lendo de baixo para cima: \(506_{10} = 1FA_{16}\).

### O atalho entre binário, octal e hexadecimal
Converter passando pelo decimal funciona, mas é trabalhoso. Felizmente, como \(8 = 2^3\) e \(16 = 2^4\), dá para ir direto: basta **agrupar os bits**. Da direita para a esquerda, juntamos os bits em grupos de **3** (para octal) ou de **4** (para hexadecimal) e traduzimos cada grupo.

Veja o binário \(11111101_2\):

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 420 210" width="420" role="img" aria-label="Agrupamento de bits para octal e hexadecimal" font-family="monospace">
  <!-- bits centrais -->
  <text x="210" y="105" text-anchor="middle" font-size="26" letter-spacing="6" fill="#111">11111101</text>
  <!-- HEX: grupos de 4 (acima) -->
  <text x="210" y="24" text-anchor="middle" font-size="13" fill="#666" font-family="sans-serif">grupos de 4 bits → hexadecimal</text>
  <rect x="120" y="78" width="84" height="38" fill="none" stroke="#333" stroke-width="1.5"/>
  <rect x="216" y="78" width="84" height="38" fill="none" stroke="#333" stroke-width="1.5"/>
  <text x="162" y="58" text-anchor="middle" font-size="18" fill="#111">F</text>
  <text x="258" y="58" text-anchor="middle" font-size="18" fill="#111">D</text>
  <line x1="162" y1="64" x2="162" y2="76" stroke="#999" stroke-width="1"/>
  <line x1="258" y1="64" x2="258" y2="76" stroke="#999" stroke-width="1"/>
  <!-- OCTAL: grupos de 3 (abaixo) -->
  <text x="210" y="200" text-anchor="middle" font-size="13" fill="#666" font-family="sans-serif">grupos de 3 bits → octal</text>
  <rect x="120" y="86" width="40"  height="38" fill="none" stroke="#888" stroke-width="1.5" stroke-dasharray="4 3"/>
  <rect x="168" y="86" width="60"  height="38" fill="none" stroke="#888" stroke-width="1.5" stroke-dasharray="4 3"/>
  <rect x="236" y="86" width="60"  height="38" fill="none" stroke="#888" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="140" y="158" text-anchor="middle" font-size="18" fill="#444">3</text>
  <text x="198" y="158" text-anchor="middle" font-size="18" fill="#444">7</text>
  <text x="266" y="158" text-anchor="middle" font-size="18" fill="#444">5</text>
  <line x1="140" y1="126" x2="140" y2="146" stroke="#999" stroke-width="1"/>
  <line x1="198" y1="126" x2="198" y2="146" stroke="#999" stroke-width="1"/>
  <line x1="266" y1="126" x2="266" y2="146" stroke="#999" stroke-width="1"/>
</svg>
</div>

Para o hexadecimal, agrupamos de quatro em quatro: \(1111\,1101 \to F\,D\), logo \(11111101_2 = FD_{16}\).

Para o octal, agrupamos de três em três (completando com zeros à esquerda se faltar bit): \(011\,111\,101 \to 3\,7\,5\), logo \(11111101_2 = 375_8\).

E todos representam o mesmo número: \(11111101_2 = 375_8 = FD_{16} = 253_{10}\). É o mesmo valor escrito em quatro "idiomas" diferentes.

### Na prática, com código
A maioria das linguagens já entende essas bases nativamente. Em Go, por exemplo, usamos prefixos para escrever literais em cada base:

```go
package main

import (
	"fmt"
	"strconv"
)

func main() {
	// o mesmo número, escrito em quatro bases
	binario := 0b11111101 // 0b → binário
	octal := 0o375        // 0o → octal
	hex := 0xFD           // 0x → hexadecimal
	decimal := 253

	fmt.Println(binario == decimal) // true
	fmt.Println(octal == decimal)   // true
	fmt.Println(hex == decimal)     // true

	// convertendo de decimal para outra base (vira texto)
	fmt.Println(strconv.FormatInt(253, 2))  // "11111101"
	fmt.Println(strconv.FormatInt(253, 8))  // "375"
	fmt.Println(strconv.FormatInt(253, 16)) // "fd"

	// convertendo de outra base para decimal (lê texto)
	n, _ := strconv.ParseInt("FD", 16, 64)
	fmt.Println(n) // 253
}
```

No fundo é tudo a mesma notação posicional que vimos lá no começo; o computador só faz as divisões e somas por nós.

## Referências
- [Programação Dinâmica - Bases Numéricas](https://matematica.pgdinamica.com/)
- [UNICAMP - Sistemas de Numeração](https://www.ic.unicamp.br/~rodolfo/Cursos/FPGA/SistemasDeNumeracao/)
- [IFSC - Conversão de Bases (PDF)](https://docente.ifsc.edu.br/alex.forghieri/MaterialDidatico/Arquitetura%20de%20computadores/Material%20das%20aulas/08%20-%2017-06-2016/Convers%C3%A3o%20de%20Bases.pdf)
- [WoMakersCode - Bases Numéricas: Binário](https://dev.to/womakerscode/bases-numericas-binario-31de)
- [WoMakersCode - Bases Numéricas: Octal](https://dev.to/womakerscode/bases-numericas-octal-28h9)
- [WoMakersCode - Bases Numéricas: Hexadecimal](https://dev.to/womakerscode/bases-numericas-hexadecimal-3ldn)
