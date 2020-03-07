import styled from 'styled-components';

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import About from '../components/About/About';
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

const MainLayout = styled.main`
  max-width: 80%;
  margin: 4rem auto;
`;

class AboutPage extends Component {
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
            <Helmet title={`About | ${config.siteTitle}`} />
            <Navigation config={config} onClose={this.handleOnClose} />
            <SiteWrapper>
              {/* <div className="about-template"> */}
              <div>
                <MainHeader cover={config.siteCover}>
                  <MainNav overlay={config.siteCover}>
                    <BlogLogo logo={config.siteLogo} title={config.siteTitle} />
                    <MenuButton
                      navigation={config.siteNavigation}
                      onClick={this.handleOnClick}
                    />
                  </MainNav>
                  <div className="vertical">
                    <div className="main-header-content inner">
                      <PageTitle text="About the blog" />
                      <PageDescription text="Reading is hard, too." />
                    </div>
                  </div>
                </MainHeader>
                <MainLayout>
                  <About />
                </MainLayout>
                {/* </div> */}
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

export default AboutPage;
