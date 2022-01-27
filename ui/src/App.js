import './App.css';

import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Button, Icon, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ListItemButton from '@mui/material/ListItemButton';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { ExpandLess, ExpandMore } from '@mui/icons-material/';
import { Collapse } from '@mui/material';
import { AddTarefa } from './AddTarefa.js'

function App() {

  const [showMenu, setShowMenu] = useState(true)
  const [showTarefas, setShowTarefas] = useState(false)
  const [showUsuario, setShowUsuario] = useState(false)

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

              <ListItemButton onClick={() => setShowTarefas(!showTarefas)} button={true} component={Link} {...{ to: "/tarefas" }}>
                <ListItemIcon>
                  <AllInboxIcon />
                </ListItemIcon>
                <ListItemText>
                  Tarefas
                </ListItemText>
                {showTarefas ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showTarefas} timeout="auto" unmountOnExit>
                <ListItemButton sx={{ pl: 4 }} button={true} component={Link} {...{ to: "/tarefas/pendentes" }}>
                  <ListItemIcon><Icon>list</Icon></ListItemIcon>
                  <ListItemText>Pendentes</ListItemText>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} button={true} component={Link} {...{ to: "/tarefas/feitas" }}>
                  <ListItemIcon><Icon>checked</Icon></ListItemIcon>
                  <ListItemText>Feitas</ListItemText>
                </ListItemButton>
              </Collapse>

              <ListItemButton onClick={() => setShowUsuario(!showUsuario)} button={true} component={Link} {...{ to: "/usuario" }}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText>
                  Usuário
                </ListItemText>
                {showUsuario ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showUsuario} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} button={true} component={Link} {...{ to: "/usuario/cadastro" }}>
                    <ListItemIcon fontSize="small"><PersonAddIcon /></ListItemIcon>
                    <ListItemText>Cadastrar Usuário</ListItemText>
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }} button={true} component={Link} {...{ to: "/usuario/trocar" }}>
                    <ListItemIcon><Icon><SwitchAccountIcon /></Icon></ListItemIcon>
                    <ListItemText>Trocar Usuário</ListItemText>
                  </ListItemButton>
                </List>
              </Collapse>

            </List>

          </div>

          <div className="sidebar-body-div">

            <div className="sidebar-body-div-outlet">

              <Routes>
                <Route path="/tarefas/pendentes" element={<AddTarefa feita={false} />} />
                <Route path="/tarefas/feitas" element={<AddTarefa feita={true} />} />
              </Routes>

            </div>

          </div>

        </div>}

      </BrowserRouter>
    </>

  );
}

export default App;
