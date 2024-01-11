import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { TodoList } from './components/TodoList'
import { Container } from 'react-bootstrap'

function App() {

  return (
    //container center content horizontally
    <Container style={{ justifyContent: 'center' }}>
      <TodoList />
    </Container>
  )
}

export default App
