import { useState } from "react";
import { useHistory } from "react-router";
// TODO fetch from api
// import logo from './../../../public/logo192.png';

function AccountPage(){
    // should fetch from api
    const firstName = "John"
    const lastName = "Smith"

    var history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const handleAccountPage = () => {
        //@TODO: check id/password to authenticate/authorise.
        //  if(id,password exist){
            history.push('/') // Go back to the main page
        // }else{
        //     display error message
        // }
    }

    function edit() {
        // TODO Make the page
        // history.push('/editAccount');
        return;
    }
    
    return(
        <div class="text-center w-100 p-3">
            <form>
              <h1>
                Personal Information  
                <button class="btn btn-lg btn-link btn-block" onClick={edit()}>Edit</button>
              </h1>
            </form>
            
            <form>
            <div>
                <label> Profile Picture  </label>
                <p>Picture</p>
                {/* <img src={logo} alt="Logo" /> */}
                </div>
              
            <div>
                <label> First Name:  </label>
                <p>{firstName}</p>
            </div>
            
            <div>
                <label> Last Name:  </label>
                <p>{lastName}</p>
              </div>
            </form>
        </div>
    );
}

export default AccountPage;