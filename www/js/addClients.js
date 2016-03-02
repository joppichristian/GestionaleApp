var response;

$(document).ready(function(){
	if(getUrlVars()['nomeDB']=="")
		window.location.replace("index.html");
	if(getUrlVars()["aCL"]==0)
		window.location.replace("dashboard.html?nomeDB="+getUrlVars()["nomeDB"]+"&classe_privilegi="+getUrlVars()["classe_privilegi"]);
	$('select').material_select();
	$("#div_iva").hide();
	$("#tipologia").on("change",function(){
		if($(this).val() == 'p')
		{
			$("#label_nominativo").text( "Nominativo");
			$("#div_iva").hide();
			$("#icon_prefix").text("account_circle");
		}
		else if ($(this).val() == 'a')
		{
			$("#label_nominativo").text("Ragione Sociale");
			$("#div_iva").show();
			$("#icon_prefix").text("business");
		}
	}) ;
	$("#invia_dati").on("click",function(){
		addCliente();

	});
	$("#toDashBoard").attr("href","dashboard.html?nomeDB="+getUrlVars()["nomeDB"]+"&classe_privilegi="+getUrlVars()["classe_privilegi"]);
	$("#toListCl").attr("href","clienti.html?classe_privilegi="+getUrlVars()["classe_privilegi"]+"&nomeDB="+getUrlVars()["nomeDB"]+"&vCL="+getUrlVars()["vCL"]+"&aCL="+getUrlVars()["aCL"] + "&cCL=" + getUrlVars()["cCL"] + "&mCL=" + getUrlVars()["mCL"]);
});


function addCliente(){
		if($("#nominativo").val() == ""){
			Materialize.toast('Nominativo o Ragione Sociale Obbligatoria', 2000);
			return false;
		}
		var nominativo = $("#nominativo").val();
		var indirizzo = $("#indirizzo").val();
		var citta = $("#citta").val();
		var cap = $("#cap").val();
		var provincia = $("#prov").val();
		var telefono = $("#telephone").val();
		var cellulare = $("#mobile").val();
		var codice_fiscale = $("#code").val();
		var p_iva = $("#iva").val();
		var email = $("#email").val();
		var sito = $("#site").val();
		var note = $("#note").val();
		var tipologia = $("#tipologia").val();
		
		$.ajax({
	      url: "http://dashboard.gestionaleclj.com/script_php/postClients.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'nominativo': nominativo,
		      'indirizzo':indirizzo,
		      'citta':citta,
		      'cap':cap,
		      'provincia':provincia,
		      'telefono':telefono,
		      'cellulare':cellulare,
		      'cf':codice_fiscale,
		      'piva':p_iva,
		      'email':email,
		      'site':sito,
		      'note':note,
		      'tipologia':tipologia,
		      'db':getUrlVars()['nomeDB']
		   },
		   success: function(data){		   
		   		Materialize.toast('Cliente inserito', 2000,'',function(){window.location.href = 'clienti.html'});
			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
			   Materialize.toast('Errore di inserimento', 2000);
			    return false;

			}
		});		
		return false;
}
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	vars[key] = value;
	});
	return vars;
}
