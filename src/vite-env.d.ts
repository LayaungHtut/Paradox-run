/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_STATIC_BUILD?: string;
	readonly VITE_API_URL?: string;
	readonly VITE_PUBLIC_URL?: string;
	readonly VITE_TARGET?: string;
	readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
