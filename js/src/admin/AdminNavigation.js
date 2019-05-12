import { extend } from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import SettingsPage from "./components/SettingsPage";
import AdminHome from "./components/AdminHome";

export default function() {
    // Route to settings
    app.routes.seoSettings = {
        path: '/seo/settings',
        component: SettingsPage.component()
    };

    // Route to a single setting
    app.routes.seoSingleSetting = {
        path: '/seo/setting/:setting',
        component: SettingsPage.component()
    };

    // Main page
    app.routes.seo = {
        path: '/seo',
        component: AdminHome.component()
    };

    app.extensionSettings['v17development-flarum-seo'] = () => m.route(app.route('seo'));

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
