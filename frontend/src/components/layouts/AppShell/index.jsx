

import Navbar from "@/components/Navbar";
import { useRouter } from 'next/router'

const disableNavbar = ["/strukpembelian", "/404", "/auth/register", "/auth/login"]

const Appshell = (props) => {
  const { children } = props;
  const { pathname } = useRouter()
  
  return (
    <main>
        {!disableNavbar.includes(pathname) && <Navbar />}
        {children}
    </main>
  )
}

export default Appshell