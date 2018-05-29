<?php

require 'inc/common.php';

$content = '';

function section($l, $title, $file = null) {
	$GLOBALS['content'] .= "<h$l id=\"$title-".uniqid()."\">$title</h$l>";

	if($file) {
		$md = file_get_contents(ROOT.'/data/'.$file.'.md');
		$GLOBALS['content'] .= '<div class="content-text">' . $GLOBALS['parsedown']->text($md) . '</div>';
	}

}

function chapter($title, $file = null) {
	section(1, $title, $file);
}

function paragraph($title, $file = null) {
	section(2, $title, $file);
}

function data($data, $template, $title = null, $file = null, $heading = 3) {
	if($title) section($heading, $title, $file);
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

chapter('Gear'); {
	data($data['gear']['weapons'], 'weapons', 'Weapons', 'gear/weapons', 2);
	data($data['gear']['armor'], 'armor', 'Armor', 'gear/armor', 2);
}


chapter('Space'); {
	paragraph('Overview', 'space/overview');
	paragraph('Combat', 'space/combat');

	paragraph('Construction', 'space/ships'); {
		data($data['ships']['hull'], 'hull', 'Ship sizes', 'space/hull');
		data($data['ships']['power'], 'reactor', 'Reactor', 'space/reactor');
		data($data['ships']['structure'], 'structure', 'Structure', 'space/structure');
		data($data['ships']['armor'], 'armor', 'Armor', 'space/armor');
		data($data['ships']['shields'], 'shields', 'Shields', 'space/shields');
		data($data['ships']['computer'], 'computer', 'Computer', 'space/computer');
		data($data['ships']['sensors'], 'system', 'Sensors', 'space/sensors');

		// systems
		// weapons
	}

	paragraph('Travelling', 'space/travelling');

}

$template = $twig->load('rules.twig');
$template->display(['content' => $content]);

