// Web Worker for Transformer.js operations
import { pipeline, TextStreamer } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.3';

let generator = null;

// Listen for messages from main thread
self.onmessage = async function(e) {
  const { type, data } = e.data;

  try {
    switch (type) {
      case 'loadModel':
        await loadModel();
        break;

      case 'summarize':
        await summarizeText(data.text);
        break;

      default:
        console.error('Unknown message type:', type);
    }
  } catch (error) {
    self.postMessage({
      type: 'error',
      message: error.message
    });
  }
};

async function loadModel() {
  try {
    self.postMessage({ type: 'status', message: 'Loading model...' });

    generator = await pipeline(
      "text-generation",
      "onnx-community/gemma-3-270m-it-ONNX",
      { dtype: "fp32" },
    );

    self.postMessage({ type: 'modelLoaded' });
    self.postMessage({ type: 'status', message: 'Model loaded' });
  } catch (error) {
    self.postMessage({
      type: 'error',
      message: 'Error loading model: ' + error.message
    });
  }
}

async function summarizeText(text) {
  if (!generator) {
    self.postMessage({
      type: 'error',
      message: 'Model not loaded'
    });
    return;
  }

  try {
    self.postMessage({ type: 'status', message: 'Summarizing...' });

    const messages = [
      { role: "system", content: "You are a helpful assistant that summarizes text in 3 sentences at most." },
      { role: "user", content: `Please summarize the following text: ${text}` },
    ];

    await generator(messages, {
      max_new_tokens: 256,
      do_sample: false,
      streamer: new TextStreamer(generator.tokenizer, {
        skip_prompt: true,
        skip_special_tokens: true,
        callback_function: (chunk) => {
          // Send streaming chunks to main thread
          self.postMessage({
            type: 'chunk',
            text: chunk
          });
        },
      }),
      device: "webgpu",
    });

    self.postMessage({ type: 'complete' });
    self.postMessage({ type: 'status', message: 'Summary complete' });
  } catch (error) {
    self.postMessage({
      type: 'error',
      message: 'Error during summarization: ' + error.message
    });
  }
}