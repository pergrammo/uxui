<?php
	/**
		v3.0, (05/09/2015)
		Pergrammo - Writer
		Software Engineer, PHP/JSON/MySQLi Project
		Copyright 2015 Suchana Active System Co.,Ltd.  All rights reserved.
	**/

	require_once("configs.php");
	
	interface iConnect
	{
		/* connect */
		public function connect();
	}	
	
	interface iDML
	{		
		/* query */
		public function slcvar1($sql);
		public function slcvar2($sql);
		public function slcvar3($sql);
		
		/* insert */
		public function addvar($sql);
		
		/* update */
		public function edtvar($sql);
		
		/* delete */
		public function delvar($sql);
	}
?>