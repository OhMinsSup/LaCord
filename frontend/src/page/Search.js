import React from "react";
import PageTemplate from "../components/base/PageTemplate";
import HeaderContainer from "../containers/base/HeaderContainer";
import SearchContainer from "../containers/search/SearchContainer";

const Search = () => (
  <PageTemplate header={<HeaderContainer />}>
    <SearchContainer />
  </PageTemplate>
);

export default Search;
