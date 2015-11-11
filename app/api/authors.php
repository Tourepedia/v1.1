<?php

require_once 'init.php';


$app->get("/authors(/:id)", function($id = null) use($app, $db){
	
	$response = array();	
	$app->response()->header('Content-type', 'application/json');
	
	$authors = $db->users();

	if($id == null){

		$response = decode_NotORM($authors);
	
	}else{
		$author = $authors->where('id', $id)->fetch();
		foreach ($author as $key => $value) {
			$response[$key] = $value;
		}
	}

	echo json_encode($response); 

});


$app->run();




 ?>