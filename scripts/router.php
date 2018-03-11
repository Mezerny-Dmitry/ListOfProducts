<?php
// $name = $_POST['name'];
// $executor = $_POST['executor'];
// $number = $_POST['number'];
// $email = $_POST['email'];
// $day = $_POST['day'];
// $time = $_POST['time'];

$newProduct = null;

$newProduct['name'] = $_POST['name'];
$newProduct['price'] = $_POST['price'];
$newProduct['img_url'] = $_POST['img_url'];
$newProduct['id'] = $_POST['id'];
$newProduct['description'] = $_POST['description'];

// print_r('hi');

$config = json_decode(file_get_contents(__DIR__.'./config/config.json'), true);

array_push($config, $newProduct);

file_put_contents(__DIR__.'./config/config.json', json_encode($config));

// echo("<pre>");

// // print_r($config);
// print_r(newProduct);

// echo("</pre>");

// print_r(__DIR__.'config/config.json');


?>