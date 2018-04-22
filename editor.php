<?php

require 'inc/common.php';

if(!empty($_POST['category'])) {
	if(!isset($data['talents'][$_POST['category']]))
		throw new Exception('Unknown category: '.$_POST['category']);

	file_put_contents(
			'data/talents/'.$_POST['category'].'.json',
			str_replace('    ', "\t", json_encode($_POST['data'], JSON_PRETTY_PRINT))
	);
} else {
	$template = $twig->load('editor.twig');
	$template->display(['data' => json_encode($data)]);
}