<?php

namespace V17Development\FlarumSeo;

use Flarum\Foundation\Application;
use s9e\TextFormatter\Configurator;
use Psr\Http\Message\ServerRequestInterface as Request;

class ConfigureLinks
{
    public function __invoke(Configurator $configurator)
    {
        $configurator->templateNormalizer->append(
            function (\DOMElement $template)
            {
                foreach ($template->getElementsByTagName('a') as $a)
                {
                    $a->setAttribute('rel', "{@rel}");
                    $a->setAttribute('target', "{@target}");
                }
            }
        );
    }
}
