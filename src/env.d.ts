/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_VALUE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
