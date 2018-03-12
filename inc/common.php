<?php

define("ROOT", __DIR__ . "/.." );
require_once ROOT.'/vendor/autoload.php';
require_once ROOT.'/inc/parsedown.php';
require_once ROOT.'/inc/twig.php';


$data = [];

$path = str_replace('/', DIRECTORY_SEPARATOR, ROOT."/data/");
$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path), RecursiveIteratorIterator::SELF_FIRST);

foreach($iterator as $file)
	if($file->isFile() && $file->getExtension() == 'json' ) {
		$key = explode(DIRECTORY_SEPARATOR, substr(str_replace($path, '', $file->getPathname()), 0, -5));
		$record =  json_decode(file_get_contents($file->getPathname()), true);
		$target = &$data;

		for($i=0; $i<count($key)-1; $i++) {
			$k = $key[$i];
			if(!isset($target[$k])) $target[$k] = [];
			$target = &$target[$k];
		}

		$target[$key[$i]] = $record;
	}

