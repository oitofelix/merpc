widget.Widget = function () {
  var that = this;

  that.node = document.createElement ('div');
  that.node.style.display = 'inline-block';
  that.node.style.verticalAlign = 'top';
  that.node.style.boxSizing = 'border-box';
  that.node.style.padding = '4px';
  that.node.style.borderWidth = '0px';
  that.node.style.margin = '0px';

  that.fieldset = document.createElement ('fieldset');
  that.fieldset.style.display = 'inline-block';
  that.fieldset.style.verticalAlign = 'top';
  that.fieldset.style.boxSizing = 'border-box';
  that.fieldset.style.margin = '0px';
  that.fieldset.style.borderWidth = '0px';
  that.fieldset.style.padding = '0px';
  that.fieldset.style.width = '100%';

  that.legend = document.createElement ('legend');

  that.node.appendChild (that.fieldset);
  that.appendChild (that.legend);

  that.eventListeners = [];

  return that;
};

widget.Widget.prototype = Object.create (Object.prototype, {
  constructor: {value: widget.Widget},
  legendText: {value: function (value) {
    if (value === undefined) return this.legend.textContent;
    this.legend.textContent = value || '';
    this.fieldset.style.borderWidth = value ? '2px' : '0px';
    this.fieldset.style.padding = value ? '4px' : '0px';
    return this;
  }},
  appendChild: {value: function (node) {
    this.fieldset.appendChild (node);
    return this;
  }},
  addWidget: {value: function (w /*...*/) {
    for (var i = 0; i < arguments.length; i++)
      switch (arguments[i]) {
      case 'br':
	this.fieldset.appendChild (document.createElement ('br'));
	break;
      case 'space':
	var span = document.createElement ('span');
	span.style.display = 'inline-block'
	span.style.width = arguments[++i];
	this.fieldset.appendChild (span);
	break;
      default:
	this.fieldset.appendChild (arguments[i].node);
	break;
      }
    return this;
  }},
  removeWidget: {value: function (w /*...*/) {
    for (var i = 0; i < arguments.length; i++) {
      var w = arguments[i];
      if (w.node.nextElementSibling) {
      	if (w.node.nextElementSibling.tagName === 'BR')
      	  this.fieldset.removeChild (w.node.nextElementSibling);
      } else if (w.node.previousElementSibling) {
      	if (w.node.previousElementSibling.tagName === 'BR')
      	  this.fieldset.removeChild (w.node.previousElementSibling);
      }

      this.fieldset.removeChild (w.node);
    }
    return this;
  }},
  replaceWidget: {value: function (w /*...*/) {
    for (var i = 0; i < arguments.length; i += 2) {
      var currentWidget = arguments[i];
      var newWidget = arguments[i + 1];

      this.fieldset.replaceChild (newWidget.node, currentWidget.node);
    }
    return this;
  }},
  addEvent: {value: function (eventName /*...*/) {
    for (var i = 0; i < arguments.length; i++) {
      var eventName = arguments[i];
      this.eventListeners[eventName] = [];
    }
    return this;
  }},
  addEventListener: {value: function (eventName, eventHandler /*...*/) {
    for (var i = 0; i < arguments.length; i += 2) {
      var eventName = arguments[i];
      var eventHandler = arguments[i + 1];
      if (! this.eventListeners[eventName])
	throw new Error ('Widget event "' + eventName +'" doesn\'t exist.');
      this.eventListeners[eventName].push (eventHandler);
    }
    return this;
  }},
  generateEvent: {value: function (eventName, eventObject) {
    this.eventListeners[eventName].forEach (invokeEventHandler, this);
    return this;

    function invokeEventHandler (eventHandler) {
      eventHandler.call (this, eventObject);
    }
  }},
  width: {value: function (value) {
    if (value === undefined) return this.node.style.width;
    this.node.style.width = value;
    return this;
  }},
  height: {value: function (value) {
    if (value === undefined) return this.node.style.height;
    this.node.style.height = value;
    return this;
  }},
  borderWidth: {value: function (value) {
    if (value === undefined) return this.fieldset.style.borderWidth;
    this.fieldset.style.borderWidth = value;
    return this;
  }},
  padding: {value: function (value) {
    if (value === undefined) return this.node.style.padding;
    this.node.style.padding = value;
    return this;
  }},
  legendTextAlign: {value: function (value) {
    if (value === undefined) return this.legend.style.textAlign;
    this.legend.style.textAlign = value;
    return this;
  }},
  onchange: {value: function (value) {
    if (value === undefined) return this.fieldset.onchange;
    this.fieldset.onchange = value;
    return this;
  }},
  display: {value: function (value) {
    if (value === undefined) return this.node.style.display;
    else this.node.style.display = value;
    return this
  }},
  validate: {value: function (valid, message) {
    var that = this;
    if (valid) return;
    alert (message);
    that.node.style.backgroundColor = 'yellow';
    document.body.addEventListener ('change', normalizeBackground, false);
    if (that.focus) that.focus ();
    throw new Error ('Element not valid');

    function normalizeBackground () {
      that.node.style.backgroundColor = '';
      document.body.removeEventListener ('change', normalizeBackground, false);
    }
  }},
});
