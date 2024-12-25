/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { engine } from '@graphql-ice/engine';
import core from '@graphql-ice/engine/core.wasm';

await engine.init(core);

export default {
	async fetch(req, env, ctx) {
		return new Response(await engine.ping());
	},
} as ExportedHandler<Env>;
