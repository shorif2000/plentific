import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect, Link } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";

const products = [];
const columns = [
  {
    dataField: "id",
    text: "Id"
  },
  {
    dataField: "name",
    text: "Name"
  },
  {
    dataField: "price",
    text: "Postcode"
  },
  {
    dataField: "rating",
    text: "Review Rating"
  }
];

class Table extends Component {
  render() {
    return (
      <div>
        <BootstrapTable keyField="id" data={products} columns={columns} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Table)
);
