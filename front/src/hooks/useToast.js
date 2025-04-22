import { useCallback, useState } from "react";

const useToast = () => {
  const [message, setMessage] = useState(null);

  const showToast = useCallback((msg) => {
    setMessage(msg);
  }, []);

  const clearToast = useCallback(() => {
    setMessage(null);
  }, []);

  return { toastMessage: message, showToast, clearToast };
};

export default useToast;
