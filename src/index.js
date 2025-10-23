import "primeflex/primeflex.css";
import "primeflex/themes/primeone-dark.css";
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import "primeicons/primeicons.css";
import "./assets/css/app.css";

// Optional: if using custom components or animations
import 'primeflex/primeflex.css'; // utility C
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { store } from "./store";
import { RouterProvider } from "react-router-dom";
import { routers } from "./routers";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <RouterProvider router={routers} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
