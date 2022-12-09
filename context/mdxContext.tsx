import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react';

type ContextProps = {
  prerequisites: string[];
  setPrerequisites: Dispatch<SetStateAction<string[]>>;
  stacks: string[];
  setStacks: Dispatch<SetStateAction<string[]>>;
};

type Props = {
  children: ReactNode;
};

const MdxComponentsContext = createContext({} as ContextProps);

export const MdxComponentsProvider = ({ children }: Props): ReactElement => {
  const [ prerequisites, setPrerequisites ] = useState<string[]>([]);
  const [ stacks, setStacks ] = useState<string[]>([]);

  return (
    <MdxComponentsContext.Provider
      value={{
        prerequisites,
        setPrerequisites,
        setStacks,
        stacks
      }}
    >
      {children}
    </MdxComponentsContext.Provider>
  );
};

export const useMdxComponentsContext = (): ContextProps => useContext(MdxComponentsContext);
