<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
require "_library/_class/class.db.php";

// create new object
$obj_cDML = new cDML();

// receive value
$strId = $_POST["id"];

$sql = "SELECT * FROM tbl_campaign WHERE campaign_id = '" . $strId . "'";

// create new array for receive data from database
$arrRs = array();

// query/check data
$rsData = $obj_cDML -> slcvar3($sql);

// insert data in new array
if ($rsData) {
	// tbl_campaign
	$arrRs["id"] = $rsData["id"];
	$arrRs["campaign_email"] = $rsData["campaign_email"];
	$arrRs["campaign_phone"] = $rsData["campaign_phone"];
	$arrRs["campaign_uid"] = $rsData["campaign_uid"];
	$arrRs["campaign_id"] = $rsData["campaign_id"];
	$arrRs["campaign_name"] = $rsData["campaign_name"];
	$arrRs["campaign_point"] = $rsData["campaign_point"];
	$arrRs["campaign_reward"] = $rsData["campaign_reward"];
	$arrRs["campaign_detail"] = $rsData["campaign_detail"];
	$arrRs["campaign_total"] = $rsData["campaign_total"];
	$arrRs["insert_date"] = $rsData["insert_date"];
	$arrRs["last_update"] = $rsData["last_update"];
} else {
	// null data
	$arrRs[resultdata] = "empty";
}

// generate array to json
echo json_encode($arrRs);
?>
