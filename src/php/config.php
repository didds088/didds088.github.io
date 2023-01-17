<?php
header("Access-Control-Allow-Origin: *");
class Database {
   
 public function connect() {
   $con = mysqli_connect("localhost","id19801253_didds088","Despro4196#1988","id19801253_school") or die ("could not connect database" . mysqli_connect_error());
   return $con;
 }
//  VIEW DATA
 public function view() {
    $data=array();
    $conn=$this->connect();
    $sql = "SELECT * FROM book";
    $q = mysqli_query($conn, $sql);
    $rowcount=mysqli_num_rows($q);
    if ($rowcount>0)
    {
    while ($row=mysqli_fetch_object($q)){
    $data[]=$row;
    }
    } 
    else
    {
    $data[]="0";
    }
    echo json_encode($data);
 }

//  MASS DELETE
 public function delete($id) {
    $conn=$this->connect();
    $q=mysqli_query($conn,"DELETE FROM book WHERE id=$id");
    if($q){
    
    }
    else{
    echo "error";
    }
 }
// INSERT DATA
public function insert($name,$type,$sku,$price,$measurement,$value) {
    $conn=$this->connect();
    $q=mysqli_query($conn,"INSERT INTO book (`name`, `type`, `sku`, `price`, `measurement`, `value`) VALUES ('$name','$type','$sku','$price','$measurement','$value')");
    if($q){
  
    }
    else{
    echo "error";
    }
}
// CHECK IF SKU IS AVAILABLE
public function checkSKU($unique) {
    $conn=$this->connect();
    $data=array();
    $sql = "SELECT * FROM book WHERE sku='$unique'";
    $q = mysqli_query($conn, $sql);
    $rowcount=mysqli_num_rows($q);
    if ($rowcount>0)
    {
      while ($row=mysqli_fetch_object($q)){
      $data[]=$row;
      }
    } 
    else
    {
      $data[]="0";
    }
    echo json_encode($data);
}

}
?>