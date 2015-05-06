form.NFCupom = function () {
  var that = this;

  that.data = new widget.Date ()
    .legendText ('Data')
    .value (new Date());

  that.id = new widget.Input ()
    .legendText ('Nº Documento')
    .type ('text')
    .maxLength ('9')
    .placeholder ('000000000')
    .textAlign ('right')
    .onchange (idMask);

  that.valor = new widget.Input ()
    .legendText ('Valor')
    .type ('number')
    .step ('0.01')
    .placeholder ('0.00')
    .onchange (valorMask);

  that.quantidade = new widget.Input ()
    .legendText ('Quantidade')
    .type ('number')
    .step ('0.0001')
    .placeholder ('0.0000')
    .onchange (quantidadeMask);

  widget.Widget.call (that)
    .legendText ('NF/Cupom')
    .addWidget (that.data, that.id, 'br',
		that.valor, that.quantidade);

  function idMask () {
    if (this.value)
      this.value = ('000000000' + this.value).slice (-9);
  }

  function valorMask () {
    if (this.value)
      this.value = parseFloat(this.value).toFixed(2);
  }

  function quantidadeMask () {
    if (this.value)
      this.value = parseFloat(this.value).toFixed(4);
  }

};

form.NFCupom.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: form.NFCupom},
  focus: {value: function () {
    this.id.focus ();
  }},
});
