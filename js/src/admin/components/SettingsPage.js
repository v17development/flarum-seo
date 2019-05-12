import Page from 'flarum/components/Page';
import SeoSettings from "./Forms/SeoSettings";
import Button from 'flarum/components/Button';

export default class SettingsPage extends Page {
    view() {
        return (
            <div className="FlarumSEO">
                <div className="seo-header container">
                    {Button.component({
                        className: 'Button pull-right',
                        onclick: () => {
                            document.location.hash = app.route('seo')
                        },
                        icon: 'fas fa-angle-left',
                        children: 'Go back'
                    })}
                    <h2>Search Engine Optimization</h2>

                    <div className="clear"/>
                </div>
                <div className="container">
                    {SeoSettings.component()}
                </div>
            </div>
        );
    }
}