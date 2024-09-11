import logo from "./eBacon_logo.png";
import "./App.css";
import PayrollChart from "./PayrollChart";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const userName = "Chris";
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Hi {userName}, welcome to the payroll portal !</h2>
        <PayrollChart />
      </header>
    </div>
  );
}

export default App;
