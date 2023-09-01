<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
require "_library/_class/class.db.php";

// create new object
$obj_cDML = new cDML();

// receive value
$strId = $_POST["id"];

$sql = "SELECT tbl_point.point_uid AS Uids, tbl_point.point_uname AS Uname, tbl_point.point_uimage AS Uimage, tbl_campaign.campaign_id AS Cid, tbl_campaign.campaign_total AS Utotal FROM tbl_point LEFT JOIN tbl_campaign ON tbl_point.point_uid = tbl_campaign.campaign_uid WHERE tbl_point.point_uid = '" . $strId . "' ORDER BY tbl_campaign.campaign_id ASC";

//$sql = "SELECT * FROM tbl_point LEFT JOIN tbl_campaign ON tbl_point.point_uid = tbl_campaign.campaign_uid WHERE tbl_point.point_uid = '" . $strId . "'";

//$sql = "SELECT * FROM tbl_point WHERE point_uid = '" . $strId . "'";

// create new array for receive data from database
$arrRs = array();

// query/check data
$rsData = $obj_cDML -> slcvar3($sql);

// insert data in new array
if ($rsData) {
	// tbl_point
	$arrRs["point_uid"] = $rsData["Uids"];
	$arrRs["point_uname"] = $rsData["Uname"];
	$arrRs["point_uimage"] = $rsData["Uimage"];

	// tbl_campaign
	//$arrRs["campaign_id"] = $rsData["Cid"];
	$arrRs["campaign_total"] = $rsData["Utotal"];
} else {
	// null data
	$arrRs[resultdata] = "empty";
}

// generate array to json
echo json_encode($arrRs);
?>
