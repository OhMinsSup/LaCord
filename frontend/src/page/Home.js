import React from "react";
import PageTemplate from "../components/base/PageTemplate";
import HeaderContainer from "../containers/base/HeaderContainer";
import Main from "../containers/main/Main";

const Home = () => {
  return (
    <PageTemplate header={<HeaderContainer />}>
      <Main />
    </PageTemplate>
  );
};

export default Home;
