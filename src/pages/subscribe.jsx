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
        const postTitle = 'Subscribe!';
        const postDescription = 'The Engine is doing a giveaway!';
        let postImage = config.subscribeCover;
        const realPrefix = config.pathPrefix === "/" ? "" : config.pathPrefix;
        postImage = config.siteUrl + realPrefix + postImage;
        const blogURL = config.siteUrl + config.pathPrefix;
        const postPath = '/subscribe';
        const postURL = config.siteUrl + config.pathPrefix + postPath;
        const schemaOrgJSONLD = [
            {
                "@context": "http://schema.org",
                "@type": "WebSite",
                url: blogURL,
                name: postTitle,
                alternateName: config.siteTitleAlt ? config.siteTitleAlt : ""
            }
        ];
        schemaOrgJSONLD.push([
            {
                "@context": "http://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        item: {
                            "@id": postURL,
                            name: postTitle,
                            image: postImage
                        }
                    }
                ]
            },
            {
                "@context": "http://schema.org",
                "@type": "BlogPosting",
                url: blogURL,
                name: postTitle,
                alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
                headline: postTitle,
                image: {
                    "@type": "ImageObject",
                    url: postImage
                },
                description: postDescription
            }
        ]);
        return (
            <Layout location={location}>
                <Drawer className="author-template" isOpen={menuOpen}>
                    <div className="about-container">
                        <Helmet title={`Subscribe | ${config.siteTitle}`} />
                        {/* pasting in from SEO.jsx */}
                        <Helmet>
                            {/* General tags */}
                            <meta name="description" content={postDescription} />
                            <meta name="image" content={postImage} />

                            {/* Schema.org tags */}
                            <script type="application/ld+json">
                                {JSON.stringify(schemaOrgJSONLD)}
                            </script>

                            {/* OpenGraph tags */}
                            <meta property="og:url" content={postURL} />
                            <meta property="og:type" content="article" />
                            <meta property="og:title" content={postTitle} />
                            <meta property="og:description" content={postDescription} />
                            <meta property="og:image" content={postImage} />
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
                            <meta name="twitter:title" content={postTitle} />
                            <meta name="twitter:description" content={postDescription} />
                            <meta name="twitter:image" content={postImage} />
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

                                    <h2>no spam, fam</h2>
                                    <p>
                                       I'm not going to send you an email each time I put up a new post. I'm more likely to send out an email if I start working on a new 'series' of posts. I tend to work slow, so if between 1-3 emails a month sounds reasonable to you, cozy on up to that subscribe button. 
                                    </p>
                                    
                                    <EmailListForm /> <br />
                                    <p>
                                        Thanks for visiting!
                                    </p>
                                    <p>
                                        - Sharif
                                    </p>
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
