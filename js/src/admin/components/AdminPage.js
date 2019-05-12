import Page from 'flarum/components/Page';
import SeoSettings from "./Forms/SeoSettings";

export default class AdminPage extends Page {
    view() {
        return (
            <div className="FlarumSEO">
                <div className="seo-header container">
                    <h2>Search Engine Optimization</h2>
                </div>
                <div className="container">
                    {SeoSettings.component()}
                </div>
            </div>
        );
    }
}