<?php

require 'inc/common.php';

$content = '';

$weapons = [];
foreach($data['gear']['weapons'] as $w)
	$weapons[$w['id']] = $w['name'];
foreach($data['ships']['weapons'] as $w)
	$weapons[$w['id']] = $w['name'];


foreach ($data['gear']['mods'] as &$mod) {
	$mod['tags'] = array_map(function($tag) use ($weapons) {
		return isset($weapons[$tag]) ? $weapons[$tag] : 'Armor';
	}, $mod['tags']);
}

foreach ($data['ships']['mods'] as &$mod) {
	$mod['tags'] = array_map(function($tag) use ($weapons) {
		return isset($weapons[$tag]) ? $weapons[$tag] : 'Armor';
	}, $mod['tags']);
}

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


	paragraph('Races', 'basics/races');
	data($data, 'races');
}

chapter('Combat'); {
    paragraph('Overview', 'combat/overview');
    paragraph('Actions', 'combat/actions');
    paragraph('Attacking & Defending', 'combat/attack');
    paragraph('Damage', 'combat/damage');
}

chapter('Gear'); {
	paragraph('Overview', 'gear/overview');
	data($data['gear']['qualities'], 'qualities', 'Qualities', 'gear/qualities', 2);
	data($data['gear']['weapons'], 'weapons', 'Weapons', 'gear/weapons', 2);
	data($data['gear']['armor'], 'wearable', 'Armor', 'gear/armor', 2);
	data($data['gear']['mods'], 'mods', 'Modifications', 'gear/mods', 2);
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
		data($data['ships']['systems'], 'system', 'Systems', 'space/systems');

		// weapons
		data($data['ships']['weapons'], 'ranged', 'Weapons', 'space/weapons');
		data($data['ships']['mods'], 'mods', 'Modifications', 'space/mods', 2);
	}

	paragraph('Travelling', 'space/travelling');

}

$template = $twig->load('rules.twig');
$template->display(['content' => $content]);

