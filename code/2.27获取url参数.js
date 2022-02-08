function getUrlParams(url){
  const res = {};
  if (url.indexOf('?') !== -1) {
    const str = url.split('?')[1];
    const arr = str.split('&');
    arr.forEach(item => {
      let [key, val] = item.split('=');
      res[key] = val;
    });
  }
  return res;
}
console.log(getUrlParams("https://www.baidu.com?a=1&b=2&c=3")) //