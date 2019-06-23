import React, { Component } from "react";
import ProsTable from "../containers/prosTable";
import SearchForm from "../containers/searchForm";

class View extends Component {
  render() {
    return (
      <>
        <SearchForm />
        <ProsTable />
      </>
    );
  }
}

export default View;
