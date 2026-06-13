---
title: "O HyperText Transfer Protocol (HTTP/1.1)"
date: 2026-06-13T07:18:30-03:00
draft: false
description: "O funcionamento interno do HTTP/1.1: a anatomia da URL, requisições, respostas, métodos, cabeçalhos e status codes e exemplos práticos usando curl."
images:
  - https://cdn.walissonaguirra.dev/og-o-hypertext-transfer-protocol-http-1-1.png
tags: ["http", "curl"]
---

> HTTP é um protocolo de comunicação utilizado para sistemas de informação de hipermídia, distribuídos e colaborativos. Ele é a base para a comunicação de dados da World Wide Web. — Wikipedia

Neste post vamos nos aprofundar nos detalhes de como esse protocolo funciona internamente. Boa leitura 😉.

### A URL

Para compreender as explicações a seguir, primeiro é importante definirmos o significado de alguns termos. Vamos começar pela anatomia de uma URL.

<div style="text-align:center; margin:1.5rem 0;">
<svg viewBox="0 0 945 205" width="945" style="max-width:100%;height:auto;" role="img" aria-label="Anatomia de uma URL: protocolo (scheme), subdomínio, domínio, host, porta, caminho do recurso, query string, nome e valor de parâmetro" font-family="sans-serif">
  <text x="15" y="120" font-family="monospace" font-size="21" fill="#333" textLength="915" lengthAdjust="spacing" xml:space="preserve">https://api.example.com:80/path/to/resource?p1=value&amp;p2=value</text>
  <g fill="none" stroke="#e8392f" stroke-width="1.6">
    <path d="M15 100 C15 80, 52.5 100, 52.5 80 C52.5 100, 90 80, 90 100"/>
    <path d="M135 100 C135 80, 157.5 100, 157.5 80 C157.5 100, 180 80, 180 100"/>
    <path d="M195 100 C195 80, 277.5 100, 277.5 80 C277.5 100, 360 80, 360 100"/>
    <path d="M360 100 C360 80, 382.5 100, 382.5 80 C382.5 100, 405 80, 405 100"/>
    <path d="M405 100 C405 80, 532.5 100, 532.5 80 C532.5 100, 660 80, 660 100"/>
    <path d="M675 100 C675 80, 802.5 100, 802.5 80 C802.5 100, 930 80, 930 100"/>
  </g>
  <g fill="none" stroke="#e8392f" stroke-width="1.6">
    <path d="M135 134 C135 154, 247.5 134, 247.5 154 C247.5 134, 360 154, 360 134"/>
    <path d="M810 134 C810 154, 825 134, 825 154 C825 134, 840 154, 840 134"/>
    <path d="M855 134 C855 154, 892.5 134, 892.5 154 C892.5 134, 930 154, 930 134"/>
  </g>
  <g fill="#e8392f" font-size="14" text-anchor="middle">
    <text x="52.5" y="46">protocol</text>
    <text x="52.5" y="64">(scheme)</text>
    <text x="157.5" y="46">sub-</text>
    <text x="157.5" y="64">domain</text>
    <text x="277.5" y="64">domain</text>
    <text x="382.5" y="64">port</text>
    <text x="532.5" y="46">resource</text>
    <text x="532.5" y="64">path</text>
    <text x="802.5" y="46">query</text>
    <text x="802.5" y="64">string</text>
  </g>
  <g fill="#e8392f" font-size="14" text-anchor="middle">
    <text x="247.5" y="178">host</text>
    <text x="825" y="178">param</text>
    <text x="825" y="196">name</text>
    <text x="892.5" y="178">param</text>
    <text x="892.5" y="196">value</text>
  </g>
</svg>
</div>

### Protocol (scheme)

A primeira parte da URL define o protocolo que será usado, o `scheme`. Aqui o `https` referencia a combinação do HTTP com o Transport Layer Security (TLS). Ao usar TLS, todas as requisições e respostas são criptografadas à medida que trafegam pela rede, o que torna a comunicação segura para transmitir informações sensíveis.

&emsp;&emsp; _Eventualmente vou escrever um post sobre como funciona essa criptografia._

### Sub-domain, Domain, Host

