<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
require "_library/_class/class.db.php";

// create new object
$obj_cDML = new cDML();

// receive value
//$strCid = $_POST["cid"];
$strId = $_POST["id"];

// receive value
$strRow = $_POST["row"];
$strRowperpage = $_POST["perpage"];

// sql command
$sql = "SELECT * FROM tbl_notify WHERE notify_uid = '" . $strId . "' ORDER BY insert_date DESC LIMIT " . $strRow . "," . $strRowperpage;

// create new array for receive data from database
$arrRs = array();

// query/check data
$dbqr=$obj_cDML->slcvar2($sql);
$num_rows=mysqli_num_fields($dbqr);

$name_rows = array("id", "notify_email", "notify_phone", "notify_uid", "notify_topic", "notify_detail", "notify_icon", "notify_color", "notify_status", "insert_date", "last_update");
	  
while($obResult = mysqli_fetch_array($dbqr,MYSQLI_ASSOC))
{
	$arrCol = array();
	for($i=0;$i<$num_rows;$i++) {
		$arrCol[mysqli_fetch_field_direct($dbqr, $i)->name] = htmlspecialchars_decode($obResult[$name_rows[$i]], ENT_QUOTES);
	}
	array_push($arrRs,$arrCol);
}

// null data
if ($arrRs == null) {
	$arrRs[resultdata] = "empty";
}

// generate array to json
echo json_encode($arrRs);
?>
