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
$sql = "SELECT * FROM tbl_coupon WHERE coupon_uid = '" . $strId . "' ORDER BY coupon_cid ASC, insert_date DESC LIMIT " . $strRow . "," . $strRowperpage;

//$sql = "SELECT tbl_coupon.id AS coupon_id, tbl_coupon.coupon_email, tbl_coupon.coupon_phone, tbl_coupon.coupon_uid, tbl_coupon.coupon_id, tbl_coupon.coupon_name, tbl_coupon.coupon_status, tbl_coupon.coupon_point, tbl_coupon.insert_date AS coupon_insert, tbl_coupon.last_update AS coupon_update, tbl_point.id AS point_id, tbl_point.point_email, tbl_point.point_phone, tbl_point.point_uid, tbl_point.point_uname, tbl_point.point_uimage, tbl_point.point_surname, tbl_point.point_lastname, tbl_point.point_birthdate, tbl_point.point_gender, tbl_point.point_total, tbl_point.insert_date AS point_insert, tbl_point.last_update AS point_update FROM tbl_coupon LEFT JOIN tbl_point ON tbl_coupon.coupon_uid = tbl_point.point_uid WHERE tbl_point.point_uid = '" . $strId . "' ORDER BY tbl_coupon.insert_date DESC LIMIT " . $strRow . "," . $strRowperpage;

// create new array for receive data from database
$arrRs = array();

// query/check data
$dbqr=$obj_cDML->slcvar2($sql);
$num_rows=mysqli_num_fields($dbqr);

$name_rows = array("id", "coupon_email", "coupon_phone", "coupon_uid", "coupon_id", "coupon_name", "coupon_status", "coupon_point", "coupon_cid", "insert_date", "last_update");

//$name_rows = array("id", "coupon_email", "coupon_phone", "coupon_uid", "coupon_id", "coupon_name", "coupon_status", "coupon_point", "coupon_insert", "coupon_update", "point_id", "point_email", "point_phone", "point_uid", "point_uname", "point_uimage", "point_surname", "point_lastname", "point_birthdate", "point_gender", "point_total", "point_insert", "point_update");
	  
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
