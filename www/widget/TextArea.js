widget.TextArea = function () {
  var that = this;

  that.textArea = document.createElement ('textarea');

  widget.Widget.call (that)
    .appendChild (that.textArea)
    .borderWidth ('0px')
    .legendTextAlign ('left');
}

widget.TextArea.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: widget.TextArea},
  legendText: {value: function (value) {
    if (value === undefined) return this.legend.textContent;
    this.legend.textContent = value || '';
    return this;
  }},
  spellcheck: {value: function (value) {
    if (value === undefined) return this.textArea.spellcheck;
    else this.textArea.spellcheck = value;
    return this
  }},
  placeholder: {value: function (value) {
    if (value === undefined) return this.textArea.placeholder;
    else this.textArea.placeholder = value;
    return this
  }}
});
