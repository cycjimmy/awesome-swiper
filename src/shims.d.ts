// Ambient declarations for the parts of the dependency tree that ship no types.
// They describe only the surface this package actually uses, so the sources can
// stay under `strict` without a blanket `any`.

declare module '*.module.scss' {
  // Keys are the camelCase class names produced by vite's `localsConvention:
  // 'camelCaseOnly'`, so an index signature is the honest shape.
  const classes: Record<string, string>
  export default classes
}

declare module '@cycjimmy/awesome-js-funcs/dom/addStyles' {
  const addStyles: (element: HTMLElement, styles: Record<string, string | number>) => void
  export default addStyles
}

declare module '@cycjimmy/awesome-js-funcs/dom/siblingFilter' {
  const siblingFilter: (el: Element, className?: string) => Element[]
  export default siblingFilter
}

declare module '@cycjimmy/awesome-js-funcs/judgeBasic/isNumber' {
  const isNumber: (value: unknown) => value is number
  export default isNumber
}

declare module '@cycjimmy/awesome-js-funcs/judgeBasic/isString' {
  const isString: (value: unknown) => value is string
  export default isString
}

declare module '@cycjimmy/awesome-js-funcs/typeConversion/nodeListToArray' {
  const nodeListToArray: <T>(list: ArrayLike<T>) => T[]
  export default nodeListToArray
}
