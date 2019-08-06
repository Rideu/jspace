<?php
require 'processor.php';





function Connect()
{
	$pl = new stdClass();
	$pl->id = 1;
	Storage::$GlobalPlayers[count(Storage::$GlobalPlayers)] = $pl;
	Storage::$GlobalPlayers[count(Storage::$GlobalPlayers)] = $pl;
	$out = [];
	$out["success"] = 0;
	$out["data"] = sizeof(Storage::$GlobalPlayers);
	echo json_encode($out);
}

Connect();
?>