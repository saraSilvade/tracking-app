import React, {useState} from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {auth} from '../firebase'
import logo from '../asset/logo.svg'


interface UserAuthProps{
  verify: (userData : {username : string , email: string}) => void
}




export default function UserAuth({verify} : UserAuthProps){
const [isSignup, setSignup] = useState(false);
const [username, setUsername] = useState(''); 
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');



// stopping the browser from refreshing when the user submitting
const handleSubmit = async(e: React.SubmitEvent)=>{
  e.preventDefault();
  setError('');


  // Protecting the application from crashing 

try{
  if(isSignup){
 
const userSignupCreds = await createUserWithEmailAndPassword(auth, email, password);
await updateProfile(userSignupCreds.user, {displayName: username})

  }else{
    await signInWithEmailAndPassword(auth, email, password)
     verify({
      username: isSignup ? username : email.split('@')[0], 
      email: email,
    })
  }
}catch(err :any){
if(err){
  setError('Invalid email or password. Please try again.');
}else{
  setError(err.message)
}
}




}







  return(
  <section className="min-h-screen flex items-center justify-center bg-[#07090e] p-4">
    <div className='w-full max-w-md bg-[#110c22]/80 border border-glass-border rounded-2xl p-10 backdrop-blur-md shadow-[0_0_35px_rgba(168,85,247,0.15)]'>
    

{/* Header Title */}
        <div className="text-center mb-9">
          <div className="inline-flex items-center gap-2 mb-5">
   <img src={logo} className='h-7'/>
            <h1 className="text-2xl font-bold font-mono tracking-wider text-text-main">
              <span >Arc</span>
            </h1>
          </div>
            <p className="text-xs text-text-muted font-mono">   {isSignup? 'Create your hero profile ' : 'Welcome back, hero'}</p>
  </div>


  <div className="grid grid-cols-2 gap-2 p-1 bg-[#07090e]/60 border border-glass-border rounded-xl mb-6">
    <button type='button' onClick={ ()=> {setSignup(false) 
      setEmail('');
      setPassword('');
      setUsername('');
      setError('');
    }}
    
    
    className={`py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
              !isSignup
              
                ? 'bg-shinny-purple text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                : 'text-text-muted hover:text-white'
            }`}> Log In   </button>
    <button type='button' onClick={()=> {setSignup(true) 
        setEmail('');
      setPassword('');
      setUsername('');
      setError('');
    } }className={`py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
              isSignup
                ? 'bg-shinny-purple text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                : 'text-text-muted hover:text-white'
            }`}> Sign up</button>
  </div>
  {error && <p  className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono text-center" style={{color: 'red'}}> {error}</p>}


<form onSubmit={handleSubmit} className="flex flex-col gap-4">
  {isSignup && (

      <div>
      <label className="block text-xs font-mono text-text-muted uppercase mb-1">Username:</label>
      <input type='text' 
      required
      value={username}
      onChange={(e)=> setUsername(e.target.value)}
      placeholder='Hero'
      className="w-full bg-[#07090e]/80 border border-glass-border rounded-xl px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-accent-purple transition-all"
      />

    </div>
  )}

    <div>
      <label className="block text-xs font-mono text-text-muted uppercase mb-1"> Email:</label>
      <input 
      type='email'
      required
      value={email}
      onChange={(e)=> setEmail(e.target.value)}
      placeholder="hero@arc.io"
      className="w-full bg-[#07090e]/80 border border-glass-border rounded-xl px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-accent-purple transition-all"
      />
    </div>

    <div>
<label className="block text-xs font-mono text-text-muted uppercase mb-1">Password:</label>
<input type='password'
required
value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="••••••••"
className="w-full bg-[#07090e]/80 border border-glass-border rounded-xl px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-accent-purple transition-all"
 />
    </div>
<button type='submit' 
            className="mt-2 w-full py-3 rounded-xl bg-shinny-purple text-white font-bold font-mono tracking-wide hover:bg-accent-purple/80 transition-all cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.4)]">{isSignup? 'Create Account' : 'Log In'}</button>
</form>
    </div>
  </section>
  )
}