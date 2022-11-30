import './App.css';
import Container from './Components/Container';
import Header from './Components/Header';
import{ BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import SLA from './Components/SLA';

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                <Route path='/sla' element={<SLA />} />
                <Route path='/' element={[<Header />, <Container />]} />
            </Routes>
        </div>
    </Router>
    
  );
}

export default App;
