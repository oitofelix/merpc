form.Periodo = function () {
  var that = this;

  that.inicio = new widget.Date ()
    .legendText ('Início');
  that.fim = new widget.Date ()
    .legendText ('Fim');

  widget.Widget.call (that)
    .legendText ('Período')
    .addWidget (that.inicio)
    .addWidget (that.fim);
};

form.Periodo.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: form.Periodo},
  disabled: {value: function (value) {
    if (value === undefined) return this.inicio.disabled () &&
      this.fim.disabled ();

    this.inicio.disabled (value);
    this.fim.disabled (value);
  }},
  focus: {value: function () {
    this.inicio.focus ();
  }},
});
