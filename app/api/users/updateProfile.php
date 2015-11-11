<?php 

#@params: $id = user_id

	

	$app->response()->header('Content-Type', 'application/json');
	$response  = array("success"=>false);
	
  $updateData = (array) json_decode($app->request()->getBody());

  if($updateData and $id){
  	if($db->users()->where('id', $id)->update($updateData)){
  		$response["success"] = true;
  	}else{
  		$response["error"] = "Unable to update profile, Please try after some time.";
  	}
  }
  $response["userData"] = $updateData;

	echo json_encode($response);	

 ?>