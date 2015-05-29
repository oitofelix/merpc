widget.Input = function () {
  var that = this;

  that.input = document.createElement ('input');

  widget.Widget.call (this)
    .appendChild (this.input)
    .borderWidth ('0px')
    .legendTextAlign ('left');

};

widget.Input.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: widget.Input},
  legendText: {value: function (value) {
    if (value === undefined) return this.legend.textContent;
    this.legend.textContent = value || '';
    return this;
  }},
  type: {value: function (value) {
    if (value === undefined) return this.input.type;
    switch (value) {
    case 'number':
      this.textAlign ('right');
      break;
    case 'image':
      this.legendTextAlign ('center');
      break;
    }
    this.input.type = value;
    return this;
  }},
  title: {value: function (value) {
    if (value === undefined) return this.input.title;
    this.input.title = value;
    return this;
  }},
  value: {value: function (value) {
    if (value === undefined) return this.input.value;
    this.input.value = value;
    return this;
  }},
  placeholder: {value: function (value) {
    if (value === undefined) return this.input.placeholder;
    this.input.placeholder = value;
    return this;
  }},
  size: {value: function (value) {
    if (value === undefined) return this.input.size;
    this.input.size = value;
    return this;
  }},
  maxLength: {value: function (value) {
    if (value === undefined) return this.input.maxLength;
    this.input.maxLength = value;
    return this;
  }},
  step: {value: function (value) {
    if (value === undefined) return this.input.step;
    this.input.step = value;
    return this;
  }},
  oninput: {value: function (value) {
    if (value === undefined) return this.input.oninput;
    this.input.oninput = value;
    return this;
  }},
  src: {value: function (value) {
    if (value === undefined) return this.input.src;
    this.input.src = value;
    return this;
  }},
  onclick: {value: function (value) {
    if (value === undefined) return this.input.onclick;
    this.input.onclick = value;
    return this;
  }},
  onkeypress: {value: function (value) {
    if (value === undefined) return this.input.onkeypress;
    this.input.onkeypress = value;
    return this;
  }},
  maxWidth: {value: function (value) {
    if (value === undefined) return this.input.style.maxWidth;
    this.input.style.maxWidth = value;
    return this;
  }},
  disabled: {value: function (value) {
    if (value === undefined) return this.input.disabled;
    this.input.disabled = value;
    return this;
  }},
  click: {value: function () {
    this.input.click ();
  }},
  textAlign: {value: function (value) {
    if (value === undefined) return this.input.style.textAlign;
    this.input.style.textAlign = value;
    return this;
  }},
  focus: {value: function () {
    this.input.focus ();
    this.input.select ();
  }},
  onchange: {value: function (value) {
    if (value === undefined) return this.input.onchange;
    this.input.onchange = value;
    return this;
  }},
  oninput: {value: function (value) {
    if (value === undefined) return this.input.oninput;
    this.input.oninput = value;
    return this;
  }},
  formatCaps: {value: function () {
    this.input.addEventListener ('change', format, false);
    return this;

    function format () {
      this.value = this.value.toUpperCase ();
    }
  }},
  disableImage: {value: function () {
    this.input.style.opacity = '0.3';
    return this;
  }},
  enableImage: {value: function () {
    this.input.style.opacity = '';
    return this;
  }},
});
