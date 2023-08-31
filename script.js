//Criando variáveis para modificar os botões.
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco') //Variavel para dar funcionalidade ao botão "Foco"
const curtoBt = document.querySelector('.app__card-button--curto') //Variavel para dar funcionaldade ao botão "Descanso curto"
const longoBt = document.querySelector('.app__card-button--longo') //Variavel para dar funcionalidade ao botão "Descanso longo"
const banner = document.querySelector('.app__image') //Variavel para quando mudar de "Botão", a imagem mudar também
const titulo = document.querySelector('.app__title') //Variavel para quando mudar de "Botão", o texto mudar também
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause') //Variavel para dar funcionalidade ao botão "começar", para destravar o cronometro


const musicaFocoInput = document.querySelector('#alternar-musica') //Variavel para alternar musica
const musica = new Audio ('/sons/luna-rise-part-one.mp3')//Variavel para implantar musica
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500 //Variavel com finalidade de fazer o cronometro cronometrar
let intervaloId = null //Variavel para não ter intervalo no cronometro

musica.loop=true

musicaFocoInput.addEventListener('change', () => { //Função para a funcionalidade de play e pause na musica
    if (musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco')//AQUI CHAMA A FUNÇÃO alterarContexto
    focoBt.classList.add('active')
    //html.setAttribute('data-contexto', 'foco')
    //banner.setAttribute('src','/imagens/foco.png')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')//AQUI CHAMA A FUNÇÃO alterarContexto
    curtoBt.classList.add('active')

    //html.setAttribute('data-contexto', 'descanso-curto')
    //banner.setAttribute('src','/imagens/descanso-curto.png')
})

longoBt.addEventListener('click', () =>{
    alterarContexto('descanso-longo') //AQUI CHAMA A FUNÇÃO alterarContexto
    longoBt.classList.add('active')

   // html.setAttribute('data-contexto', 'descanso-longo')
    //banner.setAttribute('src','/imagens/descanso-longo.png')
})

//Função para alteração de cor de fundo e texto conforme botões clicados.
function alterarContexto (contexto){
    botoes.forEach(function(contexto){
        contexto.classList.remove('active') //AQUI ESTÁ DEIXANDO SÓ UM ATIVO POR CLIQUE
    })
    html.setAttribute ('data-contexto', contexto)
    banner.setAttribute('src',`/imagens/${contexto}.png`)
   
    switch(contexto){ //Switch para quando cada botão for clicado, aparecer suas respectivas frases.
        case "foco":
            titulo.innerHTML = `<strong class= "app__title-strong>Mergulhe no que importa!</strong>` //Aparece a frase do "foco"
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<strong class = app__title-strong>Faça uma pausa!</strong>` //Aparece a frase do "Descanso curto"
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar para a superficie<strong class= app__title-strong> Faça uma longa pausa</strong>` //Aparece a frase do "Descanso longo"
    }
}

//Funções para Contagem de tempo/cronometro :


const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador: ' + tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click', iniciarOuPausar)
//Evento para o botão "começar" ser clicável.


function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId) 
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()