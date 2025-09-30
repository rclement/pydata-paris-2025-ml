# PyData Paris 2025 Talk Material for "Machine Learning in the Browser: Fast Iteration with ONNX & WebAssembly"

## Setup

```bash
uv sync
```

## Housing estimation model

```bash
uv run python -m http.server
# go to: http://localhost:8000/housing/
```

## SLM text summarizer

```bash
uv run python -m http.server
# go to: http://localhost:8000/text_summarizer/
```

> [!IMPORTANT]
> The model should be able to run at descent performance on CPU-only devices
> but a compatible WebGPU browser is required for best performance!
> See the compatibility list: https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#browser_compatibility
