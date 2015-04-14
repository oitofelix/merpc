widget.date = {

  load: function () {
    loadCSS ('widget/date.css')

    // Day
    var dayHTML = '<option></option>';
    for (var i = 1; i <= 31; i++) {
      dayHTML += '<option value="' + i + '">' + ("00" + i).slice (-2)
	+ '</option>';
    }

    // Month
    var monthList = ['Janeiro', 'Fevereiro', 'Março', 'Abril',
		     'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
		     'Outubro', 'Novembro', 'Dezembro'];
    var monthHTML = '<option></option>';
    for (var i = 0; i < monthList.length; i++) {
      monthHTML += '<option value="' + i + '">'
	+ monthList[i] + '</option>'
    }

    // Year
    var yearHTML = '<option></option>';
    for (var i = -1; i <= 1; i++) {
      yearHTML += '<option>' + (new Date ().getFullYear () + i)
	+ '</option>'
    }

    // Widget insertion
    var elements = document.getElementsByClassName ("date");
    for (var i = 0; i < elements.length; i++) {
      elements[i].innerHTML += ''
	+ '<label style="width: 15%;">'
	+ '  <select class="day">'
	+ dayHTML
	+ '  </select>'
	+ '</label>'
	+ '<label style="width: 55%;">'
	+ '  <select class="month">'
	+ monthHTML
	+ '  </select>'
	+ '</label>'
	+ '<label style="width: 30%;">'
	+ '  <select class="year">'
	+ yearHTML
	+ '  </select>'
	+ '</label>'

      elements[i].addEventListener ("change", (function (element) {
	return function () {
	  var day = element.getElementsByClassName ("day")[0];
	  var month = element.getElementsByClassName ("month")[0];
	  var year = element.getElementsByClassName ("year")[0];

	  if (day.value && month.value && year.value) 
	    element.value = new Date (year.value, month.value,
				      day.value);
	}
      }) (elements[i]), false);
      
      // value
      Object.defineProperty (elements[i], "value", {
	get: (function (element) {
	  return function () {
	    var day = element.getElementsByClassName ("day")[0];
	    var month = element.getElementsByClassName ("month")[0];
	    var year = element.getElementsByClassName ("year")[0];
	  
	    if (day.value && month.value && year.value)
	      return new Date (year.value, month.value, day.value);
	    else return undefined;
	  };
	}) (elements[i]),

	set: (function (element) {
	  return function (date) {
	    var day = element.getElementsByClassName ("day")[0];
	    var month = element.getElementsByClassName ("month")[0];
	    var year = element.getElementsByClassName ("year")[0];

	    if (date)
	    {
	      day.value = date.getDate ();
	      month.value = date.getMonth ();
	      year.value = date.getFullYear ();
	    } else {
	      day.value = month.value = year.value = '';
	    }
	  };
	}) (elements[i]),});

      // disabled
      Object.defineProperty (elements[i], "disabled", {
	get: (function (element) {
	  return function () {
	    var day = element.getElementsByClassName ("day")[0];
	    var month = element.getElementsByClassName ("month")[0];
	    var year = element.getElementsByClassName ("year")[0];

	    return day.disabled && month.disabled && year.disabled;
	  };
	}) (elements[i]),

	set: (function (element) {
	  return function (disabled) {
	    var day = element.getElementsByClassName ("day")[0];
	    var month = element.getElementsByClassName ("month")[0];
	    var year = element.getElementsByClassName ("year")[0];

	    day.disabled = disabled;
	    month.disabled = disabled;
	    year.disabled = disabled;	  
	  };
	}) (elements[i]),});

      // relative
      elements[i].relative = (function (element) {
	return function (monthOffset, day) {
	  var month = element.getElementsByClassName ("month")[0];
	  var year = element.getElementsByClassName ("year")[0];

	  return new Date (year.value, + month.value + monthOffset, day)
	};
      }) (elements[i]);
    }   
  },
};
