widget.Select = function () {
  var that = this;

  that.select = document.createElement ('select');
  that.select.addEventListener ('change', processObjects, false)

  that.objects = {};
  that.currentWidgets = [];

  widget.Widget.call (that)
    .appendChild (that.select)
    .borderWidth ('0px')
    .legendTextAlign ('left');

  function processObjects () {
    for (var i = 0; i < that.currentWidgets.length; i++)
      that.removeWidget (that.currentWidgets[i]);

    that.currentWidgets = [];

    if (! that.objects[this.value]) return;
    for (var i = 0; i < that.objects[this.value].length; i++) {
      var object = that.objects[this.value][i];
      if (object instanceof Function) object.call (this);
      else if (object instanceof widget.Widget) {
	that.addWidget ('br', object);
	that.currentWidgets.push (object);
      }
    }
    if (that.currentWidgets[0] && that.currentWidgets[0].focus)
      that.currentWidgets[0].focus ();
  }
};


widget.Select.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: widget.Select},
  legendText: {value: function (value) {
    if (value === undefined) return this.legend.textContent;
    this.legend.textContent = value || '';
    return this;
  }},
  addOption: {value: function (value, text, object /*...*/) {
    for (var i = 0; i < arguments.length; i += 3) {
      var value = arguments[i];
      var text = arguments[i + 1];
      var objects = arguments[i + 2];

      var option = document.createElement ('option');
      option.value = value;
      option.text = text;
      this.select.add (option);

      if (objects && ! (objects instanceof Array)) {
	objects = [objects];
      }

      if (objects) this.objects[value] = objects;
    }
    return this;
  }},
  value: {value: function (value) {
    if (value === undefined) return this.select.value;
    var oldValue = this.select.value;
    this.select.value = value;
    if (oldValue !== value) {
      var onchange = document.createEvent ("event");
      onchange.initEvent ('change', true, true);
      this.select.dispatchEvent (onchange);
    }

    return this;
  }},
  disabled: {value: function (value) {
    if (value === undefined) return this.select.disabled;
    this.select.disabled = value;
    return this;
  }},
  focus: {value: function () {
    this.select.focus ();
  }},
});
