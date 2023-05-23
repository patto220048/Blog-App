import './App.scss';
import useFetch from './hooks/useFetch';

function App() {
    const data = useFetch('http://localhost:3000/api/login', 'POST', {
        email: 'test1@gmail.com',
        password: '123456',
    });
    console.log(data);

    return (
        <>
      hello
    </>
    );
}

export default App;
