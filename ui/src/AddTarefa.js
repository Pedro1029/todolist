import './AddTarefa.css';
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import './AddTarefa.css'

import {useState} from 'react'


export function AddTarefa() {

    const [adding, setAdding] = useState(!adding)

    function onClickToAdd(){
        setAdding(!adding)
        console.log(adding)
    }

    return (
        <>
            {<Fab onClick={onClickToAdd}className={'fab-button'} color="primary" aria-label="Add"><AddIcon /></Fab>}
        </>
    )


}