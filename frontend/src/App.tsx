import { Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import PrivateExample from './components/PrivateExample';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Layout from './hocs/Layout';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/signin' element={<SignIn />} />

                <Route path='/private' element={
                    <PrivateRoute>
                        <PrivateExample />
                    </PrivateRoute>
                } />
            </Routes>
        </Layout>
    );
}

export default App;
