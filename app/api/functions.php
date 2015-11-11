<?php 

/** decode the NotRom object
	parms = NotROM fetch object
*/
function decode_NotORM($NotORM){

	$response = array();

	foreach ($NotORM as $rows) {
		$tmp = array();
		foreach ($rows  as $key => $value) {
			if($key === "password"){
				continue;
			}
			$tmp[$key] = $value;
		}
		$response[] = $tmp;
	}

	return $response;
}	



 ?>