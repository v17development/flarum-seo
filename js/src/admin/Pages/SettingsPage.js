import Page from 'flarum/components/Page';
import SeoSettings from "../components/Forms/SeoSettings";
import Header from "../components/Header";

export default class SettingsPage extends Page {
  view() {
    return (
      <div className="FlarumSEO">
        <Header />

        <div className="container">
          <SeoSettings />
        </div>
      </div>
    );
  }
}