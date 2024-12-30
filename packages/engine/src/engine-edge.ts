import { initIdempotently as initIdempotentlyInternal } from "./engine.js";
export { initIdempotentlySync } from "./engine-browser.js";

export async function initIdempotently(engineWasmModule: WebAssembly.Module) {
  await initIdempotentlyInternal(async (imports) => {
    return await WebAssembly.instantiate(engineWasmModule, imports);
  });
}