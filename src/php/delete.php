<?php
 require "index.php";
 $id=$_POST['selected'];
$q=mysqli_query($con,"DELETE FROM book WHERE id=$id");
if($q){
  
  }
 else{
  echo "error";
  }
 ?>
