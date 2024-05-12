<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Documento sin t&iacute;tulo</title>
<meta http-equiv="Pragma" content="no-cache" />
<style type="text/css">
<!--
body {
	background-color: #FFFFFF;
	font-family:Oswald;
	font-weight:lighter;
	margin:0;
	padding:0;
}

@font-face {
	font-family: "Oswald";
	src:url(Oswald-Light.ttf) format("truetype")
}
@keyframes blink {
    0% {
	opacity:1
    }
    50% {
	opacity:0
    }
    100% {
	opacity:1
    }
}
.parpadeo{
animation:blink 1s;
animation-iteration-count: infinite;
}

a.video_tanda::before, a.cronica_tanda::before  {
    display: none;
    content: attr(data-info);
    color: #FFFFFF;
	font-size:19px;
    padding: 2px 8px;
    background: rgba(0,0,0,0.8);
    border-radius: 5px;
    position: absolute;
    z-index: 999;	
}
a.video_tanda::before{
	margin-top:40px}
	a.cronica_tanda::before{
	margin-top:5px}
	
a.video_tanda:hover::before, a.cronica_tanda:hover::before {
    display: block;
}
img {
height:35px;}/* CSS Document */

body{
	font-size:19px;}
	
-->
</style>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>

<body>
<span class="Estilo1">Final

<img style="display:inline" src="bandera_a_cuadros.png" height="50"> </span>  
<table><tr><td><?php

$twit = file_get_contents('http://actc.org.ar/v3/carrera-on-line-resultados.ajax.php?intIDCarrera=1365&intIDTanda=15');

$inicio = strpos($twit, '<table');

$final = strpos($twit, '</table>');
$cadenaABuscar = substr($twit, $inicio, ($final - $inicio));
$cadenaABuscar = str_replace('<th>N&uacute;mero</th>', '<th></th>',$cadenaABuscar);
$cadenaABuscar = str_replace('<th>Piloto</th>', '<th></th>',$cadenaABuscar);
$cadenaABuscar = str_replace('<th>Marca</th>', '<th></th>',$cadenaABuscar);
$cadenaABuscar = str_replace('Pos.', '',$cadenaABuscar);
$cadenaABuscar = str_replace('<a href', '<span href',$cadenaABuscar);
$cadenaABuscar = str_replace('</a>', '</span>',$cadenaABuscar);
$cadenaABuscar = str_replace('<img src="/vistas/iconos/ppcev_flag.gif" />', '',$cadenaABuscar);
$cadenaABuscar = str_replace('&deg;', '',$cadenaABuscar);
$cadenaABuscar = str_replace('01:', '1:',$cadenaABuscar);
$cadenaABuscar = str_replace('02:', '2:',$cadenaABuscar);
$cadenaABuscar = str_replace('03:', '3:',$cadenaABuscar);
$cadenaABuscar = str_replace('04:', '4:',$cadenaABuscar);
$cadenaABuscar = str_replace('05:', '5:',$cadenaABuscar);
$cadenaABuscar = str_replace('06:', '6:',$cadenaABuscar);
$cadenaABuscar = str_replace('07:', '7:',$cadenaABuscar);
$cadenaABuscar = str_replace('08:', '8:',$cadenaABuscar);
$cadenaABuscar = str_replace('09:', '9:',$cadenaABuscar);
$cadenaABuscar = str_replace('<img data-original="/vistas/v3/images/logos/logo-chevrolet-xs.png"', '<img height="35" title="Chevrolet" src="logos/tc_chevrolet.png"',$cadenaABuscar);
$cadenaABuscar = str_replace('<img data-original="/vistas/v3/images/logos/logo-ford-xs.png"', '<img height="35" title="Ford" src="logos/tc_ford.png"',$cadenaABuscar);
$cadenaABuscar = str_replace('<img data-original="/vistas/v3/images/logos/logo-dodge-xs.png"', '<img height="35" title="Dodge" src="logos/tc_dodge.png"',$cadenaABuscar);
$cadenaABuscar = str_replace('<img data-original="/vistas/v3/images/logos/logo-torino-xs.png"', '<img height="35" title="Torino" src="logos/tc_torino.png"',$cadenaABuscar);
$cadenaABuscar = str_replace('<table class="table">', '<table cellpadding="1" cellspacing="0" border="0" class="table">',$cadenaABuscar);
$cadenaABuscar = str_replace('<i class="fa fa-flag" style="color:#5cb85c"></i>', '</td><td class="verde">',$cadenaABuscar);

echo $cadenaABuscar;

?></td></tr></table>

<?php

$twit = file_get_contents('http://actc.org.ar/v3/carrera-on-line-resultados.ajax.php?intIDCarrera=1365&intIDTanda=15');

$inicio = strpos($twit, '<div class="incidences">');

$final = strpos($twit, '</div><!-- /incidencias -->');
$cadenaABuscar = substr($twit, $inicio, ($final - $inicio));
$cadenaABuscar = str_replace('<h2>Comentarios</h2>', '',$cadenaABuscar);
$cadenaABuscar = str_replace('<ul>', '',$cadenaABuscar);
$cadenaABuscar = str_replace('</ul>', '',$cadenaABuscar);
$cadenaABuscar = str_replace('<li>', '',$cadenaABuscar);
$cadenaABuscar = str_replace('</li>', '',$cadenaABuscar);

echo $cadenaABuscar;

?>

</body>
<head>
<style type="text/css">
<!--
td.verde + td + td + td + td + td, td.verde + td + td + td + td, td.verde + td + td + td, td.verde + td + td, td.verde + td {
background-color:#FFFF00;
border-bottom:2px solid #141414;
color:#000000;
}
.table tbody tr:nth-child(odd){
	background-color:#333333;
}
.table tbody tr:nth-child(even){
	background-color:#141414;
}
table {border:none;
border-spacing:none;
width:100%}

.Estilo4{
	color:#FFFFFF;
	font-family:Arial, Helvetica, sans-serif;
	font-size:14px;
}
.incidences{
	color:#FF0000;
	font-family:Oswald;
	font-size:17px;
	font-weight:bold;
	text-align:left
}
.numerostabla {
	font-weight:bold;
	color:#FF0000;
}
table td:nth-child(10n+3) {
	font-weight:bold;
}
.piloto{
text-align:left;
}
table tr td{
padding:3px;
color:#F3F3F3;
text-align:center;
width:1%;
white-space:nowrap}
thead{color:#FF0000}
.lazy{
text-align:left;
}
.Estilo3 {
	font-size:12px;
	font-family:Arial, Helvetica, sans-serif;
	font-style:italic;
	font-weight:bold;
}
.Estilo1 {
	font-weight:normal;
	font-size: 28px;
	text-align:left;
}
.pos {
	color:#FFFF00;
	font-weight:bold;
}
-->
</style>
</head>
</html>