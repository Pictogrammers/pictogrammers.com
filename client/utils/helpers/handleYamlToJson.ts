import fs from 'node:fs';
import { join } from 'node:path';
import yamlToJs from 'js-yaml';

const processYamlRefs = (content: string, docsPath: string): string => {
  return content.replaceAll(/([ ]*)\$ref: '#([^']+)'/g, (match, indentation, file) => {
    const importFullPath = join(docsPath, `${file}.yml`);
    if (!fs.existsSync(importFullPath)) {
      return `${indentation}##! Unable into import referenced file: '${importFullPath}'`;
    }

    const refFile = fs.readFileSync(importFullPath, 'utf-8');
    const refOutput = `${indentation}${refFile.split('\n').join(`\n${indentation}`)}`;
    return processYamlRefs(refOutput, docsPath);
  });
};

const normalizeJson = (rawJson: any): any => {
  switch (rawJson.type) {
    case 'object':
      return Object.keys(rawJson?.properties || {}).reduce((output: any, property) => {
        const requiresAuth = rawJson?.properties?.[property]?.auth ? '🔒' : '';
        output[property + requiresAuth] = normalizeJson(rawJson.properties[property]);
        return output;
      }, {});
    case 'array':
      return [ normalizeJson(rawJson?.items || []) ];
    case 'string':
    case 'integer':
    case 'number':
    case 'boolean':
      return `${rawJson?.type ? `[${rawJson.type}]` : ''}${rawJson?.example ? ` ${rawJson.example}` : ''}`;
    default:
      break;
  }
};

const handleYamlToJson = (content: string, docsPath: string) => {
  const output = content.replaceAll(/([ ]*)```(?:yaml-to-json)\n([\s\S]*?)```$/gm, (indentation, codeBlock, yamlContents) => {
    const processed = processYamlRefs(yamlContents, docsPath);
    const json = yamlToJs.load(processed);
    const processedJson = normalizeJson(json);
    return `\`\`\`json\n${JSON.stringify(processedJson, null, 2)}\n\`\`\``;
  });

  return output;
};

export default handleYamlToJson;