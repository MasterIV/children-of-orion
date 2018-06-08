<pre><?php

require 'inc/common.php';
$attributes = [];
$skillCount = $talentCount = 0;

foreach ($data['attributes'] as $a)
	$attributes[$a['id']] = 0;


foreach ($data['skills'] as $skills)
	foreach ($skills as $s) {
		$attributes[$s['attributes'][0]]++;
		$attributes[$s['attributes'][1]]++;
        $skillCount++;
	}

foreach($talents as $ts)
    $talentCount += count($ts);

printf("Skills in total: %d\n", $skillCount);
printf("Talents in total: %d\n", $talentCount);
print_r($attributes);