/** Helpers shared by the tool modules. */

/** Wrap a string as a single-text-block MCP tool result. */
export function text(value: string) {
  return { content: [{ type: 'text' as const, text: value }] }
}
