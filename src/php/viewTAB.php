<?php
require 'index.php';
$data=array();
$sql = "SELECT * FROM book";
 $q = mysqli_query($con, $sql);
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

?>
