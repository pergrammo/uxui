<?php

class resize {
	
	private $images , $new_images;
	
	private $dateupper;
	
	private $datenumber;
	
	private $engstr;
	
	private $emailformat;
	
	public function get_imgresize($inputtemp, $inputname, $imgpath, $imgwidth) {
		
		$this->images = $inputtemp;
		//$this->new_images = "Thumbnails_".$inputname;
		$this->new_images = $inputname;
		
		copy($inputtemp,$imgpath."/".$inputname);
		
		$width = $imgwidth; //*** Fix Width & Heigh (Autu caculate) ***//
		$size = GetimageSize($this->images);
		$height = round($width*$size[1]/$size[0]);
		
		//$images_orig = ImageCreateFromJPEG($this->images);
        $images_orig = $this->check_imgtype($this->images);

		$photoX = ImagesX($images_orig);
		$photoY = ImagesY($images_orig);
		$images_fin = ImageCreateTrueColor($width, $height);
		
		ImageCopyResampled($images_fin, $images_orig, 0, 0, 0, 0, $width+1, $height+1, $photoX, $photoY);
		
		//ImageJPEG($images_fin,$imgpath."/".$this->new_images);
		$this->export_img($this->images,$images_fin,$imgpath."/".$this->new_images);
		
		ImageDestroy($images_orig);
		ImageDestroy($images_fin);
		
		//return $imgpath."/".$this->new_images;
		return $this->new_images;
		
	}

	public function check_imgtype($str_img) {
		// convert image type
		switch(exif_imagetype($str_img)) {
			case IMAGETYPE_GIF:
			return ImageCreateFromGIF($str_img);
			break;
			case IMAGETYPE_JPEG:
			return ImageCreateFromJPEG($str_img);
			break;
			case IMAGETYPE_PNG:
			return ImageCreateFromPNG($str_img);
			break;
			case IMAGETYPE_BMP:
			return ImageCreateFromBMP($str_img);
			break;
			default:
			return ImageCreateFromJPEG($str_img);
			break;
		}
	}

	public function export_img($str_img, $str_old, $str_new) {
		// export image type
		switch(exif_imagetype($str_img)) {
			case IMAGETYPE_GIF: ImageGIF($str_old, $str_new);
			break;
			case IMAGETYPE_JPEG: ImageJPEG($str_old, $str_new);
			break;
			case IMAGETYPE_PNG: ImagePNG($str_old, $str_new);
			break;
			case IMAGETYPE_BMP: ImageBMP($str_old, $str_new);
			break;
			default: ImageJPEG($str_old, $str_new);
			break;
		}
	}
	
	public function get_dateupper($d) {
		// convert upper string
		$this->dateupper = date('D', strtotime($d));
        return strtoupper($this->dateupper);
	}
	
	public function get_onlydatenumber($dt) {
		// find & remove string
		$this->datenumber = preg_replace("/[-: ]/", "", $dt);
		return $this->datenumber;
	}
	
	public function get_englishstring($str) {
		// find & remove string
		$this->engstr = preg_match('/[^A-Za-z0-9]/', $str);
		return $this->engstr;
	}
	
	public function get_emailformat($email) {
		// find & remove string
		if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$this->emailformat = true;
		} else {
			$this->emailformat = false;
		}
		return $this->emailformat;
	}
	
}

?>