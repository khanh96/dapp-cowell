// This file is an augmentation to the built-in ImportMeta interface
// Thus cannot contain any top-level imports
// <https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation>

/* eslint-disable @typescript-eslint/consistent-type-imports */

interface ImportMetaEnv {
  [key: string]: any
  BASE_URL: string
  MODE: string
  DEV: boolean
  PROD: boolean
  SSR: boolean
  VITE_PRIVATE_KEY_ACCOUNT_1: string
  VITE_PRIVATE_KEY_ACCOUNT_2: string
  VITE_CONTRACT_TOKEN_COWELL: string
  VITE_CONTRACT_STAKING: string
  VITE_CONTRACT_DAO: string
  VITE_CONTRACT_PROPOSAL: string
}

interface ImportMeta {
  url: string

  readonly hot?: import('./hot').ViteHotContext

  readonly env: ImportMetaEnv

  glob: import('./importGlob').ImportGlobFunction
  /**
   * @deprecated Use `import.meta.glob('*', { eager: true })` instead
   */
  globEager: import('./importGlob').ImportGlobEagerFunction
}
