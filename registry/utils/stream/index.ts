export const textDecoder = new TextDecoder();
export const textEncoder = new TextEncoder();

export async function* SSEMessageGenerator<T>(
  stream: ReadableStream<T> | null
) {
  if (!stream) {
    return;
  }
  let rest_str = "";
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        // 处理流结束时的剩余数据
        if (rest_str.trim()) {
          try {
            const message = JSON.parse(rest_str);
            yield message as T;
          } catch (e) {
            console.warn('Failed to parse remaining data:', e);
          }
        }
        break;
      }

      const sse_chunk =
        value instanceof ArrayBuffer
          ? textDecoder.decode(value)
          : (value as string);
      for (const line of sse_chunk.split(/\n+/)) {
        const json_str = line.replace(/data:\s*/, "").trim();
        if (json_str.length > 0) {
          try {
            const message = JSON.parse(rest_str + json_str);
            rest_str = "";
            yield message as T; // 在生成器内yield消息
          } catch (e) {
            rest_str += json_str;
            console.warn(e);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}