export const checkPhone = (phone) => {
  return /^1[3|4|5|7|8][0-9]\d{8}$/.test(phone);
};

export const checkPassword = (password) => {
  return /^\w{6,20}$/.test(password);
};
