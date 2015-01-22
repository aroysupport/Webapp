<?php
/**
 * Created by PhpStorm.
 * User: calvinho
 * Date: 9/5/14
 * Time: 10:48 AM
 */

/*
 * Error message debug
 *
 */
/*ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);*/

//web service call address
$base = "http://54.68.229.64/Service1.svc/";
$method = $_GET["method"];
if(isset($_GET["ID"])){
    $ID = $_GET["ID"];
}

$debug = false;
/*
 * Store and combine Json in session
 *
 *
if (isset($_SESSION['$source'])) {
    //echo "isset";
    $source = $_SESSION['$source'];
} else {
    //echo "not set";
    $source = array();
}*/

/*
 * Check which method is using
 * Get "base+?method=value" from URL
 */
if (strpos($method, 'get') !== false) {
    $json = api($method, $base);
    echo json_encode($json);
    // $_SESSION['$source'] = parseData($json, $method, $source);
    /*echo '<pre style="word-wrap: break-word; white-space: pre-wrap;">';
     echo json_encode($_SESSION['$source'] ,true);
     echo '</pre>';*/
} elseif (strpos($method, 'update') !== false) {
    post($method, $base, $_POST);
    //echo 'update';
} elseif (strpos($method, 'create') !== false) {
    post($method, $base,$_POST);
    //echo 'update';
} elseif (strpos($method, 'checkAccount') !== false) {
    checkAccount(api("getAllUsers", $base), $_POST);
    //echo 'update';
} elseif (strpos($method, 'delete') !== false) {
    session_destroy();
    //echo 'update';
} elseif (strpos($method, 'postBrand') !== false) {
   // post("updateBrand", $base);
    foreach($_POST as $key => $data) {
        //echo "key:".$key."<br>";
        if(sizeof($data)>1){
            echo "<br><br>update Brand<br>Brand name = ".$data["Name"];
            post("updateBrand", $base, json_encode($data));
        }else{
            echo "<br><br>create Brand<br>Brand name = ".$data["Name"];
            $newBrandID = getLastID("getAllBrands")+1;
            $newData = array(
                'BrandID' => $newBrandID,
                //'BrandInfo' => '[Your MicroBlogs Description Here]',
                //'BrandPhilosophy' => '[Your BrandInfo Description Here]',
                //'Description' => '[Your Brand Description Here]',
                //'MicroBlogs' => '[Your BrandPhilosophy Description Here]',
                'Name' => $data['Name']
            );
            post("createBrand", $base, json_encode($newData));
            $newAccountBrand = array(
                'BrandID' => $newBrandID,
                'AccountID' => $_GET["ID"],
            );
            echo "<br><br>create New Account Brand <br><br>";
            post("createAccountBrand", $base, json_encode($newAccountBrand));
        }
    }
    //return true;
    //echo 'update';
}elseif (strpos($method, 'postProduct') !== false) {
    // post("updateBrand", $base);
    foreach($_POST as $key => $data) {
        //echo "key:".$key."<br>";
        if(sizeof($data)>1){
            echo "<br><br>update Product<br>Product name = ".$data["Name"];
            post("updateProduct", $base, json_encode($data));
        }else{
            echo "<br><br>create Product<br>Product name = ".$data["Name"];
            $newProductID = getLastID("getAllProducts")+1;
            $newData = array(
                'ProductID' => $newProductID,
                //'BrandInfo' => '[Your MicroBlogs Description Here]',
                //'BrandPhilosophy' => '[Your BrandInfo Description Here]',
                //'Description' => '[Your Brand Description Here]',
                //'MicroBlogs' => '[Your BrandPhilosophy Description Here]',
                'Name' => $data['Name']
            );
            post("createProduct", $base, json_encode($newData));
            /*$newAccountBrand = array(
                'BrandID' => $newBrandID,
                'AccountID' => $_GET["ID"],
            );
            echo "<br><br>create New Account Brand <br><br>";
            post("createAccountBrand", $base, json_encode($newAccountBrand));*/
        }
    }
    //return true;
    //echo 'update';
}
elseif (strpos($method, 'campaign') !== false) {
    // post("updateBrand", $base);
    $newCampaignID;
    foreach($_POST as $key => $data) {
        //echo "key:".$key."<br>";
        /*if(sizeof($data)>1){
            echo "<br><br>update Brand<br>Brand name = ".$data["Name"];
            post("updateBrand", $base, json_encode($data));
        }else{*/
           // echo "<br><br>create Campaign<br>Campaign name = ".$data["Name"];
            $newCampaignID = getLastID("getAllCampaigns")+1;
        echo "campaignID = ".$newCampaignID;
            $data["CampaignID"] = $newCampaignID;
            //echo "<br>".$data."<br>";
            $newData = $data;
            /*$newData = array(
                'BrandID' => $newBrandID,
                //'BrandInfo' => '[Your MicroBlogs Description Here]',
                //'BrandPhilosophy' => '[Your BrandInfo Description Here]',
                //'Description' => '[Your Brand Description Here]',
                //'MicroBlogs' => '[Your BrandPhilosophy Description Here]',
                'Name' => $data['Name']
            );*/
            post("createCampaign", $base, json_encode($newData));
            /*$newAccountBrand = array(
                'BrandID' => $newBrandID,
                'AccountID' => $_GET["ID"],
            );
            echo "<br><br>create New Account Brand <br><br>";
            post("createAccountBrand", $base, json_encode($newAccountBrand));*/
        //}
    }
    return $newCampaignID;
    //echo 'update';
}elseif (strpos($method, 'test') !== false) {
   /* $data = array(
        'BrandID' => '1',
        'BrandInfo' => '[Your MicroBlogs Description Here]',
        'BrandPhilosophy' => '[Your BrandInfo Description Here]',
        'Description' => '[Your Brand Description Here]',
        'MicroBlogs' => '[Your BrandPhilosophy Description Here]',
        'Name' => 'Audi＿edited'
    );
    postWithData("updateBrand", $base, json_encode($data, JSON_NUMERIC_CHECK) );*/
    //echo getLastID("getAllBrands");
    $newAccountBrand = array(
        'BrandID' => $_GET["BrandID"],
        'AccountID' => $_GET["AccountID"],
    );
    echo "<br><br>create New Account Brand <br><br>";
    post("createAccountBrand", $base, json_encode($newAccountBrand));
}
elseif (strpos($method, 'try') !== false) {
    /* $data = array(
         'BrandID' => '1',
         'BrandInfo' => '[Your MicroBlogs Description Here]',
         'BrandPhilosophy' => '[Your BrandInfo Description Here]',
         'Description' => '[Your Brand Description Here]',
         'MicroBlogs' => '[Your BrandPhilosophy Description Here]',
         'Name' => 'Audi＿edited'
     );
     postWithData("updateBrand", $base, json_encode($data, JSON_NUMERIC_CHECK) );*/
    //echo getLastID("getAllBrands");
    $newAccountBrand = array(
        'UserID' => $_GET["UserID"],
        'AccountID' => $_GET["AccountID"],
    );
    echo "<br><br>create New Account Brand <br><br>";
    post("createAccountUser", $base, json_encode($newAccountBrand));
}elseif (strpos($method, 'size') !== false) {
    echo getLastID($_GET["value"]);
}

