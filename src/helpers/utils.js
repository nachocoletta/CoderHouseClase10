import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ajustar el __dirname para que apunte al directorio 'src/utils'
const srcDir = dirname(__dirname);
const utilsDir = path.join(srcDir, 'utils');

export { __filename, __dirname, utilsDir };

