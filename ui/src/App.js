import './App.css';

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Button, Icon, List, ListItem, ListItemIcon, ListItemText, Card, Checkbox } from '@material-ui/core'
import { AddTarefa } from './AddTarefa'
import { findAllPendentes, findAllFeitas, marcarComoFeita, marcarComoPendente } from './tarefasServices'

function App() {

  const [showMenu, setShowMenu] = useState(true)
  const [tarefas, setTarefas] = useState([])
  const [path, setPath] = useState(null)

  useEffect(() => {
    async function fetchData(){
      await findAllTarefas();
    }
    fetchData()
  }, []);

  async function findAllTarefas(sit) {
    
    if (sit) {
      const tarefasPendentes = await findAllPendentes();
      setTarefas(tarefasPendentes)
      setPath(false)
      console.log(tarefasPendentes)
    } else {
      const tarefasFeitas = await findAllFeitas();
      setTarefas(tarefasFeitas)
      setPath(true)
      console.log(tarefasFeitas)
    }
    
  }

  async function onChange(target, tarefa) {
    console.log('dsdsdsds')
    if (target.checked) {
      await marcarComoFeita(tarefa);
      findAllTarefas(true);
    } else {
      await marcarComoPendente(tarefa);
      findAllTarefas(false);
    }
  }

  return (

    <>
      <BrowserRouter>
        <div className="nav-div">
          <Button className={'nav-menu-item'} onClick={() => setShowMenu(!showMenu)}>
            <Icon className='nav-menu-item-icon'>menu</Icon>
          </Button>
        </div>

        {showMenu && <div className="sidebar-main-div">

          <div className="sidebar-left-div">

            <List>

              <ListItem button={true} component={Link} {...{ to: "/pendentes" }} onClick={() => findAllTarefas(true)}>

                <ListItemIcon><Icon>list</Icon></ListItemIcon>
                <ListItemText>Pendentes</ListItemText>

              </ListItem>
              <ListItem button={true} component={Link} {...{ to: "/feitas" }} onClick={() => findAllTarefas(false)}>

                <ListItemIcon><Icon>checked</Icon></ListItemIcon>
                <ListItemText>Feitas</ListItemText>

              </ListItem>

            </List>
          </div>

          <div className="sidebar-body-div">

            <div className="sidebar-body-div-outlet">

              <ul>
                {tarefas.filter(tarefa => tarefa.feita === path).map(tarefa => {
                  return (
                    <Card className={'item-list-card'} key={tarefa.id}>
                      <Checkbox checked={tarefa.feita} value={tarefa.id} onChange={({ target }) => onChange(target, tarefa)} />
                      {tarefa.titulo}
                    </Card>
                  )
                })}
              </ul>

              <Routes>
                <Route path="pendentes" element={<AddTarefa />}/>
              </Routes>

            </div>

          </div>

        </div>}


      </BrowserRouter>
    </>

  );
}

export default App;
