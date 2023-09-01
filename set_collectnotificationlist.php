<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
require "_library/_class/class.db.php";
//require "class.resize.php";

// ** create new object **
$obj_cDML = new cDML();

// ** receive value **
//$strId = $_POST["id"];

// query string.
$strUid = $_POST["uid"];
$strDisplayname = $_POST["displayname"];
$strPicture = $_POST["picture"];
$strMsg = $_POST["smsg"];
$strNam = $_POST["snam"];
$strStt = $_POST["sstt"];
$strStt0 = $_POST["sstt0"];
$strStt1 = $_POST["sstt1"];
$strPts = $_POST["spts"];

$strDate = date("Y-m-d H:i:s");

// create new array for receive data from database
$arrRs = array();

// check icon status
$Stt = "";
if ($strStt == "A") {
	$Stt = "&#xe86c;";
} else {
	$Stt = "&#xe5c9;";
}

// check usr.
if ($strUid) {
    // check blockid.
	//if ($strBlockid) {

		// insert new data.
		try {
			    // query tbl_point tbl.
				$rsManagedata = $obj_cDML -> slcvar3("SELECT * FROM tbl_notify WHERE notify_uid = '" . $strUid . "'");
				if ($rsManagedata) {
					// insert tbl_notify
					if (!$obj_cDML -> addvar("INSERT INTO tbl_notify (notify_uid, notify_topic, notify_detail, notify_icon, notify_color, notify_status, insert_date) VALUES ('" . $strUid . "', 'คุณได้ " . $strStt0 . " = <strong>" . $strPts . " HVP</strong>', 'จากคูปอง <strong>" . $strNam . "</strong>', '" . $Stt . "', '" . $strStt1 . "', 'N', '" . $strDate . "')")) {
						throw new Exception("\"Create Data\" error!");
					}
				} else {
					//
				}

				// done.
				$arrRs[status] = "1";
				$arrRs[msg] = "Done.";

		} catch (Exception $e) {
			// error.
			$arrRs[status] = "0";
			$arrRs[msg] = $e -> getMessage();
		}
	//} else {
		// when data empty
	//	$arrRs[status] = "0";
	//	$arrRs[msg] = "No \"Block Data!\"";
	//}

} else {
	// when data empty
	$arrRs[status] = "0";
	$arrRs[msg] = "No \"user\" in storage!";
}

// generate array to json
echo json_encode($arrRs);
?>
