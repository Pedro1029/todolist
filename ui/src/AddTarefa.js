import './AddTarefa.css';
import { Button, Fab, TextField, Card, List, ListItemIcon, ListItemText, Checkbox } from '@material-ui/core'
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@material-ui/icons/Add'
import { useState, useEffect } from 'react'
import { salvar, findAllProjetos } from './tarefasServices'
import AllInboxIcon from '@mui/icons-material/AllInbox';
import InboxIcon from '@mui/icons-material/Inbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { findAllPendentes, findAllFeitas, marcarComoFeita, marcarComoPendente } from './tarefasServices'


export function AddTarefa({ feita }) {

    const [tarefas, setTarefas] = useState([])
    const [titulo, setTitulo] = useState(null)
    const [showTarefas, setShowTarefas] = useState(false)

    const [adding, setAdding] = useState(false)

    const [showProjetos, setShowProjetos] = useState(false)
    const [selectedProjeto, setSelectedProjeto] = useState(null)
    const [projetos, setProjetos] = useState(findAllProjetos())

    useEffect(async () => {
        await findAllTarefas();
    }, [feita]);

    useEffect(() => {
        findProjetos();
    }, [showProjetos]);

    useEffect(() => {
        findProjetos();
    }, [feita]);

    async function findAllTarefas() {

        console.log('findAllTarefas')
        if (!feita) {
            const tarefasPendentes = await findAllPendentes();
            setTarefas(tarefasPendentes);
            console.log(tarefasPendentes);
            console.log('findAllPendentes')
        } else {
            const tarefasFeitas = await findAllFeitas();
            setTarefas(tarefasFeitas);
            console.log(tarefasFeitas);
            console.log('findAllFeitas')
        }

    }

    async function onChange(target, tarefa) {
        if (target.checked) {
            await marcarComoFeita(tarefa);
        } else {
            await marcarComoPendente(tarefa);
        }
        await findAllTarefas();
    }

    async function findProjetos() {
        const listaProjetos = await findAllProjetos();
        setProjetos(listaProjetos);
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
        setAdding(false)
        await findAllTarefas();

    }

    function onClickToAdd() {
        setAdding(!adding)
    }

    return (
        <>
            <List key={projetos.id}>
                <ListItemButton onClick={() => setShowTarefas(!showTarefas)}>
                    <ListItemIcon>
                        <AllInboxIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Projetos
                    </ListItemText>
                    {showTarefas ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <ul>
                    <Collapse in={showTarefas} timeout="auto" unmountOnExit>

                        {tarefas.filter(tarefa => tarefa.feita === feita).map(tarefa => {
                            return (
                                <Card className={'item-list-card'} key={tarefa.id}>
                                    <Checkbox checked={tarefa.feita} value={tarefa.id} onChange={({ target }) => onChange(target, tarefa)} />
                                    {tarefa.titulo}
                                </Card>
                            )
                        })}
                    </Collapse>

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
            </List>

            {!feita && <Fab onClick={onClickToAdd} className={'fab-button'} color="primary"><AddIcon /></Fab>}
        </>
    )

}