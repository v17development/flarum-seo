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
        component: HealthCheck
    };

    // Route to all settings
    app.routes.seoSettings = {
        path: '/seo/settings',
        component: SettingsPage
    };

    // Route to a single setting
    app.routes.seoSingleSetting = {
        path: '/seo/setting/:setting',
        component: SettingsPage
    };

    // Sitemap information
    app.routes.seoSitemap = {
        path: '/seo/sitemap',
        component: Sitemap
    };

    // Registered forum to search engines
    app.routes.seoSearchEngines = {
        path: '/seo/search-engines',
        component: RegisterToSearchEngines
    };

    // Add an secure connection
    app.routes.seoSSL = {
        path: '/seo/ssl',
        component: SSLPage
    };

    // Quick access settings from extensions tab
    app.extensionSettings['v17development-seo'] = () => m.route.set(app.route('seo'));

    extend(AdminNav.prototype, 'items', items => {
        items.add(
            'seo',
            AdminLinkButton.component({
                href: app.route('seo'),
                icon: 'fas fa-check',
                description: 'Configure your forum\'s SEO settings.',
            }, 'Search Engine Optimization')
        );
    });
}
