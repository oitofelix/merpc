form.rdv = {

  html: loadForm ('rdv'),

  load: function () {
    document.getElementById ('form').innerHTML = this.html;
    widget.date.load ();

    // tipoDespesa
    this.tipoDespesa.node = document.getElementById ('tipoDespesa');
    this.tipoDespesa.node.onchange = this.tipoDespesa.onchange;

    // periodo
    {
      this.periodo.node = document.getElementById ('periodo');

      this.inicio.node = document.getElementById ('inicio');
      this.fim.node = document.getElementById ('fim');
    }

    // NFCupom
    {
      this.NFCupom.node = document.getElementById ('NFCupom');

      // data
      this.data.node = document.getElementById ('data');
      this.data.node.onchange = this.data.onchange;
      this.data.node.value = new Date ();

      // NDocumento
      this.NDocumento.node = document.getElementById ('NDocumento');
      this.NDocumento.node.onchange = this.NDocumento.onchange;

      // valor
      this.valor.node = document.getElementById ('valor');
      this.valor.node.onchange = this.valor.onchange;

      // quantidade
      this.quantidade.node = document.getElementById ('quantidade');
      this.quantidade.node.onchange = this.quantidade.onchange;
    }

    // naturezaDespesa
    {
      this.naturezaDespesa.node = document.getElementById ('naturezaDespesa');
      this.naturezaDespesa.node.style.display = 'none';

      // tipoNatureza
      this.tipoNatureza.node = document.getElementById ('tipoNatureza');
      this.tipoNatureza.node.onchange = this.tipoNatureza.onchange;

      // outraDespesa
      this.outraDespesa.node = document.getElementById ('outraDespesa');

      // tipoNaturezaVeiculo
      this.tipoNaturezaVeiculo.node = document.getElementById ('tipoNaturezaVeiculo');
      this.tipoNaturezaVeiculo.node.onchange = this.tipoNaturezaVeiculo.onchange;

      // itinerario
      this.itinerario.node = document.getElementById ('itinerario');

      // origem
      this.origem.node = document.getElementById ('origem');
      this.origem.node.oninput = this.origem.oninput;

      // destino
      this.destino.node = document.getElementById ('destino');
      this.destino.node.oninput = this.destino.oninput;

      // manutencao
      this.manutencao.node = document.getElementById ('manutencao');

      // cidade
      this.cidade.node = document.getElementById ('cidade');
    }

    // observacoes
    this.observacoes.node = document.getElementById ('observacoes');
    this.observacoes.node.style.display = 'none';

    // veiculo
    {
      this.veiculo.node = document.getElementById ('veiculo');
      this.veiculo.node.style.display = 'none';

      // modelo
      this.modelo.node = document.getElementById ('modelo');

      // placa
      this.placa.node = document.getElementById ('placa');
      if (! platform.android) this.placa.node.oninput = this.placa.oninput;
    }

    // incluir
    this.incluir.node = document.getElementById ('incluir');
    this.incluir.node.onclick = this.incluir.onclick;

    // sair
    this.sair.node = document.getElementById ('sair');
    this.sair.node.onclick = this.sair.onclick;

    // Update display
    this.tipoDespesa.node.onchange ();
  },

  validate: function () {

    function notValid (message, element) {

      function normalizeBackground () {
	element.style.backgroundColor = '';
	element.removeEventListener ('change', normalizeBackground, false);
	element.removeEventListener ('blur', normalizeBackground, false);
      }

      alert (message);
      element.style.backgroundColor = 'yellow';
      element.addEventListener ('change', normalizeBackground, false);
      element.addEventListener ('blur', normalizeBackground, false);
      if (element.focus) element.focus ();
      if (element.select) element.select ();
      throw new Error ('Element not valid');
    }

    try {
      if (! form.rdv.tipoDespesa.node.value)
	notValid ('Defina o tipo de despesa', form.rdv.tipoDespesa.node);

      if (form.rdv.tipoDespesa.node.value === 'R')
      {
	if (! form.rdv.inicio.node.value)
	  notValid ('Defina o início do período', form.rdv.inicio.node);

	if (! form.rdv.fim.node.value)
	  notValid ('Defina o fim do período', form.rdv.fim.node);

	if (! (form.rdv.fim.node.value >= form.rdv.inicio.node.value))
	  notValid ('Data final deve ser a mesma ou posterior à data inicial do período',
		    form.rdv.fim.node);

	if (! (form.rdv.data.node.value >= form.rdv.inicio.node.value
	       && form.rdv.data.node.value <= form.rdv.fim.node.value))
	  notValid ('Data da nota deve estar no intervalo do período de viagem',
		    form.rdv.data.node);
      }

      if (! form.rdv.NDocumento.node.value)
	notValid ('Defina o número do documento',
		  form.rdv.NDocumento.node);

      if (! form.rdv.NDocumento.node.value.match (/^\d{9}$/))
	notValid ('Número do documento deve conter apenas dígitos numéricos',
		  form.rdv.NDocumento.node);

      if (! form.rdv.valor.node.value)
	notValid ('Defina o valor da nota',
		  form.rdv.valor.node);

      if (! (parseFloat(form.rdv.valor.node.value) > 0))
	notValid ('Valor da nota deve ser estritamente positivo',
		  form.rdv.valor.node);

      if (! form.rdv.quantidade.node.value)
	notValid ('Defina a quantidade da mercadoria',
		  form.rdv.quantidade.node);

      if (! (parseFloat(form.rdv.quantidade.node.value) > 0))
	notValid ('Quantidade da mercadoria deve ser estritamente positiva',
		  form.rdv.quantidade.node);

      if (form.rdv.tipoDespesa.node.value === 'V') {
	if (! form.rdv.tipoNaturezaVeiculo.node.value)
	  notValid ('Defina a natureza da despesa', form.rdv.tipoNaturezaVeiculo.node);

	if (form.rdv.tipoNaturezaVeiculo.node.value === 'M'
	       && ! form.rdv.manutencao.node.value)
	  notValid ('Defina a natureza da despesa', form.rdv.manutencao.node);

	if (! form.rdv.modelo.node.value)
	  notValid ('Defina o modelo do veículo', form.rdv.modelo.node);

	if (! form.rdv.placa.node.value)
	  notValid ('Defina a placa do veículo', form.rdv.placa.node);

	if (! form.rdv.placa.node.value.match (/^[a-zA-Z]{3}-\d{4}$/))
	  notValid ('Placa do veículo deve ser válida', form.rdv.placa.node);


      } else {
	if (form.rdv.tipoNaturezaVeiculo.node.value === 'C'
	    || form.rdv.tipoNatureza.node.value === 'C') {

	  if (! form.rdv.origem.node.value)
	    notValid ('Defina a cidade de origem do itinerário',
		      form.rdv.origem.node);

	  if (! form.rdv.destino.node.value)
	    notValid ('Defina a cidade de destino do itinerário',
		      form.rdv.destino.node);
	}

	if (! form.rdv.tipoNatureza.node.value)
	  notValid ('Defina a natureza da despesa', form.rdv.tipoNatureza.node);

	if (form.rdv.tipoNatureza.node.value === 'H'
	    && ! form.rdv.cidade.node.value)
	  notValid ('Defina a cidade de hospedagem', form.rdv.cidade.node);

	if (form.rdv.tipoNatureza.node.value === 'O'
	    && ! form.rdv.outraDespesa.node.value)
	  notValid ('Defina a natureza da despesa', form.rdv.outraDespesa.node);

      }


    }
    catch (e) {
      return false;
    }

    return true;
  },

  tipoDespesa: {
    onchange: function () {
      form.rdv.periodo.display (false);
      form.rdv.NFCupom.display (false);

      // naturezaDespesa
      form.rdv.naturezaDespesa.node.style.display = 'none';
      form.rdv.tipoNatureza.node.style.display = 'none';
      form.rdv.tipoNaturezaVeiculo.node.style.display = 'none';
      form.rdv.itinerario.node.style.display = 'none';
      form.rdv.outraDespesa.node.style.display = 'none';
      form.rdv.manutencao.node.style.display = 'none';
      form.rdv.cidade.node.style.display = 'none';

      form.rdv.observacoes.node.style.display = 'none';
      form.rdv.veiculo.node.style.display = 'none';

      if (this.value) {
	form.rdv.periodo.display (true);
	form.rdv.NFCupom.display (true);
	form.rdv.naturezaDespesa.node.style.display = 'block';
	form.rdv.observacoes.node.style.display = 'block';
	form.rdv.data.node.onchange ();
      }

      switch (this.value) {
      case 'R':
	form.rdv.periodo.habilita (true);
	form.rdv.tipoNatureza.display (true);
	break;
      case 'C':
	form.rdv.periodo.habilita (false);
	form.rdv.tipoNatureza.display (true);
	break;
      case 'F':
	form.rdv.periodo.habilita (false);
	form.rdv.tipoNatureza.display (true);
	break;
      case 'V':
	form.rdv.periodo.habilita (false);
	form.rdv.veiculo.node.style.display = 'block';
	form.rdv.tipoNaturezaVeiculo.display (true);
	break;
      default:
	break;
      }

      form.rdv.NDocumento.node.select ();
    },
  },

  periodo: {
    habilita: function (bool) {
      if (bool)
      {
	form.rdv.inicio.node.disabled = false;
	form.rdv.fim.node.disabled = false;
      } else {
	form.rdv.inicio.node.disabled = true;
	form.rdv.inicio.node.style.backgroundColor = '';
	form.rdv.fim.node.disabled = true;
	form.rdv.fim.node.style.backgroundColor = '';
      }
    },

    display: displayWidget,
  },

  inicio: {
  },

  fim: {
  },

  NFCupom: {
    display: displayWidget,
  },

  NDocumento: {
    onchange: function () {
      if (this.value)
	this.value = ('000000000' + this.value).slice (-9);
    },
  },

  valor: {
    onchange: function () {
      if (this.value)
	this.value = parseFloat(this.value).toFixed(2);
    },
  },

  quantidade: {
    onchange: function () {
      if (this.value)
	this.value = parseFloat(this.value).toFixed(4);
    },
  },

  data: {
    onchange: function () {
      if (form.rdv.tipoDespesa.node.value === 'C'
	  || form.rdv.tipoDespesa.node.value === 'F') {
	if (form.rdv.data.node.value.getDate () < 21) {
	  form.rdv.inicio.node.value = form.rdv.data.node.relative (-1, 21);
	  form.rdv.fim.node.value = form.rdv.data.node.relative (0, 20);
	} else {
	  form.rdv.inicio.node.value = form.rdv.data.node.relative (0, 21);
	  form.rdv.fim.node.value = form.rdv.data.node.relative (1, 20);
	}
      } else if (form.rdv.tipoDespesa.node.value !== 'R') {
	form.rdv.inicio.node.value = form.rdv.data.node.relative (0, 1);
	form.rdv.fim.node.value = form.rdv.data.node.relative (1, 0);
      }
    },
  },

  naturezaDespesa: {
  },

  tipoNatureza: {
    onchange: function () {
      form.rdv.outraDespesa.node.style.display = 'none';
      form.rdv.itinerario.node.style.display = 'none';
      form.rdv.cidade.node.style.display = 'none';

      switch (this.value) {
      case 'O':
	form.rdv.outraDespesa.node.style.display = 'block';
	form.rdv.outraDespesa.node.select ();
	break;
      case 'H':
	form.rdv.cidade.node.style.display = 'block';
	form.rdv.cidade.node.select ();
	break;
      case 'C':
	form.rdv.itinerario.node.style.display = 'block';
	form.rdv.origem.node.select ();
	break;
      default:
	break;
      }
    },

    display: displayWidget,
  },

  outraDespesa: {
  },

  tipoNaturezaVeiculo: {
    onchange: function () {
      form.rdv.itinerario.node.style.display = 'none';
      form.rdv.manutencao.node.style.display = 'none';

      switch (this.value) {
      case 'M':
	form.rdv.manutencao.node.style.display = 'block';
	form.rdv.manutencao.node.select ();
	break;
      case 'C':
	form.rdv.itinerario.node.style.display = 'block';
	form.rdv.origem.node.select ();
	break;
      default:
	break;
      }
    },

    display: displayWidget,
  },

  itinerario: {
  },

  origem: {
    oninput: function () {
      this.value = this.value.toUpperCase ();
    },
  },

  destino: {
    oninput: function () {
      this.value = this.value.toUpperCase ();
    },
  },

  manutencao: {
  },

  cidade: {
  },

  observacoes: {
  },

  veiculo: {
  },

  modelo: {
  },

  placa: {
    oninput: function () {
      if (this.value.length === 3
	  && arguments.callee.lastValue.length
	  < this.value.length) this.value += '-'
      if (this.value.length === 4
	  && this.value.charAt (3) !== '-')
	this.value = this.value.slice (0, 3) + '-' + this.value.slice (3);
      this.value = this.value.toUpperCase ();
      arguments.callee.lastValue = this.value;
    },
  },

  incluir: {
    onclick: function () {
      form.rdv.validate ();
    },
  },

  sair: {
    onclick: function () {
      form.environment.load ();
    },
  },

}
