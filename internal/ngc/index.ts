/**
 * @license
 * Copyright 2017 The Bazel Authors. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// TODO(chuckj): Remove the requirment for a fake 'reflect` implementation from
// the compiler
import 'reflect-metadata'; // from //third_party/javascript/node_modules/reflect_decorators:ts

import {ngc} from '@angular/compiler-cli';
import * as fs from 'fs';  // from //third_party/javascript/typings/node
// Note, the tsc_wrapped module comes from rules_typescript, not from npm
import {parseTsconfig} from 'tsc_wrapped';

function main(args) {
  const [{options, bazelOpts, files, config}] = parseTsconfig(args[1]);
  // tslint:disable:no-any casting tsconfig.json to get Angular options
  const ngOptions: {expectedOut: string[]} =
      (config as any).angularCompilerOptions;

  const result = ngc(args, undefined, files, options, ngOptions);

  if (result === 0) {
    // Ensure that expected output files exist.
    if (ngOptions && ngOptions.expectedOut) {
      writeOrAppendFiles(ngOptions.expectedOut);
    }
  }

  return result;
}

function writeOrAppendFiles(expectedOut: string[]): void {
  for (const out of expectedOut) {
    fs.appendFileSync(out, '', 'utf-8');
  }
}


if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}
