<?php
function random_str($length, $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
{
    $pieces = [];
    $max = mb_strlen($keyspace, '8bit') - 1;
    for ($i = 0; $i < $length; ++$i) {
        $pieces []= $keyspace[random_int(0, $max)];
    }
    return implode('', $pieces);
}

function setuseronline($u)
{
	$link = mysqli_connect('localhost','user01','Password01','db01');
	$q = random_str(8);
	$sql = "UPDATE t_users SET is_online = 1, q = '".$q."' WHERE username = '".$u."'";
	$result = $link->query($sql);
	if($result)
	{
		setcookie("q", $q);
	} else {
		echo "ERR ON: setuseronline";
	}
}

function getuserbyq()
{
	$link = mysqli_connect('localhost','user01','Password01','db01');
	$sql = "SELECT * FROM t_users WHERE q = '".$_COOKIE["q"]."'";
	$result = $link->query($sql);
	if($result)
	{
		$row = $result->fetch_assoc();
		return $row;
	} else {
		echo "ERR ON: getuserbyq";
	}
}

//exists => 1 else 0 : also could return username 
function userexists($u)
{
	// SCRTY: also check for cookie alignment
	//$_COOKIE["username"] 
	$out = [];
	$link = mysqli_connect('localhost','user01','Password01','db01');
	$sql = "SELECT * FROM t_users WHERE username = '".$u."'";
	$result = $link->query($sql);
	if($result)
	{
		if ($result->num_rows > 0) {
			//while($row = $result->fetch_assoc()) {
				
			//}
			$link->close();
			return 1;
		}
		
	} 
	$link->close();
	return 0;
}

function cookiecheck($u)
{
	$sql = "SELECT q FROM t_users WHERE username = '".$u."'";
	$result = $link->query($sql);
	if($result)
	{
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				
			}
			$link->close();
			return 1;
		}
		
	} 
	$link->close();
	return 0;
}

function proc_sin($data)
{
	// auto sign in via cookie and form, assign cookie
	// MODEL: out => success : useralreadyloggedin()?0:1, data : {useralreadyloggedin()?"fail":"signed in"}
	
	$out = [];
	$link = mysqli_connect('localhost','user01','Password01','db01');
	$user = $data->username;
	if(userexists($user) == 1)
	{
		$sql = "SELECT username FROM t_users WHERE username = '".$user."'";
		$result = $link->query($sql);
		if ($result) {
			if ($result->num_rows > 0) {
					$row = $result->fetch_assoc();
					$out["success"] = 1;
					$out["user"] = $row["username"];
					$out["data"] = 'Logged in as "'.$user.'"';
					setuseronline($user);
					// assign cookie
					echo json_encode($out);
				return 1;
				
				}
		} else {
			echo "Error: " . $sql . "<br>" . mysqli_error($link);
		}
		//print_r($user);
		//echo 2;
	} else 
	{
		$sql = "SELECT * FROM t_users WHERE username = '".$user."'";
		$result = $link->query($sql);
		if($result)
		{
			if ($result->num_rows > 0) {
				while($row = $result->fetch_assoc()) {
					
				}
			}
			
		} 
		$out["success"] = 0;
		$out["data"] = 'User "'.$user.'" doesn\'t exist';
		echo json_encode($out);
	}
	$link->close();
	return 1;
}


function proc_sup($data)
{
	// MODEL: out => success : userexists()?0:1, data : {userexists()?"fail":"signed up"} 
	$out = [];
	$link = mysqli_connect('localhost','user01','Password01','db01');
	$user = $data->username;
	if(userexists($user) == 0)
	{
		$sql = "INSERT INTO t_users (username, wincount, is_online, q) VALUES ('".$user."', 0, 0, '')";

		if (mysqli_query($link, $sql)) {
			echo "New record created successfully";
			// assign cookie
		} else {
			echo "Error: " . $sql . "<br>" . mysqli_error($link);
		}
		//print_r($user);
		//echo 2;
	} else 
	{
		$out["success"] = 1;
		$out["data"] = 'User "'.$user.'" exists';
		echo json_encode($out);
	}
	$link->close();
}

function proc_refr()
{
	// MODEL: out => success : userexists()?0:1, data : {userexists()?"fail":"signed up"} 
	$out = [];
	$data = [];
	$link = mysqli_connect('localhost','user01','Password01','db01');
	$sql = "SELECT username, wincount FROM t_users WHERE is_online = 1";
	$result = $link->query($sql);
	if ($result) {
		$i = 0;
		while($row = $result->fetch_assoc()) {
			$data[$i]["user"] = $row["username"];
			$data[$i++]["score"] = $row["wincount"];
		}
	} else {
		echo "Error: " . $sql . "<br>" . mysqli_error($link);
	}
	 
	
	$out["success"] = 1;
	$out["data"] = $data;
	echo json_encode($out);
	
	$link->close();
	return 1;
}
// LABEL: primary processor

function req_play($data)
{
	var_dump($data);
}

if(isset($_GET["json_string"]))
{
	$data = json_decode($_GET["json_string"]);
	//var_dump($data);
	// SCRTY: before, check for cookie alignment
	switch($data->op)
	{
		case 1: proc_sup($data); break;
		case 2: proc_sin($data); break;
		case 3: proc_refr(); break;
		case 4: req_play($data); break;
	}
	
}



?>