import React, { Component } from "react";
import Table from "../containers/table";
import SearchForm from "../containers/searchForm";

class View extends Component {
  render() {
    return (
      <>
        <SearchForm />
        <Table />
      </>
    );
  }
}

export default View;
