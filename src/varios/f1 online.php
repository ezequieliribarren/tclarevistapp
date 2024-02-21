<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<title>Documento sin t&iacute;tulo</title>






<style type="text/css">

<!--

@font-face {
	font-family: "Oswald";
	src:url(Oswald-Light.ttf) format("truetype")
}
body {

	margin-left: 0px;

	margin-top: 0px;

	background-color: #FFFFFF;
	font-family:Oswald;
	font-size:19px;

}
#tabla_resultado tr:nth-child(odd){
	background-color:#333333;
}
#tabla_resultado tr:nth-child(even){
	background-color:#141414;
}
#tabla_resultado {
width:100%;
border:none;
border-spacing:0px;
color:#FFFFFF;
}
#tabla_resultado tr td:nth-child(1), #tabla_resultado tr:nth-child(1){
color:#FFFF00;
}
#tabla_resultado tr td:nth-child(1), #tabla_resultado tr td:nth-child(3), #tabla_resultado tr:nth-child(1){
font-weight:bold;
}
#tabla_resultado tr td:nth-child(1), #tiempo, #vueltas, #goma, #tabla_resultado tr:nth-child(1), #tabla_resultado tr td:nth-child(7), #tabla_resultado tr td:nth-child(8), #tabla_resultado tr td:nth-child(9), #tabla_resultado tr td:nth-child(10), #tabla_resultado tr td:nth-child(11){
text-align:center;
}
.ocultar{
display:none}
#tabla_resultado tr td{
padding:3px;
width:1%;
white-space:nowrap}

img{
height:35px}
-->

</style><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>



<body>
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
  <td><span class="Estilo1">	Clasificación </span>
    <meta http-equiv="refresh" content="20" />
<img style="display:none" src="semaforo rojo.png" height="50"> 
<img style="display:inline" src="bandera_a_cuadros.png" height="50"> 
<img style="display:none" src="semaforo verde.png" height="40" class="parpadeo" ></td>
</tr></table>


<table id="tabla_resultado" border="0" cellpadding="0" cellspacing="0"><?php

$twit = file_get_contents('http://directo.caranddriver.es/routes.php?option=get&action=directo_times&version=tiempo');

$inicio = strpos($twit, '{"0":{');

$final = strpos($twit, ',"estado":"OK"}');
$cadenaABuscar = substr($twit, $inicio, ($final - $inicio));

