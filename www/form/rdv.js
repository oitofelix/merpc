form.rdv = {

  html: loadForm ('rdv'),

  load: function () {
    document.getElementById ('form').innerHTML = this.html;

    // tipoDespesa
    this.tipoDespesa.node = document.getElementById ('tipoDespesa');
    this.tipoDespesa.node.onchange = this.tipoDespesa.onchange;

    // periodo
    {
      this.periodo.node = document.getElementById ('periodo');
      this.periodo.node.style.display = "none";

      this.inicio.node = document.getElementById ('inicio');
      this.fim.node = document.getElementById ('fim');
    }
    // NFCupom
    {
      this.NFCupom.node = document.getElementById ('NFCupom');
      this.NFCupom.node.style.display = "none";

      // data
      this.data.node = document.getElementById ('data');
      this.data.node.onchange = this.data.onchange;
      this.data.node.value = new Date ().toISOString ().substr (0, 10);
    }
    
    // naturezaDespesa
    this.naturezaDespesa.node = document.getElementById ('naturezaDespesa');
    this.naturezaDespesa.node.style.display = "none";

    // observacoes
    this.observacoes.node = document.getElementById ('observacoes');
    this.observacoes.node.style.display = "none";

    // veiculo
    this.veiculo.node = document.getElementById ('veiculo');
    this.veiculo.node.style.display = "none";

    // incluir
    this.incluir.node = document.getElementById ('incluir');
    this.incluir.node.disabled = true;
    this.incluir.node.onclick = this.incluir.onclick;

    // sair
    this.sair.node = document.getElementById ('sair');
    this.sair.node.onclick = this.sair.onclick;
  },

  tipoDespesa: {
    onchange: function () {
      if (this.value) {
	form.rdv.periodo.node.style.display = "block";
	form.rdv.NFCupom.node.style.display = "block";
	form.rdv.naturezaDespesa.node.style.display = "block";
	form.rdv.observacoes.node.style.display = "block";
	if (this.value == "V") form.rdv.veiculo.node.style.display = "block";
	else form.rdv.veiculo.node.style.display = "none";
	form.rdv.data.node.onchange ();
      } else {
	form.rdv.periodo.node.style.display = "none";
	form.rdv.NFCupom.node.style.display = "none";
	form.rdv.naturezaDespesa.node.style.display = "none";
	form.rdv.observacoes.node.style.display = "none";
	form.rdv.veiculo.node.style.display = "none";	
      }
    },
  },

  periodo: {
  },

  inicio: {
    
  },

  fim: {
    
  },

  NFCupom: {
  },

  data: {
    onchange: function () {
      var date =
	  new Date (Date.parse (form.rdv.data.node.value)
		    + new Date ().getTimezoneOffset() * 60 * 1000);
      if (form.rdv.tipoDespesa.node.value == "C"
	  || form.rdv.tipoDespesa.node.value == "F") {
	if (date.getDate () < 21) {
	  form.rdv.inicio.node.value = dateRelative (date, -1, 21);
	  form.rdv.fim.node.value = dateRelative (date, 0, 20);
	} else {
	  form.rdv.inicio.node.value = dateRelative (date, 0, 21);
	  form.rdv.fim.node.value = dateRelative (date, 1, 20);  
	}
      } else {
	form.rdv.inicio.node.value = dateRelative (date, 0, 1);
	form.rdv.fim.node.value = dateRelative (date, 1, 0);
      }     
    },
  },
  
  naturezaDespesa: {
  },
  
  observacoes: {
  },

  veiculo: {
  },

  incluir: {
    onclick: function () {
      
    },
  },

  sair: {
    onclick: function () {
      form.environment.load ();
    },
  },

}
