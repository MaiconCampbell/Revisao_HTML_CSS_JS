(function () {

  // ----- Pavimentos ----- //
  function criarTerreo() {

    const terreo = document.createElement('div')
    terreo.classList.add('terreo')

    const janela = document.createElement('div')
    janela.classList.add('janela')
    terreo.setAttribute('andar', 'T')

    terreo.appendChild(janela)

    return terreo
  }

  function criarAndar(numero) {

    const andar = document.createElement('div')
    andar.classList.add('andar')

    const porta = document.createElement('div')
    porta.classList.add('porta')

    andar.setAttribute('andar', numero)
    andar.appendChild(porta)

    return andar
  }

  function criarPavimentos() {

    const elementosComAndares = document.querySelectorAll('[andares]')
    elementosComAndares.forEach(colunaAndares => {
      const qtde = +colunaAndares.getAttribute('andares')

      for (let i = qtde; i > 0; i--) {

        colunaAndares.appendChild(criarAndar(i))
      }

      colunaAndares.appendChild(criarTerreo())

    })
  }

  criarPavimentos()

  // ----- Elevador ----- //
  function iniciarMovimentacao() {

    const elevador = document.querySelector('.elevador')
    elevador.setAttribute('em-movimentacao', '')
  }

  function finalizarMovimentacao() {

    const elevador = document.querySelector('.elevador')
    elevador.removeAttribute('em-movimentacao')
  }

  function emMovimentacao() {

    const elevador = document.querySelector('.elevador')
    return elevador.hasAttribute('em-movimentacao')
  }


  function obterTamanhoElevador() {
    
    const terreo = document.querySelector('[andar=T')

    return terreo.offsetHeight
  }

  function criarElevador() {
    
    const poco = document.querySelector('.poco')

    const elevador = document.createElement('div')
    elevador.classList.add('elevador')
    elevador.style.height = obterTamanhoElevador()

    poco.appendChild(elevador)
  }

  function obterPosicaoAtual() {
    const elevador = document.querySelector('.elevador')

    return +elevador.style.bottom.replace('px', '')
  }

  function atualizarMostrador(texto) {

    const mostrador = document.querySelector('.mostrador')

    mostrador.innerHTML = texto
  }
  
  function iniciarComando (comando) {

    const btn = document.querySelector(`[comando="${comando}"]`)
    btn.classList.add('destaque')
  }

  function finalizarComando(comando) {

    const btn = document.querySelector(`[comando="${comando}"]`)
    btn.classList.remove('destaque')
  }
  
  function moverElevadorPara(andar) {

    if(emMovimentacao()) return

    iniciarMovimentacao()
    iniciarComando(andar)

    const numero = andar === 'T' ? 0 : +andar

    const elevador = document.querySelector('.elevador')

    const posicaoInicial = obterPosicaoAtual()
    const posicaoDestino = numero * obterTamanhoElevador()

    const subindo = posicaoDestino > posicaoInicial

    atualizarMostrador(subindo ? 'Sudindo' : 'Descendo')

    let temporizador = setInterval(() => {
      
      const novaPosicao = obterPosicaoAtual() + (subindo ? 10 : -10)
      const terminou = subindo ? novaPosicao >= posicaoDestino : novaPosicao <= posicaoDestino
      elevador.style.bottom = terminou ? posicaoDestino : novaPosicao

      if(terminou) {
        clearInterval(temporizador)
        atualizarMostrador(andar === 'T' ? 'Térreo' : `${andar} Andar`)
        finalizarMovimentacao()
        finalizarComando(andar)
      }
    }, 30)


  }

  criarElevador()

  function movimentarElevadorBaseadoControles() {

    const btns = document.querySelectorAll('[comando]')

    btns.forEach(btn => {

      const comando = btn.getAttribute('comando')

      btn.onclick = function() {
        moverElevadorPara(comando)
      }
    })
  }

  movimentarElevadorBaseadoControles()

})()