$cadenaABuscar = str_replace('{"0":{', '<tr><td></td><td></td><td></td><td></td><td class="ocultar"></td><td>Goma</td><td class="ocultar"></td><td>Tiempo</td><td class="ocultar"></td><td>Vueltas</td><td  class="ocultar"></td></tr><tr><td>1</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"1":{', '</td></tr><tr><td>2</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"2":{', '</td></tr><tr><td>3</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"3":{', '</td></tr><tr><td>4</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"4":{', '</td></tr><tr><td>5</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"5":{', '</td></tr><tr><td>6</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"6":{', '</td></tr><tr><td>7</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"7":{', '</td></tr><tr><td>8</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"8":{', '</td></tr><tr><td>9</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"9":{', '</td></tr><tr><td>10</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"10":{', '</td></tr><tr><td>11</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"11":{', '</td></tr><tr><td>12</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"12":{', '</td></tr><tr><td>13</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"13":{', '</td></tr><tr><td>14</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"14":{', '</td></tr><tr><td>15</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"15":{', '</td></tr><tr><td>16</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"16":{', '</td></tr><tr><td>17</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"17":{', '</td></tr><tr><td>18</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"18":{', '</td></tr><tr><td>19</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"19":{', '</td></tr><tr><td>20</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"20":{', '</td></tr><tr><td>21</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"21":{', '</td></tr><tr><td>22</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('},"22":{', '</td></tr><tr><td>23</td>',$cadenaABuscar);
$cadenaABuscar = str_replace('"piloto":"', '<td> ',$cadenaABuscar);
$cadenaABuscar = str_replace('","0":', '</td><td class="ocultar">',$cadenaABuscar);
$cadenaABuscar = str_replace('"neumatico":"', '</td><td id="goma">',$cadenaABuscar);
$cadenaABuscar = str_replace('","3":"neumatico-', '</td><td class="ocultar">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"tiempo":"', '</td><td>',$cadenaABuscar);
$cadenaABuscar = str_replace('","4":"', '</td><td class="ocultar">',$cadenaABuscar);
$cadenaABuscar = str_replace('","vueltas":', '</td><td>',$cadenaABuscar);
$cadenaABuscar = str_replace(',"6":', '</td><td class="ocultar">',$cadenaABuscar);


$cadenaABuscar = str_replace(' Charles Leclerc', '<img height="35" title="Monaco" src="logos/evento_monaco.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Charles Leclerc</td><td class="ferrari">Ferrari',$cadenaABuscar);
$cadenaABuscar = str_replace(' Sebastian Vettel', '<img height="35" title="Alemania" src="logos/evento_alemania.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Sebastian Vettel</td><td class="racingpoint">Aston Martin',$cadenaABuscar);
$cadenaABuscar = str_replace(' Lewis Hamilton', '<img height="35" title="Gran Bretaña" src="logos/evento_granbretana.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Lewis Hamilton</td><td class="mercedes">Mercedes',$cadenaABuscar);
$cadenaABuscar = str_replace(' Valtteri Bottas', '<img height="35" title="Finlandia" src="logos/evento_finlandia.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Valtteri Bottas</td><td class="mercedes">Mercedes',$cadenaABuscar);
$cadenaABuscar = str_replace(' Max Verstappen', '<img height="35" title="Holanda" src="logos/evento_holanda.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Max Verstappen</td><td class="redbull">Red Bull',$cadenaABuscar);
$cadenaABuscar = str_replace(' Roy Nissany', '<img height="35" title="Israel" src="logos/evento_israel.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Roy Nissany</td><td class="williams">Williams',$cadenaABuscar);
$cadenaABuscar = str_replace(' Pierre Gasly', '<img height="35" title="Francia" src="logos/evento_francia.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Pierre Gasly</td><td class="alphatauri">Alpha Tauri',$cadenaABuscar);
$cadenaABuscar = str_replace(' Romain Grosjean', '<img height="35" title="Francia" src="logos/evento_francia.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Romain Grosjean</td><td class="haas">Haas',$cadenaABuscar);
$cadenaABuscar = str_replace(' Kevin Magnussen', '<img height="35" title="Dinamarca" src="logos/evento_dinamarca.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Kevin Magnussen</td><td class="haas">Haas',$cadenaABuscar);
$cadenaABuscar = str_replace(' Lance Stroll', '<img height="35" title="Canada" src="logos/evento_canada.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Lance Stroll</td><td class="racingpoint">Aston Martin',$cadenaABuscar);
$cadenaABuscar = str_replace(' Sergio P\u00e9rez', '<img height="35" title="Mexico" src="logos/evento_mexico.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Sergio P\u00e9rez</td><td class="redbull">Red Bull',$cadenaABuscar);
$cadenaABuscar = str_replace(' Kimi R\u00e4ikk\u00f6nen', '<img height="35" title="Finlandia" src="logos/evento_finlandia.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Kimi R\u00e4ikk\u00f6nen</td><td class="alfaromeo">Alfa Romeo',$cadenaABuscar);
$cadenaABuscar = str_replace(' Antonio Giovinazzi', '<img height="35" title="Italia" src="logos/evento_italia.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Antonio Giovinazzi</td><td class="alfaromeo">Alfa Romeo',$cadenaABuscar);
$cadenaABuscar = str_replace(' Carlos Sainz', '<img height="35" title="España" src="logos/evento_espana.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Carlos Sainz</td><td class="ferrari">Ferrari',$cadenaABuscar);
$cadenaABuscar = str_replace(' Lando Norris', '<img height="35" title="Gran Bretaña" src="logos/evento_granbretana.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Lando Norris</td><td class="mclaren">McLaren',$cadenaABuscar);
$cadenaABuscar = str_replace(' Daniil Kvyat', '<img height="35" title="Rusia" src="logos/evento_rusia.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Daniil Kvyat</td><td class="alphatauri">Alpha Tauri',$cadenaABuscar);
$cadenaABuscar = str_replace(' Alex Albon', '<img height="35" title="Tailandia" src="logos/evento_tailandia.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Alex Albon</td><td class="alphatauri">Alpha Tauri',$cadenaABuscar);
$cadenaABuscar = str_replace(' Esteban Ocon', '<img height="35" title="Francia" src="logos/evento_francia.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Esteban Ocon</td><td class="renault">Alpine',$cadenaABuscar);
$cadenaABuscar = str_replace(' Daniel Ricciardo', '<img height="35" title="Australia" src="logos/evento_australia.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Daniel Ricciardo</td><td class="mclaren" >McLaren',$cadenaABuscar);
$cadenaABuscar = str_replace(' Nico H\u00fclkenberg', '<img height="35" title="Alemania" src="logos/evento_alemania.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Nico H\u00fclkenberg</td><td>Renault',$cadenaABuscar);
$cadenaABuscar = str_replace(' George Russell', '<img height="35" title="Gran Bretaña" src="logos/evento_granbretana.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> George Russell</td><td class="williams">Williams',$cadenaABuscar);
$cadenaABuscar = str_replace(' Nicholas Latifi', '<img height="35" title="Canada" src="logos/evento_canada.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Nicholas Latifi</td><td class="williams">Williams',$cadenaABuscar);

$cadenaABuscar = str_replace(' Mick Schumacher', '<img height="35" title="Alemania" src="logos/evento_alemania.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Mick Schumacher</td><td class="haas">Haas',$cadenaABuscar);
$cadenaABuscar = str_replace(' Nikita Mazepin', '<img height="35" title="Rusia" src="logos/evento_rusia.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Nikita Mazepin</td><td class="haas">Haas',$cadenaABuscar);
$cadenaABuscar = str_replace(' Jack Aitken', '<img height="35" title="Gran Bretaña" src="logos/evento_granbretana.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Jack Aitken</td><td class="williams">Williams',$cadenaABuscar);
$cadenaABuscar = str_replace(' Fernando Alonso', '<img height="35" title="España" src="logos/evento_espana.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Fernando Alonso</td><td class="alpine">Alpine',$cadenaABuscar);

$cadenaABuscar = str_replace(' Yuki Tsunoda', '<img height="35" title="Japon" src="logos/evento_japon.jpg" border="0"  style="border-radius:5px; border:1px solid #CCCCCC"></td><td> Yuki Tsunoda</td><td class="alphatauri">Alpha Tauri',$cadenaABuscar);

$cadenaABuscar = str_replace('P\u00e9rez', 'Pérez',$cadenaABuscar);
$cadenaABuscar = str_replace('R\u00e4ikk\u00f6nen', 'Raikkonen',$cadenaABuscar);
$cadenaABuscar = str_replace('H\u00fclkenberg', 'Hulkenberg',$cadenaABuscar);
$cadenaABuscar = str_replace('\"', '.',$cadenaABuscar);
$cadenaABuscar = str_replace('neumatico-M', '<img src="logos/neumatico-M.png" title="Goma media" />',$cadenaABuscar);
$cadenaABuscar = str_replace('neumatico-SD', '<img src="logos/neumatico-SD.png">',$cadenaABuscar);
$cadenaABuscar = str_replace('neumatico-D', '<img src="logos/neumatico-D.png" title="Goma dura" />',$cadenaABuscar);
$cadenaABuscar = str_replace('neumatico-B', '<img src="logos/neumatico-B.png" title="Goma blanda" />',$cadenaABuscar);
$cadenaABuscar = str_replace('neumatico-UB', '<img src="logos/neumatico-UB.png" />',$cadenaABuscar);
$cadenaABuscar = str_replace('neumatico-HB', '<img src="logos/neumatico-HB.png"/>',$cadenaABuscar);
$cadenaABuscar = str_replace('neumatico-I', '<img src="logos/neumatico-I.png" title="Agua intermedia" />',$cadenaABuscar);
$cadenaABuscar = str_replace('neumatico-L', '<img src="logos/neumatico-L.png" title="Lluvia extrema" />',$cadenaABuscar);


echo $cadenaABuscar;


?></td></tr></table>
</body>

<head>

<style type="text/css">

<!--

.parpadeo{
animation:blink 1s;
animation-iteration-count: infinite;
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
.Estilo1 {
font-family:Oswald;
	font-weight:normal;
	font-size: 28px;
	text-align:left;
	color:#000000;
}

-->

</style>

</head>

</html>