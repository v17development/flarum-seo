import Page from 'flarum/components/Page';
import SeoSettings from "../components/Forms/SeoSettings";
import Button from 'flarum/components/Button';
import Header from "../components/Header";

export default class Sitemap extends Page {
    view() {
        return (
            <div className="FlarumSEO">
                {Header.component()}

                <div className="container">
                    <h2>Why should you use a sitemap?</h2>
                    <p>A sitemap is a XML file with a list of all the available pages on your website. It will be used by crawlers and search engines to find pages on your website.</p>
                    <p>The sitemap file is automatically generated and does not need any maintenance.</p>

                    <h4>What extension should I install?</h4>
                    <p>At the moment, <a href="https://discuss.flarum.org/d/14941-flagrow-sitemap" target="_blank">Flagrow Sitemap <i className="fas fa-external-link-alt"></i></a> is the best extension to install for Flarum. We advice you to install and activate this extension.</p>

                    <p>This extension will make sure crawlers will find your forum <b>discussions</b>, <b>tags</b> (when extension is enabled) and <b>Pages</b> extension (when extension is installed and enabled). It will automatically make an sitemap.xml available.</p>

                    <h4>I just installed the extension</h4>
                    <p>In that case, activate it on the <a href={ '#' + app.route('extensions')}>Extensions page</a> . Then this warning will disappear.</p>
                </div>
            </div>
        );
    }
}