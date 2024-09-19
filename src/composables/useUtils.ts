export function useUtils() {
  function toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase())
  }

  function convertKeysToCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(value => convertKeysToCamelCase(value))
    }
    else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce((result, key) => {
        const camelCaseKey = toCamelCase(key)
        result[camelCaseKey] = convertKeysToCamelCase(obj[key])
        return result
      }, {} as any)
    }

    return obj
  }

  return {
    convertKeysToCamelCase,
  }
}
