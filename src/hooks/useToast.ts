import { useState, useCallback } from 'react';

export interface ToastData {
  message: string;
  color: 'success' | 'error' | 'info';
}

let globalShowToast: ((data: ToastData) => void) | null = null;

export const useToast = () => {
  const [toastData, setToastData] = useState<ToastData & { show: boolean }>({
    show: false,
    message: '',
    color: 'info',
  });

  const showToast = useCallback((data: ToastData) => {
    setToastData({
      ...data,
      show: true,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToastData(prev => ({ ...prev, show: false }));
  }, []);

  if (!globalShowToast) {
    globalShowToast = showToast;
  }

  return {
    toastData,
    showToast,
    hideToast,
  };
};

// Global function to show toast from anywhere
export const showGlobalToast = (data: ToastData) => {
  if (globalShowToast) {
    globalShowToast(data);
  }
};