const emailRules = [
  {
    required: true,
    message: "请输入有效的邮箱地址!",
  },
  {
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    message: "邮箱格式不正确",
  },
];
const usernameRules = [
  {
    required: true,
    message: "用户名必须填写",
  },
  {
    min: 3,
    message: "用户名最少3个字符",
  },
  {
    max: 24,
    message: "用户名最多24个字符",
  },
  {
    pattern: /^[a-zA-Z0-9_]{3,16}$/,
    message: "用户名不能含有除数字、字母、下划线以外的字符",
  },
];
const passwordRules = [
  {
    required: true,
    message: "密码必须填写",
  },
  {
    min: 3,
    message: "密码最少3个字符",
  },
  {
    max: 255,
    message: "密码最多255个字符",
  },
  {
    pattern: /^[a-zA-Z0-9_]{3,16}$/,
    message: "密码不能含有除数字、字母、下划线以外的字符",
  },
];
const phoneRules = [
  {
    required: true,
    message: "请输入有效的手机号码!",
  },
  {
    pattern: /^1[3456789]\d{9}$/,
    message: "手机号码格式不正确",
  },
];
const ISBNRules = [
  {
    required: true,
    message: "请输入有效的ISBN码!",
  },
  {
    pattern: /^(?:[0-9]-?){10,13}$/,
    message: "ISBN码格式不正确",
  },
];
const URLRules = [
  {
    required: true,
    message: "请输入有效的URL地址!",
  },
  {
    pattern: new RegExp(
      "(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]"
    ),
    message: "URL格式不正确",
  },
];
const quantityRules = [
  {
    required: true,
    message: "请输入有效的数字!",
  },
  {
    pattern: /^[0-9]*$/,
    message: "请输入有效的数字!",
  },
  {
    // >= 0
    min: 0,
    message: "请输入有效的数字!",
  },
];
export {
  emailRules,
  usernameRules,
  passwordRules,
  phoneRules,
  ISBNRules,
  URLRules,
  quantityRules,
};
