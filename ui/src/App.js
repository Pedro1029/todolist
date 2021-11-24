import './App.css';

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Button, Icon, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AddTarefa } from './AddTarefa'


function App() {

  const [showMenu, setShowMenu] = useState(true)
  

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

              <ListItem button={true} component={Link} {...{ to: "/pendentes" }}>

                <ListItemIcon><Icon>list</Icon></ListItemIcon>
                <ListItemText>Pendentes</ListItemText>

              </ListItem>
              <ListItem button={true} component={Link} {...{ to: "/feitas" }}>

                <ListItemIcon><Icon>checked</Icon></ListItemIcon>
                <ListItemText>Feitas</ListItemText>

              </ListItem>

            </List>
          </div>

          <div className="sidebar-body-div">

            <div className="sidebar-body-div-outlet">

              

              <Routes>
                <Route path="pendentes" element={<AddTarefa feita={false}/>}/>
                <Route path="feitas" element={<AddTarefa feita={true}/>}/>
              </Routes>

            </div>

          </div>

        </div>}


      </BrowserRouter>
    </>

  );
}

export default App;
