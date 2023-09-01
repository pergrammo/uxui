<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
require "_library/_class/class.db.php";
//require "class.resize.php";

// ** create new object **
$obj_cDML = new cDML();
//$obj_resize = new resize();

// ** receive value **
//$strId = $_POST["id"];

// query string.
$strUid = $_POST["uid"];
$strDisplayname = $_POST["displayname"];
$strPicture = $_POST["picture"];

//$strImg = $obj_resize -> get_imgresize($_FILES["payment-upload-input"]["tmp_name"], $_FILES["payment-upload-input"]["name"], "../img/payment/new", 500);

$strDate = date("Y-m-d H:i:s");

// create new array for receive data from database
$arrRs = array();

// check usr.
if ($strUid) {
    // check blockid.
	//if ($strBlockid) {

		// insert new data.
		try {
			    // query tbl_point tbl.
				$rsManagedata = $obj_cDML -> slcvar3("SELECT * FROM tbl_point WHERE point_uid = '" . $strUid . "'");
				if (!$rsManagedata) {
					// insert point
					if (!$obj_cDML -> addvar("INSERT INTO tbl_point (point_uid, point_uname, point_uimage, insert_date) VALUES ('" . $strUid . "', '" . $strDisplayname . "', '" . $strPicture . "', '" . $strDate . "')")) {
						throw new Exception("\"Create Data\" error!");
					}

					// insert tbl_notify
					if (!$obj_cDML -> addvar("INSERT INTO tbl_notify (notify_uid, notify_topic, notify_detail, notify_icon, notify_color, notify_status, insert_date, last_update) VALUES ('" . $strUid . "', 'คุณ: " . $strDisplayname . "', 'ได้เริ่มต้นเข้าใช้งานแอพ', '&#xe24e;', '161e2d', 'N', '" . $strDate . "', '" . $strDate . "')")) {
						throw new Exception("\"Create Data\" error!");
					}
				} else {
					// query image
					//if (!$_FILES["payment-upload-input"]["tmp_name"]) {$strImg = $rsManagedata["payment_image"];}

					// update point
					if (!$obj_cDML -> edtvar("UPDATE tbl_point SET point_uname = '" . $strDisplayname . "', point_uimage = '" . $strPicture . "', last_update = '" . $strDate . "' WHERE point_uid = '" . $rsManagedata["point_uid"] . "'")) {
						throw new Exception("\"Update Data\" error!");
					}

					/*
					// insert tbl_notify
					if (!$obj_cDML -> addvar("INSERT INTO tbl_notify (notify_uid, notify_topic, notify_detail, notify_icon, notify_color, notify_status, insert_date) VALUES ('" . $strUid . "', 'คุณ: " . $strDisplayname . "', 'เข้าใช้งานแอพ', '&#xe24e;', '161e2d', 'N', '" . $strDate . "')")) {
						throw new Exception("\"Create Data\" error!");
					}
					*/

					/*
					// update tbl_notify
					if (!$obj_cDML -> edtvar("UPDATE tbl_notify SET notify_topic = 'คุณ: " . $strDisplayname . "', notify_detail = 'เข้าใช้งานแอพ', notify_icon = '&#xe24e;', notify_color = '161e2d', notify_status = 'N', insert_date = '" . $strDate . "' WHERE notify_uid = '" . $rsManagedata["point_uid"] . "'")) {
						throw new Exception("\"Update Data\" error!");
					}
					*/
				}

				// query tbl_notify tbl.
				$rsReaddata = $obj_cDML -> slcvar3("SELECT * FROM tbl_notify WHERE notify_uid = '" . $strUid . "' ORDER BY insert_date DESC");

				// done.
				$arrRs[status] = "1";
				$arrRs[msg] = "Done.";
				$arrRs[read] = $rsReaddata["notify_status"];

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
