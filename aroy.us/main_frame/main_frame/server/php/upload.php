<?php

$upload_dir = 'myuploads';

if (!empty($_FILES)) {

 $tempFile = $_FILES['file']['tmp_name'];
	echo "FileName: ". $tempFile;
 // using DIRECTORY_SEPARATOR constant is a good practice, it makes your code portable.
 $targetPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . $upload_dir . DIRECTORY_SEPARATOR;
 echo "TargetPath: ". $targetPath;
 // Adding timestamp with image's name so that files with same name can be uploaded easily.
 $mainFile = $targetPath.time().'-'. $_FILES['file']['name'];
 echo "MainFile: ". $mainFile;

 move_uploaded_file($tempFile,$mainFile);

}
?>