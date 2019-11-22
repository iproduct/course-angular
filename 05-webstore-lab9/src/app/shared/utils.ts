export function shallowEquals(a: any, b: any, compare?: (a: any, b: any) => boolean) {
  const aIsNull = a === null;
  const bIsNull = b === null;


  if (aIsNull !== bIsNull) { return false; }

  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);

  if (aIsArray !== bIsArray) { return false; }

  const aTypeof = typeof a;
  const bTypeof = typeof b;

  if (aTypeof !== bTypeof) { return false; }
  if (flat(aTypeof)) { return compare
    ? compare(a, b)
    : a === b;
  }

  return aIsArray
    ? shallowArray(a, b, compare)
    : shallowObject(a, b, compare);
}

function shallowArray<T>(a: T[], b: T[], compare: (a: T, b: T) => boolean) {
  const l = a.length;
  if (l !== b.length) { return false; }

  if (compare) {
    for (let i = 0; i < l; i++) {
      if (!compare(a[i], b[i])) { return false;
    } }
  } else {
    for (let i = 0; i < l; i++) {
      if (a[i] !== b[i]) { return false; }
    }
  }

  return true;
}

function shallowObject<T>(a: T, b: T, compare: (a: any, b: any) => boolean) {
  let ka = 0;
  let kb = 0;

  if (compare) {
    for (const key in a) {
      if (
        a.hasOwnProperty(key) &&
        !compare(a[key], b[key])
      ) { return false; }

      ka++;
    }
  } else {
    // tslint:disable-next-line:forin
    for (const key in a) {
      // tslint:disable-next-line: curly
      if (
        a.hasOwnProperty(key) &&
        a[key] !== b[key]
      ) return false;

      ka++;
    }
  }

  for (const key in b) {
    if (b.hasOwnProperty(key)) { kb++; }
  }

  return ka === kb;
}

function flat(type: any) {
  return (
    type !== 'function' &&
    type !== 'object'
  );
}

export function deepEquals(a: any, b: any, compare?: (a: any, b: any) => boolean) {
  const aIsNull = a === null;
  const bIsNull = b === null;

  if (aIsNull !== bIsNull) { return false; }

  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);

  if (aIsArray !== bIsArray) { return false; }

  const aTypeof = typeof a;
  const bTypeof = typeof b;

  if (aTypeof !== bTypeof) { return false; }
  if (flat(aTypeof)) { return compare
    ? compare(a, b)
    : a === b;
  }

  return aIsArray
    ? deepArray(a, b, compare)
    : deepObject(a, b, compare);
}

function deepArray<T>(a: T[], b: T[], compare: (a: T, b: T) => boolean) {
  const l = a.length;
  if (l !== b.length) { return false; }

  if (compare) {
    for (let i = 0; i < l; i++) {
      if (!deepEquals(a[i], b[i], compare)) { return false;
    } }
  } else {
    for (let i = 0; i < l; i++) {
      if (!deepEquals(a[i], b[i])) {
        console.log('!!!', a[i], b[i]);
        return false;
      }
    }
  }

  return true;
}

function deepObject<T>(a: T, b: T, compare: (a: any, b: any) => boolean) {
  let ka = 0;
  let kb = 0;

  if (compare) {
    // tslint:disable-next-line:forin
    for (const key in a) {
      if (
        a.hasOwnProperty(key) &&
        !deepEquals(a[key], b[key], compare)
      ) { return false; }

      ka++;
    }
  } else {
    // tslint:disable-next-line:forin
    for (const key in a) {
      if (
        a.hasOwnProperty(key) &&
        !deepEquals(a[key], b[key])
      ) {
        console.log('!!!', a[key], b[key]);
        return false;
      }

      ka++;
    }
  }

  for (const key in b) {
    if (b.hasOwnProperty(key)) { kb++; }
  }

  return ka === kb;
}
