<?php

$json_req = file_get_contents('php://input');
$req = json_decode($json_req, true);

$res = array('uid' => "kyp");

echo json_encode($res);

?>

