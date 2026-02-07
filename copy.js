import { copyFileSync } from 'fs';
import { join } from 'path';

copyFileSync(
  join(process.cwd(), 'package.json'),
  join(process.cwd(), 'dist', 'package.json')
);