form.Itinerario = function () {
  var that = this;

  that.origem = new widget.Input ()
    .legendText ('Origem')
    .maxLength ('100')
    .formatCaps ();

  that.destino = new widget.Input ()
    .legendText ('Destino')
    .maxLength ('100')
    .formatCaps ();

  widget.Widget.call (that)
    .legendText ('Itinerário')
    .addWidget (that.origem, that.destino);
};

form.Itinerario.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: form.Itinerario},
  focus: {value: function () {
    this.origem.focus ();
  }},
});
