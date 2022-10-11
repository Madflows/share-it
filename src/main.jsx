import './index.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import { storyblokInit, apiPlugin } from "@storyblok/react";
 
storyblokInit({
  accessToken: "gg0rD6hHwirE8sO0qnLAUgtt",
  use: [apiPlugin],
  components: {}
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Toaster />
    <App />
  </Router>
)
