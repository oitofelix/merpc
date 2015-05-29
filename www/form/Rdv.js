form.Rdv = function () {
  var that = this;

  var cidade = new widget.Input ()
      .legendText ('Cidade')
      .type ('text')
      .formatCaps ();
  var itinerario = new form.Itinerario ();
  var outra = new widget.Input ()
      .type ('text')
      .formatCaps ();
  var natureza = new widget.Select ()
    .addOption ('', '', null,
		'A', 'Alimentação', initialFocus,
		'H', 'Hospedagem', cidade,
		'P', 'Pedágio', initialFocus,
		'C', 'Combustível', itinerario,
		'O', 'Outra...', outra);

  var itinerarioVeiculo = new form.Itinerario ();
  var manutencao = new widget.Input ()
      .type ('text')
      .formatCaps ();
  var naturezaVeiculo = new widget.Select ()
    .addOption ('', '', null,
		'A', 'Aluguel', initialFocus,
		'C', 'Combustível', itinerarioVeiculo,
		'T', 'Troca de óleo', initialFocus,
		'M', 'Manutenção...', manutencao);

  var veiculo = new form.Veiculo ();
  var despesa = new widget.Select ()
    .addOption ('', '', enablePeriodo,
		'R', 'Reembolso', [natureza, enablePeriodo],
		'C', 'Cartão corporativo', [natureza, disablePeriodo, periodo21],
		'F', 'Fundo fixo', [natureza, disablePeriodo, periodo21],
		'V', 'Ajuda de custo de veículo',
		[veiculo, naturezaVeiculo, disablePeriodo, periodo30]);

  var periodo = new form.Periodo ();

  var NFCupom = new form.NFCupom ();
  NFCupom.data.onchange (atualizaPeriodo);

  var observacoes = new widget.TextArea ()
      .spellcheck ('true')
      .placeholder ('Obs.');

  widget.Widget.call (that)
    .legendText ('RDV: Relatório de Despesas de Viagens')
    .addWidget (despesa, 'br',
		periodo, 'br',
		NFCupom, 'br',
		observacoes);

  that.despesa = despesa;
  that.despesa.natureza = natureza;
  that.despesa.veiculo = veiculo;
  that.despesa.natureza.cidade = cidade;
  that.despesa.natureza.itinerario = itinerario;
  that.despesa.natureza.outra = outra;
  that.despesa.naturezaVeiculo = naturezaVeiculo;
  that.despesa.naturezaVeiculo.itinerario = itinerarioVeiculo;
  that.despesa.naturezaVeiculo.manutencao = manutencao;
  that.periodo = periodo;
  that.NFCupom = NFCupom;
  that.observacoes = observacoes;

  function disablePeriodo () {
    periodo.disabled (true);
  };

  function enablePeriodo () {
    periodo.disabled (false);
  };

  function periodo21 () {
    if (! NFCupom.data.value ()) return;
    if (NFCupom.data.value ().getDate () < 21) {
      periodo.inicio.value (NFCupom.data.relative (-1, 21));
      periodo.fim.value (NFCupom.data.relative (0, 20));
    } else {
      periodo.inicio.value (NFCupom.data.relative (0, 21));
      periodo.fim.value (NFCupom.data.relative (1, 20));
    }
  }

  function periodo30 () {
    if (! NFCupom.data.value ()) return;
    periodo.inicio.value (NFCupom.data.relative (0, 1));
    periodo.fim.value (NFCupom.data.relative (1, 0));
  }

  function atualizaPeriodo () {
    if (despesa.value () === 'C' || despesa.value () === 'F')
      periodo21 ();
    else if (despesa.value () !== 'R') periodo30 ();
  }

  function initialFocus () {
    if (! periodo.disabled ()) periodo.focus ();
    else NFCupom.focus ();
  }


};

