<?php


require_once 'NotORM.php';

$pdo = new PDO('mysql:dbname=tourepedia1;host=localhost','root', 'name');

$db = new NotORM($pdo);

require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();



session_start();



$app->post("/submit", function() use($app, $db){

    $response = array("applicationSubmitted"=>false);
    $user = (array) json_decode($app->request()->getBody());

    if($db->ambassador()->insert($user)){
      $response['applicationSubmitted'] = true;
      $to1 = "luckysud4@gmail.com";
      // $to2 = "maurya.iitk@gmail.com";
      $from = "From: application@tourepedia.com";
      $subject = "New ambassador application:";
      $body = json_encode($user);
      mail($to1, $subject, $body, $from);
     // mail($to2, $subject, $body, $from);
    }

    $app->response()->header('Content-type', 'application/json');

    echo json_encode($response);
});



$app->run();

 ?>
