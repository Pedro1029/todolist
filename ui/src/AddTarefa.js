import './AddTarefa.css';
import { Fab, TextField, Card, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import './AddTarefa.css'
import { useState } from 'react'


export function AddTarefa() {

    const [adding, setAdding] = useState(false)

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
                        //margin="dense"
                        id="description"
                        label="Tarefa"
                        //type="text"
                        fullWidth={true}
                    />
                    <Button variant='contained' className="Button">
                        Salvar
                    </Button>
                    <Button variant='outlined' color="secondary">
                        Cancelar
                    </Button>
                </Card>}

            {<Fab onClick={onClickToAdd} className={'fab-button'} color="primary"><AddIcon /></Fab>}
        </>
    )


}