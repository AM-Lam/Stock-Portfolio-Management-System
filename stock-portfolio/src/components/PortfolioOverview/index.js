import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CollabList from '../CollabList';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from '@material-ui/core/';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import api from '../../api';
import NavBar from '../NavBar';
import Loader from '../Loader';
import PortfolioPage from '../PortfolioPage';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

function PortfolioOverview() {
  var history = useHistory();
  const classes = useStyles();
  const [title, setTitle] = React.useState('');
  const [port, setPort] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = useState(0);
  const [gain, setGain] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    api(
      `invested_performance?token=${sessionStorage.getItem('token')}`,
      'GET'
    ).then((data) => {
      if (data) {
        const total = parseFloat(data.total_gains).toFixed(1);
        const pct = parseFloat(data.pct_performance).toFixed(3);
        setGain(`$${total}(${pct}%)`);
      }
    });

    if (sessionStorage.getItem('token') == null) {
      return alert('Not loading the portfolio');
    }
    setIsLoading(true);
    api(`portfolio?token=${sessionStorage.getItem('token')}`, 'GET').then(
      (res) => {
        if (res) {
          setPort(res.portfolios);
        }
      }
    );

    setIsLoading(false);
  }, [refresh]);

  const handleCreate = async () => {
    if (title !== '') {
      const res = await api('portfolio/create', 'POST', {
        token: sessionStorage.getItem('token'),
        portfolio_name: title,
      });
      console.log(res);
      if (res.portfolios) {
        alert('Successfully Add A New Portfolio!');
        setRefresh((r) => r + 1);
      }
    }
    handleClose();
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEdit = async () => {
    if (title !== '') {
      const res = await api('portfolio/edit', 'POST', {
        token: sessionStorage.getItem('token'),
        portfolio_name: title,
        portfolio_id: sessionStorage.getItem('id'),
      });
      console.log(res);
      if (res.is_success) {
        alert('Successfully Update Your Portfolio Name!');
        setRefresh((r) => r + 1);
      }
    }
    handleCloseEdit();
  };

  const handleRedirect = (id, name) => {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('name', name);
    history.push(`portfolio/${id}`);
  };

  return (
    <div className={classes.root}>
      <NavBar />
      <br />
      <div>
        <Typography component='h1' variant='h4'>
          Portfolio Overview
        </Typography>
        <div>
          <p>Invested Performance</p>
          <p style={{ color: Math.sign(gain) === -1 ? 'red' : 'green' }}>
            {gain}
          </p>
        </div>
        <div>
          <Button variant='outlined' onClick={handleClickOpen}>
            Create Portfolio
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {'Create Porfolio'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Please enter title of Portfolio:
              </DialogContentText>
              <TextField
                id='demo-helper-text-misaligned-no-helper'
                label='Title'
                required
                onChange={(evt) => setTitle(evt.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCreate} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <CollabList />
        </div>
      </div>
      <br />
      {isLoading && <Loader />}
      <Grid
        container
        spacing={2}
        direction='row'
        justify='flex-start'
        alignItems='flex-start'
      >
        {port.map((p) => (
          <Grid item xs={12} sm={6} md={3} key={port.indexOf(p)}>
            <Card variant='outlined'>
              <CardHeader
                onClick={(e) =>
                  handleRedirect(`${p.portfolio_id}`, `${p.portfolio_name}`, e)
                }
                title={`Portfolio : ${p.portfolio_name}`}
              />
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  {/* Description */}
                </Typography>
                <Button
                  class='btn btn-outline-primary ms-5'
                  onClick={handleClickOpenEdit}
                >
                  Edit Name
                </Button>
                <Dialog
                  open={openEdit}
                  onClose={handleCloseEdit}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogTitle id='alert-dialog-title'>
                    {'Edit Porfolio'}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                      Please update the title of Portfolio:
                    </DialogContentText>
                    <TextField
                      id='demo-helper-text-misaligned-no-helper'
                      label='Title'
                      required
                      onChange={(evt) => setTitle(evt.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={handleEdit} autoFocus>
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PortfolioOverview;
