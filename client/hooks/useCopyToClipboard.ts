import { useSnackbar } from 'notistack';

const useCopyToClipboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text: string, desc?: string) => {
    if (!navigator?.clipboard) {
      enqueueSnackbar('Unable to copy to clipboard.', { variant: 'error' });
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar(`Copied ${desc ? `${desc} ` : ''}to clipboard!`, { variant: 'success' });
      return true;
    } catch (error) {
      enqueueSnackbar('Unable to copy to clipboard.', { variant: 'error' });
      return false;
    }
  };

  return copy;
};

export default useCopyToClipboard;