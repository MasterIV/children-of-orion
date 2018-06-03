<?php

$loader = new Twig_Loader_Filesystem('templates');
$twig = new Twig_Environment($loader, []);

$twig->addFilter(new Twig_SimpleFilter('e', function ($s) {
	return is_array($s) ? str_replace([
			 'size*size', '*', '+', '-'
	], [
			 'size²', ' * ', ' + ', ' - '
	], $s['expression']) : $s;
}));


$twig->addFilter(new Twig_SimpleFilter('rome', function ($s) {
	return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][$s-1];
}));

$twig->addFilter(new Twig_SimpleFilter('qualities', function ($base) {
	return implode(' / ', array_map(function($factor) use ($base) {
		return $base * $factor;
	}, array_slice ( $GLOBALS['data']['gear']['qualities'], 0 , 7 )));
}));
