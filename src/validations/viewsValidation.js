
export const required = (value, errorId)  => {
  const errorEl = document.getElementById(errorId)
  if(value.length === 0) {
    errorEl.innerText = '*Vui lòng nhập trường này!';
    return false;
  }
  else {
    errorEl.innerText = '';
    return true;
  }
}

export const validNumber = (value, errorId)  => {
  const errorEl = document.getElementById(errorId)
  if(isNaN(value)) {
    errorEl.innerText = '*Trường này phải là số!';
    return false;
  }
  else {
    errorEl.innerText = '';
    return true;
  }
}

export const validLength = (value, errorId, min, max)  => {
  const errorEl = document.getElementById(errorId)
  if(value.length > max || value.length < min) {
    errorEl.innerText = `*Trường này từ ${min} đến ${max} ký tự!`;
    return false;
  }
  else {
    errorEl.innerText = '';
    return true;
  }
}

export const validPhoneNunber = (value, errorId)  => {
  const errorEl = document.getElementById(errorId)
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  if(!regexPhoneNumber.test(value)) {
    errorEl.innerText = `*Số điện thoại không hợp lệ!`;
    return false;
  }
  else {
    errorEl.innerText = '';
    return true;
  }
}

export const validCheckRePassword = (password, rePassword, errorId)  => {
  const errorEl = document.getElementById(errorId)
  if(password !== rePassword) {
    errorEl.innerText = `*Mật khẩu không khớp!`;
    return false;
  }
  else {
    errorEl.innerText = '';
    return true;
  }
}