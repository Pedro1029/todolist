import './AddTarefa.css';
import { Fab, TextField, Card, Button, List, ListItemIcon, ListItemText } from '@material-ui/core'
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@material-ui/icons/Add'
import { useState, useEffect } from 'react'
import { salvar, findAllProjetos } from './tarefasServices'
import AllInboxIcon from '@mui/icons-material/AllInbox';
import InboxIcon from '@mui/icons-material/Inbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import App from './App.js'


export function AddTarefa() {

    const [titulo, setTitulo] = useState(null)
    const [projetos, setProjetos] = useState(null)

    const [adding, setAdding] = useState(false)
    const [showProjetos, setShowProjetos] = useState(false)
    const [selectedProjeto, setSelectedProjeto] = useState(null)

    useEffect(() => {
        findAll();
    }, [showProjetos]);

    async function findAll() {
        const listaProjetos = await findAllProjetos();
        setProjetos(listaProjetos);
        console.log(listaProjetos);
        console.log(showProjetos);
    }

    const onSelectProjeto = (event, index) => {
        setSelectedProjeto(index)
    }

    async function aoSalvar() {
        await salvar(
            {
                titulo,
                feita: false,
                projeto: selectedProjeto,
            }
        );

        App().findAllTarefas(true)
    }

    function onClickToAdd() {
        setAdding(!adding)
    }

    return (
        <>
            <ul>
                {adding &&

                    <Card>
                        <TextField autoFocus={true} margin="dense" id="descricao" label="Tarefa" type="text" fullWidth={true}
                            onChange={(event) => setTitulo(event.target.value)}
                        />
                        <List>
                            <ListItemButton onClick={() => setShowProjetos(!showProjetos)}>
                                <ListItemIcon>
                                    <AllInboxIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Projetos
                                </ListItemText>
                                {showProjetos ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={showProjetos} timeout="auto" unmountOnExit>
                                <List key={projetos.id}>
                                    <ListItemButton selected={selectedProjeto === null} onClick={(event) => onSelectProjeto(event, null)}>
                                        <ListItemIcon><InboxIcon /></ListItemIcon>
                                        <ListItemText>Caixa de Entrada</ListItemText>
                                    </ListItemButton>
                                </List>
                                {projetos.map(projetos => {
                                    return (
                                        <List key={projetos.id}>
                                            <ListItemButton selected={selectedProjeto === projetos.id}
                                                onClick={(event) => onSelectProjeto(event, projetos.id)}>
                                                <ListItemIcon><InboxIcon /></ListItemIcon>
                                                <ListItemText>{projetos.titulo}</ListItemText>
                                            </ListItemButton>
                                        </List>
                                    )
                                })}
                            </Collapse>

                        </List>
                        <Button variant='contained' color="primary" onClick={() => aoSalvar()}>
                            Salvar
                        </Button>
                        <Button variant='contained' color="secondary" onClick={() => setAdding(false)}>
                            Cancelar
                        </Button>
                    </Card>

                }
            </ul>

            {<Fab onClick={onClickToAdd} className={'fab-button'} color="primary"><AddIcon /></Fab>}
        </>
    )

}