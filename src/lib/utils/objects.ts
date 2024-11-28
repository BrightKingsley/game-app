export function snakeToCamel(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => snakeToCamel(item)); // Recursively map array elements
  }

  // Process object keys
  const camelObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/([-_][a-z])/gi, $1 => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
      });
      camelObj[camelKey] = snakeToCamel(obj[key]); // Recursively update object keys
    }
  }
  return camelObj;
}

export type InnerKeys<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object ? InnerKeys<T[K]> : K;
    }[keyof T]
  : never;
