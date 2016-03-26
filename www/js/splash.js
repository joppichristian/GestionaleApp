$(document).ready(function(){
  $("#sez_splash").show();
  $("#sez_login").hide();
  var delay = 6000;
  setTimeout(function() { showLogin() }, delay);

});
function showLogin(){
  $("#sez_splash").hide();
  $("#sez_login").show();
}
