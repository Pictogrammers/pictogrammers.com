import { FunctionComponent } from 'react';
import cx from 'clsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark as CodeStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import classes from './CodeHighlighter.module.scss';

interface CodeProps {
  children?: string;
  className?: string;
  displayAsBlock?: boolean;
}

const Code: FunctionComponent<CodeProps> = ({ children, className, displayAsBlock }) => {
  const language = /language-(\w+)/.exec(className || '') || ['language-text', 'text'];
  const inline = !(/\r|\n/.exec(children || '')) && !displayAsBlock;

  return (
    <SyntaxHighlighter
      style={CodeStyle}
      language={language[1]}
      PreTag={inline ? 'span' : 'div'}
      className={cx(classes.code, className, {
        [classes.inlineCode]: inline
      })}
      wrapLines={!!inline}
      wrapLongLines={!!inline}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
};

export default Code;