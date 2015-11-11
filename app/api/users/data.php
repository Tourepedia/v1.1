<?php


# @params : id = user_id



$response = array();
$app->response()->header('Content-type', 'application/json');

$users = $db->users();

if($id == null){
  $response = decode_NotORM($users);
}else{
  $user = $users->where('id', $id)->fetch();
  foreach ($user as $key => $value) {
    if($key === "password"){
      continue;
    }
    $response[$key] = $value;
  }
}

echo json_encode($response);


 ?>
