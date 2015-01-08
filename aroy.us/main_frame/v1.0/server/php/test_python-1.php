<?php

$gg = exec('C:\\Python34\\python.exe upload_to_s3-1.py C:\\inetpub\\wwwroot\\Web_App_source_code\\main_frame\\server\\php\\index2.jpg output\ 2>&1',$output, $err);
echo "<br>-------------output-----------------<br><pre>";
echo print_r($output);
echo "<br>-------------err-----------------<br>";
echo $err;
echo "<br>------------------------------<br>";
echo "<br>-------------gg-----------------<br>";
echo $gg;
echo "<br>------------------------------<br>";