A próxima parte é o host. Ele identifica qual servidor na rede receberá a requisição. O host pode ser um nome de domínio, como `example.com`, ou um subdomínio, como `api.example.com`.

Para estabelecer uma conexão de rede, o cliente precisa traduzir o nome do host em um endereço IP numérico. Ele faz isso usando o Sistema de Nomes de Domínio (DNS).

&emsp;&emsp; _Também pretendo escrever um post sobre DNS._

O DNS funciona como a lista de contatos da agenda do celular: cada nome tem um número de telefone vinculado. Só que, neste caso, o *nome == domínio* e o que está vinculado a ele é um endereço de IP.

Se você estiver em um ambiente UNIX, pode usar o binário `host` para ver os IPs vinculados a qualquer domínio.

```sh
host walissonaguirra.dev
```
Saída:
```sh
walissonaguirra.dev has address 172.67.154.25
walissonaguirra.dev has address 104.21.32.189
walissonaguirra.dev has IPv6 address 2606:4700:3034::6815:20bd
walissonaguirra.dev has IPv6 address 2606:4700:3032::ac43:9a19
walissonaguirra.dev has HTTP service bindings 1 . alpn="h3,h2" ipv4hint=104.21.32.189,172.67.154.25 ech=AEX+DQBBFQAgACDY7exRa8fz5piqLCOysr9ASMgRLwDp2E0Ba53VK9xJIQAEAAEAAQASY2xvdWRmbGFyZS1lY2guY29tAAA= ipv6hint=2606:4700:3032::ac43:9a19,2606:4700:3034::6815:20bd

```
Um mesmo domínio pode resolver para vários IPs diferentes. Este blog está configurado na Cloudflare, e ela resolve o domínio para o endereço de IP mais próximo de quem fez a requisição, reduzindo assim o tempo de resposta.

### Port

O host e o endereço de IP associado permitem encontrar e conectar ao servidor na internet, mas um mesmo servidor pode oferecer vários serviços, cada um em uma porta diferente.

Por convenção, os servidores web escutam na porta `80` para requisições HTTP não criptografadas e na porta `443` para requisições HTTPS criptografadas.

Se a porta não for especificada, uma dessas duas será usada por padrão, de acordo com o protocolo.

### Origin

Neste ponto do texto já temos contexto suficiente para entender o que é a origin de uma requisição HTTP. A origin é definida pela combinação de scheme, host e port.

Exemplo: `https://api.example.com:80`, `https://example.com:80`.

As origins são usadas pelo navegador/cliente para impor algumas regras de segurança, por exemplo:

- Os dados gravados no `localStorage` só podem ser lidos por código JavaScript que tenha vindo da mesma origin.
- Cookies são enviados automaticamente nas requisições para a mesma origin de onde vieram, mas nunca para outras origens.
- E assim por diante.

### Resource Path

Depois da porta vem o path. Ele não precisa se parecer com o caminho de um arquivo, mas essa sintaxe é útil para modelar qualquer conjunto de recursos organizados hierarquicamente.

A ideia é que podemos usar o path para manipular qualquer coisa por meio de requisições HTTP.

### Query String, Parameters e Values

A última parte é a query string. Com ela é possível enviar parâmetros para o recurso solicitado (resource path). Normalmente esses parâmetros são usados para personalizar a resposta, aplicando filtros, ordenação, limites e outros.

Os parâmetros são enviados em pares do tipo chave/valor, por exemplo: `?q=http&limit=50`.

A query string só entende ASCII. Para enviar acentos, espaços ou caracteres especiais é preciso fazer o percent-encoding: substitua cada caractere não-ASCII por `%` seguido do seu código hexadecimal (geralmente em UTF-8).

```md
Pesquisa: "O HyperText Transfer Protocol (HTTP/1.1)"
URL original: /?q=O HyperText Transfer Protocol (HTTP/1.1)
URL codificada: /?q=O%20HyperText%20Transfer%20Protocol%20(HTTP%2F1.1)
```

### HTTP Requests

Vamos entender como o protocolo funciona e como ele usa a URL. Abaixo está a anatomia de uma requisição HTTP.

