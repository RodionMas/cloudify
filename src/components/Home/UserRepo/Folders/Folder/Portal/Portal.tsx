import ReactDOM from 'react-dom';

const Portal: React.FC<any> = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

export default Portal;