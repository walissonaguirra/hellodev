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

Um **número primo** é um número natural maior que \(1\) que só pode ser dividido, sem deixar resto, por \(1\) e por ele mesmo. O \(7\) é primo: ninguém além de \(1\) e \(7\) o divide sem deixa resto. Já o \(6\) não é, porque além de \(1\) e \(6\) ele também aceita \(2\) e \(3\).

- Com o \(6\) dá para montar um retângulo \(2 \times 3\)
- Com \(7\), não há retângulo possível além da fila \(1 \times 7\).

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 380 165" width="380" role="img" aria-label="Seis fichas formam um retângulo 2 por 3, composto; sete fichas só formam uma fila 1 por 7, primo" font-family="sans-serif">
  <line x1="190" y1="20" x2="190" y2="150" stroke="#ddd" stroke-width="1"/>
  <g fill="#333">
    <circle cx="55" cy="50" r="9"/>
    <circle cx="90" cy="50" r="9"/>
    <circle cx="125" cy="50" r="9"/>
    <circle cx="55" cy="85" r="9"/>
    <circle cx="90" cy="85" r="9"/>
    <circle cx="125" cy="85" r="9"/>
  </g>
  <text x="90" y="125" text-anchor="middle" font-size="15" fill="#111">6 = 2 × 3</text>
  <text x="90" y="145" text-anchor="middle" font-size="13" fill="#666">composto</text>
  <g fill="#2b6cb0">
    <circle cx="215" cy="67" r="9"/>
    <circle cx="239" cy="67" r="9"/>
    <circle cx="263" cy="67" r="9"/>
    <circle cx="287" cy="67" r="9"/>
    <circle cx="311" cy="67" r="9"/>
    <circle cx="335" cy="67" r="9"/>
    <circle cx="359" cy="67" r="9"/>
  </g>
  <text x="287" y="125" text-anchor="middle" font-size="15" fill="#111">7 = 1 × 7</text>
  <text x="287" y="145" text-anchor="middle" font-size="13" fill="#2b6cb0">primo</text>
</svg>
</div>

Qualquer número natural maior que \(1\) ou já é primo, ou pode ser escrito como uma multiplicação de primos. 

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

Não importa por onde você comece a quebrar: chega-se sempre no mesmo conjunto de primos no fim. Esse resultado tem nome, o **Teorema Fundamental da Aritmética**, e é ele que garante que todo número tem uma, e só uma, "fatoração" em primos. 

### Números primos
São os números com exatamente **dois divisores**: o \(1\) e eles mesmos. Para saber se um número é primo, basta olhar a lista dos seus divisores. O \(17\), por exemplo:

$$D(17) = \lbrace 1, 17 \rbrace$$

Só dois divisores, então \(17\) é primo. Não há por onde quebrá-lo.

### Números compostos
São os que têm **mais de dois divisores**. O \(27\) é um deles:

$$D(27) = \lbrace 1, 3, 9, 27 \rbrace$$

Quatro divisores, então \(27\) não é primo: é **composto**. E todo composto pode ser desmontado em primos: no caso, \(27 = 3 \times 3 \times 3\).

### O número 1
O \(1\) é um caso à parte: ele tem um **único** divisor, ele mesmo. Como primo exige exatamente dois divisores e composto exige mais de dois, o \(1\) não é nem primo nem composto. É justamente por isso que a definição começa em "maior que \(1\)".

### O número 2
O \(2\) é o **único primo par**. A razão é simples: qualquer outro número par é divisível por \(2\), então ganha esse divisor a mais e vira composto. Não há outro primo par.

Para fazer a classificação conte os divisores.

| Número | Divisores | Quantos | É |
|:---:|:---|:---:|:---|
| \(1\) | \(\lbrace 1 \rbrace\) | 1 | nem primo nem composto |
| \(2\) | \(\lbrace 1, 2 \rbrace\) | 2 | primo (o único par) |
| \(17\) | \(\lbrace 1, 17 \rbrace\) | 2 | primo |
| \(27\) | \(\lbrace 1, 3, 9, 27 \rbrace\) | 4 | composto |

