var response;

$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");

	$("#invia_dati").on("click",function(){
		addMateriale();

	});
	
	$("#toDashBoard").attr("href","dashboard.html?nomeDB="+getUrlVars()["nomeDB"]+"&classe_privilegi="+getUrlVars()["classe_privilegi"]);
	$("#toListMa").attr("href","materiali.html?classe_privilegi="+getUrlVars()["classe_privilegi"]+"&nomeDB="+getUrlVars()["nomeDB"]+"&vMA="+getUrlVars()["vMA"]+"&aMA="+getUrlVars()["aMA"] + "&cMA=" + getUrlVars()["cMA"] + "&mMA=" + getUrlVars()["mMA"]);

});


function addMateriale(){
		if($("#descrizione").val() == ""){
			   Materialize.toast('Descrizione Obbligatoria', 2000);
			   return false;
		}
		var descrizione = $("#descrizione").val();
		var codice = $("#codice").val();
		var prezzo = $("#prezzo").val();
		var costo = $("#costo").val();
		var note = $("#note").val();
		$.ajax({
	      url: "http://dashboard.gestionaleclj.com/script_php/postMaterials.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'codice':codice,
		      'descrizione':descrizione,
		      'prezzo':prezzo,
		      'costo':costo,
		      'note':note,
		      'db':getCookie('nomeDB')
		   },
		   success: function(data){		   
		   		Materialize.toast('Materiale inserito', 2000,'',function(){window.location.href = 'materiali.html'});
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