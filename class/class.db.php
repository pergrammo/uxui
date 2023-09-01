<?php
	/**
		v3.0, (05/09/2015)
		Pergrammo - Writer
		Software Engineer, PHP/JSON/MySQLi Project
		Copyright 2015 Suchana Active System Co.,Ltd.  All rights reserved.
	**/

	require("_library/_config/ifunctions.php");
	
	class cConnect implements iConnect
	{
		public function connect()
		{
			$serv = array(_HOST_, _USER_, _PASS_, _DB_);
			$result = mysqli_connect($serv[0],$serv[1],$serv[2],$serv[3]);
			if(!$result) 
			{
				return false;
			}
			mysqli_query($result,_LANG_);
			return $result;
		}
	}
	
	class cDML implements iDML
	{
		private $ref_cConnect;
		
		public function slcvar1($sql)
		{	
			$this->ref_cConnect = new cConnect();
			
			if(!$this->ref_cConnect->connect()) 
			{
				return false;
			}
			$result = mysqli_query($this->ref_cConnect->connect(),$sql);
			if(!$result) 
			{
				return false;
			}
			if(mysqli_fetch_array($result,MYSQLI_ASSOC))
			{
				return true;
			} 
			else
			{
				return false;
			}
		}
		
		public function slcvar2($sql)
		{	
			$this->ref_cConnect = new cConnect();
			
			if(!$this->ref_cConnect->connect()) 
			{
				return false;
			}
			$db_query = mysqli_query($this->ref_cConnect->connect(),$sql);
			if(!$db_query) 
			{
				return false;
			} 
			else 
			{
				return $db_query;
			}
		}	
		
		public function slcvar3($sql)
		{	
			$this->ref_cConnect = new cConnect();
			
			if(!$this->ref_cConnect->connect()) 
			{
				return false;
			}
			$result = mysqli_query($this->ref_cConnect->connect(),$sql);
			if(!$result) 
			{
				return false;
			}
			if(mysqli_num_rows($result)>0) 
			{
				$rs = mysqli_fetch_array($result,MYSQLI_ASSOC);return $rs;
			} 
			else 
			{
				return false;
			}
		}	
		
		public function addvar($sql)
		{
			$this->ref_cConnect = new cConnect();
			
			if(!$this->ref_cConnect->connect()) 
			{
				return false;
			}
			$result = mysqli_query($this->ref_cConnect->connect(),$sql);
			if(!$result) 
			{
				return false;
			} 
			else 
			{
				return true;
			}
		}
		
		public function edtvar($sql)
		{	
			$this->ref_cConnect = new cConnect();
			
			if(!$this->ref_cConnect->connect()) 
			{
				return false;
			}
			$result = mysqli_query($this->ref_cConnect->connect(),$sql);
			if(!$result) 
			{
				return false;
			} 
			else 
			{
				return true;
			}
		}	
		
		public function delvar($sql)
		{	
			$this->ref_cConnect = new cConnect();
			
			if(!$this->ref_cConnect->connect()) 
			{
				return false;
			}
			$result = mysqli_query($this->ref_cConnect->connect(),$sql);
			if(!$result) 
			{
				return false;
			} 
			else 
			{
				return true;
			}
		}
	}
?>