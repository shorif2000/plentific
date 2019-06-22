import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import { fetchPro } from "../actions/pro";

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
  componentDidMount() {
    this.props
      .fetchPro(37, "sw11")
      .then(response => {
        console.log(response);
      })
      .catch(thrown => console.log(thrown));
  }

  render() {
    const data =
      this.props.proReducer === undefined ||
      Object.keys(this.props.proReducer).length === 0
        ? []
        : this.props.proReducer;
    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          pagination={paginationFactory({
            sizePerPage: 20,
            hideSizePerPage: true
          })}
        />
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
  return bindActionCreators({ fetchPro }, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Table)
);
