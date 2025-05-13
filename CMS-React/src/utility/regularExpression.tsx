const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const nameRegex = /^[a-zA-Z0-9]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$/;
const prefixEmailRegex = /^[a-zA-Z0-9]+(([_.-][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$/;
const numberRegex = /^[0-9]*$/;
const phoneRegex = /((09|03|07|08|05|02[0-9])+([0-9]{8})\b)/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;

const removeAscent = (str: string) => {
  if (str == null || str == undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  return str;
};

const checkEmailValidate = (email: string) => {
  return emailRegex.test(String(email).toLowerCase());
};

const checkNameValidate = (name: string) => {
  return nameRegex.test(String(removeAscent(name)));
};

const checkPrefixEmailValidate = (prefix: string) => {
  return prefixEmailRegex.test(String(removeAscent(prefix)));
};

const checkNumberValidate = (number: string) => {
  return numberRegex.test(String(number));
};

const checkPhoneValidate = (phone: string) => {
  return phoneRegex.test(phone);
};

const checkPasswordValidate = (password: string) => {
  return passwordRegex.test(password);
};

export {
  checkEmailValidate,
  checkNameValidate,
  checkNumberValidate,
  checkPhoneValidate,
  removeAscent,
  checkPrefixEmailValidate,
  checkPasswordValidate,
};
