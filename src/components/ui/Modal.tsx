import React from 'react';
import ReactDOM from 'react-dom';
import { Customer } from "../../types/customer";
interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit?: (data?: Partial<Customer>) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div>{children}</div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit && onSubmit()}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