/*****************************************************/
/*
 * Function to get json repsonse with GET service calls
 * @param $method: Service calls (e.g getAllBrands)
 * @param $base: The base URL for the service call
 */
function api($method, $base) {
    $url = $base . $method;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $raw_data = curl_exec($ch);
	if (false === $raw_data) {
      throw new Exception("Error: get() - cURL error: " . curl_error($ch));
    }
    curl_close($ch);
    $data = json_decode($raw_data, true);
    return $data;
}

function post($method, $base, $data) {
    $url = $base . $method;
    //echo print_r($_POST);
    //echo print_r(json_encode($data));
    //echo "<br>";
    //$data = json_encode($_POST,JSON_FORCE_OBJECT);
    $curl = curl_init($url);
    curl_setopt_array($curl, array(
        CURLOPT_POST => TRUE,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HTTPHEADER => array('Content-Type: application/x-www-form-urlencoded'),
        CURLOPT_POSTFIELDS => $data));

    $json_response = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	if (false === $raw_data) {
      throw new Exception("Error: get() - cURL error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
    }
    /*if ($status != 200) {
        die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
    }*/
    curl_close($curl);
    $response = json_decode($json_response, true);
    //return true;
    //echo "<br>";
    debug("WasSuccessful?", $response['WasSuccessful'], true);
    //printf ("WasSuccessful: ".$response['WasSuccessful');
   // echo "<br>";
    /*if ($response['WasSuccessful']) {
        //header("Location: http://login.aroy.us");
        //exit();
        echo "WasSuccessful";
    }else{
        echo "not working";
    }*/
}


/*
 * Helper function to merge json response into a single array
 * @param $json: json response
 * @param $method: service call associate with the json response
 * @param $source: the array that json will merage into.
 */
function parseData($json, $method, $source) {
    $str = str_replace("g", "G", $method);
    $newStr = $str . "Result";
    $list = $json[$newStr];
    $result = array_merge($source, $json);
    return $result;
}
/*
 * Helper function to get the last ID of the base table (e.g Account, brand, collection, user,.etc)
 * @param $table: base table
 */
function getLastID($table){
    $str = substr(str_replace("getAll", "", $table ),0,-1)."ID";
    //echo "str = ".$str;
    $json = api($table, $GLOBALS['base']);
    foreach ($json as $key => $value) {
        foreach ($value as $k => $v) {
           // debug("ID", $v[$str], $GLOBALS['debug']);
            $ID = $v[$str];
        }
    }
    return $ID;
}
function checkAccount($json, $value) {
    $name = $value['Name'];
    $pwd = $value['Password'];
    foreach ($json as $key => $value) {
        foreach ($value as $k => $v) {
            debug("Json userID", $v['Name'], $GLOBALS['debug']);
            debug("entered UserID", $name, $GLOBALS['debug']);
            if ($v['Name'] == $name) {
                debug("Json Pwd", $v['Password'], $GLOBALS['debug']);
                debug("entered Pwd", $pwd, $GLOBALS['debug']);
                if ($v["Password"] == $pwd) {
                    $accountID = getAccount($v["UserID"]);
                    //$ID = $v['UserID'];
                    header("Location: http://accounts.aroy.us?user=" . urlencode($name)."&ID=". urlencode($accountID));
                    //header("Location: http://127.0.0.1:8020/Web_App_v1.1%28Add%20and%20template%20for%20post%20brand%20and%20product%20collection%20working%20%29/main_frame/index.html?user=" . urlencode($name)."&ID=". urlencode($accountID));

                    exit();
                } else {
                    $errorMsg ="UserID or Password not match!";
                    header("Location: http://login.aroy.us/index.html?error=".urlencode($errorMsg));
                    exit();
                }
            }
        }
    }
}
function getAccount($userID) {
    $str = "getAccountUserInfo/".$userID;
    $account = api($str, $GLOBALS['base']);
    foreach ($account as $key => $value) {
        foreach ($value as $k => $v) {
            debug("userID", $v['UserID'], $GLOBALS['debug']);
            if ($v['UserID'] == $userID) {
                $_SESSION['AccountID']= $v['AccountID'];
                return $v['AccountID'];
            }
        }
    }
}
function debug($method, $value, $status) {
    if ($status) {
        echo "<br>Debug target: " . $method . "<br>";
        echo "Debug value: " . $value . "<br>";
    }
}

/********************************************************************************************************/
function checkHistory() {
    foreach ($_SESSION['$source'] as $key => $value) {
        foreach ($value as $k => $v) {
            if ($v["Name"]) {

            }
        }
    }
}
function postWithData($method, $base, $data) {
    $url = $base . $method;
    echo print_r($data);
    //echo var_dump($data);
    $curl = curl_init($url);
    curl_setopt_array($curl,
        array(CURLOPT_POST => TRUE,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_HTTPHEADER => array('Content-Type: application/x-www-form-urlencoded'), CURLOPT_POSTFIELDS => $data));

    $json_response = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if ($status != 200) {
        die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
    }
    curl_close($curl);
    $response = json_decode($json_response, true);
    debug("WasSuccessful?", $response, true);
    if ($response==0) {
        echo "WasSuccessful";
    }else{
        echo "not working";
    }
}