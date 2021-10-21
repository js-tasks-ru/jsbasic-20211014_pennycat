function checkSpam(str) {
  let strl = str.toLowerCase();
  if(strl.includes('1xbet') || strl.includes('xxx')){
    return true;
  } else {
    return false;
  }
}
