<?php 


	// check whether user is logged in or not
	function isLoggedIn(){
		if(isset($_SESSION['user'])){
			return true;
		}
		return false;
	}

	// login the user with given credentials
	function login($db, $data){
		$rows = $db->users()->where($data);
    $count = count($rows);
    if($count == 1){
    		return  $rows->fetch();
    }
    return false;
	}


// logout functionality
	function logout(){
		if(isLoggedIn()){
			unset($_SESSION['user']);
		}
		return true;
	}
 ?>