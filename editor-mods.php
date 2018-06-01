<?php

require 'inc/common.php';

if(!empty($_POST['data'])) {
	foreach ($_POST['data'] as &$row) {
	    $row['id'] = preg_replace('/([\W\s]+)/i', '_', strtolower($row['name']));
		$row['slots'] = intval($row['slots']);
	}

	file_put_contents(
			'data/gear/mods.json',
			str_replace('    ', "\t", json_encode($_POST['data'], JSON_PRETTY_PRINT))
	);
} else {
	$template = $twig->load('editor.twig');
	$template->display([
	    'method' => 'loadModEditor',
	    'data' => json_encode($data, JSON_PRETTY_PRINT)]
    );
}