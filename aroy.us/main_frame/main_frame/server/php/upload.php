<?php
ini_set('display_startup_errors', 1);
 ini_set('display_errors', 1);
 error_reporting(-1);
#Variables
// $name=$_FILES['file']['name'];
// $uploaded_file = $_FILES['file']['tmp_name'];
// 
// #python program execution
// $python='C:\\Python34\\python.exe';
// $name=str_replace(str_split("\\/!@#$%^&*()`~+,<>;:[]{}|=?"),'_',$name);
// $cmd=$python.' upload_to_s3-2.py '.str_replace(' ','_',$name).' '.$uploaded_file.' output/ 2>&1';
// exec($cmd,$output,$return);
// if(strpos($output,'http://s3-us-west-2.amazonaws.com')==false) {
	// echo $output;
// }
// 
// #output return 
// echo "Output 		:";
// echo print_r($output);
// 
// #delete twmp file from server
// unlink($_FILES['file']['tmp_name']);

$uploaddir = "C:\inetpub\wwwroot\Web\aroy.us\main_frame\main_frame\server\php\output\\";
$uploadfile = $uploaddir . basename($_FILES['file']['name']);

echo '<pre>';
if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
	echo "Address: ".$uploadfile."<br>";
    echo "File is valid, and was successfully uploaded.\n";
} else {
	echo "Address: ".$uploadfile."<br>";
    echo "Possible file upload attack!\n";
}

echo 'Here is some more debugging info:';
print_r($_FILES);
echo "</pre>";
?>