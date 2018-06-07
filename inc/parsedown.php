<?php

class CustomParsedown extends Parsedown {
	private $styles = [];
	private $data = [];

    function __construct()
    {
        $this->InlineTypes['{'][]= 'Include';
        $this->InlineTypes['{'][]= 'Data';
        $this->inlineMarkerList .= '{';
    }

	public function addClass( $ele, $class ) {
		$this->styles[$ele] = $class;
	}

    public function addData($key, $value) {
        $this->data[$key] = $value;
	}

    protected function inlineInclude($excerpt) {
        if (preg_match('/^{include:([\w\/]+)}/', $excerpt['text'], $matches)) {
            $md = file_get_contents(ROOT.'/data/'.$matches[1].'.md');

            return array(
                'extent' => strlen($matches[0]),
                'element' => array(
                    'name' => 'div',
                    'text' => $this->text($md),
                    'attributes' => array(),
                ),
            );
        }
    }

    protected function inlineData($excerpt) {
        if (preg_match('/^{data:([\w]+)}/', $excerpt['text'], $matches)) {
            return array(
                'extent' => strlen($matches[0]),
                'element' => array(
                    'name' => 'div',
                    'text' => $this->data[$matches[1]],
                    'attributes' => array(),
                ),
            );
        }
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