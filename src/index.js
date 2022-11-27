import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "@material-tailwind/react";
import { HashRouter } from "react-router-dom"
import './index.css';
import App from './App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </HashRouter>

);
