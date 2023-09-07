import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import SignUp from '@/app/signup/page';
import Login from '@/app/login/page';

export function AuthPopover() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleSignup = () => {
    setShowSignup(!showSignup);
    setShowLogin(false);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowSignup(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='flex gap-6'>
          <Button onClick={toggleSignup}>Sign Up</Button>
          <Button onClick={toggleLogin}>Login</Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        {showSignup && <SignUp />}
        {showLogin && <Login />}
      </PopoverContent>
    </Popover>
  );
}
