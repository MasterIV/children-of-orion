<?php

class CustomParsedown extends Parsedown {
	private $styles = [];

	public function addClass( $ele, $class ) {
		$this->styles[$ele] = $class;
	}

	protected function element(array $Element) {
		if(isset( $this->styles[$Element['name']]))
			$Element['attributes']['class'] = $this->styles[$Element['name']];
		if($Element['name']=='h3' || $Element['name']=='h2' || $Element['name']=='h1')
			$Element['attributes']['id'] = $Element['text'].'-'.uniqid();

		return parent::element($Element);
	}
}


$parsedown = new CustomParsedown();
$parsedown->addClass('table', 'table table-striped');