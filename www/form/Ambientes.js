form.Ambientes = function () {
  var that = this;

  this.rdv = new widget.Input ()
    .legendText ('RDV')
    .title ('Relatório de Despesas de Viagens')
    .type ('image')
    .maxWidth ('128px')
    .borderWidth ('0px')
    .src ('img/rdv.png')
    .onclick (rdv_onclick);

  this.rep = new widget.Input ()
    .legendText ('REP')
    .title ('Relatório de Eventos da Empresa')
    .type ('image')
    .maxWidth ('128px')
    .borderWidth ('0px')
    .src ('img/rep.png')
    .onclick (rep_onclick);

  this.rac = new widget.Input ()
    .legendText ('RAC')
    .title ('Relatório de Atendimento ao Cliente')
    .type ('image')
    .maxWidth ('128px')
    .borderWidth ('0px')
    .src ('img/rac.png')
    .onclick (rac_onclick);

  this.pv = new widget.Input ()
    .legendText ('PV')
    .title ('Pedido de Vendas')
    .type ('image')
    .maxWidth ('128px')
    .borderWidth ('0px')
    .src ('img/pv.png')
    .onclick (pv_onclick);

  this.sair = new widget.Input ()
    .type ('button')
    .value ('Sair')
    .onclick (sair_onclick);

  widget.Widget.call (this)
    .addWidget (this.rdv, this.rep, 'br',
		this.rac, this.pv, 'br',
		this.sair)
    .addEvent ('rdv', 'rep', 'rac', 'pv',
	       'close');

  function rdv_onclick () {
    that.generateEvent ('rdv');
    return false;
  }

  function rep_onclick () {
    //that.replace (new form.Rep ());
    return false;
  }

  function rac_onclick () {
    //that.replace (new form.Rac ());
    return false;
  }

  function pv_onclick () {
    //that.replace (new form.Pv ());
    return false;
  }

  function sair_onclick () {
    that.generateEvent ('close');
    return false;
  }
};

form.Ambientes.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: form.Ambientes},
});