### Como saber se um número é primo
Testamos se algum número o divide além de \(1\) e dele mesmo. Não é preciso testar todos os candidatos até \(n\): basta ir até a **raiz quadrada** de \(n\). Se \(n = a \times b\), o menor dos dois fatores nunca passa de \(\sqrt{n}\); então, se nada até ali divide o número, ele é primo.

Para o \(97\), por exemplo, \(\sqrt{97} \approx 9{,}8\). Testamos só os primos \(2, 3, 5, 7\): nenhum divide o \(97\). Logo, \(97\) é primo, e nem precisamos chegar perto de \(97\) para ter certeza.

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 400 120" width="400" role="img" aria-label="Para testar se 97 é primo basta checar divisores até a raiz de 97, cerca de 9,8, uma fração pequena do intervalo" font-family="sans-serif">
  <rect x="37" y="52" width="29" height="16" fill="#cfe3f5"/>
  <line x1="30" y1="60" x2="385" y2="60" stroke="#333" stroke-width="1.5"/>
  <line x1="66" y1="44" x2="66" y2="76" stroke="#2b6cb0" stroke-width="1.5"/>
  <g font-size="12" fill="#444" text-anchor="middle" font-family="monospace">
    <text x="37" y="90">2</text>
    <text x="385" y="90">97</text>
  </g>
  <text x="66" y="36" text-anchor="middle" font-size="12" fill="#2b6cb0">√97 ≈ 9,8</text>
  <text x="51" y="108" text-anchor="middle" font-size="12" fill="#2b6cb0">testar 2, 3, 5, 7</text>
  <text x="235" y="108" text-anchor="middle" font-size="12" fill="#999">não precisa testar o resto</text>
</svg>
</div>

Dá para aplicar essa ideia sem calcular a raiz: basta ir dividindo pelos primos em ordem e olhar o quociente.

O número é primo se as divisões sucessivas por números primos resultarem resto diferente de zero até o divisor ser maior ou igual ao quociente.

Voltando ao \(97\), dividimos pelos primos em ordem e olhamos o resto:

| Divisor | Quociente | Resto | |
|:---:|:---:|:---:|:---|
| \(2\) | \(48\) | \(1\) | |
| \(3\) | \(32\) | \(1\) | |
| \(5\) | \(19\) | \(2\) | |
| \(7\) | \(13\) | \(6\) | |
| \(11\) | \(8\) | n/a | divisor \(>\) quociente: **paramos** |

Como nenhum resto deu zero, \(97\) é primo. O divisor alcançar o quociente é o mesmo que ultrapassar \(\sqrt{n}\), só que sem precisar tirar a raiz.

### Fatorar um número
Aqui o objetivo é o inverso: dado um número, descobrir de quais primos ele é feito. São três passos:

1. Divida pelo **menor primo que couber**.
2. Repita com o resultado.
3. Pare ao chegar a no \(1\).

Vamos fatorar o \(84\):

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
Testar número por número funciona, mas é trabalhoso quando queremos **todos** os primos de um intervalo. O crivo de Eratóstenes é o atalho para isso: em vez de testar um por um, ele **elimina quem sabidamente não é primo**. O passo a passo:

1. Liste os números, guarde o \(2\) e risque todos os seus múltiplos.
2. O próximo que sobrou é o \(3\): risque os múltiplos dele.
3. Repita com o \(5\), depois o \(7\)...
4. Pare quando o próximo primo passar da \(\sqrt{50}\): o que sobrou já é tudo primo.

Veja o resultado de \(1\) a \(50\), com os primos em destaque:

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
	fmt.Println(p * q) // 4087, multiplicar é instantâneo
	// mas, dado só o 4087, achar 61 e 67 de volta exige fatorar.
}
```

Montar um número multiplicando primos é fácil; desmontá-lo de volta nos seus primos, quando ele é grande, é tão difícil que nem os computadores dão conta em tempo hábil. É exatamente nessa diferença que a criptografia que protege senhas e mensagens se apoia.

## Referências
- [Brasil Escola - Números primos](https://brasilescola.uol.com.br/matematica/numeros-primos.htm)
- [IME USP - Primos e Teorema Fundamental da Aritmética](https://www.ime.usp.br/~iusenko/ensino_2021_1/MAT0120/aulas/Aula9.pdf)
- [Matemática Básica - Aula 7 - Números primos (YouTube)](https://youtu.be/qYww45PyTEs)
