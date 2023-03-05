#!/usr/bin/env node
// https://github.com/slashsBin/styleguide-git-commit-message
import { runMessageValidate } from './commit/validate.mjs';

if (process.argv[2]) {
  runMessageValidate(process.argv[2]);
}
