<?php

require 'inc/common.php';

if( substr( $_SERVER['HTTP_HOST'], 0 , 9 ) !== 'localhost' )
	throw new Exception('This tool is only available locally');

if(!empty($_POST['category'])) {
	if(!isset($data['talents'][$_POST['category']]))
		throw new Exception('Unknown category: '.$_POST['category']);

	foreach ($_POST['data'] as &$row) {
	    $row['id'] = preg_replace('/([\W\s]+)/i', '_', strtolower($row['name']));
		$row['level'] = intval($row['level']);
		$row['rank'] = intval($row['rank']);
	}

	file_put_contents(
			'data/talents/'.$_POST['category'].'.json',
			str_replace('    ', "\t", json_encode($_POST['data'], JSON_PRETTY_PRINT))
	);
} else {
	$template = $twig->load('editor.twig');
	$template->display([
	    'method' => 'loadTalentEditor',
	    'data' => json_encode($data, JSON_PRETTY_PRINT)]
    );
}