<?php

$dev = isset($_GET['deploy']) && $_GET['deploy'] === 'true' ? false : true;
$url = 'http://localhost/frogstuff';

if ( isset($_GET['deploy-url']) ) {
    $url = $_GET['deploy-url'];
}

// set the location
$location = str_replace('http://', '', $url);

// body class
$class = isset($class) ? $class : '';
?>
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
<html class="no-js <?php if ( $class === 'save-the-date' ) { echo $class; } ?>">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <title>Best Finest Wedding</title>

        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="<?= $url; ?>/css/style.css?v=<?php echo date('YmdHis'); ?>">

        <script src="<?= $url; ?>/js/vendor/modernizr-2.6.2.min.js"></script>

        <link rel="icon" href="<?= $url; ?>/img/favi/favicon-16x16.png" sizes="16x16" type="image/png">
        <link rel="icon" href="<?= $url; ?>/img/favi/favicon-32x32.png" sizes="32x32" type="image/png">
        <link rel="icon" href="<?= $url; ?>/img/favi/favicon-96x96.png" sizes="96x96" type="image/png">

        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-9215814-20', 'auto');
          ga('send', 'pageview');

        </script>

    </head>

    <?php
    $bg = $class === 'save-the-date' ? $url . '/img/savethedate-bg.jpg' : ''
    ?>

    <body class="<?php echo $class; ?>">

        <?php if ( $class === 'save-the-date' ) { ?>
            <div class="lazy-load save-the-date-bg" data-bg="<?php echo $bg; ?>"></div>
        <?php } ?>

        <main class="h100">
