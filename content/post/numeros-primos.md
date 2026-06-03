---
title: "Números Primos"
date: 2026-06-02T21:14:53-03:00
draft: false
description: "Entenda o que são números primos e por que eles são os tijolos de todos os números: como identificar um primo, fatorar um número, usar o crivo de Eratóstenes, o teorema fundamental da aritmética e a ligação com a criptografia."
images:
  - https://cdn.walissonaguirra.dev/og-numeros-primos.png
tags: ["Matemática Elementar para Computação"]
unlisted: true
math: true
---

Um **número primo** é um número natural maior que \(1\) que só pode ser dividido, sem deixar resto, por \(1\) e por ele mesmo. O \(7\) é primo: ninguém além de \(1\) e \(7\) o divide certinho. Já o \(6\) não é, porque além de \(1\) e \(6\) ele também aceita \(2\) e \(3\).

O segredo é que os primos são os **tijolos** com que todos os outros números são construídos. Pense neles como peças de montar que não dá para quebrar: qualquer número natural maior que \(1\) ou já é primo, ou pode ser escrito como uma multiplicação de primos. É só isso que precisamos guardar para entender o resto do post.

Veja o número \(12\). Podemos quebrá-lo em \(2 \times 6\); e o \(6\) ainda quebra em \(2 \times 3\). Aí paramos, porque \(2\) e \(3\) são primos e não dá para quebrar mais:

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 320 210" width="320" role="img" aria-label="Árvore de fatoração do número 12 em 2 vezes 2 vezes 3" font-family="sans-serif">
  <!-- ligações -->
  <line x1="160" y1="48" x2="98"  y2="84"  stroke="#999" stroke-width="1.5"/>
  <line x1="160" y1="48" x2="222" y2="84"  stroke="#999" stroke-width="1.5"/>
  <line x1="222" y1="116" x2="183" y2="153" stroke="#999" stroke-width="1.5"/>
  <line x1="228" y1="116" x2="267" y2="153" stroke="#999" stroke-width="1.5"/>
  <!-- compostos (claros) -->
  <circle cx="160" cy="30"  r="20" fill="#f2f2f2" stroke="#333" stroke-width="1.5"/>
  <circle cx="225" cy="100" r="20" fill="#f2f2f2" stroke="#333" stroke-width="1.5"/>
  <!-- primos (folhas, destacados) -->
  <circle cx="95"  cy="100" r="20" fill="#333"/>
  <circle cx="180" cy="170" r="20" fill="#333"/>
  <circle cx="270" cy="170" r="20" fill="#333"/>
  <g font-size="18" font-family="monospace" text-anchor="middle">
    <text x="160" y="37"  fill="#111">12</text>
    <text x="225" y="107" fill="#111">6</text>
    <text x="95"  y="107" fill="#fff">2</text>
    <text x="180" y="177" fill="#fff">2</text>
    <text x="270" y="177" fill="#fff">3</text>
  </g>
</svg>
</div>

Ou seja:

$$12 = 2 \times 2 \times 3 = 2^2 \times 3$$

Essa mesma ideia vale para **qualquer** número. E não importa por onde você comece a quebrar: chega-se sempre no mesmo conjunto de primos no fim. Esse resultado tem nome — o **Teorema Fundamental da Aritmética** — e é ele que garante que todo número tem uma, e só uma, "fatoração" em primos. Outra surpresa: os primos nunca acabam. Existem infinitos deles, um fato que Euclides já provava há mais de dois mil anos.

### Números primos
São os números com exatamente **dois divisores**: o \(1\) e eles mesmos. Para saber se um número é primo, basta olhar a lista dos seus divisores. O \(17\), por exemplo:

$$D(17) = \lbrace 1, 17 \rbrace$$

Só dois divisores, então \(17\) é primo. Não há por onde quebrá-lo.

### Números compostos
São os que têm **mais de dois divisores**. O \(27\) é um deles:

$$D(27) = \lbrace 1, 3, 9, 27 \rbrace$$

Quatro divisores, então \(27\) não é primo: é **composto**. E todo composto pode ser desmontado em primos — no caso, \(27 = 3 \times 3 \times 3\).

### O número 1
O \(1\) é um caso à parte: ele tem um **único** divisor, ele mesmo. Como primo exige exatamente dois divisores e composto exige mais de dois, o \(1\) não é nem primo nem composto. É justamente por isso que a definição começa em "maior que \(1\)".

### O número 2
O \(2\) é o **único primo par**. A razão é simples: qualquer outro número par é divisível por \(2\), então ganha esse divisor a mais e vira composto na hora. Não há outro primo par, e nunca haverá.

