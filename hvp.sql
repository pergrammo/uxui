CREATE TABLE `tbl_campaign` (
  `id` int(11) NOT NULL auto_increment,
  `campaign_email` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `campaign_phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `campaign_uid` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `campaign_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `campaign_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `campaign_point` int(6),
  `campaign_reward` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `campaign_detail` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `campaign_total` int(6),
  `insert_date` datetime DEFAULT NULL,
  `last_update` datetime DEFAULT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `tbl_campaign` (campaign_id, campaign_name, campaign_point, campaign_reward, campaign_detail, insert_date) VALUES ('a1b2c3d4e5f6g7h8i9j0', 'Campaign 900', 900, 'Reward 900', 'มี 900HVP แลกสินค้า Samsung Smart Watch', '2022-06-12 11:23:01');


CREATE TABLE `tbl_coupon` (
  `id` int(11) NOT NULL auto_increment,
  `coupon_email` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `coupon_phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `coupon_uid` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `coupon_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `coupon_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `coupon_status` varchar(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `coupon_point` int(6),
  `coupon_cid` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `insert_date` datetime DEFAULT NULL,
  `last_update` datetime DEFAULT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `tbl_coupon` (coupon_uid, coupon_id, coupon_name, coupon_status, coupon_point, insert_date) VALUES ('uid1', 'couponid1', 'coupon1', 'A', 100, '2022-06-12 11:23:01');

INSERT INTO `tbl_coupon` (coupon_uid, coupon_id, coupon_name, coupon_status, coupon_point, insert_date) VALUES ('uid1', 'couponid2', 'coupon2', 'A', 70, '2022-06-16 10:23:01');

INSERT INTO `tbl_coupon` (coupon_uid, coupon_id, coupon_name, coupon_status, coupon_point, insert_date) VALUES ('uid1', 'couponid3', 'coupon3', 'D', 40, '2022-06-20 09:23:01');


CREATE TABLE `tbl_point` (
  `id` int(11) NOT NULL auto_increment,
  `point_email` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `point_phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `point_uid` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `point_uname` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `point_uimage` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `point_surname` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `point_lastname` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `point_birthdate` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `point_gender` varchar(6) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `point_total` int(6),
  `insert_date` datetime DEFAULT NULL,
  `last_update` datetime DEFAULT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `tbl_point` (point_uid, point_uname, point_uimage, insert_date) VALUES ('uid1', 'linetester1', 'pfimage.png', '2022-06-12 11:23:01');


CREATE TABLE `tbl_notify` (
  `id` int(11) NOT NULL auto_increment,
  `notify_email` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `notify_phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `notify_uid` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `notify_topic` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `notify_detail` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `notify_icon` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `notify_color` varchar(6) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `notify_status` varchar(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `insert_date` datetime DEFAULT NULL,
  `last_update` datetime DEFAULT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;