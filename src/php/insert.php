<?php
 require "index.php";
 $name=$_POST['name'];
 $type=$_POST['type'];
 $sku=$_POST['sku'];
 $price=$_POST['price'];
 $measurement=$_POST['measurement'];
 $value=$_POST['value'];
$q=mysqli_query($con,"INSERT INTO book (`name`, `type`, `sku`, `price`, `measurement`, `value`) VALUES ('$name','$type','$sku','$price','$measurement','$value')");
if($q){
  
  }
 else{
  echo "error";
  }
 ?>
