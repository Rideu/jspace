<?php


$locality = "127.0.0.1"; // Defines host ip-address. Can be constant.
$userdef = "root"; // Defines username to use for queries.
$passdef = ""; // Defines password to log in as user.
$datadef = "gamedata"; // Defines database name.

//$locality = "localhost:3306";
//$userdef = "u0409643_quad";
//$passdef = "6bE_a-;c+o;w";
//$datadef = "u0409643_base";

//if ($_SERVER['REQUEST_METHOD'] == 'POST') 

		
	{ /* MAIN QUERY SECTION */
		
		{
			$name =  $_GET["name"];
			$time =  $_GET["time"];
			$points =  $_GET["points"];
			$sql = "INSERT INTO players (place, name, time, points) SELECT (SELECT COUNT(place) FROM players)+1, '".$name."', '".$time."', ".$points.";";
			$link = mysqli_connect($locality, $userdef, $passdef, $datadef);
			if ($result = mysqli_query($link, $sql)) { 			
			} else { print ("Bad request ".mysqli_error($link)); 
			}
			$link->close();
			
			$sql = "(SELECT * FROM players ORDER BY points DESC LIMIT 10) UNION 
					(SELECT * FROM players ORDER BY place DESC LIMIT 1)";
			$link = mysqli_connect($locality, $userdef, $passdef, $datadef);
			if ($result = mysqli_query($link, $sql)) { 
				if(mysqli_num_rows($result) > 0){
				echo "<table>";
					echo "<tr>";
						echo "<th>№</th>";
						echo "<th>Name</th>";
						echo "<th>Time</th>";
						echo "<th>Points</th>";
					echo "</tr>";
				$n = 1;
				while($row = mysqli_fetch_array($result))
				{
					echo "<tr>";
						echo "<td>" . $n++ . "</td>";
						echo "<td>" . $row['name'] . "</td>";
						echo "<td>" . $row['time'] . "</td>";
						echo "<td>" . $row['points'] . "</td>";
					echo "</tr>";
				}
				echo "</table>";
				mysqli_free_result($result);
				}
			} else { print ("Bad request ".mysqli_error($link)); 
			}
			$link->close();
			//echo json_encode($arr, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		}
		
	}

?>