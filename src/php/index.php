<?php
require "config.php";
$mode = $_POST['mode'];
$dbObj = new Database();

if ($mode=="view") {
    $dbObj->view();
}
else if ($mode=="deleted") {
    $id=$_POST['selected'];
    $dbObj->delete($id);
}
else if ($mode=="insert") {
    $name=$_POST['name'];
    $type=$_POST['type'];
    $sku=$_POST['sku'];
    $price=$_POST['price'];
    $measurement=$_POST['measurement'];
    $value=$_POST['value'];
    $dbObj->insert($name,$type,$sku,$price,$measurement,$value);
}
else if ($mode=="check") {
    $unique = $_POST['unique'];
    $dbObj->checkSKU($unique);
}
?>