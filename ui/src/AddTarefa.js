import './AddTarefa.css';
import { Button, Fab, TextField, Card, List, ListItemIcon, ListItemText, Checkbox } from '@material-ui/core'
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@material-ui/icons/Add'
import { useState, useEffect } from 'react'
import { salvar, findAllProjetos, findAllPendentes, findAllFeitas, marcarComoFeita, marcarComoPendente } from './tarefasServices'
import AllInboxIcon from '@mui/icons-material/AllInbox';
import InboxIcon from '@mui/icons-material/Inbox';
import { ExpandLess, ExpandMore } from '@mui/icons-material/';
import { Collapse, Dialog } from '@mui/material';


export function AddTarefa({ feita }) {

    const [tarefas, setTarefas] = useState([])
    const [titulo, setTitulo] = useState(null)
    const [showTarefas, setShowTarefas] = useState(false)

    const [adding, setAdding] = useState(false)

    const [showProjetos, setShowProjetos] = useState(false)
    const [selectedProjeto, setSelectedProjeto] = useState(null)
    const [projetos, setProjetos] = useState([])

    useEffect(async () => {
        await findAllTarefas();
    }, [feita]);

    useEffect(() => {
        findProjetos();
    }, []);

    async function findAllTarefas() {

        if (!feita) {
            const tarefasPendentes = await findAllPendentes();
            setTarefas(tarefasPendentes);
            console.log(tarefas)
        } else {
            const tarefasFeitas = await findAllFeitas();
            setTarefas(tarefasFeitas);
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
        console.log('projetos');
        console.log(projetos);

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
                usuario: {
                    id: 1,
                    nome: "Pedro",
                    email: null,
                    cep: null,
                    endereco: null,
                    numro: null,
                    bairro: null,
                    cidade: null,
                    estado: null,
                }
            }
        );
        setAdding(false)
        await findAllTarefas();

    }

    function onClickToAdd() {
        console.log(adding)
        setAdding(!adding)
    }

    return (
        <>
            <List>
                <ListItemButton onClick={() => setShowTarefas(!showTarefas)}>
                    <ListItemIcon>
                        <AllInboxIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Caixa de Entrada
                    </ListItemText>
                    {showTarefas ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={showTarefas} timeout="auto" unmountOnExit>
                    {tarefas.filter(tarefa => tarefa.feita === feita && tarefa.projeto === null).map(
                        tarefa => {
                            return (
                                <Card className={'item-list-card'} key={tarefa.id}>
                                    <Checkbox checked={tarefa.feita} value={tarefa.id} onChange={({ target }) => onChange(target, tarefa)} />
                                    {tarefa.titulo}
                                </Card>
                            )
                        }
                    )}
                </Collapse>

                {projetos.map(
                    projeto => {
                        return (
                            <List key={projeto.id}>
                                <ListItemButton onClick={() => setShowTarefas(!showTarefas)}>
                                    <ListItemIcon>
                                        <AllInboxIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        {projeto.titulo}
                                    </ListItemText>
                                    {showTarefas ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>

                                <Collapse in={showTarefas} timeout="auto" unmountOnExit>
                                    {tarefas.filter(tarefa => tarefa.feita === feita && tarefa.projeto === projeto.id).map(
                                        tarefa => {
                                            return (
                                                <Card className={'item-list-card'} key={tarefa.id}>
                                                    <Checkbox checked={tarefa.feita} value={tarefa.id} onChange={({ target }) => onChange(target, tarefa)} />
                                                    {tarefa.titulo}
                                                </Card>
                                            )
                                        }
                                    )}
                                </Collapse>
                            </List>
                        )
                    }
                )}
            </List>
            {!feita && <Fab onClick={onClickToAdd} className={'fab-button'} color="primary"><AddIcon /></Fab>}

            <Dialog open={adding}>
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
                                                    <ListItemIcon>
                                                        <InboxIcon />
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        Caixa de Entrada
                                                    </ListItemText>
                                                </ListItemButton>
                                            </List>

                                            <List >
                                                {projetos.map(
                                                    projetos => {
                                                        return (
                                                            <ListItemButton selected={selectedProjeto === projetos.id}
                                                                onClick={(event) => onSelectProjeto(event, projetos.id)}
                                                                key={projetos.id}
                                                            >
                                                                <ListItemIcon>
                                                                    <InboxIcon />
                                                                </ListItemIcon>
                                                                <ListItemText>
                                                                    {projetos.titulo}
                                                                </ListItemText>
                                                            </ListItemButton>

                                                        )
                                                    })}
                                            </List>
                                        </Collapse>

                                    </List>
                                    <Button variant='contained' color="primary" onClick={() => aoSalvar()} sx={{ color: 'green' }}>
                                        Salvar
                                    </Button>
                                    <Button variant='contained' color="secondary" onClick={() => setAdding(false)}>
                                        Cancelar
                                    </Button>
                                </Dialog>
        </>
    )

}