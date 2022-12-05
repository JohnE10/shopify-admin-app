import Link from "next/link";
import Head from "next/head";

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand h1" href="/">Shopify Admin App</Link>
                </div>
            </nav>
        </>
    );
}

export default Navbar;