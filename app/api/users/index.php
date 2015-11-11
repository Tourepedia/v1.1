<?php

require_once './../init.php';


require_once './userFunctions.php';

# login controller
$app->post("/login", function() use($app, $db){

	require_once './login.php';

});

# register controller
$app->post("/register", function () use ($app, $db) {

	require_once './register.php';

});


# login check controller
$app->get("/loggedIn", function() use ($app){
  $app->response()->header('Content-Type', 'application/json');
  
  $response = array(
    "loggedInStatus"=> isLoggedIn()
  );
   echo json_encode($response);
});

# fetch user data
$app->get("/data(/:id)", function($id = null) use ($app, $db){

  // if(isLoggedIn() or isAdmin())
	require_once './data.php';

});


# update profile
$app->put('/update/:id', function ($id) use ($app, $db){
   
   // if(isLoggedIn() and )
   require_once './updateProfile.php';

});

// # login check controller
// $app->get("/logout", function() use ($app){
//   $app->response()->header('Content-Type', 'application/json');
  
//   $response = array(
//     "success"=> logout();
//   );
//    echo json_encode($response);
// });



$app->run();

?>