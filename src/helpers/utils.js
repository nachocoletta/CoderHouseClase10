import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ajustar el __dirname para que apunte al directorio 'src/utils'
const srcDir = dirname(__dirname);
const utilsDir = path.join(srcDir, 'utils');

export { __filename, __dirname, utilsDir };


export const getNewId = () => uuidv4();

const existFile = async (path) => {
    try {
        await fs.promises.access(path);
        return true;
    } catch (error) {
        return false;
    }
};

export const getJSONFromFile = async (path) => {
    if (!(await existFile(path))) {
        return [];
    }

    let content;

    try {
        content = await fs.promises.readFile(path, "utf-8");
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser leido.`);
    }

    try {
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`El archivo ${path} no tiene un formato JSON válido.`);
    }
};

export const saveJSONToFile = async (path, data) => {
    // console.log(path, data)
    // return
    const content = JSON.stringify(data, null, "\t");
    try {
        await fs.promises.writeFile(path, content, "utf-8");
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser escrito.`);
    }
};

