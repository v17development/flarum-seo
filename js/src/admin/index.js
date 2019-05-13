import app from 'flarum/app';
import { extend } from 'flarum/extend';
import DashboardPage from 'flarum/components/DashboardPage';
import AdminNavigation from "./AdminNavigation";
import SeoWidget from "./components/SeoWidget";

app.initializers.add('v17development-flarum-seo', () => {
    AdminNavigation();

    // Add widget
    extend(DashboardPage.prototype, 'availableWidgets', widgets => {
        widgets.unshift(<SeoWidget/>);
    });
});