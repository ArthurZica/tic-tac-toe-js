const blocos = document.getElementsByClassName('col');
let jogadas = [];
let jogador = '';
let jogador1 = '';
let jogador2 = '';
const jogadorTurno = document.getElementById('jogadorTurno');


let combinacaoVencedora = [];

const combinacoesVitoriosas = [  
  ['11', '12', '13'],
  ['21', '22', '23'],
  ['31', '32', '33'],
  ['11', '21', '31'],
  ['12', '22', '32'],
  ['13', '23', '33'],
  ['11', '22', '33'],
  ['13', '22', '31'],
];

function start(){
    jogador1 = document.getElementById('jogador1').value;
    jogador2 = document.getElementById('jogador2').value;
    jogadorTurno.innerText = "jogador: "+jogador1;
    for(i=0;i<blocos.length;i++){
        //add o evento de click
        blocos[i].addEventListener('click', clicar);
    };
}

function clicar(){
    //pega o id do bloco clicado
    var id = this.id;
    //chama a função que vai selecionar o bloco
    selecionaBloco(id);
}

function verificaJogador(){
    if(jogadas.length % 2 == 0){
        jogadorTurno.innerText = "jogador: "+jogador2;
        return 'X';
    }
    else{
        jogadorTurno.innerText = "jogador: "+jogador1;
        return 'O';
    }
}

function jogada(id){
    jogadas.push({jogador: jogador, id:id});
    if(jogadas.length == 9){
        jogadorTurno.innerText = 'Velha!';
        
    }
    verificaVencedor();
    console.log(jogadas);
}


function verificaCombinacaoVitoriosa(jogador) {
  for (let combinacao of combinacoesVitoriosas) {
    let combinacaoCompleta = true;
    for (let id of combinacao) {
      if (!jogadas.find(j => j.jogador === jogador && j.id === id)) {
        combinacaoCompleta = false;
        break;
      }
    }
    if (combinacaoCompleta) {
    combinacaoVencedora = combinacao;
      return true;
    }
  }
  return false;
}


function verificaVencedor() {
  if (verificaCombinacaoVitoriosa('X')) {
    for(i=0;i<blocos.length;i++){
        if(blocos[i].id == combinacaoVencedora[0] || blocos[i].id == combinacaoVencedora[1] || blocos[i].id == combinacaoVencedora[2])
        blocos[i].style.backgroundColor = 'green';
    }
    jogadorTurno.innerText = jogador1+' Venceu';
        stop();
    
  } else if (verificaCombinacaoVitoriosa('O')) {
    for(i=0;i<blocos.length;i++){
        if(blocos[i].id == combinacaoVencedora[0] || blocos[i].id == combinacaoVencedora[1] || blocos[i].id == combinacaoVencedora[2])
        blocos[i].style.backgroundColor = 'green';
    }
    jogadorTurno.innerText = jogador2+' Venceu';
        stop();
  } 
}


function selecionaBloco(id){
    console.log(jogador1,jogador2);
    for(i=0;i<blocos.length;i++){
      if(blocos[i].id == id && !blocos[i].classList.contains('selecionado')){
        //seleciona o bloco clicado
        blocos[i].classList.add('selecionado');
        jogador = verificaJogador();    
        blocos[i].children[0].innerText = jogador;
        jogada(blocos[i].id);
        
        
    }
}
}

function stop(){
    for(i=0;i<blocos.length;i++){
        blocos[i].removeEventListener('click',clicar);
    }
}

function restart(){
    clean();
    start();
}

function clean(){
    for(i=0;i<blocos.length;i++){
        blocos[i].classList.remove('selecionado');
        blocos[i].children[0].innerText = '';
        blocos[i].style.backgroundColor = '';
    }
    jogadorTurno.innerText = '';
    jogadas = [];
}
