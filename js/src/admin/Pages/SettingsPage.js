import ExtensionPage from 'flarum/components/ExtensionPage';
import SeoSettings from "../components/Forms/SeoSettings";
import HealthCheck from './HealthCheck';
import RegisterToSearchEngines from './RegisterToSearchEngines';
import SSLPage from './SSLPage';
import Button from 'flarum/components/Button';
import Sitemap from './Sitemap';

export default class SettingsPage extends ExtensionPage {
  content() {
    const page = m.route.param().page || 'health';
    
    return (
      <div className="ExtensionPage-settings FlarumSEO">
        <div className={"seo-menu"}>
          <div className={"container"}>
            {this.menuButtons(page)}
          </div>
        </div>

        <div className="container FlarumSeoPage-container">
          {this.pageContent(page)}
        </div>
      </div>
    );
  }

  // Return button menus
  menuButtons(page) {
    return [
      Button.component({
        className: `Button ${page === 'health' ? 'item-selected' : ''}`,
        onclick: () => m.route.set(
          app.route('extension', {
            id: 'v17development-seo'
          })
        ),
        icon: 'fas fa-heartbeat',
      }, 'Health check'),
      Button.component({
        className: `Button ${page === 'settings' ? 'item-selected' : ''}`,
        onclick: () => m.route.set(
          app.route('extension', {
            id: 'v17development-seo',
            page: 'settings'
          })
        ),
        icon: 'fas fa-cogs',
      }, 'SEO settings'),
      Button.component({
        className: `Button ${page === 'sitemap' ? 'item-selected' : ''}`,
        onclick: () => m.route.set(
          app.route('extension', {
            id: 'v17development-seo',
            page: 'sitemap'
          })
        ),
        icon: 'fas fa-sitemap',
      }, 'Sitemap information'),
      Button.component({
        className: `Button ${page === 'search-engines' ? 'item-selected' : ''}`,
        onclick: () => m.route.set(
          app.route('extension', {
            id: 'v17development-seo',
            page: 'search-engines'
          })
        ),
        icon: 'fas fa-search',
      }, 'Search engine information'),
      Button.component({
        className: `Button ${page === 'ssl' ? 'item-selected' : ''}`,
        onclick: () => m.route.set(
          app.route('extension', {
            id: 'v17development-seo',
            page: 'ssl'
          })
        ),
        icon: 'fas fa-shield-alt',
      }, 'Set up SSL')
    ];
  }


  pageContent(page) {
    if(page === 'search-engines') {
      return <RegisterToSearchEngines />
    }else if(page === "settings") {
      return <SeoSettings />
    }else if(page === "ssl") {
      return <SSLPage />
    }else if(page === "sitemap") {
      return <Sitemap />
    }

    // Default healthcheck
    return <HealthCheck />
  }
}