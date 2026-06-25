---
title: "FlightPHP: um micro-framework PHP sensato"
date: 2026-06-25T11:33:03-03:00
draft: false
description: "Por que o FlightPHP é uma boa opção de micro-framework PHP, minhas ressalvas quanto ao rumo \"IA First\" do projeto e a ideia de um fork com outra filosofia."
tags: ["php", "flightphp", "frameworks", "open-source"]
---

[FlightPHP](https://github.com/flightphp/core) é um framework bastante sensato, nada opinativo. Você pode criar APIs, monolitos fullstack, workers...

Ele é pequeno e fácil de aprender. É realmente uma boa abordagem para não ter que reinventar a roda e, ao mesmo tempo, fugir do código laravélico.

Infelizmente ele está seguindo o caminho da "IA First" ([roadmap do FlightPHP aqui](https://github.com/orgs/flightphp/projects/1?pane=issue&itemId=56268833)). Gostaria de dizer "nada contra", mas seria uma mentira cabeluda. Pessoalmente, prefiro a abordagem do [Copilot](https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/). 

E, para os entusiastas da codificação assistida e de vibe, melhor que usem os frameworks opinativos, que já existem e respondem bem a esta abordagem.

Pensando nisso, talvez eu faça um fork do FlightPHP e siga com uma nova "filosofia":

- Nada de suporte a PHP 7.4
- Nada de IA First 
    > Human in the Loop - Humano no Controle
- Sem agrupamentos de rotas
    > Não trazem vantagens significativas
- PHP-FIG First
- PHPUnit First 
    > O PestPHP é legal, mas, para um framework, precisamos de estabilidade e maturidade
- Nada de skeleton
    > O código deve ser construído para atender à necessidade do projeto e evoluir organicamente
- E mais...

E claro, suporte a [Swoole](https://www.swoole.com/) First 😎, _isso me faz sorrir_.
