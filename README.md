# Agenda Semanal
por Isabel Elise e Arthur Nader

Uma agenda semanal simples para registrar eventos e indicar alarmes programados ao longo da semana!

![tela](https://github.com/isabel-elise/agenda-semanal/assets/80064876/b670867e-5c69-4111-a5b7-f0a3ffe0191b)

## Funcionalidades

### Criação de itens
O botão + no canto superior direito da interface permite adicionar um item à agenda. Caso o tipo selecionado seja de Evento, poderá ser especificado o horário de início e fim do evento. Caso seja um Alarme, apenas um horário é solicitado. Para ambos os tipos, é possível aidiconar um título e especificar a qual dia da semana o item será associado.

#### Aviso para sobreposição de eventos e alarmes
Caso seja realizada a tentativa de adicionar um alarme no intervalo de um evento já registrado, ou de incluir um evento sobre um alarme já adicionado, será exibido um aviso. Essa verificação objetiva informar a inclusão de itens com interseção entre outros de diferentes tipos na agenda.

### Remoção de itens
Cada item pode ser removido por meio do clique no ícone X no canto superior direito de sua caixinha.

### Limpeza da agenda
O botão de x no canto superior direito da interface permite a exclusão simultânea de todos os itens da agenda.

### Ordenação dos itens
Cada coluna da semana exibe seu eventos e alarmes ordenados de acordo com o horário de início (no caso de eventos) ou horário (no caso de alarmes).

### Indicação do dia atual
O dia da semana correspondente ao dia atual é destacado dentre os dias da semana indicados na parte inferior da tela.

## Como executar

Com o Node.js e npm instalados, execute o comando `npm install` na pasta raiz para instalar as dependências necessárias. Depois, basta executar um `npm start` e uma janela do seu navegador abrirá com a aplicação.

## Tecnologias utilizadas

O sistema foi desenvolvido primariamente na linguagem JavaScript utilizando o framework React, uma biblioteca front-end com foco em criar interfaces de usuário em páginas web. Para armazenar os dados maniuplados na aplicação, foi utilizado o localStorage do navegador, um recurso que permite armazenamento simples e sem expiração separadamente para diferentes domínios.
