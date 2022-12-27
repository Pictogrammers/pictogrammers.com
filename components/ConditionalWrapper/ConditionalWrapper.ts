interface WrapperProps {
  children: any;
  condition: boolean;
  wrapper: Function;
};

const ConditionalWrapper = ({ children, condition, wrapper }: WrapperProps) => {
  return condition ? wrapper(children) : children;
};

export default ConditionalWrapper;