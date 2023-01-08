import { Provider } from "react-redux";
import "./App.css";
import HomeWeather from "./components/homeWeather";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="main">
          <HomeWeather />
        </div>
      </div>
    </Provider>
  );
}

export default App;
