import { FunctionComponent } from 'react';

interface WrapperProps {
  children: any;
  condition: boolean;
  wrapper: Function;
};

const ConditionalWrapper: FunctionComponent<WrapperProps> = ({ children, condition, wrapper }) => {
  return condition ? wrapper(children) : children;
};

export default ConditionalWrapper;