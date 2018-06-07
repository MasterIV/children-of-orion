<?php

require 'inc/common.php';

if( substr( $_SERVER['HTTP_HOST'], 0 , 9 ) !== 'localhost' )
	throw new Exception('This tool is only available locally');

if (!empty($_POST['data'])) {
    $type = $_POST['type'] == 'ships' ? 'ships' : 'gear';
	foreach ($_POST['data'] as &$row) {
		$row['id'] = preg_replace('/([\W\s]+)/i', '_', strtolower($row['name']));
		$row['slots'] = intval($row['slots']);
		$row['max'] = intval($row['max']);
	}

	file_put_contents(
			'data/' . $type . '/mods.json',
			str_replace('    ', "\t", json_encode($_POST['data'], JSON_PRETTY_PRINT))
	);
} else {
	$template = $twig->load('editor.twig');
	$template->display([
					'method' => 'loadModEditor',
					'data' => json_encode($data, JSON_PRETTY_PRINT)]
	);
}