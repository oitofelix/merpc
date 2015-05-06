widget.Browser = function () {
  var that = this;

  that.form = new widget.Widget ();

  that.include = new widget.Input ()
    .title ('Incluir')
    .type ('image')
    .maxWidth ('48px')
    .src ('img/include.png')
    .onclick (include);

  that.exclude = new widget.Input ()
    .title ('Excluir')
    .type ('image')
    .maxWidth ('48px')
    .src ('img/exclude.png');

  that.update = new widget.Input ()
    .title ('Atualizar')
    .type ('image')
    .maxWidth ('48px')
    .src ('img/update.png');

  that.query = new widget.Input ()
    .title ('Consultar')
    .type ('image')
    .maxWidth ('48px')
    .src ('img/query.png');

  that.close = new widget.Input ()
    .title ('Fechar')
    .type ('image')
    .maxWidth ('48px')
    .src ('img/close.png')
    .onclick (close);

  widget.Widget.call (that)
    .addWidget (that.form, 'br',
		that.include, that.exclude, that.update, that.query,
		'space', '48px', that.close)
    .addEvent ('close');

  function include () {
    if (! that.form.validation ()) return false;
    return false;
  }

  function close () {
    that.generateEvent ('close');
    return false;
  }

};

widget.Browser.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: widget.Browser},
  useForm: {value: function (value) {
    if (value === undefined) return this.form;
    this.replaceWidget (this.form, value);
    this.form = value;
    return this;
  }},
});
