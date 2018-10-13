/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This software provided by IPT-Intellectual Products & Technologies (IPT) is for
 * non-commercial illustartive and evaluation purposes only.
 * It is NOT SUITABLE FOR PRODUCTION purposes because it is not finished,
 * and contains security flаws and weaknesses (like sending the passwords and
 * emails of users to the browser client, wich YOU SHOULD NEVER DO with real user
 * data). You should NEVER USE THIS SOFTWARE with real user data.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this repository.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

export function shallowEquals(a: any, b: any, compare?: (a: any, b: any) => boolean) {
  const aIsNull = a === null;
  const bIsNull = b === null;


  if (aIsNull !== bIsNull) return false;

  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);

  if (aIsArray !== bIsArray) return false;

  const aTypeof = typeof a;
  const bTypeof = typeof b;

  if (aTypeof !== bTypeof) return false;
  if (flat(aTypeof)) return compare
    ? compare(a, b)
    : a === b;

  return aIsArray
    ? shallowArray(a, b, compare)
    : shallowObject(a, b, compare);
}

function shallowArray<T>(a: T[], b: T[], compare: (a: T, b: T) => boolean) {
  const l = a.length;
  if (l !== b.length) return false;

  if (compare) {
    for (let i = 0; i < l; i++)
      if (!compare(a[i], b[i])) return false;
  } else {
    for (let i = 0; i < l; i++) {
      if (a[i] !== b[i]) return false;
    }
  }

  return true;
}

function shallowObject<T>(a: T, b: T, compare: (a: any, b: any) => boolean) {
  let ka = 0;
  let kb = 0;

  if (compare) {
    // tslint:disable-next-line:forin
    for (const key in a) {
      if (
        a.hasOwnProperty(key) &&
        !compare(a[key], b[key])
      ) return false;

      ka++;
    }
  } else {
    // tslint:disable-next-line:forin
    for (const key in a) {
      if (
        a.hasOwnProperty(key) &&
        a[key] !== b[key]
      ) return false;

      ka++;
    }
  }

  for (const key in b) {
    if (b.hasOwnProperty(key)) kb++;
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

  if (aIsNull !== bIsNull) return false;

  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);

  if (aIsArray !== bIsArray) return false;

  const aTypeof = typeof a;
  const bTypeof = typeof b;

  if (aTypeof !== bTypeof) return false;
  if (flat(aTypeof)) return compare
    ? compare(a, b)
    : a === b;

  return aIsArray
    ? deepArray(a, b, compare)
    : deepObject(a, b, compare);
}

function deepArray<T>(a: T[], b: T[], compare: (a: T, b: T) => boolean) {
  const l = a.length;
  if (l !== b.length) return false;

  if (compare) {
    for (let i = 0; i < l; i++)
      if (!deepEquals(a[i], b[i], compare)) return false;
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
      ) return false;

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
    if (b.hasOwnProperty(key)) kb++;
  }

  return ka === kb;
}
