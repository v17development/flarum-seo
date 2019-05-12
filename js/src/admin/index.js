import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';
import AdminNavigation from "./AdminNavigation";

app.initializers.add('v17development-flarum-seo', () => {
    AdminNavigation();
});