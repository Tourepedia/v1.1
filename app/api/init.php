<?php

require_once 'NotORM.php';

$pdo = new PDO('mysql:dbname=tourepedia;host=localhost','root', 'name');

$db = new NotORM($pdo);

require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

require_once 'functions.php';

session_start();

?>