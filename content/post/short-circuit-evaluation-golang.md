---
title: "Short Circuit Evaluation em Golang"
date: 2026-04-19T21:00:00-03:00
draft: false
description: "Como o Go interrompe a avaliação de expressões booleanas assim que o resultado é definido."
tags: ["Golang"]
---

Hoje, enquanto pesquisava referências sobre noções de lógica, acabei me deparando com um termo que ainda não conhecia: *Short Circuit Evaluation*.

Ele descreve um comportamento simples: em uma expressão booleana composta, a linguagem para de avaliar assim que o resultado já está determinado.

Ok, vou exemplificar melhor.

Abaixo tem um exemplo pratico onde cada expressão avaliada printa um indentificador na tela antes de retornar seu valor, assim vamos poder acompanhar o que está acontecendo.

```go
package main

import "fmt"

func main() {
    for i := 0; i < 10; i++ {
        if testFunc(1) || testFunc(2) {
            //
        }
    }
}

func testFunc(i int) bool {
    fmt.Printf("function %d called\n", i)
    return true
}
```

...o que sempre resultará em:

```
function 1 called
function 1 called
function 1 called
function 1 called
function 1 called
function 1 called
function 1 called
function 1 called
function 1 called
function 1 called
```

O operador lógico `||` (OU), só precisa que um dos lados seja verdadeiro para definir o resultado. Como `testFunc(1)` já retorna `true`, o Go consegui determina o resultado final e pula á avaliação do `testFunc(2)`, esse comportamento é o "Short Circuit" na prática.

&emsp;&emsp;*exemplificar* gente.. como eu tô falando bonito hoje 😎.

Um exemplo do mundo real agora:

```go
if user != nil && user.IsAdmin() {
    // user.IsAdmin() só é chamado se user != nil,
}
```

Se Go não fizer o Short Circuit, `user.IsAdmin()` seria executada mesmo com `user == nil` e o programa quebraria durante o run-time.

Interessante, né? É um comportamento intuitivo para quem já programa, mas agora sabemos o termo correto para isso. Short Circuit Evaluation.

ps:
Em Visual Basic antigo o Short Circuit não acontecia. por exemplo, em `If a And b Then` ambos, `a` e `b`, serão avaliados.

ps2: Em Java existe diferença entre operadores lógicos:
> && // short-circuit <br/>
> || // short-circuit <br/>
> &  // avalia ambos (boolean também) <br/>
> |  // avalia ambos

**Finish!**

## Referências
- [Short-circuit evaluation (Wikipedia)](https://en.wikipedia.org/wiki/Short-circuit_evaluation)
- [Stackoverflow](https://stackoverflow.com/questions/53722288/short-circuit-evaluation-in-go)
