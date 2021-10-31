import React from 'react';
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { 
    Button,  
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, 
    useMediaQuery,
    useTheme
} from '@mui/material';
import api from "../../api";

function CreatePortfolio(props) {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    var history = useHistory();
    const token = localStorage.getItem('token');

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = useEffect(async() => {
        if (title != '') {
            const res = await api('portfolio/create', 'POST', {token, portfolio_name: title});
            if (res) {
                alert("Successfully Add A New Portfolio!");
            } 
        } 
        handleClose();
    });


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create Portfolio
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                {"Create Portfolio"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter title of Portfolio:  
                </DialogContentText>
                <TextField id="demo-helper-text-misaligned-no-helper" label="Title"  required onChange={(evt)=>setTitle(evt.target.value)}></TextField>
                </DialogContent>                            
                <br></br>
                <DialogActions>
                <Button autoFocus onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreate}>
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>
        </div> 
    )
}

export default CreatePortfolio;