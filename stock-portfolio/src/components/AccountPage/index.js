import React from 'react';
import { useHistory } from 'react-router';
import AccNav from './../AccNav/index';
import api from '../../api';
import NavBar from '../NavBar/index';

function AccountPage() {
  return (
    <>
      <NavBar />
      <AccNav />
    </>
  );
}

export default AccountPage;
