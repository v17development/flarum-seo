import { extend } from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import AdminPage from "./components/AdminPage";

export default function() {
    app.routes.seo = { path: '/seo', component: AdminPage.component() };

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
