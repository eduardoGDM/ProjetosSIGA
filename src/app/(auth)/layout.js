import { Nunito } from 'next/font/google'
import SideBar from './sideBar/page'

const nunito = Nunito({ 
  subsets: ['latin'],
  style:['normal'] 
})

export const metadata = {
  title: 'SIGA Software - Dashboard',
}

export default function DashLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} flex h-screen`}>
     
        <SideBar/>
          {children} 
      </body>
    </html>
  )
}
