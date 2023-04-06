import { useState } from 'react';
import Image from 'next/image';
interface ErrorProps {
  message: string;
  onClose: () => void;
}

const Error: React.FC<ErrorProps> = ({ message, onClose }) => {
  const [show, setShow] = useState(true);

  const handleDismiss = () => {
    setShow(false);
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
      role='alert'
    >
      <strong className='font-bold'>Error : </strong>
      <span className='block sm:inline'>{message}</span>
      <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
        <button onClick={handleDismiss}>
          <Image alt='' width={12} height={12} src={'close_icon.svg'} />
        </button>
      </span>
    </div>
  );
};

export default Error;