### Como saber se um número é primo
Esse é o caminho mais direto: testamos se algum número o divide além de \(1\) e dele mesmo. A "sacada" é que não precisamos testar todos os candidatos até \(n\) — basta ir até a **raiz quadrada** de \(n\). Se \(n = a \times b\), o menor dos dois fatores nunca passa de \(\sqrt{n}\); então, se nada até ali divide o número, ele é primo.

Para o \(97\), por exemplo, \(\sqrt{97} \approx 9{,}8\). Testamos só os primos \(2, 3, 5, 7\): nenhum divide o \(97\). Logo, \(97\) é primo, e nem precisamos chegar perto de \(97\) para ter certeza.

### Fatorar um número
Aqui o objetivo é o inverso: dado um número, descobrir de quais primos ele é feito. A receita é sempre a mesma: **divida pelo menor primo que couber, repita com o resultado, e pare ao chegar a \(1\)**. Vamos fatorar o \(84\):

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 260 210" width="260" role="img" aria-label="Fatoração de 84 por divisões sucessivas: 84 por 2, 42 por 2, 21 por 3, 7 por 7" font-family="monospace">
  <line x1="130" y1="18" x2="130" y2="180" stroke="#333" stroke-width="1.5"/>
  <g font-size="20" fill="#111" text-anchor="end">
    <text x="115" y="42">84</text>
    <text x="115" y="74">42</text>
    <text x="115" y="106">21</text>
    <text x="115" y="138">7</text>
    <text x="115" y="170">1</text>
  </g>
  <g font-size="20" fill="#111" text-anchor="start" font-weight="bold">
    <text x="148" y="42">2</text>
    <text x="148" y="74">2</text>
    <text x="148" y="106">3</text>
    <text x="148" y="138">7</text>
  </g>
</svg>
</div>

Lendo a coluna da direita, os primos que apareceram foram \(2, 2, 3\) e \(7\). Juntando:

$$84 = 2 \times 2 \times 3 \times 7 = 2^2 \times 3 \times 7$$

### O crivo de Eratóstenes
Testar número por número funciona, mas é trabalhoso quando queremos **todos** os primos de um intervalo. O crivo de Eratóstenes é o atalho para isso. A ideia é eliminar quem sabidamente não é primo, em vez de testar um por um.