<div style="text-align:left; margin:1.5rem 0;">
<svg viewBox="0 0 480 250" width="400" style="max-width:100%;height:auto;" role="img" aria-label="Estrutura de um HTTP request: método, caminho, versão do protocolo, bloco de cabeçalhos e linha em branco" font-family="sans-serif">
  <g font-family="monospace" font-size="21" fill="#333" xml:space="preserve">
    <text x="20" y="105" textLength="322" lengthAdjust="spacing">GET /some/path HTTP/1.1</text>
    <text x="20" y="140">Host: api.example.com</text>
    <text x="20" y="170">Origin: example.com</text>
    <text x="20" y="200">...more headers...</text>
  </g>
  <g fill="none" stroke="#e8392f" stroke-width="1.6">
    <path d="M20 86 C20 66, 41 86, 41 66 C41 86, 62 66, 62 86"/>
    <path d="M76 86 C76 66, 146 86, 146 66 C146 86, 216 66, 216 86"/>
    <path d="M230 86 C230 66, 279 86, 279 66 C279 86, 342 66, 342 86"/>
  </g>
  <g fill="none" stroke="#e8392f" stroke-width="1.6">
    <path d="M360 125 C380 125, 360 167, 380 167 C360 167, 380 210, 360 210"/>
    <path d="M360 218 C375 218, 360 229, 375 229 C360 229, 375 240, 360 240"/>
  </g>
  <g fill="#e8392f" font-size="14" text-anchor="middle">
    <text x="41" y="56">method</text>
    <text x="146" y="56">path</text>
    <text x="279" y="40">protocol</text>
    <text x="279" y="56">version</text>
  </g>
  <g fill="#e8392f" font-size="14">
    <text x="390" y="172">headers</text>
    <text x="390" y="233">blank line</text>
  </g>
</svg>
</div>

> Daqui para frente vamos falar do HTTP na versão 1.1, pois nele a comunicação é feita apenas com texto simples, e isso facilita o entendimento de como as coisas funcionam. 

A primeira linha é chamada de "linha de requisição" nela temos o _method_, o _resource path_ e a _versão do protocolo_ HTTP que queremos usar.

### Methods e Resources

A ideia central do HTTP é que os clientes invocam métodos, compostos por verbos HTTP, sobre o recurso que está sendo solicitado.

Existem vários métodos/verbos definidos no padrão. Abaixo estão os mais comuns:

|método|significado|
|:---:|:---:|
|GET|Retorna o estado atual do recurso.|
|HEAD|Igual ao GET, mas retorna apenas os headers, sem o corpo da resposta.|
|POST|Cria um novo recurso, geralmente subordinado ao recurso atual.|
|PUT|SAtualiza completamente o estado atual do recurso.|
|PATCH|Atualiza parcialmente o estado atual do recurso.|
|DELETE|Exclui o recurso.|
|OPTIONS|Lista os métodos que o cliente tem permissão para usar nesse recurso.|

Os servidor tambem podem suportar outros métodos, incluindo métodos personalizados que eles mesmos definem. 

### Versão do Protocolo

A linha de requisição termina com a versão do protocolo que o cliente deseja utilizar. Isso permite que os clientes solicitem uma versão específica e que servidores e clientes comecem a oferecer suporte a versões mais recentes, mantendo a possibilidade de recorrer a uma versão anterior caso a outra parte ainda não suporte a nova.

Por exemplo, um cliente pode solicitar `HTTP/2.0`, mas o servidor pode responder dizendo que só suporta `HTTP/1.1`. O cliente pode então fazer o downgrade e usar a versão 1.1 para o restante da conversa.

### Headers

Em seguida vêm os headers, que são parâmetros chave/valor com metadados adicionais sobre a requisição. O cabeçalho `Host` é obrigatório em todas as requisições e deve conter o nome do host com o qual o cliente acredita estar se comunicando.

Isso permite que um único servidor hospede vários sites diferentes simultaneamente: ele usa o cabeçalho `Host` para determinar qual site o cliente está solicitando.

A especificação HTTP define vários cabeçalhos padrão. Os que você usará com mais frequência ao fazer requisições são os seguintes:

