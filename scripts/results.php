<?php

  
$servername = "localhost";
$username = "root";
$password = "";

$conn = mysqli_connect($servername, $username, $password);

if (!$conn) {
    die("connection failed: " . mysqli_connect_error());
}

$get_sql = "SELECT * FROM quizzer.results WHERE UID=\" . "$_GET['z'] . "\";";
$res_get = $conn->query($get_sql);

if (mysqli_num_rows($res_get) > 0) {
    // TODO
}

mysqli_close($conn);
?>

