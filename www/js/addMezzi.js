var response;

$(document).ready(function(){
	if(getUrlVars()["nomeDB"]=="")
		window.location.replace("index.html");

	$("#invia_dati").on("click",function(){
		addMezzo();

	});
	
	$("#toDashBoard").attr("href","dashboard.html?nomeDB="+getUrlVars()["nomeDB"]+"&classe_privilegi="+getUrlVars()["classe_privilegi"]);
	$("#toListMe").attr("href","mezzi.html?classe_privilegi="+getUrlVars()["classe_privilegi"]+"&nomeDB="+getUrlVars()["nomeDB"]+"&vME="+getUrlVars()["vME"]+"&aME="+getUrlVars()["aME"] + "&cME=" + getUrlVars()["cME"] + "&mME=" + getUrlVars()["mME"]+"&id_dipendente="+getUrlVars()["id_dipendente"]);

});


function addMezzo(){
		if($("#descrizione").val() == ""){
			   Materialize.toast('Descrizione Obbligatoria', 2000);
			   return false;
		}
		var descrizione = $("#descrizione").val();
		var prezzo = $("#prezzo").val();
		var costo = $("#costo").val();
		var note = $("#note").val();
		$.ajax({
	      url: "http://dashboard.gestionaleclj.com/script_php/postMezzi.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'descrizione':descrizione,
		      'prezzo':prezzo,
		      'costo':costo,
		      'note':note,
		      'db':getCookie('nomeDB')
		   },
		   success: function(data){		   
		   		Materialize.toast('Mezzo inserito', 2000,'',function(){window.location.href = "mezzi.html?classe_privilegi="+getUrlVars()["classe_privilegi"]+"&nomeDB="+getUrlVars()["nomeDB"]+"&vME="+getUrlVars()["vME"]+"&aME="+getUrlVars()["aME"] + "&cME=" + getUrlVars()["cME"] + "&mME=" + getUrlVars()["mME"]+"&id_dipendente="+getUrlVars()["id_dipendente"]});
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