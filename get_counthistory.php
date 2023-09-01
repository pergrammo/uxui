<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
require "_library/_class/class.db.php";

// create new object
$obj_cDML = new cDML();

// receive value
$strId = $_POST["id"];

// sql command
$sql = "SELECT count(*) as allcount FROM tbl_coupon WHERE coupon_uid = '" . $strId . "' ORDER BY coupon_cid ASC, insert_date DESC";

// create new array for receive data from database
$arrRs = array();

// query/check data
$rsData = $obj_cDML -> slcvar3($sql);

// insert data in new array
if ($rsData) {
	$arrRs["allcount"] = $rsData["allcount"];
} else {
	// null data
	$arrRs[resultdata] = "empty";
}

// generate array to json
echo json_encode($arrRs);
?>
