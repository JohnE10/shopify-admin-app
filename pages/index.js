import Link from "next/link";
import { useState } from "react";
import styles from '../styles/Home.module.css';

const Home = () => {

  return (
    <>
      <u>
        <div className='container text-center'>

          <div className='mt-5'><Link href="/products" ><button className={`${styles.menuButton} bg-success border-0 p-2 text-white rounded-3`} >Products List</button></Link></div>

          <div className='mt-3'><Link href="/customers/createCustomer"><button className={`${styles.menuButton} bg-success border-0 p-2 text-white rounded-3`}>Create Customer</button></Link></div>

          <div className='mt-3'><Link href="/customers"><button className={`${styles.menuButton} bg-success border-0 p-2 text-white rounded-3`}>Customers List</button></Link></div>

          <div className='mt-3'><Link href="/orders"><button className={`${styles.menuButton} bg-success border-0 p-2 text-white rounded-3`}>Orders List</button></Link></div>

          <div className='mt-3'><Link href="/orders/createDraft"><button className={`${styles.menuButton} bg-success border-0 p-2 text-white rounded-3`}>Create Draft Order</button></Link></div>

          <div className='mt-3'><Link href="/orders/draftList"><button className={`${styles.menuButton} bg-success border-0 p-2 text-white rounded-3`}>Draft Orders List</button></Link></div>

          <div className='mt-3'><Link href="/abandoned"><button className={`${styles.menuButton} bg-success border-0 p-2 text-white rounded-3`}>Abandoned Checkouts</button></Link></div>

          <div className='mt-3'><Link href="/orders/sendInvoice"><button className={`${styles.menuButton} bg-success border-0 p-2 text-white rounded-3`}>Send Invoice</button></Link></div>
        </div>
      </u>
    </>
  )
}

export default Home;
