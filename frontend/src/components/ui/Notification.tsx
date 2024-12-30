import { CheckCircle, XCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NotificationProps {
  isVisible: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export default function Notification({ isVisible, type, message, onClose }: NotificationProps) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsLeaving(false);
      const timer = setTimeout(() => {
        setIsLeaving(true);
        setTimeout(onClose, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(onClose, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 ${isLeaving ? 'animate-slide-out' : 'animate-slide-in'}`}>
      <div className={`flex items-center gap-2 p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        <div className="flex items-center gap-2">
          {type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="ml-4 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
