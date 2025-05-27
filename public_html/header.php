<?php
class HeaderSection {
    private $containerId;
    private $data;

    public function __construct($containerId) {
        $this->containerId = $containerId;
        $this->data = [
        'logo' => [
            'image' => '/assets/images/logo.png',
            'alt' => 'Red Bird Racing Logo',
            'link' => '/'
        ],
        'navigation' => [
            ['text' => 'About Us', 'link' => '/pages/about.html'],
            ['text' => 'Our Team', 'link' => '/pages/team.html'],
            ['text' => 'News', 'link' => '/pages/news.html'],
            ['text' => 'Our Partners', 'link' => '/pages/partners.html'],
            ['text' => 'Photo Gallery', 'link' => '/pages/gallery.html']
        ]
        ];
    }

    public function render() {
        return <<<HTML
            <header class="header" id="{$this->containerId}">
                <div id="header-container">
                    <div class="header__container">
                    <a href="{$this->data['logo']['link']}" class="logo">
                        <img src="{$this->data['logo']['image']}" alt="{$this->data['logo']['alt']}" class="logo__image">
                    </a>
                    <nav class="nav">
                        <ul class="nav__list">
                            {$this->renderNavigation()}
                        </ul>
                        <button class="nav__toggle" aria-label="Toggle menu">
                            <span class="nav__toggle-icon"></span>
                        </button>
                        <div class="nav__mobile">
                            <ul class="nav__mobile-list">
                                {$this->renderNavigation()}
                            </ul>
                        </div>
                    </nav>
                    </div>
                </div>
            </header>
        HTML;
    }

    private function renderNavigation() {
        return implode('', array_map(function($item) {
        return <<<HTML
            <li><a href="{$item['link']}">{$item['text']}</a></li>
            HTML;
        }, $this->data['navigation']));
    }
}
?>