---
title: "Aprenda Go Progresso (Open Source)"
date: 2026-04-13T03:50:16-03:00
draft: false
description: "Apresentação do projeto AprendaGo Progresso, um pequeno projeto open source construido para facilitar o estudo de Go Lang"
tags: ["golang", "open-source", "aprendizado"]
---

Há algum tempo, quando decidi aprender Go Lang, encontrei o curso Aprenda Go no YouTube. Sem dúvida, o melhor curso de Go em português.

E foi para este curso que criei o **AprendaGo Progresso**.


![Demo da aplicação aprendago progresso](https://cdn.walissonaguirra.dev/rec_apregago_progresso.webp "Demo da aplicação AprendaGo Progresso - KDE Spectacle")

Acesse a aplicação em: [https://walissonaguirra.github.io/aprendago-progresso/](https://walissonaguirra.github.io/aprendago-progresso/)

Esta aplicação é um wrapper feito para organizar e registrar o progresso no curso AprendaGo. Um projeto Open Source, você pode ver o código fonte disponivel no [aqui](https://codeberg.org/walissonaguirra/aprendago-progresso).

---

A aplicação é simples, criada com JavaScript vanilla e TailwindCSS. Tudo que ela faz é organizar os capítulos e aulas do curso de forma estruturada.

Todo registro de progresso é salvo no localStorage do navegador, e o conteúdo original do curso é carregado usando um embed do YouTube. Vou entrar nos detalhes técnicos mais abaixo.

## Origem do projeto

Enquanto participava do Grupo de Estudo Go do Cesar, começamos a falar sobre a criação de GUI para apps desktop e das dificuldades de disponibilizar e manter uma GUI para múltiplas plataformas: Windows, Mac e Linux.

Nosso colega [Freyre](https://github.com/FreyreCorona) estava desenvolvendo um app [SideCar](https://plus.diolinux.com.br/t/alternativa-nao-official-para-interagir-com-a-minitela-do-positivo-vision-r15m/81075) usando WebViews nativas do OS para criar facilmente uma GUI portável.

A ideia de usar WebView me pareceu fascinante e, 9h de hiperfoco depois, surgiu o [Go Track Youtube](https://github.com/walissonaguirra/gotrack-youtube). O nome é ruim, eu sei 🤦🏽. Foi um ótimo aprendizado para mim; os detalhes do desenvolvimento você encontra no [#README](https://github.com/walissonaguirra/gotrack-youtube#README).

Para minha surpresa, algumas pessoas começaram a demonstrar interesse no projeto; recebi algumas mensagens sobre bugs e erros de instalação.

Conversando no grupo, surgiu a ideia de transformar este projeto em um PWA, removendo tudo que não era necessário.

E é aqui que estamos: o Go Track Youtube foi recriado e republicado como AprendaGo Progresso.

## Qual é a finalidade?

A princípio, deixo este projeto disponível para novos membros do grupo de estudo Go, para ajudar devs que estão migrando de outras linguagens (como eu) e iniciantes.

Uma aplicação simples, para facilitar os estudos através do curso da AprendaGo criado pela Ellen Korbes, e também um projeto open source aberto para aqueles que estiverem ansiosos por ter seu primeiro pull request mergeado.

## Overview técnico

Desta seção em diante, vou entrar um pouco mais nos detalhes da estrutura funcional do código do projeto e explicar o porquê de algumas decisões técnicas. Se seu interesse era apenas conhecer o projeto, pode parar aqui 👍🏽.

### Arquitetura

A aplicação foi construída usando apenas JavaScript vanilla dividida em módulos ES6+, TailwindCSS e um empacotador para gerar o bundle final.

Os módulos são:

- `app.js` - controlador da aplicação, com toda regra de negócio, tratativa de eventos do DOM e funções de render.
- `chapters.js` - dados estáticos do curso (módulos, capítulos, aulas, youtube id).
- `store.js` - uma API para centraliza a interação com o localStorage do browser.
- `welcome.js` - o handler para o modal de boas-vindas exibido no primeiro acesso.

A estrutura básica dos módulos da aplicação é esta:

```sh
tree -L 2 .
.
├── index.html        # página inicial
├── js                # modules
│   ├── app.js        # entry point principal
│   ├── chapters.js   # lógica dos capítulos
│   ├── store.js      # gerenciamento de estado (localStorage)
│   └── welcome.js    # tela de boas-vindas
└── style.css         # Tailwind CSS + estilos personalizados
```

Estes são os arquivos fonte usados no desenvolvimento da aplicação. Porém, para garantir maior compatibilidade entre navegadores, todos os arquivos `.js` são mesclados em um único bundle em um arquivo `app.js` final.

Para esse processo de geração do bundle, escolhi usar o **Rollup** com alguns plugins adicionais para fazer a minificação de todos os arquivos da aplicação: JavaScript, Tailwind + CSS e HTML.

![Fluxo de build do Rollup](https://cdn.walissonaguirra.dev/rollup_build_flow.svg "Building Rollup e plugins de minificação - Inkscape")

O Rollup começa carregando o entrypoint `js/app.js`, que importa os outros módulos (`chapters.js`, `store.js`, `welcome.js`), resolve toda a árvore de dependências e gera os arquivos finais, prontos para deploy, na pasta `dist/*`.


Toda a aplicação é executada no **client-side**, o progresso no curso é salvo no localStorage do browser e as aulas são carregadas como embeds do YouTube incorporados dinamicamente à página.

A configuração completa do Rollup está detalhada no `rollup.config.js`.


### Comunicação entre funções

Todos os dados sobre progresso no curso e aulas por capítulo/módulo vêm de duas fontes:

1. A função `getCompletions()` do `store.js` retorna o que foi marcado como concluído e esta salvo no localStorage
2. A estrutura do curso em capítulos/módulos é exportada da `chapters.js` (imutável, dados do curso)

A função `computeProgress()` é responsável por cruzar essas duas fontes e calcula para cada capítulo so valores de `done`, `total`, `pct` e `unlocked`. Esses valores são adicionados/atualizados direto nos objetos que tem os dados de capítulos/módulos do curso.

É neste ponto que a UI da aplicação é renderizada, fazendo listagem das aulas e carregando o progresso atual.

Quando uma aula é clicada, isso dispara o evento para atualizar a UI. Este é o fluxo:

![Fluxo de funções ao clicar em uma aula](https://cdn.walissonaguirra.dev/fluxo_funcoes.svg "Fluxo de funções ao clicar em uma aula - Inkscape")

Repare que a UI não é toda re-renderizada. O handleLesson chama `toggle()` no store.js e, em seguida, atualiza apenas os pontos que mudaram: o card da aula, a barra do capítulo e o sidebar.

Outra parte interessante é o uso da estrategia de [Event Delegation](https://www.geeksforgeeks.org/javascript/event-delegation-in-javascript/). Com isso, em vez de cada aula ter seu próprio listener, existe apenas UM listener no container `#main` e outro no `#sidebar-nav`. Quando o evento de clique sobe pelo DOM, o handler olha para `event.target.closest('[data-toggle]')` (ou `[data-watch]`, `[data-chapter]`) e decide o que fazer:

![Event delegation no DOM](https://cdn.walissonaguirra.dev/event-delegation.svg "Resolução do Event Delegation - Inkscape")

Isso significa que, renderizando 300 aulas ou 3, o custo em listeners é o mesmo. E, como o HTML é atualizado usando o `innerHTML`, não preciso me preocupar em re-anexar handlers depois de cada update.

A primeira implementação que fiz não estava assim, por isso achei importante destacar o uso de Event Delegation aqui. Fica a dica 😉.

### Por que algumas coisas são como são?

Talvez você tenha interesse em saber por que escolhi usar algumas ferramentas "não convencionais" neste app. Vou tentar responder isso abaixo.


**Vanilla JS**

A ideia é manter a aplicação simples, fácil de dar manutenção e de entender. Além disso, adicionar 100kb+ em código de framework JS é simplesmente desnecessário para este caso.

**pnpm**

O pnpm é uma ótima alternativa para o npm: é mais rápido, mais simples e tem uma API quase 100% compatível com a do npm.

É adequado para o contexto deste projeto e pode despertar o interesse de devs iniciantes em saber mais sobre.

**Rollup**

Talvez usar Rollup não seja a primeira opção que vem à cabeça quando pensamos em construir um app client-side. Afinal, temos o Vite.js usado pelo Vue.js e React.js, mas... você sabia que o Vite é construído sobre o Rollup?

Então... entender o porque uma ferramenta foi criada é de grande ajuda para saber quando **não** usá-la. Para o contexto desta aplicação, usar o Rollup é a escolha que traz menos "ruído" e mantém a simplicidade.

**TailwindCSS**

Como a origem dessa aplicação vem do _Go Track Youtube_ que usa o TailwindCSS, decidi manter assim para pode fazer o reaproveitamento do layout que já tinha sido desenvolvido, apenas com pequenas atualizações de cores e a11y.

Além disso, usar uma lib que traz padronização para cores, espaçamentos, fontes... mas com a filosofia utilitário-first, é bem útil se você é um dev backend que não quer perder muito tempo na UI/UX.

## Nota

Enquanto escrevo este post, a aplicação _Aprenda Go Progresso_ está na versão v0.1.0. Isso significa que, com o tempo e a evolução do app, este post ficará desatualizado, mas tenha em mente que a ideia aqui é apresentar as origens do app e explicar algumas fundamentações.

De qualquer forma, se você leu até aqui, obg 🫰🏽.
