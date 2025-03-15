let listaDeNumerosSorteados = [];
let numLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    //Colocando funcionalidade na biblioteca responsiveVoice
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 a 100');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute === ''){ //Verficando de o campo de texto está vazio
        alert('O campo de texto está vazio, por favor tente novamente');
        return;
    }

    chute = Number(chute); //Covertendo para número para não ter problema 
    
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Você Acertou!');
        let palavraTentativas = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativas = (`Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`)
        exibirTextoNaTela('p', mensagemTentativas);
        document.querySelector('#reiniciar').removeAttribute('disabled');
    } else{
        if(chute>numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else{
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numLimite + 1);
    let quantDeElementos = listaDeNumerosSorteados.length

    if (quantDeElementos == numLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
      //Verificando se 'numeroEscolhido' está incluso na lista, caso estiver, chama a função novamente para gerar outro
      return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){//Limpando o campo de texto após um chute
    document.querySelector('input').value = ''
}

function reiniciarJogo(){
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  //Quando o usuário clicar no botão "Chutar", vai chamar explicitamente a função verificarChute()
  document.querySelector("#reiniciar").setAttribute("disabled", true);
}