Listamos os números, guardamos o \(2\) e riscamos todos os seus múltiplos. O próximo número que sobrou é o \(3\), primo: riscamos os múltiplos dele. Depois o \(5\), depois o \(7\). Quando o próximo primo passa de \(\sqrt{50}\), podemos parar — o que sobrou já é tudo primo. Veja o resultado de \(1\) a \(50\), com os primos em destaque:

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 380 200" width="380" role="img" aria-label="Crivo de Eratóstenes de 1 a 50, com os números primos destacados" font-family="monospace">
  <!-- grade -->
  <g stroke="#ddd" stroke-width="1">
    <line x1="20"  y1="18" x2="20"  y2="188"/><line x1="54"  y1="18" x2="54"  y2="188"/>
    <line x1="88"  y1="18" x2="88"  y2="188"/><line x1="122" y1="18" x2="122" y2="188"/>
    <line x1="156" y1="18" x2="156" y2="188"/><line x1="190" y1="18" x2="190" y2="188"/>
    <line x1="224" y1="18" x2="224" y2="188"/><line x1="258" y1="18" x2="258" y2="188"/>
    <line x1="292" y1="18" x2="292" y2="188"/><line x1="326" y1="18" x2="326" y2="188"/>
    <line x1="360" y1="18" x2="360" y2="188"/>
    <line x1="20" y1="18"  x2="360" y2="18"/><line x1="20" y1="52"  x2="360" y2="52"/>
    <line x1="20" y1="86"  x2="360" y2="86"/><line x1="20" y1="120" x2="360" y2="120"/>
    <line x1="20" y1="154" x2="360" y2="154"/><line x1="20" y1="188" x2="360" y2="188"/>
  </g>
  <!-- células dos primos -->
  <g fill="#333">
    <rect x="55"  y="19"  width="32" height="32"/><rect x="89"  y="19"  width="32" height="32"/>
    <rect x="157" y="19"  width="32" height="32"/><rect x="225" y="19"  width="32" height="32"/>
    <rect x="21"  y="53"  width="32" height="32"/><rect x="89"  y="53"  width="32" height="32"/>
    <rect x="225" y="53"  width="32" height="32"/><rect x="293" y="53"  width="32" height="32"/>
    <rect x="89"  y="87"  width="32" height="32"/><rect x="293" y="87"  width="32" height="32"/>
    <rect x="21"  y="121" width="32" height="32"/><rect x="225" y="121" width="32" height="32"/>
    <rect x="21"  y="155" width="32" height="32"/><rect x="89"  y="155" width="32" height="32"/>
    <rect x="225" y="155" width="32" height="32"/>
  </g>
  <!-- números primos (brancos) -->
  <g font-size="15" font-weight="bold" fill="#fff" text-anchor="middle">
    <text x="71"  y="40">2</text><text x="105" y="40">3</text><text x="173" y="40">5</text><text x="241" y="40">7</text>
    <text x="37"  y="74">11</text><text x="105" y="74">13</text><text x="241" y="74">17</text><text x="309" y="74">19</text>
    <text x="105" y="108">23</text><text x="309" y="108">29</text>
    <text x="37"  y="142">31</text><text x="241" y="142">37</text>
    <text x="37"  y="176">41</text><text x="105" y="176">43</text><text x="241" y="176">47</text>
  </g>
  <!-- demais números (apagados) -->
  <g font-size="15" fill="#bbb" text-anchor="middle">
    <text x="37"  y="40">1</text><text x="139" y="40">4</text><text x="207" y="40">6</text><text x="275" y="40">8</text><text x="309" y="40">9</text><text x="343" y="40">10</text>
    <text x="71"  y="74">12</text><text x="139" y="74">14</text><text x="173" y="74">15</text><text x="207" y="74">16</text><text x="275" y="74">18</text><text x="343" y="74">20</text>
    <text x="37"  y="108">21</text><text x="71" y="108">22</text><text x="139" y="108">24</text><text x="173" y="108">25</text><text x="207" y="108">26</text><text x="241" y="108">27</text><text x="275" y="108">28</text><text x="343" y="108">30</text>
    <text x="71"  y="142">32</text><text x="105" y="142">33</text><text x="139" y="142">34</text><text x="173" y="142">35</text><text x="207" y="142">36</text><text x="275" y="142">38</text><text x="309" y="142">39</text><text x="343" y="142">40</text>
    <text x="71"  y="176">42</text><text x="139" y="176">44</text><text x="173" y="176">45</text><text x="207" y="176">46</text><text x="275" y="176">48</text><text x="309" y="176">49</text><text x="343" y="176">50</text>
  </g>
</svg>
</div>

O que sobra são os primos até \(50\): \(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47\).

### Na prática, com código
Tanto o teste de primo quanto a fatoração viram poucas linhas. Em Go, repare que os dois usam o mesmo limite \(d \times d \leq n\) (que é o mesmo que ir só até \(\sqrt{n}\)):

```go
package main

import "fmt"

// ehPrimo testa se n é primo, indo só até a raiz de n.
func ehPrimo(n int) bool {
	if n < 2 {
		return false // 1 e tudo abaixo não é primo
	}
	for d := 2; d*d <= n; d++ {
		if n%d == 0 {
			return false // achou um divisor além de 1 e n
		}
	}
	return true
}

// fatorar devolve os primos que, multiplicados, formam n.
func fatorar(n int) []int {
	var primos []int
	for d := 2; d*d <= n; d++ {
		for n%d == 0 {
			primos = append(primos, d) // divide pelo menor primo que couber
			n /= d
		}
	}
	if n > 1 {
		primos = append(primos, n) // sobrou um primo grande
	}
	return primos
}

func main() {
	fmt.Println(ehPrimo(17)) // true
	fmt.Println(ehPrimo(27)) // false

	fmt.Println(fatorar(84)) // [2 2 3 7]

	// fácil de montar, difícil de desmontar:
	p, q := 61, 67
	fmt.Println(p * q) // 4087 — multiplicar é instantâneo
	// mas, dado só o 4087, achar 61 e 67 de volta exige fatorar.
}
```

No fundo, é tudo a mesma ideia dos tijolos do começo. Montar um número multiplicando primos é fácil; desmontá-lo de volta nos seus primos, quando ele é grande, é tão difícil que nem os computadores dão conta em tempo hábil. É exatamente nessa diferença que a criptografia que protege suas senhas e mensagens se apoia.

## Referências
- [Brasil Escola - Números primos](https://brasilescola.uol.com.br/matematica/numeros-primos.htm)
- [IME USP - Primos e Teorema Fundamental da Aritmética](https://www.ime.usp.br/~iusenko/ensino_2021_1/MAT0120/aulas/Aula9.pdf)
