import allLibraries from '@/public/data/libraries.json';

interface Versions {
  [key: string]: string;
}

const handleVersionReplacements = (content: string) => {
  const versions = [...content.matchAll(/{{version:(.*)}}/g)]
    .reduce((output, match) => {
      const [ , libraryId ] = match;
      const fullMatch = `{{version:${libraryId}}}`;

      if (!output[fullMatch] && allLibraries[libraryId as keyof typeof allLibraries]) {
        output[fullMatch] = allLibraries[libraryId as keyof typeof allLibraries].version;
      }

      return output;
    }, {} as Versions);

  return content.replace(/{{version:(.*)}}/g, (match) => versions[match] || match);
};

export default handleVersionReplacements;