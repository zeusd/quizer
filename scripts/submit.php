<?php

$json_req = file_get_contents('php://input');
$req = json_decode($json_req, true);

$servername = "localhost";
$username = "root";
$password = "";

$conn = mysqli_connect($servername, $username, $password);

if (!$conn) {
    die("connection failed: " . mysqli_connect_error());
}

#   echo $req['quiz'] . "<br>";

$ans_sql = "SELECT * FROM quizzer.quizzes WHERE NAME=\"" . $req['quiz'] . "\";";
$score = 0;

#   echo $ans_sql . "<br>";


$res_ans = $conn->query($ans_sql);

if ($res_ans->num_rows > 0) {
    while ($row = $res_ans->fetch_assoc()) {
        $ans = json_decode($row["ANSWERS"]);
        $max = $row["MAX_SCORE"];
        foreach ($ans as $k => $v) {
#           echo $k . " : " . $v . "<br>";
            if ($req['answers']['q' . $k] && $req['answers']['q' . $k] == $v) {
#               echo ".<br>";
                $score++;
            }
        }
    }
}

$res = array('uid' => $score);

echo json_encode($res);

mysqli_close($conn);
?>

