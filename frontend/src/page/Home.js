import React from "react";
import PageTemplate from "../components/base/PageTemplate";
import HeaderContainer from "../containers/base/HeaderContainer";
import MainHead from "../containers/main/MainHead";
import MainBody from "../containers/main/MainBody";

const Home = () => {
  return (
    <PageTemplate header={<HeaderContainer />}>
      <MainHead />
      <MainBody />
    </PageTemplate>
  );
};

export default Home;
