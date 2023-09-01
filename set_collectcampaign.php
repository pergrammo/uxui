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
$strCap = $_POST["cap"];

$strDate = date("Y-m-d H:i:s");

// create new array for receive data from database
$arrRs = array();

// check usr.
if ($strUid) {
    // check blockid.
	//if ($strBlockid) {

		// insert new data.
		try {
			    // query tbl_campaign tbl.
				$rsManagedata = $obj_cDML -> slcvar3("SELECT * FROM tbl_campaign WHERE campaign_uid = '" . $strUid . "' and campaign_id = '" . $strCap . "'");
				if (!$rsManagedata) {
					// insert campaign
					if (!$obj_cDML -> addvar("INSERT INTO tbl_campaign (campaign_uid, campaign_id, insert_date) VALUES ('" . $strUid . "', '" . $strCap . "', '" . $strDate . "')")) {
						throw new Exception("\"Create Data\" error!");
					}
				} else {
					// update campaign
					if (!$obj_cDML -> edtvar("UPDATE tbl_campaign SET campaign_id = '" . $strCap . "', last_update = '" . $strDate . "' WHERE campaign_uid = '" . $rsManagedata["campaign_uid"] . "'")) {
						throw new Exception("\"Update Data\" error!");
					}
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
