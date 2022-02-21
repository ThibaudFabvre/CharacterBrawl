import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store';
import { AppContainer } from './App.styled';
import { Lobby } from './screens';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import CharacterList from './screens/CharacterList/CharacterList';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <AppContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/character-List" element={<CharacterList />} />
          </Routes>
        </AppContainer>
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;