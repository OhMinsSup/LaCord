import React from 'react';
import PageTemplate from '../components/base/PageTemplate';
import LandingTemplateContainer from '../containers/landing/LandingTemplateContainer';
import HeaderContaienr from '../containers/base/HeaderContainer';

const Home = () => {
    return (
        <PageTemplate
            header={<HeaderContaienr />}
        >
            <LandingTemplateContainer />
        </PageTemplate>
    )
}

export default Home;