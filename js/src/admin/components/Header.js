import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import Dropdown from 'flarum/components/Dropdown';

export default class Header extends Component {
    view() {
        return (
            <div className="seo-header container">
                <div className="pull-right">
                    {Dropdown.component({
                        label: 'Tools',
                        icon: 'fas fa-cog',
                        buttonClassName: 'Button',
                        menuClassName: "Dropdown-menu--right",
                        children: [
                            Button.component({
                                className: 'Button',
                                onclick: () => m.route(app.route('seo')),
                                icon: 'fas fa-heartbeat',
                                children: 'Health check'
                            }),
                            Button.component({
                                className: 'Button',
                                onclick: () => m.route(app.route('seoSettings')),
                                icon: 'fas fa-cogs',
                                children: 'SEO settings'
                            }),
                            Button.component({
                                className: 'Button',
                                onclick: () => m.route(app.route('seoSitemap')),
                                icon: 'fas fa-sitemap',
                                children: 'Sitemap information'
                            }),
                            Button.component({
                                className: 'Button',
                                onclick: () => m.route(app.route('seoSearchEngines')),
                                icon: 'fas fa-search',
                                children: 'Search engine information'
                            }),
                            Button.component({
                                className: 'Button',
                                onclick: () => m.route(app.route('seoSSL')),
                                icon: 'fas fa-shield-alt',
                                children: 'Set up SSL'
                            })
                        ]
                    })}
                </div>

                <h2>Search Engine Optimization</h2>

                <div className="clear"/>
            </div>
        )
    }
}