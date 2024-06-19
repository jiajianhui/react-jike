import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

// 导入RouterProvider
import { RouterProvider } from 'react-router-dom';
import router from './router';

// 导入Provider（组件与redux进行交互——react与redux之间的关联，在组件中就可以使用redux了（集中状态管理））
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />

    </Provider>
    
  </React.StrictMode>
);
