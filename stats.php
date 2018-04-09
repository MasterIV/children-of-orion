<pre><?php


require 'inc/common.php';
$attributes = [];

foreach ($data['attributes'] as $a)
	$attributes[$a['id']] = 0;


foreach ($data['skills'] as $skills)
	foreach ($skills as $s) {
		$attributes[$s['attributes'][0]]++;
		$attributes[$s['attributes'][1]]++;
	}


print_r($attributes);