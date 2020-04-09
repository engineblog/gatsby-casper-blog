import React, { Component } from 'react';
import Helmet from 'react-helmet';
import BlogLogo from '../components/BlogLogo/BlogLogo';
import config from '../../data/SiteConfig';
import Drawer from '../components/Drawer/Drawer';
import Footer from '../components/Footer/Footer';
import Layout from '../components/layout';
import MainHeader from '../components/MainHeader/MainHeader';
import MainNav from '../components/MainNav/MainNav';
import MenuButton from '../components/MenuButton/MenuButton';
import Navigation from '../components/Navigation/Navigation';
import PageDescription from '../components/PageDescription/PageDescription';
import PageTitle from '../components/PageTitle/PageTitle';
import SiteWrapper from '../components/SiteWrapper/SiteWrapper';
import EmailListForm from '../components/EmailListForm/EmailListForm';

class SubscribePage extends Component {
    state = {
        menuOpen: false,
    };

    handleOnClick = evt => {
        const { menuOpen } = this.state;
        evt.stopPropagation();
        if (menuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    };

    handleOnClose = evt => {
        evt.stopPropagation();
        this.closeMenu();
    };

    openMenu = () => {
        this.setState({ menuOpen: true });
    };

    closeMenu = () => {
        this.setState({ menuOpen: false });
    };

    render() {
        const { location } = this.props;
        console.log(this.props);
        const { menuOpen } = this.state;
        return (
            <Layout location={location}>
                <Drawer className="author-template" isOpen={menuOpen}>
                    <div className="about-container">
                        <Helmet title={`Subscribe | ${config.siteTitle}`} />
                        {/* pasting in from SEO.jsx */}
                        <Helmet>
                            {/* General tags */}
                            <meta name="description" content="Subscribe" />
                            <meta name="image" content={config.subscribeCover} />

                            {/* OpenGraph tags */}
                            
                            <meta property="og:title" content="Subscribe" />
                            <meta property="og:description" content="The Engine is doing a giveaway!" />
                            <meta property="og:image" content={config.subscribeCover} />
                            <meta
                                property="fb:app_id"
                                content={config.siteFBAppID ? config.siteFBAppID : ""}
                            />

                            {/* Twitter Card tags */}
                            <meta name="twitter:card" content="summary_large_image" />
                            <meta
                                name="twitter:creator"
                                content={config.userTwitter ? config.userTwitter : ""}
                            />
                            <meta name="twitter:title" content="Subscribe" />
                            <meta name="twitter:description" content="The Engine is doing a giveaway!" />
                            <meta name="twitter:image" content={config.subscribeCover} />
                        </Helmet>
                        {/* end SEO.jsx snippet */}
                        <Navigation config={config} onClose={this.handleOnClose} />
                        <SiteWrapper>
                            <div className="about-template">
                                <MainHeader cover={config.subscribeCover}>
                                    <MainNav overlay={config.subscribeCover}>
                                        <BlogLogo logo={config.siteLogo} title={config.siteTitle} />
                                        <MenuButton
                                            navigation={config.siteNavigation}
                                            onClick={this.handleOnClick}
                                        />
                                    </MainNav>
                                    <div className="vertical">
                                        <div className="main-header-content inner">
                                            <PageTitle text="Subscribe!" />
                                            <PageDescription text="no spam, fam" />
                                        </div>
                                    </div>
                                </MainHeader>
                                <div className="post">
                                    <h2>Cutting the Ribbon</h2>
                                    <p>To celebrate the launch of <i>The Engine</i>, I'm doing a giveaway!</p>

                                    <p>
                                        Picking up software development can be daunting. Sometimes, a seasoned professional's explanation is much more helpful than reading documentation. It can be hard to know where to look, though. Throughout my learning process, I have come across some content creators that have allowed me to understand concepts much more quickly (and at a much deeper level), when compared to combing through docs. I want to share these resources with you.</p>

                                    <h2>How does it work?</h2>

                                    <p>
                                        You attain eligibility for the giveaway by subscribing to the mailing list.  Five people will be chosen for the giveaway. These five people will be chosen at random. Entry will be open throughout the month of April.
                                    </p>
                                    <p>
                                        The first three entrants chosen will each receive <strong>$100 worth of development courses</strong>.
                                    </p>
                                    <p>
                                        The fourth and fifth entrants chosen will each receive <strong>$50 worth of development courses</strong>.
                                    </p>
                                    <h2>Which courses can I take?</h2>
                                    <p>I'm giving away courses from content creators that I have personally taken courses from. As of right now, courses will be available from:</p>
                                    <ul>
                                        <li><a href="https://www.leveluptutorials.com/">Level Up Tutorials</a></li>
                                        <li><a href="https://nickjanetakis.com/courses/">Nick Janetakis</a></li>
                                        <li><a href="https://www.traversymedia.com/">Traversy Media</a></li>
                                        <li><a href="https://wesbos.com/courses/">Wes Bos</a></li>
                                    </ul>
                                    <p>
                                        If there's another creator that you'd like to see here, send an email to <a href="mailto:whistle@theengine.tech">whistle@theengine.tech</a>.
                                    </p>
                                    <h2>no spam, fam</h2>
                                    <p>
                                       I'm not going to send you an email each time I put up a new post. I'm more likely to send out an email if I start working on a new 'series' of posts. I tend to work slow, so if between 1-3 emails a month sounds reasonable to you, cozy on up to that subscribe button. 
                                    </p>
                                    
                                    <EmailListForm />
                                </div>
                            </div>
                            <Footer
                                copyright={config.copyright}
                                promoteGatsby={config.promoteGatsby}
                            />
                        </SiteWrapper>
                    </div>
                </Drawer>
            </Layout>
        );
    }
}

export default SubscribePage;
