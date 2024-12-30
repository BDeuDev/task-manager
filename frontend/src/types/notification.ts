export interface NotificationProps {
    isVisible: boolean;
    type: 'success' | 'error';
    message: string;
    onClose: () => void;
  }