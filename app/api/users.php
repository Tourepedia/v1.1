<?php

require_once './../init.php';


require_once './login.php';


require_once './register.php';

$app->get("/isLoggedIn", function() use ($app){
  $app->response()->header('Content-Type', 'application/json');
  $response = array("loggedInStatus"=>false);

  if(isset($_SESSION['user'])){
     $response = array( "loggedInStatus" => true);
  }
   echo json_encode($response);
});

$app->run();

?>