import { extend } from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import SettingsPage from "./Pages/SettingsPage";
import Sitemap from "./Pages/Sitemap";
import HealthCheck from "./Pages/HealthCheck";
import RegisterToSearchEngines from "./Pages/RegisterToSearchEngines";
import SSLPage from "./Pages/SSLPage";

export default function() {
    // Main page
    app.routes.seo = {
        path: '/seo',
        component: HealthCheck.component()
    };

    // Route to all settings
    app.routes.seoSettings = {
        path: '/seo/settings',
        component: SettingsPage.component()
    };

    // Route to a single setting
    app.routes.seoSingleSetting = {
        path: '/seo/setting/:setting',
        component: SettingsPage.component()
    };

    // Sitemap information
    app.routes.seoSitemap = {
        path: '/seo/sitemap',
        component: Sitemap.component()
    };

    // Registered forum to search engines
    app.routes.seoSearchEngines = {
        path: '/seo/search-engines',
        component: RegisterToSearchEngines.component()
    };

    // Add an secure connection
    app.routes.seoSSL = {
        path: '/seo/ssl',
        component: SSLPage.component()
    };

    // Quick access settings from extensions tab
    app.extensionSettings['v17development-seo'] = () => m.route(app.route('seo'));

    extend(AdminNav.prototype, 'items', items => {
        items.add(
            'seo',
            AdminLinkButton.component({
                href: app.route('seo'),
                icon: 'fas fa-check',
                children: 'Search Engine Optimization',
                description: 'Configure your forum\'s SEO settings.',
            })
        );
    });
}
