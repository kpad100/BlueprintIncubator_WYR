import { Star, StarOutline, StarHalf } from "@material-ui/icons";

const Stars = ({ rating, user }) => {
  const stars = [];

  // adds rating(rounded down to nearest whole number) filled stars to stars array
  for (let i = 1; i <= Math.floor(rating); i++) {
    stars.push(
      <Star
        key={user + "star" + i}
        style={{ color: "white", marginRight: "5px" }}
      />
    );
  }

  // adds half star to stars array if rating decimal >= 0.25
  if (rating - Math.floor(rating) >= 0.25) {
    stars.push(
      <StarHalf
        key={user + "halfStar"}
        style={{ color: "white", marginRight: "5px" }}
      />
    );
  }

  // adds outlined star to stars array if rating decimal < 0.25
  if (rating - Math.floor(rating) > 0 && rating - Math.floor(rating) < 0.25) {
    stars.push(
      <StarOutline key={user + "outlinedStar"} style={{ marginRight: "5px" }} />
    );
  }

  // adds 5 - (rating rounded up to nearest whole number) outlined stars to stars array
  for (let i = 1; i <= 5 - Math.ceil(rating); i++) {
    stars.push(
      <StarOutline
        key={user + "outlinedStar" + i}
        style={{ marginRight: "5px" }}
      />
    );
  }

  return <div>{stars}</div>;
};

export default Stars;
