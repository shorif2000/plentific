import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { Table } from "../components/table";
import StarRatingComponent from "react-star-rating-component";

import { requestPro, fetchPro, fetchProCount } from "../actions/pro";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

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

class ProsTable extends Component {
  constructor(props) {
    super(props);
    this.optionsPagination = {
      page: 1,
      sizePerPage: 20,
      hideSizePerPage: true,
      totalSize: 0,
      firstPageText: "<<",
      lastPageText: ">>",
      withFirstAndLast: true,
      hidePageListOnlyOnePage: true,
      alwaysShowAllBtns: false
    };
    this.noDataIndication = this.noDataIndication.bind(this);
    this.state = {
      isFetching: false
    };
  }
  componentDidMount() {
    //test on load
    //this.props.fetchPro(37, "sw11", 0, 20);
  }

  noDataIndication() {
    const { proCountReducer } = this.props;
    const { isFetching } = this.state;
    if (isFetching) {
      return (
        <div className="spinner">
          <div className="rect1" />
          <div className="rect2" />
          <div className="rect3" />
          <div className="rect4" />
          <div className="rect5" />
        </div>
      );
    } else if (typeof proCountReducer === "object") {
      return <div>Search to display Pros</div>;
    } else if (proCountReducer === 0) {
      return <div>No data found</div>;
    }
    return <div />;
  }

  handleTableChange = (type, { page, sizePerPage }) => {
    this.setState({ isFetching: true });
    const currentIndex = (page - 1) * sizePerPage;
    this.optionsPagination.page = page;
    const { category, postcode } = this.props.form.search_pros.values;
    //const self = this;
    this.props
      .requestPro()
      .then(() => this.props.fetchProCount(category, postcode, 0))
      .then(() => this.props.fetchPro(category, postcode, currentIndex));
  };

  render() {
    const {
      proReducer: { isFetching, count, items, page }
    } = this.props;

    //const { isFetching } = this.state;
    const data =
      items === undefined || Object.keys(items).length === 0 || isFetching
        ? []
        : items;
    const options = this.optionsPagination;
    options.page = page;
    options.totalSize =
      count !== undefined && typeof count === "number" ? count : 0;

    return (
      <div>
        <Table
          data={data}
          page={options.page}
          sizePerPage={options.sizePerPage}
          onTableChange={this.handleTableChange}
          totalSize={options.totalSize}
          columns={columns}
          options={options}
          noDataIndication={this.noDataIndication}
          loading={isFetching}
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
  return bindActionCreators({ requestPro, fetchPro, fetchProCount }, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProsTable)
);
