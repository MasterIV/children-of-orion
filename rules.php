<?php

require 'inc/common.php';

$content = '';

function section($l, $title, $file = null) {
	$GLOBALS['content'] .= "<h$l id=\"$title-".uniqid()."\">$title</h$l>";

	if($file) {
		$md = file_get_contents(ROOT.'/data/'.$file.'.md');
		$GLOBALS['content'] .= $GLOBALS['parsedown']->text($md);
	}

}

function chapter($title, $file = null) {
	section(1, $title, $file);
}

function paragraph($title, $file = null) {
	section(2, $title, $file);
}

function data($data, $template, $title = null, $file = null) {
	if($title) section(3, $title, $file);
	$tpl = $GLOBALS['twig']->load('elements/'.$template.'.twig');
	$GLOBALS['content'] .= $tpl->render(['data' => $data]);
}


chapter('Basics'); {
	paragraph('Attributes', 'basics/attributes');
	data($data['attributes'], 'attributes');

	paragraph('Skills', 'basics/skills');
	data($data['skills'], 'skills');

	paragraph('Checks', 'basics/checks');

	paragraph('Talents', 'basics/talents');
	data($data['talents'], 'talents');
}

chapter('Combat'); {
    paragraph('Overview', 'combat/overview');
    paragraph('Actions', 'combat/actions');
    paragraph('Attacking & Defending', 'combat/attack');
    paragraph('Damage', 'combat/damage');
}

$template = $twig->load('rules.twig');
$template->display(['content' => $content]);

