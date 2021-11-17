import './AddTarefa.css';
import { Fab, TextField, Card, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import './AddTarefa.css'
import { useState } from 'react'
import { salvar } from './tarefasServices'


export function AddTarefa() {

    const [adding, setAdding] = useState(false)
    const [titulo, setTitulo] = useState(null)

    async function aoSalvar() {
        await salvar({
            titulo,
            feita: false,
        });
    }

    function onClickToAdd() {
        setAdding(!adding)
        console.log(adding)
    }

    return (
        <>
            {adding &&
                <Card>
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        id="description"
                        label="Tarefa"
                        type="text"
                        fullWidth={true}
                        onChange={(event) => setTitulo(event.target.value)}

                    />
                    <Button variant='contained' color="primary" onClick={() => aoSalvar()}>
                        Salvar
                    </Button>
                    <Button variant='contained' color="secondary" onClick={() => setAdding(false)}>
                        Cancelar
                    </Button>
                </Card>}

            {<Fab onClick={onClickToAdd} className={'fab-button'} color="primary"><AddIcon /></Fab>}
        </>
    )


}