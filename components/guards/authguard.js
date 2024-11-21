import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";

const AuthGuard = ({children}) => {

  const { data: session, status } = useSession();

  const router = useRouter();
  const { pathname } = router;

  // console.log(status);
  // console.log(pathname);

  if(status === 'authenticated' && pathname === '/') {
    router.push('/dashboard');
  } else if(status === 'authenticated' && pathname === '/register') {
    router.push('/dashboard');
  } else {
    return children;
  }

};

export default AuthGuard;


