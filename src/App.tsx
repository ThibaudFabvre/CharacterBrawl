import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store';
import { AppContainer } from './App.styled';
import { Lobby } from './screens';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <AppContainer>
        <Lobby />
      </AppContainer>
    </ReduxProvider>
  );
}

export default App;
