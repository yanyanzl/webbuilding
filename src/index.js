
import React from 'react';
import ReactDOM from 'react-dom/client';
import AstrologyApp from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AstrologyApp />);


if ('serviceWorker' in navigator) {
window.addEventListener('load', () => {
navigator.serviceWorker.register('/service-worker.js')
.then(reg => console.log('Service Worker registered:', reg.scope))
.catch(err => console.log('Service Worker registration failed:', err));
});
}