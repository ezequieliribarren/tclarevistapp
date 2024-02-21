<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Documento sin t&iacute;tulo</title>

<style type="text/css">
<!--
body {
	background-color: #FFFFFF;
	font-family:Oswald;
	font-size:19px;
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
@font-face {
	font-family: "Oswald";
	src:url(Oswald-Light.ttf) format("truetype")
}
-->
</style><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
<meta http-equiv="refresh" content="20;URL=" />


<body>

<span class="Estilo1">Carrera
<?php

$twit = file_get_contents('https://cf.nascar.com/live/feeds/series_1/5146/live_feed.json');

$inicio = strpos($twit, 'flag_state');

$final = strpos($twit, '"race_id"');

$cadenaABuscar = substr($twit, $inicio, ($final - $inicio));
$cadenaABuscar = str_replace('flag_state":1,', '<img src="semaforo verde.png" height="40" class="parpadeo" >',$cadenaABuscar);
$cadenaABuscar = str_replace('flag_state":2,', '<img src="bandera amarilla live.png" height="40" class="parpadeo" >',$cadenaABuscar);
$cadenaABuscar = str_replace('flag_state":3,', '<img src="bandera roja live.png" height="40" class="parpadeo" >',$cadenaABuscar);
$cadenaABuscar = str_replace('flag_state":4,', '<img src="bandera a cuadros live.png" height="50">',$cadenaABuscar);
$cadenaABuscar = str_replace('flag_state":5,', '<img src="bandera blanca live.png" height="40" class="parpadeo" >',$cadenaABuscar);
$cadenaABuscar = str_replace('flag_state":8,', '<img src="semaforo rojo.png" height="40">',$cadenaABuscar);
$cadenaABuscar = str_replace('flag_state":9,', '<img src="bandera a cuadros live.png" height="50">',$cadenaABuscar);

echo $cadenaABuscar;

?>
</span>                 </span><br />
<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><table id="posis-online" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr id="vacio"><td></td></tr>
<tr><td></td></tr>
<tr><td>1</td></tr>
<tr><td>2</td></tr>
<tr><td>3</td></tr>
<tr><td>4</td></tr>
<tr><td>5</td></tr>
<tr><td>6</td></tr>
<tr><td>7</td></tr>
<tr><td>8</td></tr>
<tr><td>9</td></tr>
<tr><td>10</td></tr>
<tr><td>11</td></tr>
<tr><td>12</td></tr>
<tr><td>13</td></tr>
<tr><td>14</td></tr>
<tr><td>15</td></tr>
<tr><td>16</td></tr>
<tr><td>17</td></tr>
<tr><td>18</td></tr>
<tr><td>19</td></tr>
<tr><td>20</td></tr>
<tr><td>21</td></tr>
<tr><td>22</td></tr>
<tr><td>23</td></tr>
<tr><td>24</td></tr>
<tr><td>25</td></tr>
<tr><td>26</td></tr>
<tr><td>27</td></tr>
<tr><td>28</td></tr>
<tr><td>29</td></tr>
<tr><td>30</td></tr>
<tr><td>31</td></tr>
<tr><td>32</td></tr>
<tr><td>33</td></tr>
<tr><td>34</td></tr>
<tr><td>35</td></tr>
<tr><td>36</td></tr>
<tr><td>37</td></tr>
<tr><td>38</td></tr>
<tr><td>39</td></tr>
<tr><td>40</td></tr>

</table>
</td><td valign="top"><?php

$twit = file_get_contents('https://cf.nascar.com/live/feeds/series_1/5146/live_feed.json');

$inicio = strpos($twit, '{"lap_number"');

$final = strpos($twit, '}}');

$cadenaABuscar = substr($twit, $inicio, ($final - $inicio));
$cadenaABuscar = str_replace('{"lap_number":', '<table id="online-race" border="0" cellpadding="0" cellspacing="0" width="100%" id="resultados"><tr><td>',$cadenaABuscar);
$cadenaABuscar = str_replace('"vehicles":[', '</td></tr><tr id="title-table"><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td></td><td id="vacio"></td><td id="vacio"></td><td  style="text-align:center">Nº</td><td id="vacio"></td><td>Piloto</td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td style="text-align:center">Vueltas</td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td>Diferencia</td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td><td id="vacio"></td></tr>',$cadenaABuscar);
$cadenaABuscar = str_replace('{"average_restart_speed":', '<tr><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"average_speed":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"best_lap":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"best_lap_speed":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"best_lap_time":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"vehicle_manufacturer":', '</td><td id="">',$cadenaABuscar);
$cadenaABuscar = str_replace('"Chv"', '<img height="35" title="Chevrolet" src="logos/tc_chevrolet.png" border="0">',$cadenaABuscar);
$cadenaABuscar = str_replace('"Frd"', '<img height="35" title="Ford" src="logos/tc_ford.png" border="0">',$cadenaABuscar);
$cadenaABuscar = str_replace('"Tyt"', '<img height="35" title="Toyota" src="logos/toyota.png" border="0">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"vehicle_number":"', '</td><td id="">',$cadenaABuscar);
$cadenaABuscar = str_replace('","driver":{"driver_id":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"full_name":"', '</td><td id="piloto">',$cadenaABuscar);
$cadenaABuscar = str_replace('","first_name":"', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace('","last_name":"', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace('","is_in_chase":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace('},"vehicle_elapsed_time":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"fastest_laps_run":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"laps_position_improved":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"laps_completed":', '</td><td id=""  style="text-align:center">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"laps_led":[', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace('],"last_lap_speed":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"last_lap_time":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"passes_made":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"passing_differential":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"position_differential_last_10_percent":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"pit_stops":[', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace('],"qualifying_status":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"running_position":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"status":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"delta":0,', '</td><td id="">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"delta":', '</td><td id="">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"sponsor_name":"', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace('"sponsor_name":"', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace('","starting_position":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"times_passed":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"quality_passes":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"is_on_track":', '</td><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace(',"is_on_dvp":true},', '</td></tr>',$cadenaABuscar);
$cadenaABuscar = str_replace(',"is_on_dvp":true}]', '</td></tr>',$cadenaABuscar);
$cadenaABuscar = str_replace(',"is_on_dvp":false},', '</td></tr>',$cadenaABuscar);
$cadenaABuscar = str_replace(',"is_on_dvp":false}]', '</td></tr>',$cadenaABuscar);
$cadenaABuscar = str_replace(',"run_id":', '<tr><td id="vacio">',$cadenaABuscar);
$cadenaABuscar = str_replace('}}', '</td></tr></table>',$cadenaABuscar);

echo $cadenaABuscar;

?></td></tr></table>
<script>
$(function(){
  $('#resultados').tablesorter(); 
});
</script>
</body>
<head>
<style type="text/css">
<!--

#online-race tr:nth-child(odd), #posis-online tr:nth-child(odd){
	background-color:#333333;
}
#online-race tr:nth-child(even), #posis-online tr:nth-child(even){
	background-color:#141414;
}
#online-race tr:first-child, #online-race tr:last-child, #vacio{
display:none;
}
#piloto{
font-weight:bold
}
#online-race, {border:0;
border-spacing:0;
font-size:19px;
font-family:Oswald;
width:100%;
}
table{
color:#FFFFFF;}

#posis-online tr td 
{height:35px;
padding:3px;
color:#FFFF00;
font-weight:bold;
text-align:center}

#online-race tr td:nth-child(2), #online-race tr td:nth-child(4), #online-race tr td:nth-child(5), #online-race tr td:nth-child(6), #online-race tr td:nth-child(7){
text-align:center;
}
img {
height:35px;}
#online-race tr td{
padding:3px;
width:1%;
white-space:nowrap;
}
#title-table td{
color:#FFFF00;
font-weight:bold;
height:35px;
padding:3px;
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