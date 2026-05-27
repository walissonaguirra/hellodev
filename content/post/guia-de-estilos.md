---
title: "Guia de Estilos"
date: 2026-04-09T23:52:05-03:00
draft: true
description: "Referência visual com todos os elementos suportados pelo tema: tipografia, listas, código, blockquotes e mais."
tags: ["meta", "estilo"]
---

Este post demonstra todos os elementos visuais disponíveis no tema.

## Parágrafos e texto inline

Este é um parágrafo normal com **negrito**, *itálico*, e texto `inline code` no meio da frase. Também é possível usar [links](https://exemplo.com) e combinar **negrito com *itálico***.

## Headings

### Este é um h3

O h1 é reservado para o título do post. O h2 para seções e h3 para subseções.

## Listas

Lista não ordenada:

- Primeiro item
- Segundo item
  - Sub-item
  - Outro sub-item
- Terceiro item

Lista ordenada:

1. Primeiro passo
2. Segundo passo
3. Terceiro passo

## Citações

> Simplicidade é a sofisticação suprema.
> — Leonardo da Vinci

## Blocos de código

Código Go:

```go
package main

import "fmt"

func main() {
    msgs := []string{"olá", "mundo"}
    for _, msg := range msgs {
        fmt.Println(msg)
    }
}
```

## Tabelas

| Linguagem | Tipo         | Ano  |
|-----------|--------------|------|
| Go        | Compilada    | 2009 |
| PHP       | Interpretada | 1995 |
| Rust      | Compilada    | 2010 |
| Python    | Interpretada | 1991 |

## Linha horizontal

Conteúdo antes da linha.

---

Conteúdo depois da linha.
