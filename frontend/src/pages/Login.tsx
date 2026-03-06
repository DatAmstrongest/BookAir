import { useState } from 'react';

interface LoginProps {
  setToken: (token: string) => void;
}


export default function Login( { setToken }: LoginProps ) {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return(
    <div>
    <form>
      <label>
        <p>Username</p>
        <input type="text" onChange={e => setUserName(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    </div>
  )
}