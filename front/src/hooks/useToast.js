import { useCallback, useState } from 'react';

const useToast = (duration = 2000) => {
  const [message, setMessage] = useState('');

  const showToast = useCallback(
    (msg) => {
      setMessage(msg);
      setTimeout(() => {
        setMessage('');
      }, duration);
    },
    [duration],
  );

  return { toastMessage: message, showToast };
};

export default useToast;