|Header|significado|
|:---:|:---:|
|Authorization|Algum tipo de token que identifica uma sessão autenticada ou uma conta de usuário. O servidor define o que aceita nesse cabeçalho.|
|Content-Length|Se você estiver enviando conteúdo para o servidor, indica quantos bytes está enviando, Isso informa ao servidor quantos dados esperar, para que ele saiba quando terminou de ler a requisição.|
|Content-Type|Se você estiver enviando conteúdo, indica o tipo MIME desses dados (por exemplo, JSON, XML, HTML ou algum formato de mídia).|
|Cookie|Um valor fornecido pelo servidor no cabeçalho de resposta `Set-Cookie` em uma requisição anterior. |

### HTTP Responses

Após fazer a requisição, o servidor responderá com uma mensagem semelhante a esta:

<div style="text-align:left; margin:1.5rem 0;">
<svg viewBox="0 0 730 320" width="580" style="max-width:100%;height:auto;" role="img" aria-label="Estrutura de um HTTP response: versão do protocolo, status code, status message, bloco de cabeçalhos, linha em branco e corpo da resposta" font-family="sans-serif">
  <g font-family="monospace" font-size="21" fill="#333" xml:space="preserve">
    <text x="20" y="110" textLength="210" lengthAdjust="spacing">HTTP/1.1 200 OK</text>
    <text x="20" y="145">Date: Sat, 25 Mar 2017 18:10:57 GMT</text>
    <text x="20" y="175">Expires: -1</text>
    <text x="20" y="205">Content-Type: text/html; charset=ISO-8859-1</text>
    <text x="20" y="235">Content-Length: nnn (number of bytes)</text>
    <text x="20" y="295" fill="#777">...response body, encoded according to Content-Type...</text>
  </g>
  <g fill="none" stroke="#e8392f" stroke-width="1.6">
    <path d="M20 92 C20 72, 76 92, 76 72 C76 92, 132 72, 132 92"/>
    <path d="M146 92 C146 72, 167 92, 167 72 C167 92, 188 72, 188 92"/>
    <path d="M202 92 C202 72, 209 92, 209 72 C209 92, 230 72, 230 92"/>
  </g>
  <g fill="none" stroke="#e8392f" stroke-width="1.6">
    <path d="M580 130 C600 130, 580 187, 600 187 C580 187, 600 245, 580 245"/>
    <path d="M580 253 C595 253, 580 265, 595 265 C580 265, 595 277, 580 277"/>
  </g>
  <g fill="#e8392f" font-size="13" text-anchor="middle">
    <text x="76" y="44">protocol</text>
    <text x="76" y="60">version</text>
    <text x="167" y="44">status</text>
    <text x="167" y="60">code</text>
    <text x="209" y="44">status</text>
    <text x="209" y="60">msg</text>
  </g>
  <g fill="#e8392f" font-size="14">
    <text x="610" y="192">headers</text>
    <text x="610" y="269">blank line</text>
  </g>
</svg>
</div>

A primeira linha informa ao cliente qual versão do protocolo o servidor está usando, além do código de status e da mensagem de status da resposta.

### Status Codes

O status code informa ao cliente se a requisição foi bem-sucedida ou não. Existem vários códigos definidos no padrão HTTP, mas todos se enquadram nas seguintes faixas:

|Range|significado|
|:---:|:---:|
|100-199|Informativo: a requisição foi recebida e o processo continua.|
|200-299|Sucesso: a requisição foi recebida, entendida e aceita.|
|300-399|Redirecionamento: solicite a URL indicada no cabeçalho `Location`.|
|400-499|Erro do cliente: a requisição foi mal formada ou não pôde ser atendida.|
|500-599|Erro do servidor: algo deu errado do lado do servidor.|

A mensagem que segue o código de status é, em grande parte, redundante, mas é útil nos casos em que um serviço define códigos não padronizados, como os do agora famoso HyperText Coffee Pot Control Protocol (veja o significado do [status code 418](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/418)).

### Response Headers

Assim como as requisições, as respostas HTTP também contêm um ou mais cabeçalhos. Eles podem fornecer metadados adicionais sobre a resposta. Os mais comumente usados são os seguintes:

