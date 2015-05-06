form.Cfg = function () {
  var that = this;

  this.url = new widget.Input ()
    .legendText ('URL do Web Service')
    .title ('Entre aqui a URL do Web Service a ser usado')
    .placeholder ('http://exemplo.com:1234/')
    .type ('text')
    .value (localStorage.wsURL || '');

  this.salvar = new widget.Input ()
    .type ('button')
    .value ('Salvar')
    .onclick (salvar_onclick);

  this.sair = new widget.Input ()
    .type ('button')
    .value ('Sair')
    .onclick (sair_onclick);

  widget.Widget.call (this)
    .addWidget (this.url, 'br',
		this.salvar, this.sair)
    .addEvent ('close');

  function salvar_onclick () {
    localStorage.wsURL = that.url.value ();
    that.sair.click ();
  }

  function sair_onclick () {
    that.generateEvent ('close');
  }

}

form.Cfg.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: form.Cfg},
});
