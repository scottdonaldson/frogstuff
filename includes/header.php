<?php

$dev = isset($_GET['deploy']) && $_GET['deploy'] === 'true' ? false : true;
$url = 'http://localhost/frogstuff';

if ( isset($_GET['deploy-url']) ) {
    $url = $_GET['deploy-url'];
}

// set the location
$location = str_replace('http://', '', $url); ?>
<!DOCTYPE html>
<!--

                                                ,g88bg,
                                       ,g8888g, ),  "8b
                                       ),  "88b<     CP
                                      <     C8I \_ ,'|'
                                       \_ ,-'88,  |  (
                                         |  |88b ,'   \
                                        ,'   Y8P/ ,'   `,
                                      ,' ,'   8( ,'     |
                                     @   ;    |(.;    ) (
                                     `-,/   ,'( \(   / ,'
  Yb,     ________                     /   / ,' /'  /  (
   Y8baadP""""""""Yba,_             .-'  ,' _|-'  ,'   |
aaadP"'             `""Yb,       .-'  _.'- '  _.-'     (
`Y8(                    `"Yb, ,-' _.-(___.. -'\ (      \
  `Y,                      "/' ,-'    ,'       )/       )
    Y,  (O)                `- "a,  _-'       ,-'        )
    `Y,                        "Y-'       ,-'          /dbaa,,____,aa,_
     `Y,       ,aa            ,'        ,'         _,-'     ``""""''  "Y,
       Y,      d'8           /        ,'       _,-'               "Ya   `Y,
       `b      8 8          (      ,-(     ,-''                     `Y,   Y,
        Ya o  ,8 8          (     `-._\    "-.                        b   `b
         Yb,_,dP 8           `-.      `-_     `-.                     Y    8
          `""""  Y              `-._     \-._    `-_                  8    8
                 I,                 `-._  `._`-._   `-._              8    8
                 `b                     `,   )   ``-,   )             P    [
                  `b                    ,' ,'      ,' ,'             d'    [
                   d                    |,'        |,'              ,P     [
                 ,d'    ,PY,         ,P"YaaaaaaP"Ybaaa,,_           d'     [
                d"    ,P"  Y,        d'           8'  `""db,       d'      8
               d'   ,P"    `Y,       8            I,     d'"b,     8a      P
              d(    (       `Y,      P            `b    ,P  `Y,    8`Ya___d'
              "Y,   "b,      `Y,    ,I             8    d'   `8    8  `"""'
                "Y,   "b,  __ `8,   d'            ,8   ,P     8    8
                  "Y,   "bd88b `b   8             I'   d'     Y,   8
                    "Y,    888b 8   8             8   ,P      `b   8
                      "Ya,,d888b8   P            d'  ,P'       8   Y,
                         `"""",d"  ,I        ,adPb__aP'        Y   `b
                           ,a8P,__aP'       d888888P'         ,d    8
                          d8888888'         88888888       ,d888bbaaP
                          88888888                         88888888'
                                                           """"""""
-->
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

        <header>


        <main>
