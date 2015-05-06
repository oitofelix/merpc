form.Veiculo = function () {
  var that = this;

  that.modelo = new widget.Input ()
    .legendText ('Modelo')
    .type ('text')
    .formatCaps ();

  that.placa = new widget.Input ()
    .legendText ('Placa')
    .type ('text')
    .maxLength ('8')
    .placeholder ('AAA-0000')
    .formatCaps ();

  widget.Widget.call (that)
    .legendText ('Veículo')
    .addWidget (that.modelo, that.placa);

  // function placaMask () {
  //   if (this.value.length === 3
  // 	&& arguments.callee.lastValue.length
  // 	< this.value.length) this.value += '-'
  //   if (this.value.length === 4
  // 	&& this.value.charAt (3) !== '-')
  //     this.value = this.value.slice (0, 3) + '-' + this.value.slice (3);
  //   this.value = this.value.toUpperCase ();
  //   arguments.callee.lastValue = this.value;
  // }
};

form.Veiculo.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: form.Veiculo},
  focus: {value: function () {
    this.modelo.focus ();
  }},
});
