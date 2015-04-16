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
      this.periodo.node.style.display = 'none';

      this.inicio.node = document.getElementById ('inicio');
      this.fim.node = document.getElementById ('fim');
    }

    // NFCupom
    {
      this.NFCupom.node = document.getElementById ('NFCupom');
      this.NFCupom.node.style.display = 'none';

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

      // quilometragem
      this.quilometragem.node = document.getElementById ('quilometragem');

      // kmInicial
      this.kmInicial.node = document.getElementById ('kmInicial');
      this.kmInicial.node.onchange = this.kmInicial.onchange;

      // kmFinal
      this.kmFinal.node = document.getElementById ('kmFinal');
      this.kmFinal.node.onchange = this.kmFinal.onchange;

      // manutencao
      this.manutencao.node = document.getElementById ('manutencao');
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
      this.placa.node.oninput = this.placa.oninput;
    }
      
    // incluir
    this.incluir.node = document.getElementById ('incluir');
    this.incluir.node.onclick = this.incluir.onclick;

    // sair
    this.sair.node = document.getElementById ('sair');
    this.sair.node.onclick = this.sair.onclick;
  },

  validate: function () {

    function notValid (message, element) {

      function normalizeBackground () {
	element.style.backgroundColor = '';
	element.removeEventListener ('change', normalizeBackground, false);
      }

      alert (message);
      element.style.backgroundColor = 'yellow';
      element.addEventListener ('change', normalizeBackground, false);
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

	if (form.rdv.tipoNaturezaVeiculo.node.value === 'C'
	    || form.rdv.tipoNaturezaVeiculo.node.value === 'T') {

	  if (! form.rdv.kmInicial.node.value)
	    notValid ('Defina a quilometragem inicial',
		      form.rdv.kmInicial.node);

	  if (! (parseInt (form.rdv.kmInicial.node.value) >= 0))
	    notValid ('Quilometragem inicial deve ser uma quantia não-negativa',
		      form.rdv.kmInicial.node);

	  if (! form.rdv.kmFinal.node.value)
	    notValid ('Defina a quilometragem final',
		      form.rdv.kmFinal.node);

	  if (! (parseInt (form.rdv.kmFinal.node.value)
		 > parseInt (form.rdv.kmInicial.node.value)))
	    notValid ('Quilometragem final deve ser estritamente maior que a inicial',
		      form.rdv.kmFinal.node);
	}

	if (! form.rdv.modelo.node.value)
	  notValid ('Defina o modelo do veículo', form.rdv.modelo.node);
	
	if (! form.rdv.placa.node.value)
	  notValid ('Defina a placa do veículo', form.rdv.placa.node);

	if (! form.rdv.placa.node.value.match (/^[a-zA-Z]{3}-\d{4}$/))
	  notValid ('Placa do veículo deve ser válida', form.rdv.placa.node);
	

      } else {
	if (! form.rdv.tipoNatureza.node.value)
	  notValid ('Defina a natureza da despesa', form.rdv.tipoNatureza.node);

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
      if (this.value) {
	form.rdv.periodo.node.style.display = 'block';
	form.rdv.NFCupom.node.style.display = 'block';
	form.rdv.NDocumento.node.select ();

	// naturezaDespesa
	form.rdv.naturezaDespesa.node.style.display = 'block';
	if (this.value === 'V')
	{
	  form.rdv.tipoNatureza.node.style.display = 'none';
	  form.rdv.outraDespesa.node.style.display = 'none';
	  form.rdv.quilometragem.node.style.display = 'none';
	  form.rdv.manutencao.node.style.display = 'none';
	  form.rdv.tipoNaturezaVeiculo.node.style.display = 'block';
	} else {
	  form.rdv.outraDespesa.node.style.display = 'none';
	  form.rdv.tipoNaturezaVeiculo.node.style.display = 'none';
	  form.rdv.manutencao.node.style.display = 'none';
	  form.rdv.quilometragem.node.style.display = 'none';
	  form.rdv.tipoNatureza.node.style.display = 'block';
	}

	form.rdv.observacoes.node.style.display = 'block';

	// Veiculo
	if (this.value == 'V') form.rdv.veiculo.node.style.display = 'block';
	else form.rdv.veiculo.node.style.display = 'none';

	form.rdv.data.node.onchange ();

	if (this.value !== 'R')
	{
	  form.rdv.inicio.node.disabled = true;
	  form.rdv.inicio.node.style.backgroundColor = '';
	  form.rdv.fim.node.disabled = true;
	  form.rdv.fim.node.style.backgroundColor = '';
	} else {
	  form.rdv.inicio.node.disabled = false;
	  form.rdv.fim.node.disabled = false;
	}

      } else {
	form.rdv.periodo.node.style.display = 'none';
	form.rdv.NFCupom.node.style.display = 'none';
	form.rdv.naturezaDespesa.node.style.display = 'none';
	form.rdv.observacoes.node.style.display = 'none';
	form.rdv.veiculo.node.style.display = 'none';
      }
    },
  },

  periodo: {
  },

  inicio: {
  },

  fim: {
  },

  NFCupom: {
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
      if (this.value === 'O') {
	form.rdv.outraDespesa.node.style.display = 'block';
	form.rdv.outraDespesa.node.select ();
      } else {
	form.rdv.outraDespesa.node.style.display = 'none';
      }
    },
  },

  outraDespesa: {
  },

  tipoNaturezaVeiculo: {
    onchange: function () {
      if (this.value === 'M') {
	form.rdv.quilometragem.node.style.display = 'none';
	form.rdv.manutencao.node.style.display = 'block';
	form.rdv.manutencao.node.select ();
      } else if (this.value === 'C' || this.value === 'T') {
	form.rdv.manutencao.node.style.display = 'none';
	form.rdv.quilometragem.node.style.display = 'block';
	form.rdv.kmInicial.node.select ();
      } else {
	form.rdv.manutencao.node.style.display = 'none';
	form.rdv.quilometragem.node.style.display = 'none';
      }
    },
  },

  quilometragem: {
  },

  kmInicial: {
    onchange: function () {
      if (this.value)
	this.value = parseInt(this.value);
    },
  },

  kmFinal: {
    onchange: function () {
      if (this.value)
	this.value = parseInt(this.value);
    },
  },

  manutencao: {
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
