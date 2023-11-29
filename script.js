const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startBt = document.querySelector('#start-pause');
const startPauseBt = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon")

const musica = new Audio('./sons/luna-rise-part-one.mp3');
const beep = new Audio('./sons/beep.mp3');
const play = new Audio('./sons/play.wav');
const pause = new Audio('./sons/pause.mp3');
// const playIcone =
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
  musica.paused ? musica.play() : musica.pause();
})

focoBt.addEventListener('click', ()=>{
  tempoDecorridoEmSegundos = 1500;
  play.play();
  alterarContexto('foco');
  focoBt.classList.add('active');
})

curtoBt.addEventListener('click', ()=>{
  tempoDecorridoEmSegundos = 300;  
  play.play();
  alterarContexto('descanso-curto');
  curtoBt.classList.add('active');
})

longoBt.addEventListener('click', ()=>{
  tempoDecorridoEmSegundos = 900;  
  play.play(); 
  alterarContexto('descanso-longo');
  longoBt.classList.add('active');
})

function alterarContexto (contexto) {
  mostrarTempo()
  botones.forEach((contexto) =>{
    contexto.classList.remove('active')
  })
  html.setAttribute('data-contexto', contexto);
  banner.setAttribute('src', `./imagens/${contexto}.png`)
  switch (contexto) {
    case 'foco':
      title.innerHTML = `
       Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
      `
      break;
    case "descanso-curto":
      title.innerHTML = `
        Que tal dar uma respirada,<br>
                <strong class="app__title-strong">Faza uma pausa curta.</strong>
      ` 
       break;   
    case 'descanso-longo':
      title.innerHTML = `
        Hora de voltar na superficie,<br>
                <strong class="app__title-strong">Faza uma pausa longa.</strong>
      `
    default:
      
  }
}

const contageRegresiva = () => {

  if(tempoDecorridoEmSegundos <= 0){
   // beep.play()
   alert('tempo finalizado');
   zerar();
   return;
  }

  tempoDecorridoEmSegundos -= 1;
  // console.log(tempoDecorridoEmSegundos)
  mostrarTempo()
}
 startBt.addEventListener('click',  iniciarPausar)

function iniciarPausar (){
  if(intervaloId){
    zerar()
    return
  }
    play.play()

  intervaloId = setInterval(contageRegresiva, 1000)
  startPauseBt.textContent = "Pausar"
  iniciarOuPausarBtIcone.setAttribute('src', `./imagens/pause.png`)
}
function zerar () {
  pause.play()    
  clearInterval(intervaloId);
  intervaloId = null;
  startPauseBt.textContent = "Começar"
  iniciarOuPausarBtIcone.setAttribute('src', `./imagens/play_arrow.png`)
}

function mostrarTempo (){
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
  tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
