# PyData Paris 2025 Talk Material for "Machine Learning in the Browser: Fast Iteration with ONNX & WebAssembly"

## Setup

```bash
uv sync
```

## Housing estimation model

View ONNX model in Netron: https://netron.app/?url=https://github.com/rclement/pydata-paris-2025-ml/raw/refs/heads/main/housing/model.onnx

Play with it locally:

```bash
uv run python -m http.server
# go to: http://localhost:8000/housing/
```

Live deployment: https://rclement.github.io/pydata-paris-2025-ml/housing/

## SLM text summarizer

Play with it locally:

```bash
uv run python -m http.server
# go to: http://localhost:8000/text_summarizer/
```

Live deployment: https://rclement.github.io/pydata-paris-2025-ml/text_summarizer/

> [!IMPORTANT]
> The model should be able to run at descent performance on CPU-only devices
> but a compatible WebGPU browser is required for best performance!
> See the compatibility list: https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#browser_compatibility

## License

Licensed under GNU Affero General Public License v3.0 (AGPLv3)

Copyright (c) 2025 - present  Romain CLement
