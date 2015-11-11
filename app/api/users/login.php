<?php 


$app->response()->header('Content-type', 'application/json');

$response = array("success"=>false);

$errors = array();

$data = (array) json_decode($app->request()->getBody());

if($data){
  if(isset($data['email']) and isset($data['password'])){
    if(!empty($data['email']) and !empty($data['password'])){
      $email = $data['email'];
      $password = md5($data['password']);
      $user = login($db, array("email"=>$email, "password"=>$password));
      if( $user){
    			$userId = $user["id"];
          // $_SESSION['user'] = $userId;
    	    $response['success'] = true;
      		$response["userId"] = $userId;
      }else{
        $response['error'] = "Email or Password incorrect";
      }
    }else{
      $response["error"] = "All fields are required";
    }
  }
}

echo json_encode($response);

 ?>