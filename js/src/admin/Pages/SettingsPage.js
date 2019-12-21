import Page from 'flarum/components/Page';
import SeoSettings from "../components/Forms/SeoSettings";
import Header from "../components/Header";

export default class SettingsPage extends Page {
    view() {
        return (
            <div className="FlarumSEO">
                {Header.component()}

                <div className="container">
                    {SeoSettings.component()}
                </div>
            </div>
        );
    }
}