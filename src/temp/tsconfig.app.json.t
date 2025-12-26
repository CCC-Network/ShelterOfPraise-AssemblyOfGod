{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": [],
    "incremental": true,               // ✅ added
    "tsBuildInfoFile": "./.tsbuildinfo", // ✅ allowed now
    "erasableSyntaxOnly": true, // 🚫 removed erasableSyntaxOnly
    "noUncheckedSideEffectImports": true // 🚫 removed noUncheckedSideEffectImports
  },
  "files": [
    "src/main.ts",
    "src/polyfills.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}
