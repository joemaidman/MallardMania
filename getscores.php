<?php

//print the initial table HTML tags
echo
'<table class="table table-striped table-hover">
<thead><tr>
<th>Player</th><th>Score</th>
</thead></tr>
<tbody>
';
//Open the score file
$f = fopen("scores.csv", "r");

// Setup a counter
$count = 0;
//While loop to get the highest ten records from the file
while (($line = fgetcsv($f)) !== false) {

//Increment the counter each time	
    $count ++;

    //If the counter is Over 10, don't print the score, else print a new row to the table
    if ($count < 11 && $count > 1) {

        echo "<tr>";


        echo "<td>" . $line[1] . "</td><td>" . $line[0] . "</td>";


        echo "</tr>\n";
    }
}
//Close the file
fclose($f);

//Print the closing HTML tags
echo "\n</tbody></table>";
?>

