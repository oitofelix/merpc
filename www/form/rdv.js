form.rdv = {

  html: loadForm ('rdv'),

  load: function () {
    document.getElementById ('form').innerHTML = this.html;

    // tipoDespesa
    this.tipoDespesa.node = document.getElementById ('tipoDespesa');
    this.tipoDespesa.node.onchange = this.tipoDespesa.onchange;

    // periodo
    this.periodo.node = document.getElementById ('periodo');
    this.periodo.node.style.display = "none";

    // NFCupom
    {
      this.NFCupom.node = document.getElementById ('NFCupom');
      this.NFCupom.node.style.display = "none";

      // data
      this.data.node = document.getElementById ('data');
      var date = new Date();
      var day = date.getDate();
      day = day < 10 ? "0" + day : day;
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var year = date.getFullYear();
      this.data.node.value =  year + "-" + month  + "-" + day;
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

  NFCupom: {
  },

  data: {
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
