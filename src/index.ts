/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tf from '@tensorflow/tfjs';
import { BlazeFaceModel } from './face';
import { createCustomLoader, loadArtifactFromCache } from 'tfjs-model-load-util';

const DEFAULT_MODLE_URL = 'https://unpkg.com/local-tfjs-models@0.0.1/blazeface/google/model.json';
const DEFAULT_MODEL_NAME = 'blazeface003';


// call this at the very beginning when the page is laoding...
// this function is used to cache models in indexedDB in advance.
export async function initialize(
  modelUrl = DEFAULT_MODLE_URL,
  modelName = DEFAULT_MODEL_NAME,
) {
  await loadArtifactFromCache(modelUrl, modelName);
  return true;
}


/**
 * Load blazeface.
 *
 * @param config A configuration object with the following properties:
 *  `maxFaces` The maximum number of faces returned by the model.
 *  `inputWidth` The width of the input image.
 *  `inputHeight` The height of the input image.
 *  `iouThreshold` The threshold for deciding whether boxes overlap too
 * much.
 *  `scoreThreshold` The threshold for deciding when to remove boxes based
 * on score.
 */
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
): Promise<BlazeFaceModel> {

  const blazeface = await tf.loadGraphModel(createCustomLoader(modelUrl, modelName));

  const model = new BlazeFaceModel(
      blazeface, inputWidth, inputHeight, maxFaces, iouThreshold,
      scoreThreshold);
  return model;
}

export {NormalizedFace, BlazeFaceModel, BlazeFacePrediction} from './face';

