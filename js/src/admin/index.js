import app from 'flarum/app';
import { extend } from 'flarum/extend';
import DashboardPage from 'flarum/components/DashboardPage';
import SeoWidget from "./components/SeoWidget";
import SettingsPage from './pages/SettingsPage';

app.initializers.add('v17development-flarum-seo', () => {
  app.extensionData.for('v17development-seo').registerPage(SettingsPage);

  // Add widget
  extend(DashboardPage.prototype, 'availableWidgets', widgets => {
    widgets.add('seo-widget', <SeoWidget />, 500);
  });
});