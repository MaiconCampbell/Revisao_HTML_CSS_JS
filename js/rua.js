(function() {
  function CriarFaixasRuaDinamico() {

    /* Seleciona os elementos que possui o atributo faixas */
    const elementosComFaxas = document.querySelectorAll('[faixas]')
    console.log('Retorno do elemento faixa:', elementosComFaxas)
  
    elementosComFaxas.forEach(el => {
  
      /* Seleciona o valor contido na propriedade faixas */
      const qtde = +el.getAttribute('faixas')
  
      for (let i = 0; i < qtde; i++) {
        const faixa = document.createElement('div')
        faixa.classList.add('faixa')
        el.appendChild(faixa)
      }
    })
  }

  CriarFaixasRuaDinamico()
})()

