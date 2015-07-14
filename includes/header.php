<?php

$dev = isset($_GET['deploy']) && $_GET['deploy'] === 'true' ? false : true;
$url = 'http://localhost/frogstuff';

if ( isset($_GET['deploy-url']) ) {
    $url = $_GET['deploy-url'];
}

// set the location
$location = str_replace('http://', '', $url); ?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js oldie lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js oldie lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js oldie lt-ie9"> <![endif]-->
<!--[if IE 9]>         <html class="no-js oldie"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <title>Best Finest Wedding</title>

        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="shortcut icon" href="<?= $url; ?>/favicon.ico">

        <link rel="stylesheet" href="<?= $url; ?>/css/style.css">

        <script src="<?= $url; ?>/js/vendor/modernizr-2.6.2.min.js"></script>
    </head>

    <body>

        <header></header>

        <main>
