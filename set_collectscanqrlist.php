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
$strCap = $_POST["cap"];
$strCop = $_POST["cop"];
$strNam = $_POST["nam"];
$strStt = $_POST["stt"];
$strPts = $_POST["pts"];

$strDate = date("Y-m-d H:i:s");

// create new array for receive data from database
$arrRs = array();

// check usr.
if ($strUid) {
    // check blockid.
	//if ($strBlockid) {

		// insert new data.
		try {
			    // query tbl_coupon tbl.
				$rsManagedata = $obj_cDML -> slcvar3("SELECT * FROM tbl_coupon WHERE coupon_uid = '" . $strUid . "' and coupon_id = '" . $strCop . "' and coupon_cid = '" . $strCap . "'");
				if (!$rsManagedata) {
					// all sum (pts)
					$rsSumData = $obj_cDML -> slcvar3("SELECT sum(coupon_point) as allsumpts FROM tbl_coupon WHERE coupon_uid = '" . $strUid . "' and coupon_cid = '" . $strCap . "'");

					// check (pts)
					if (($rsSumData["allsumpts"] + $strPts) < 0) {
						// error!
						throw new Exception("\"ยอดแต้มสะสม\" ไม่พอ!");
					} else {

						// insert coupon
						if (!$obj_cDML -> addvar("INSERT INTO tbl_coupon (coupon_uid, coupon_id, coupon_name, coupon_status, coupon_point, coupon_cid, insert_date) VALUES ('" . $strUid . "', '" . $strCop . "', '" . $strNam . "', '" . $strStt . "', " . $strPts . ", '" . $strCap . "', '" . $strDate . "')")) {
							throw new Exception("\"Create Data\" error!");
						}

						// update campaign
						//if (!$obj_cDML -> edtvar("UPDATE tbl_campaign SET campaign_uid = '" . $strUid . "', last_update = '" . $strDate . "' WHERE campaign_id = '" . $strCap . "'")) {
							//throw new Exception("\"Update Data\" error!");
						//}
					
						// all new sum (pts)
						$rsSumDataNew = $obj_cDML -> slcvar3("SELECT sum(coupon_point) as allsumpts FROM tbl_coupon WHERE coupon_uid = '" . $strUid . "' and coupon_cid = '" . $strCap . "'");

						// update point
						//if (!$obj_cDML -> edtvar("UPDATE tbl_point SET point_total = " . $rsSumDataNew["allsumpts"] . ", last_update = '" . $strDate . "' WHERE point_uid = '" . $strUid . "'")) {
							//throw new Exception("\"Update Data\" error!");
						//}

						// update campaign
						if (!$obj_cDML -> edtvar("UPDATE tbl_campaign SET campaign_total = " . $rsSumDataNew["allsumpts"] . ", last_update = '" . $strDate . "' WHERE campaign_uid = '" . $strUid . "' and campaign_id = '" . $strCap . "'")) {
							throw new Exception("\"Update Data\" error!");
						}

						// done.
						$arrRs[status] = "1";
						$arrRs[msg] = "สำเร็จ";

					}

				} else {
					// error!
					throw new Exception("\"ไม่สามารถ\" ใช้คูปองนี้ได้อีก!");
				}
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
