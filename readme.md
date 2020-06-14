# tfjs-model-blazeface

# API

```ts
// cache tf models in browser indexedDB when the page is loading
export async function initialize(
  modelUrl = DEFAULT_MODLE_URL,
  modelName = DEFAULT_MODEL_NAME,
)


// load the Blazeface to estmate face
export async function load(
  {
    maxFaces = 10,
    inputWidth = 128,
    inputHeight = 128,
    iouThreshold = 0.3,
    scoreThreshold = 0.75
  } = {},
  modelUrl = DEFAULT_MODLE_URL,
  modelName = DEFAULT_MODEL_NAME,
): Promise<BlazeFaceModel>


// the main API of BlazeFaceModel
estimateFaces(
  input: tf.Tensor3D|ImageData|HTMLVideoElement|HTMLImageElement| HTMLCanvasElement,
  returnTensors = false, 
  flipHorizontal = false,
  annotateBoxes = true
): Promise<NormalizedFace[]> 

```

# Usage
```ts
import { initialize, load } from 'tfjs-model-blazeface';

// call it when page is loading
initialize();


// use the model
const model = await load();

const predicts = await model.estimateFaces(input);

```