form.Rdv.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: form.Rdv},
  validation: {value: function () {
    var despesa = this.despesa;
    var natureza = this.despesa.natureza;
    var modelo = this.despesa.veiculo.modelo;
    var placa = this.despesa.veiculo.placa;
    var cidade = this.despesa.natureza.cidade;
    var origem = this.despesa.natureza.itinerario.origem;
    var destino = this.despesa.natureza.itinerario.destino;
    var origemVeiculo = this.despesa.naturezaVeiculo.itinerario.origem;
    var destinoVeiculo = this.despesa.naturezaVeiculo.itinerario.destino;
    var outra = this.despesa.natureza.outra;
    var naturezaVeiculo = this.despesa.naturezaVeiculo;
    var itinerarioVeiculo = this.despesa.naturezaVeiculo.itinerario;
    var manutencao = this.despesa.naturezaVeiculo.manutencao;
    var inicio = this.periodo.inicio;
    var fim = this.periodo.fim;
    var data = this.NFCupom.data;
    var id = this.NFCupom.id;
    var valor = this.NFCupom.valor;
    var quantidade = this.NFCupom.quantidade;
    var observacoes = this.observacoes;

    try {
      despesa.validate (despesa.value (), 'Defina o tipo de despesa');

      if (despesa.value () === 'V') {
	modelo.validate (modelo.value (),
			 'Defina o modelo do veículo');

	placa.validate (placa.value (),
			'Defina a placa do veículo');

	placa.validate (placa.value ().match (/^[a-zA-Z]{3}-\d{4}$/),
			'Placa do veículo deve ser válida');

	naturezaVeiculo.validate (naturezaVeiculo.value (),
				  'Defina a natureza da despesa');

	manutencao.validate (naturezaVeiculo.value () !== 'M'
			     || manutencao.value (),
			     'Defina a natureza da despesa');
      } else {


	if (natureza.value () === 'C') {
	  origem.validate (origem.value (),
			   'Defina a cidade de origem do itinerário');

	  destino.validate (destino.value (),
			    'Defina a cidade de destino do itinerário');
	}

	if (naturezaVeiculo.value () === 'C') {
	  origemVeiculo.validate (origemVeiculo.value (),
				  'Defina a cidade de origem do itinerário');
	  destinoVeiculo.validate (destinoVeiculo.value (),
				  'Defina a cidade de destino do itinerário');
	}

	natureza.validate (natureza.value (),
			   'Defina a natureza da despesa');

	cidade.validate (natureza.value () !== 'H'
			 || cidade.value (),
			 'Defina a cidade de hospedagem');

	outra.validate (natureza.value () !== 'O' ||
			outra.value(), 'Defina a natureza da despesa')
      }

      if (despesa.value () === 'R')
      {
	inicio.validate (inicio.value (),
			 'Defina o início do período');

	fim.validate (fim.value (),
		      'Defina o fim do período');

	fim.validate (fim.value () >= inicio.value (),
		      'Data final deve ser a mesma ou posterior à data inicial do período');

	data.validate (data.value () >= inicio.value ()
		       && data.value () <= fim.value (),
		       'Data da nota deve estar no intervalo do período de viagem');
      }

      id.validate (id.value (),
		   'Defina o número do documento');


      id.validate (id.value ().match (/^\d{9}$/),
		   'Número do documento deve conter apenas dígitos numéricos');

      valor.validate (valor.value (),
		      'Defina o valor da nota');

      valor.validate (parseFloat(valor.value ()) > 0,
		      'Valor da nota deve ser estritamente positivo');

      quantidade.validate (quantidade.value (),
			   'Defina a quantidade da mercadoria');

      quantidade.validate (parseFloat(quantidade.value ()) > 0,
			   'Quantidade da mercadoria deve ser estritamente positiva');

    }
    catch (e) {
      return false;
    }

    return true;
  }},
  recordObject: {value: function () {
    obj = {};

    put (obj,
	 'FILIAL', Main.LOGIN.FILIAL, true,
	 'DATINI', this.periodo.inicio.toDBString (), true,
	 'DATFIM', this.periodo.fim.toDBString (), true,
	 'TPDESP', this.despesa.value (), true,

	 'NATDES', this.despesa.natureza.value (),
	 this.despesa.value () && this.despesa.value () !== 'V',
	 'NATDES', this.despesa.naturezaVeiculo.value (),
	 this.despesa.value () && this.despesa.value () === 'V',

	 'NATDMS', this.despesa.natureza.outra.value (),
	 this.despesa.value () && this.despesa.value () !== 'V'
	 && this.despesa.natureza.value () === 'O',
	 'NATDMS', this.despesa.naturezaVeiculo.manutencao.value (),
	 this.despesa.value () && this.despesa.value () === 'V'
	 && this.despesa.naturezaVeiculo.value () === 'M',

	 'NUMDOC', this.NFCupom.id.value (), true,
	 'VLRDOC', this.NFCupom.valor.value (), true,
	 'QTDDOC', this.NFCupom.quantidade.value (), true,

	 'CIDADE', this.despesa.natureza.cidade.value (),
	 this.despesa.value () && this.despesa.value () !== 'V'
	 && this.despesa.natureza.value () === 'H',

	 /* remover ? */
	 'LITROS', this.NFCupom.quantidade.value (),
	 this.despesa.value () && this.despesa.value () !== 'V'
	 && this.despesa.natureza.value () === 'C',
	 'LITROS', this.NFCupom.quantidade.value (),
	 this.despesa.value () && this.despesa.value () === 'V'
	 && this.despesa.naturezaVeiculo.value () === 'C',

	 'OBS', this.observacoes.value (), true,
	 'DATA', this.NFCupom.data.toDBString (), true,

	 'CIDORI', this.despesa.natureza.itinerario.origem.value (),
	 this.despesa.value () && this.despesa.value () !== 'V'
	 && this.despesa.natureza.value () === 'C',
	 'CIDORI', this.despesa.naturezaVeiculo.itinerario.origem.value (),
	 this.despesa.value () && this.despesa.value () === 'V'
	 && this.despesa.naturezaVeiculo.value () === 'C',

	 'CIDDES', this.despesa.natureza.itinerario.destino.value (),
	 this.despesa.value () && this.despesa.value () !== 'V'
	 && this.despesa.natureza.value () === 'C',
	 'CIDDES', this.despesa.naturezaVeiculo.itinerario.destino.value (),
	 this.despesa.value () && this.despesa.value () === 'V'
	 && this.despesa.naturezaVeiculo.value () === 'C');

    return obj;

    function put (obj, /* [ */ field, value, condition /* ] ...*/) {
      for (var i = 1; i < arguments.length; i += 3) {
	var field = arguments[i];
	var value = arguments[i + 1];
	var condition = arguments[i + 2];

	if (condition) obj[field] = value ? value : '';
      }

      return obj;
    }
  }},
  match: {value: function (dbObject) {
    formObject = this.recordObject ();
    var queryFields = this.constructor.QUERY_FIELDS;

    for (var i = 0; i < queryFields.length; i++) {
      if (formObject [queryFields[i]]
	  && formObject [queryFields[i]]
	  !== dbObject [queryFields[i]]) return false;
    }

    return true;
  }},
  clear: {value: function () {
    this.despesa.value ('');
    this.despesa.natureza.value ('');
    this.despesa.veiculo.modelo.value ('');
    this.despesa.veiculo.placa.value ('');
    this.despesa.natureza.cidade.value ('');
    this.despesa.natureza.itinerario.origem.value ('');
    this.despesa.natureza.itinerario.destino.value ('');
    this.despesa.naturezaVeiculo.itinerario.origem.value ('');
    this.despesa.naturezaVeiculo.itinerario.destino.value ('');
    this.despesa.natureza.outra.value ('');
    this.despesa.naturezaVeiculo.value ('');
    this.despesa.naturezaVeiculo.manutencao.value ('');
    this.periodo.inicio.value ('');
    this.periodo.fim.value ('');
    this.NFCupom.data.value ('');
    this.NFCupom.id.value ('');
    this.NFCupom.valor.value ('');
    this.NFCupom.quantidade.value ('');
    this.observacoes.value ('');
  }},
  loadRecord: {value: function (value) {
    this.clear ();
    this.periodo.inicio.fromDBString (value.DATINI);
    this.periodo.fim.fromDBString (value.DATFIM);
    this.despesa.value (value.TPDESP);

    if (this.despesa.value () !== 'V') {
      this.despesa.natureza.value (value.NATDES);
      if (this.despesa.natureza.value () === 'O')
	this.despesa.natureza.outra.value (value.NATDMS);
      if (this.despesa.natureza.value () === 'C') {
	this.NFCupom.quantidade.value (value.LITROS);
	this.despesa.natureza.itinerario.origem.value (value.CIDORI);
	this.despesa.natureza.itinerario.destino.value (value.CIDDES);
      }
      if (this.despesa.natureza.value () === 'H')
	this.despesa.natureza.cidade.value (value.CIDADE);
    } else {
      this.despesa.naturezaVeiculo.value (value.NATDES);
      if (this.despesa.naturezaVeiculo.value () === 'M')
	this.despesa.naturezaVeiculo.manutencao.value (value.NATDES)
      if (this.despesa.naturezaVeiculo.value () === 'C') {
	this.NFCupom.quantidade.value (value.LITROS);
	this.despesa.naturezaVeiculo.itinerario.origem.value (value.CIDORI);
	this.despesa.naturezaVeiculo.itinerario.destino.value (value.CIDDES);
      }
    }

    this.NFCupom.id.value (value.NUMDOC);
    this.NFCupom.valor.value (value.VLRDOC);
    this.NFCupom.quantidade.value (value.QTDDOC);

    this.observacoes.value (value.OBS);
    this.NFCupom.data.fromDBString (value.DATA);
  }},
  focus: {value: function () {
    this.despesa.focus ();
  }},
});

form.Rdv.OBJECT_STORE = 'rdv';
form.Rdv.QUERY_FIELDS = ['FILIAL', 'DATINI', 'DATFIM', 'TPDESP',
			 'NATDES', 'NATDMS', 'NUMDOC', 'VLRDOC',
			 'QTDDOC', 'CIDADE', 'LITROS', 'OBS', 'DATA',
			 'CIDORI', 'CIDDES'];