|Header|significado|
|:---:|:---:|
|Content-Type|O tipo MIME usado para os dados no corpo da resposta. Por exemplo, `application/json; charset=utf-8` significa que o corpo contém dados em JSON codificados com UTF-8.|
|Content-Length|O número de bytes que o servidor está enviando no corpo da resposta.|
|Expires e Cache-Control|Especificam se e por quanto tempo o cliente pode armazenar a resposta em cache.|
|Last-Modified|A data/hora em que o recurso foi modificado pela última vez (pode ser usada no cabeçalho `If-Modified-Since` em requisições futuras, caso o servidor permita o cache da resposta).|
|Location|Em respostas da faixa 300 (Redirecionamento), a URL que o cliente deve solicitar; em respostas 201 (Created), a URL do recurso recém-criado.|
|Set-Cookie|Um valor de cookie que deve ser reenviado no cabeçalho `Cookie` em todas as requisições subsequentes para a mesma origin. |

### Response Body

Por fim, depois da linha em branco que separa os cabeçalhos, vem o corpo da resposta (response body). É nele que o servidor envia o conteúdo de fato solicitado: o HTML de uma página, um documento JSON de uma API, uma imagem, um arquivo para download, e outros...

Duas informações dos cabeçalhos são essenciais para o cliente interpretar o corpo corretamente:

- O `Content-Type` diz como o conteúdo deve ser lido. Sem ele, o cliente não sabe se está recebendo texto, JSON ou bytes de uma imagem.
- O `Content-Length` diz quando o corpo termina, para que o cliente saiba o momento de parar de ler da conexão.

Nem toda resposta tem corpo. Respostas como `204 No Content` ou aquelas geradas por uma requisição `HEAD` trazem apenas a linha de status e os cabeçalhos, sem nenhum conteúdo depois da linha em branco.

### Na prática 

Agora vamos ver tudo isso acontecendo de no mundo real para isso vamos usar o `curl`. Aqui vou usar o próprio domínio deste blog, `walissonaguirra.dev`, como exemplo.

A flag `-v` (verbose) faz o curl imprimir os detalhers da comunicação. Como este post é sobre HTTP/1.1, vou forçar essa versão com `--http1.1` (por padrão o curl tenta usar o HTTP/2 se o servidor oferece suporte).

```sh
curl -v --http1.1 https://walissonaguirra.dev
```

Nas linhas que começam com `>` temos a **requisição** que o curl enviou. Repare que ela tem exatamente a estrutura que vimos lá atrás: a linha de requisição, os cabeçalhos e uma linha em branco no final.

```http
> GET / HTTP/1.1
> Host: walissonaguirra.dev
> User-Agent: curl/8.20.0
> Accept: */*
>
```

Já as linhas que começam com `<` são a **resposta** do servidor. A primeira linha traz a versão do protocolo, o status code e a mensagem de status; em seguida vêm os cabeçalhos:

```http
< HTTP/1.1 200 OK
< Date: Sat, 13 Jun 2026 20:51:32 GMT
< Content-Type: text/html; charset=utf-8
< Transfer-Encoding: chunked
< Connection: keep-alive
< X-Content-Type-Options: nosniff
< Cache-Control: public, max-age=0, must-revalidate
< Referrer-Policy: strict-origin-when-cross-origin
< Server: cloudflare
< Cf-Cache-Status: DYNAMIC
< alt-svc: h3=":443"; ma=86400
<
```

Vários conceitos que discutimos aparecem aqui de forma concreta:

- O status `200 OK` confirma que a requisição foi bem-sucedida (faixa 200-299).
- O `Content-Type: text/html; charset=utf-8` indica que o corpo é HTML em UTF-8.
- Em vez de `Content-Length`, o servidor usa `Transfer-Encoding: chunked`, enviando o corpo em pedaços, útil quando ele não sabe o tamanho total.

Se quiser ver **apenas os cabeçalhos da resposta**, sem o corpo, use a flag `-I`. Ela faz uma requisição com o método `HEAD`, aquele que mencionamos na tabela de métodos:

```sh
curl -I https://walissonaguirra.dev
```

Brincar com o curl é a melhor forma de fixar tudo o que vimos: a URL, a requisição, a resposta, os métodos, os cabeçalhos e os status codes deixam de ser abstrações e passam a ser texto que você consegue ler linha a linha.

### Referências

- [An overview of HTTP — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)
- [What is HTTP? — GeeksforGeeks](https://www.geeksforgeeks.org/html/what-is-http/)
- [HTTP Explained — http.dev](https://http.dev/explained)
