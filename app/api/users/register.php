<?php 


$app->response()->header('Content-type', 'application/json');
$response = array("registered"=>false);

$userData = (array) json_decode($app->request()->getBody());
if($userData){
  $user = $db->users()->where('email', $userData['email']);
  $count = count($user);
  $email = $userData['email'];
  if($count == 1){
    $response["error"] = "Already registered";
  }else{
    if($userData['password'] == $userData['repassword']){
      unset($userData["repassword"]);      
      $userData["password"] = md5($userData["password"]);
      if($db->users()->insert($userData)){
        $response["registered"] = true;
      }else{
        $response["error"]  = "We are facing some internal problems. Please try after some time"; 
      }
    }else{
      $response["error"] = "Password don't match!!";
    }
  }
}
echo json_encode($response);


 ?>