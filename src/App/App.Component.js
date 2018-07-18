import React, {Fragment} from 'react';
import Header from './Header';
import TodoList from './TodosList';
import Footer from './Footer';

const App = () => (
  <Fragment>
    <Header />
    <TodoList />
    <Footer />
  </Fragment>
);

export default App;
