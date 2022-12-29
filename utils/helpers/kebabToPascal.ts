const kebabToPascal = (text: string) => {
  return text.split('-').map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join('');
};

export default kebabToPascal;