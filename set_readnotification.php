<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
require "_library/_class/class.db.php";

// ** create new object **
$obj_cDML = new cDML();

// ** receive value **
//$strId = $_POST["id"];

// query string.
$strUid = $_POST["uid"];
$strDisplayname = $_POST["displayname"];
$strPicture = $_POST["picture"];

$strDate = date("Y-m-d H:i:s");

// create new array for receive data from database
$arrRs = array();

// check usr.
if ($strUid) {
    // check blockid.
	//if ($strBlockid) {

		// insert new data.
		try {
			    // query tbl_notify tbl.
				$rsManagedata = $obj_cDML -> slcvar3("SELECT * FROM tbl_notify WHERE notify_uid = '" . $strUid . "' and notify_status = 'N'");
				if ($rsManagedata) {
					// update tbl_notify
					if (!$obj_cDML -> edtvar("UPDATE tbl_notify SET notify_status = 'R' WHERE notify_uid = '" . $rsManagedata["notify_uid"] . "'")) {
						throw new Exception("\"Update Data\" error!");
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
