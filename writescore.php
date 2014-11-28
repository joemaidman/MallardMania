<?php

header('Location: highscores.php');
// Capture the player name and score from the POST data
$playerName = $_POST['playerName'];
$playerScore = $_POST['hiddenScore'];

//Convert the current score data to an array
$arrayofdata = csv_to_array('scores.csv');

//Create a new array record for the current player
$newdata = array(
    'Score' => $playerScore,
    'Name' => $playerName
);
$stringtowrite .= $row['Score'] . "," . $row['Name'] . "\r\n";

//Add the new record to the array
array_push($arrayofdata, $newdata);

//Sort the array in descending order of score
usort($arrayofdata, function($a, $b) {
    return $b['Score'] - $a['Score'];
});

//Set a variable to write the refreshed score array to
$file = 'scores.csv';

//Create a string to write back to the file and recreate headers
$stringtowrite = "Score" . "," . "Name" . "\r\n";

//Populate the string from array data
foreach ($arrayofdata as $row) {
    $stringtowrite .= $row['Score'] . "," . $row['Name'] . "\r\n";
}

//Update the file
file_put_contents($file, $stringtowrite);

//Function to convert CSV to an array
function csv_to_array($filename = '', $delimiter = ',') {
    if (!file_exists($filename) || !is_readable($filename))
        return FALSE;

    $header = NULL;
    $data = array();
    if (($handle = fopen($filename, 'r')) !== FALSE) {
        while (($row = fgetcsv($handle, 1000, $delimiter)) !== FALSE) {
            if (!$header)
                $header = $row;
            else
                $data[] = array_combine($header, $row);
        }
        fclose($handle);
    }
    return $data;
}

?>