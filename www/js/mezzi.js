var json = new Array();
var index=0;
var id=0;

$(document).ready(function() {
	if(getUrlVars()['nomeDB']=="")
		window.location.replace("index.html");
	
	if(getUrlVars()["cME"]==0)
		$("#cME").hide();
	else
		$("#cME").show();
	
	if(getUrlVars()["aME"]==0)
		$("#aME").hide();
	else
		$("#aME").show();
		
	if(getUrlVars()["mME"]==0)
		$("#mME").hide();
	else
		$("#mME").show();


	$("#info").show();
	$("#modifica_mezzo").hide();
	$("#search").on('input',function() {
		var tmp = $("#search").val();
		populateList(tmp);
	});
	$("#modify").click( function() {
		completaForm();	
	});
	$("#invia_dati").click( function() {
		modifyMezzo();	
	});
	$("#annulla_modify").click( function() {
		explodeMezzo(json[0]);	
	});
	$("#delete").click( function() {
		$("#modal_cancellazione").openModal();
	});
	$("#yes").click(function(){
		$("#modal_cancellazione").closeModal();
		deleteMezzo();
	});
	$("#no").click(function(){
		$("#modal_cancellazione").closeModal();
	});
	
	$("#toDashBoard").attr("href","dashboard.html?nomeDB="+getUrlVars()["nomeDB"]+"&classe_privilegi="+getUrlVars()["classe_privilegi"]+"&id_dipendente="+getUrlVars()["id_dipendente"]);
	$("#toListMe").attr("href","mezzi.html?classe_privilegi="+getUrlVars()["classe_privilegi"]+"&nomeDB="+getUrlVars()["nomeDB"]+"&vME="+getUrlVars()["vME"]+"&aME="+getUrlVars()["aME"] + "&cME=" + getUrlVars()["cME"] + "&mME=" + getUrlVars()["mME"]+"&id_dipendente="+getUrlVars()["id_dipendente"]);
	$("#aME").attr("href","addMezzo.html?classe_privilegi="+getUrlVars()["classe_privilegi"]+"&nomeDB="+getUrlVars()["nomeDB"]+"&vME="+getUrlVars()["vME"]+"&aME="+getUrlVars()["aME"] + "&cME=" + getUrlVars()["cME"] + "&mME=" + getUrlVars()["mME"]+"&id_dipendente="+getUrlVars()["id_dipendente"]);

	
	populateList("");

});


function populateList(filter){

	$.ajax({
      dataType: "json",
      url: "http://dashboard.gestionaleclj.com/script_php/getMezzi.php?q="+ filter+"&db="+getUrlVars()['nomeDB'], //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json = data;
        console.log(data);
        var elementi = new Array();
         $("#elenco").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        
	        elementi[i].innerHTML = '<div class="explode"><i class="info small material-icons brown-text">directions_bus</i>'+data[i]['descrizione']+'<a href="#!" class="secondary-content"><i class="material-icons brown-text">&#xE0B5;</i></a></div>	';
	    	
	    	
	    	$("#elenco").append(elementi[i]);


	    }
	    id = data[0]['id'];

		explodeMezzo(data[0]);
		$(".explode").click(function(){
	        index = $(".explode").index(this);
	        id = json[index]['id'];      
	        explodeMezzo(json[index]);      
        });
      },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

    //return false;

}
function explodeMezzo(mezzo){
	$("#modifica_mezzo").hide();
	$("#info").show();
	$("#descrizione").empty();
	$("#prezzo").empty();
	$("#costo").empty();
	$("#note").empty();
	$("#logo_mezzo").empty();
	
	$("#logo_mezzo").append('<i id="logo_mezzo" class="large material-icons brown-text">&#xE530;</i>');
	$("#descrizione").append('<div class="brown-text" style="margin-left:15%;">Descrizione </div><i class="info small material-icons brown-text">&#xE3C7;</i>'+mezzo['descrizione']);
   	if(mezzo['prezzo'] != null && mezzo['prezzo'] != "")
       $("#prezzo").append('<div class="brown-text" style="margin-left:15%;">Prezzo</div><i class="info small material-icons brown-text">&#xE227;</i>'+mezzo['prezzo']+ '&euro;');
    if(mezzo['costo'] != null && mezzo['costo'] != "") 
		$("#costo").append('<div class="brown-text" style="margin-left:15%;">Costo</div><i class="info small material-icons brown-text">&#xE227;</i>'+mezzo['costo']+ '&euro;');
    if(mezzo['note'] != null && mezzo['note'] != "")
       $("#note").append('<div class="brown-text" style="margin-left:15%;">Note</div><i class="info small material-icons brown-text">&#xE0CA;</i>'+mezzo['note']);
}

function deleteMezzo(){

					$.ajax({
				      url: "http://dashboard.gestionaleclj.com/script_php/deleteMezzi.php", //Relative or absolute path to response.php file
				      type:"POST",
				      data:{'id': id,'db':getUrlVars()['nomeDB']},
				      success: function(data) {
					      Materialize.toast('Mezzo eliminato', 2000);
					      populateList("");
					  },
				      error: function(xhr){
					     console.log(xhr.status);
				      }
				    });

}

function completaForm(){
	if(json[index]['tipologia'] == 'p')
		$("#div_iva").hide();
	else
		$("#div_iva").show();
	$("#modifica_mezzo").show();
	$("#info").hide();
	$("#form_descrizione").val(json[index]['descrizione']);
	$("#form_costo").val(json[index]['costo']);
	$("#form_costo").focus();
	$("#form_prezzo").val(json[index]['prezzo']);
	$("#form_prezzo").focus();
	$("#form_note").val(json[index]['note']);
	$("#form_note").focus();
	$("#form_descrizione").focus();
	}
function modifyMezzo(){
	var descrizione = $("#form_descrizione").val();
	var prezzo = $("#form_prezzo").val();
	var costo = $("#form_costo").val();
	var note = $("#form_note").val();

	$.ajax({
	     url: "http://dashboard.gestionaleclj.com/script_php/updateMezzi.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'descrizione':descrizione,
		      'prezzo':prezzo,
		      'costo':costo,
		      'note':note,
		      'id':json[index]['id'],
		      'db':getUrlVars()['nomeDB']
		   },
		   success: function(data){
			   Materialize.toast('Mezzo modificato', 2000,'',function(){populateList("");});
			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
		   		Materialize.toast('Errore di modifica', 2000);
			    return false;

			}
		});		
}
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	vars[key] = value;
	});
	return vars;
}