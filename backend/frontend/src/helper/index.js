import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifySuccess = (message) => {
    toast.success(message, {
        position: "bottom-right", // Use string for position
        autoClose: 5000, // Close after 5 seconds
    });
};

export const notifyError = (message) => {
    toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
    });
};

export const notifyWarning = (message) => {
    toast.warn(message, {
        position: "bottom-right",
        autoClose: 5000,
    });
};

export const notifyInfo = (message) => {
    toast.info(message, {
        position: "bottom-right",
        autoClose: 5000,
    });
};

export const notify = (message, type = 'info') => {
    switch (type) {
        case 'success':
            notifySuccess(message);
            break;
        case 'error':
            notifyError(message);
            break;
        case 'warning':
            notifyWarning(message);
            break;
        case 'info':
        default:
            notifyInfo(message);
            break;
    }
};
