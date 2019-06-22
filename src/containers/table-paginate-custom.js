import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import StarRatingComponent from "react-star-rating-component";

import { fetchPro } from "../actions/pro";

const reviewRatingFormatter = (cell, row) => {
  return (
    <>
      <StarRatingComponent
        name="rate1"
        starCount={5}
        value={cell}
        editing={false}
        emptyStarColor={"#eee"}
        starColor={"#000"}
      />
    </>
  );
};

const nameFormatter = (cell, row) => {
  const name = cell.substring(0, cell.lastIndexOf(" "));
  return <>{name}</>;
};

const columns = [
  {
    dataField: "id",
    text: "Id"
  },
  {
    dataField: "name",
    text: "Name",
    formatter: nameFormatter
  },
  {
    dataField: "main_address.postcode",
    text: "Postcode"
  },
  {
    dataField: "review_rating",
    text: "Review Rating",
    formatter: reviewRatingFormatter
  }
];

class Table extends Component {
  constructor(props) {
    super(props);
    this.optionsPagination = {
      custom: true,
      page: 1,
      sizePerPage: 20,
      hideSizePerPage: true,
      totalSize: 0
    };
  }
  componentDidMount() {
    //test on load
    //this.props.fetchPro(37, "sw11", 0, 20);
  }

  render() {
    const data =
      this.props.proReducer === undefined ||
      Object.keys(this.props.proReducer).length === 0
        ? []
        : this.props.proReducer;
    const options = this.optionsPagination;
    console.log(options);
    return (
      <div>
        <PaginationProvider pagination={paginationFactory(options)}>
          {({ paginationProps, paginationTableProps }) => (
            <div>
              <BootstrapTable keyField="id" data={data} columns={columns} />
              <PaginationListStandalone {...paginationProps} />
            </div>
          )}
        </PaginationProvider>
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
