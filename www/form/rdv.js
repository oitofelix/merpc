form.rdv = {

  html: loadForm ('rdv'),

  load: function () {
    document.getElementById ('form').innerHTML = this.html;
    widget.date.load ();

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
      this.data.node.value = new Date ();

      // NDocumento
      this.NDocumento.node = document.getElementById ('NDocumento');
      this.NDocumento.node.onchange = this.NDocumento.onchange;

      // valor
      this.valor.node = document.getElementById ('valor');
      this.valor.node.onchange = this.valor.onchange;
      this.valor.node.onchange ();

      // quantidade
      this.quantidade.node = document.getElementById ('quantidade');
      this.quantidade.node.onchange = this.quantidade.onchange;
      this.quantidade.node.onchange ();
    }
    
    // naturezaDespesa
    {
      this.naturezaDespesa.node = document.getElementById ('naturezaDespesa');
      this.naturezaDespesa.node.style.display = "none";

      // tipoNatureza
      this.tipoNatureza.node = document.getElementById ('tipoNatureza');
      this.tipoNatureza.node.onchange = this.tipoNatureza.onchange;

      // outraDespesa
      this.outraDespesa.node = document.getElementById ('outraDespesa');
      this.outraDespesa.node.style.display = "none";
    }

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
	form.rdv.NDocumento.node.focus ();
	form.rdv.naturezaDespesa.node.style.display = "block";
	form.rdv.observacoes.node.style.display = "block";
	if (this.value == "V") form.rdv.veiculo.node.style.display = "block";
	else form.rdv.veiculo.node.style.display = "none";
	form.rdv.data.node.onchange ();
	if (this.value !== "R")
	{
	  form.rdv.inicio.node.disabled = true;
	  form.rdv.fim.node.disabled = true;
	} else {
	  form.rdv.inicio.node.disabled = false;
	  form.rdv.fim.node.disabled = false;
	}
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

  NDocumento: {
    onchange: function () {
      this.value = this.value || "0"
      this.value = ("000000000" + this.value).slice (-9)
    },
  },

  valor: {
    onchange: function () {
      this.value = this.value || "0";
      this.value = parseFloat(this.value).toFixed(2);
    },
  },

  quantidade: {
    onchange: function () {
      this.value = this.value || "0";
      this.value = parseFloat(this.value).toFixed(4);
    },
  },
  
  data: {
    onchange: function () {
      if (form.rdv.tipoDespesa.node.value === "C"
	  || form.rdv.tipoDespesa.node.value === "F") {
	if (form.rdv.data.node.value.getDate () < 21) {
	  form.rdv.inicio.node.value = form.rdv.data.node.relative (-1, 21);
	  form.rdv.fim.node.value = form.rdv.data.node.relative (0, 20);
	} else {
	  form.rdv.inicio.node.value = form.rdv.data.node.relative (0, 21);
	  form.rdv.fim.node.value = form.rdv.data.node.relative (1, 20);  
	}
      } else if (form.rdv.tipoDespesa.node.value !== "R") {
	form.rdv.inicio.node.value = form.rdv.data.node.relative (0, 1);
	form.rdv.fim.node.value = form.rdv.data.node.relative (1, 0);
      }     
    },
  },

  naturezaDespesa: {
  },
  
  tipoNatureza: {
    onchange: function () {
      if (this.value === "O") {
	form.rdv.outraDespesa.node.style.display = "block";
	form.rdv.outraDespesa.node.focus ();
      } else {
	form.rdv.outraDespesa.node.style.display = "none";
      }
    },
  },

  outraDespesa: {
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
