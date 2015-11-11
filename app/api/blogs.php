<?php


require_once 'init.php';


$app->get("/blogs(/:id)(/:cols+)", function($id=null, $cols = null) use($app, $db){

	$response = array();
	$app->response()->header('Content-type', 'application/json');

	$blogs = $db->blogs();

	if($id != null){
		if(is_numeric($id)){
			$blogs->where('id', $id);
		}else{
			$blogs->where('recogId', $id);
		}	
		if($blogs->count() == 1){
			$blog = $blogs->fetch();
			if($cols != null){
				foreach ($cols as $key) {
					$response[$key] = $blog[$key];
				}
			}else{
				foreach ($blog as $key => $value) {
					$response[$key] = $value;
				}
			}
		}
	}else{
		if (isset($_GET) and !empty($_GET)) {
			
			//exclude the blogs with these ids
			if(isset($_GET['excludeIds'])){
				$excludeIds = $_GET['excludeIds'];
				$excludeIds = explode(',', $excludeIds);
				$blogs->where('id NOT', $excludeIds);		
			}

			//fetch blogs for author
			if(isset($_GET['authorId'])){
				$authorId = $_GET['authorId'];
				$blogs->where('authorId', $authorId);		
			}


			// fetch blogs for caterogy
			if(isset($_GET['category'])){
				$blog_category = $_GET['category'];
				$blogs->where('category', $blog_category);		
			}

				// fetc blogs for tags
			if(isset($_GET['tags'])){
				$tags = $_GET['tags'];
				$tags = explode(',', $tags);
				$blogs->where('tagId', $tags);
			}



			// set offset if necessary
			$offset = null;
			if(isset($_GET['offset'])){
				$offset = $_GET['offset'];
			}

			// set limit if given
			if(isset($_GET['limit'])){
				$limit = $_GET['limit'];
				$blogs->limit($limit, $offset);
			}

		}
		// fetch the blogs after all these operations
		$blogs->fetch();
		$response = decode_NotORM($blogs);
	}


	echo json_encode($response);

});

$app->get("/main", function() use($app, $db){

	$response = array();
	$app->response()->header('Content-type', 'application/json');

	$blogs_config = json_decode(file_get_contents('blog-config.json'));

	
	$blogs = $db->blogs()->where('id', $blogs_config->mainBlogs);
  
  $response = decode_NotORM($blogs);
  
  echo json_encode($response);

});

$app->get("/trending", function() use($app, $db){

	$response = array();
	$app->response()->header('Content-type', 'application/json');

	$blogs_config = json_decode(file_get_contents('blog-config.json'));

	
	$blogs = $db->blogs()->where('id', $blogs_config->trending);
  
  $response = decode_NotORM($blogs);
  
  echo json_encode($response);

});


$app->get("/search", function() use($app, $db){

	$response = array();
	$app->response()->header('Content-type', 'application/json');

	$blogs = $db->blogs();
	
	if(isset($_GET) and !empty($_GET)){
		
		// search for title
		if(isset($_GET['title']) and !empty($_GET['title'])){
			$title = $_GET['title'];
			$blogs->where(array("title LIKE ?" => '%'.$title.'%'));
		}

		// set offset if necessary
		$offset = null;
		if(isset($_GET['offset'])){
			$offset = $_GET['offset'];
		}

		// set limit if given
		if(isset($_GET['limit'])){
			$limit = $_GET['limit'];
			$blogs->limit($limit, $offset);
		}

		$blogs->fetch();
		$response = decode_NotORM($blogs);
	}

  echo json_encode($response);

});


$app->run();



 ?>