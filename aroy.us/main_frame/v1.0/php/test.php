<?php

require_once ('http://aroy.us/php/api.class.php');

if ($_GET['method'] == "destory") {
    if (isset($_SESSION['loggedin'])) {
        echo "loggedin = " . $_SESSION['loggedin'] . "<br>";
    } else {
        echo "NULL<br>";
    }
    if (isset($_SESSION['userID'])) {
        echo "userID = " . $_SESSION['userID'] . "<br>";
    } else {
        echo "NULL<br>";
    }
    if (isset($_SESSION['userName'])) {
        echo "userName = " . $_SESSION['userName'] . "<br>";
    } else {
        echo "NULL<br>";
    }

    if (isset($_SESSION['accountID'])) {
        echo "accountID = ";
        echo print_r($api -> getAccountID());
        echo "<br>";

    } else {
        echo "NULL<br>";
    }
    if (isset($_SESSION['accountBrand'])) {
        //$api->AccountBrand();
        echo "accountBrand = ";
        echo print_r($api -> getAccountBrand());

    } else {
        echo "NULL<br>";
    }
}