import React from "react";
import StarRatingComponent from "react-star-rating-component";

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

export default reviewRatingFormatter;
