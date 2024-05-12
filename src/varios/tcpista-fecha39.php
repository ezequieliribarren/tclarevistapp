<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>TC Pista en San Juan | Tiempos en vivo, Fotos, Videos, Entrevistas</title>

  <meta http-equiv="Pragma" content="no-cache">
<meta name="viewport" content="width=729">
<script type="text/javascript" src="textanimation.js"></script>
<script type="text/javascript" src="indexanimation.js"></script>
<script type="text/javascript" src="appearimages.js"></script>
<script src="/js/jquery-3.1.1.min.js"></script>
<script src="/js/lightbox-2.6.min.js"></script>
<script type="text/javascript" src="encuesta.js"></script>
<script src="code_news.js"></script>
<script src="efectos.js"></script>
<script src="funciones_campeonato.js"></script>
<script src="cuenta_regresiva.js"></script>
<link href="/css/lightbox2.css" rel="stylesheet" />
<link href="favicon.ico" type="image/x-icon" rel="shortcut icon" />
<link href="stylesheading.css" type="text/css" rel="stylesheet" media="screen, projection" />
<link href="textpropierties.css" type="text/css" rel="stylesheet" media="screen, projection" />
<link href="livestreamming.css" type="text/css" rel="stylesheet" media="screen, projection" />
<link href="paddingsimulation.css" type="text/css" rel="stylesheet" media="screen, projection" />
<link href="pluginsperformance.css" type="text/css" rel="stylesheet" media="screen, projection" />
<link href="styleshead.css" type="text/css" rel="stylesheet" media="screen, projection" />
<link type="text/css" rel="stylesheet" href="estilos_nuevos.css" media="screen">
<link type="text/css" rel="stylesheet" href="estilogaleria.css" media="screen">
<link type="text/css" rel="stylesheet" href="estilogaleria_nueva.css" media="screen">
<script type='text/javascript' src='lightbox_news.js'></script>
<script src="/SpryAssets/SpryEffects.js" type="text/javascript"></script>
<!--[if IE]>
<style type="text/css">
html .menuenvivo{margin-left:8px;}
html .alternativo1{margin-top:-15px;}
html .alternativo2{margin-top:-30px;}
html .alternativo3{margin-top:-45px; margin-left:333px;}
html .alternativo4{margin-top:-60px; margin-left:444px;}
html .cabezanoticias{margin-left:-16px;}
html .cabezavideos{margin-left:-16px;}
html .imagenvideo_btn{margin-left:15px;}
html .masvideos{margin-left:-15px;}
html .textomasvideos{margin-left:-55px;}
html .nav {margin-top:0px;}
html .nav li ul {padding:33px; margin-left:-160px;}
html .nav1 {margin-top:0px;}
html .nav1 li ul {padding:33px; margin-left:-213px;}
html .nrPanel0 {margin-top:-34px;}
html .nrPanel1 {margin-top:-28px;}
</style>

<![endif]-->


<style type="text/css">
<!--
body {
	background-color: #EEEEEE;
	background-image: url(cabezatcp.jpg);
	background-repeat: no-repeat;
	background-position:top;
}

-->
</style></head>
<script>
$(document).ready(function(){
        setInterval(function() {
            $("#tandas_resultados").load("tcpista-fecha39-tandas.html?" + Math.random());
        }, 20000);
    });
	
	
	$(document).ready(function(){
        setInterval(function() {
            $("#cuadro_noticias").load("tcpista-fecha39-noticias.html?" + Math.random());
        }, 120000);
    });
	
	
	$(document).ready(function(){
        setInterval(function() {
            $("#comentarios").load("onlineTCPf39.php?" + Math.random());
        }, 20000);
    });
	$("html, body").animate({
    scrollTop: 230
}, 1000);
</script>
<body onload="MM_preloadImages('camara.png','boton fecha tcp activo.png','boton fecha wrc activo.png','up_noticias.jpg','down_noticias.jpg')">
<?php
$carga=file_get_contents('cabeza web.html');
echo $carga;
?>
<div class="con_margen">
<?php
$carga=file_get_contents('tcpista-fecha39-cabeza.html');
echo $carga;
?>

  <table width="100%" height="30" border="0" align="center" cellpadding="0" cellspacing="0">
    <tr>
      <td></td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td>
	  
	  
	  
	  
<script type="text/javascript">
   
   
   
      jQuery.ajaxSetup({
  beforeSend: function() {
	$('#loader').removeClass('desaparecido');
	$('#contenido').addClass('desaparecido');
  },
  success: function() {
  
	$('#loader').addClass('desaparecido');
	$('#contenido').removeClass('desaparecido');
	}
});


	   window.onload = function() {
   $("#contenido").load("tcpista-fecha39-resultados.php?" + Math.random());
};
function resultados() {
			$('#resultados').addClass('boton_activo');
			$('#videos').removeClass('boton_activo');
			$('#noticias').removeClass('boton_activo');
			$('#campeonato_fecha').removeClass('boton_activo');
            $("#contenido").load("tcpista-fecha39-resultados.php?" + Math.random());
        
	};
	function fotos() {
			$('#resultados').removeClass('boton_activo');
			$('#videos').removeClass('boton_activo');
			$('#noticias').removeClass('boton_activo');
			$('#campeonato_fecha').removeClass('boton_activo');
            $("#contenido").load("tcpista-fecha39-fotos.php?" + Math.random());
	};
	function videos() {
			$('#resultados').removeClass('boton_activo');
			$('#videos').addClass('boton_activo');
			$('#noticias').removeClass('boton_activo');
			$('#campeonato_fecha').removeClass('boton_activo');
            $("#contenido").load("tcpista-fecha39-videos.php?" + Math.random());
	};
	function noticias() {
			$('#resultados').removeClass('boton_activo');
			$('#videos').removeClass('boton_activo');
			$('#noticias').addClass('boton_activo');
			$('#campeonato_fecha').removeClass('boton_activo');
            $("#contenido").load("tcpista-fecha39-noticias.php?" + Math.random());
	};
	function campeonato() {
			$('#resultados').removeClass('boton_activo');
			$('#videos').removeClass('boton_activo');
			$('#noticias').removeClass('boton_activo');
			$('#campeonato_fecha').addClass('boton_activo');
            $("#contenido").load("tcpista-posiciones_fecha.php?" + Math.random());
        
		
	};
	
</script>

	  
	  
	
	  
	  
	  
	  <table id="encabezado_monitoreo" width="100%" border="0" cellspacing="0" cellpadding="5">
        <tr>
          <td id="resultados" class="boton_activo" onclick="resultados()" width="20%" align="center">RESULTADOS</td>
          <td id="videos" onclick="videos()" width="20%" align="center">VIDEOS</td>
          <td id="noticias" onclick="noticias()" width="20%" align="center">NOTICIAS</td>
          <td id="campeonato_fecha" onclick="campeonato()" width="20%" align="center">CAMPEONATO</td>
        </tr>
      </table></td>
    </tr>
  </table>
  <table width="100%" height="760" border="0" cellpadding="0" cellspacing="0" class="centro_de_monitoreo">
    <tr>
      <td valign="top">
	  
	   <div align="center" id='loader'><img src="preloader.gif"/></div>
	  <div id="contenido" style="padding:12px"></div></td>
    </tr>
  </table>
  <table width="100%" height="10" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td></td>
  </tr>
</table></div>
<?php
$carga=file_get_contents('pie web.html');
echo $carga;
?>

</body>
</html>
