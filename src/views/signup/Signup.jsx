import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import { auth } from '../../firebase';
 
const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            
                const db = getDatabase();
                const userId = auth.currentUser.uid;
                set(ref(db, 'users/' + userId), {
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                });
          
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }
 
  return (
    <main >        
        <section>
            <div>
                <div>                  
                    <h1> Kodego Signup </h1>                                                                            
                    <form>                                                                                            
                        <div>
                            <label htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                type="text"
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}  
                                required                                    
                                placeholder="First Name"                                
                            />
                            <br/>
                        </div>


                        <div>
                            <label htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                type="text"
                                label="First Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}  
                                required                                    
                                placeholder="Last Name"                                
                            />
                        </div>

        

                        <div>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>

                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             
                        
                        <button
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign up                                
                        </button>
                                                                     
                    </form>
                   
                    <p>
                        Already have an account?{' '}
                        <NavLink to="/login" >
                            Sign in
                        </NavLink>
                    </p>                   
                </div>
            </div>
        </section>
    </main>
  )
}
 
export default Signup