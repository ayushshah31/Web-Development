import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/project/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Create from './components/project/CreateProject';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Dashboard />} />
                <Route path='/project/:id' element={<ProjectDetails />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/create' element={<Create />} />
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
