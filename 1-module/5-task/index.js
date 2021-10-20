function truncate(str, maxlength) {
  if(str.trim().length > maxlength){
    str = `${str.substr(0,maxlength-1)}…`;
  }
  return str;
}
