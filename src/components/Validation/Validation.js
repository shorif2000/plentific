export const validPostcode = postcode => {
  if (typeof postcode === "undefined") return true;
  if (postcode.length > 0) {
    postcode = postcode.replace(/\s/g, "");
    var regex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]$/i;
    return regex.test(postcode);
  }
  return false;
};
