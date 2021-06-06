import { DefaultTheme } from 'styled-components';

const getValueByPath = function (obj: any, path: string): string {
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');
  var a = path.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in obj) {
      obj = obj[k];
    } else {
      return '';
    }
  }
  return obj;
}

const getThemeValue = (path: string) => {
  return (theme: DefaultTheme): string => getValueByPath(theme, path);
}

export default getThemeValue;
