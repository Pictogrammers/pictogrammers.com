import fs from 'node:fs';
import { join } from 'node:path';

interface ImportPaths {
  [key: string]: string;
}

const handleImportStatements = (content: string, docsPath: string) => {
  const importedContent = [...content.matchAll(/import:(.*).mdx/g)]
    .reduce((output, match) => {
      const [ , importPath ] = match;

      const importFullPath = join(docsPath, `${importPath}.mdx`);
      if (!fs.existsSync(importFullPath)) {
        output[`import:${importPath}.mdx`] = `<Note type='error'>Unable to import **${importPath}.mdx**.</Note>`;
        return output;
      }

      output[`import:${importPath}.mdx`] = fs.readFileSync(importFullPath, 'utf-8');
      return output;
    }, {} as ImportPaths);

  return content.replace(/import:(.*).mdx/g, (match) => importedContent[match]);
};

export default handleImportStatements;