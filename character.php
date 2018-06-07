<?php


require 'inc/common.php';

$template = $twig->load('character.twig');
$template->display([
        'data' => $data
]);
