import { NATIVE_APP } from '$lib/config';

/*
 * Android hardware/gesture back. Screens that want it (the game: pause instead of leaving mid-run)
 * push a handler; the newest one runs first and returns true when it consumed the press. Unhandled,
 * back walks browser history, and exits the app from the home screen.
 */
type Handler = () => boolean;
const handlers: Handler[] = [];

export function onBack(fn: Handler): () => void {
	handlers.push(fn);
	return () => {
		const i = handlers.lastIndexOf(fn);
		if (i >= 0) handlers.splice(i, 1);
	};
}

export async function installBackButton(): Promise<void> {
	if (!NATIVE_APP) return;
	const { App } = await import('@capacitor/app');
	await App.addListener('backButton', ({ canGoBack }) => {
		for (let i = handlers.length - 1; i >= 0; i--) if (handlers[i]()) return;
		if (location.pathname !== '/' && canGoBack) history.back();
		else if (location.pathname !== '/') location.assign('/');
		else void App.exitApp();
	});
}
