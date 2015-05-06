widget.P = function () {
  this.p = [];

  widget.Widget.call (this);
};

widget.P.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: widget.P},
  addParagraph: {value: function (value) {
    var p = document.createElement ('p');
    p.textContent = value || '';
    this.p.push (p);
    this.appendChild (p);
    return this;
  }},
});
