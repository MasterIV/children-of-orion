<?php

require 'inc/common.php';


$template = $twig->load('editor.twig');
$template->display([
				'method' => 'loadShipEditor',
				'data' => json_encode($data, JSON_PRETTY_PRINT)]
);

//$template = $twig->load('ship.twig');
//$template->display([
//		'data' => $data['ships'],
//		'qualities' => $data['gear']['qualities']
//]);
