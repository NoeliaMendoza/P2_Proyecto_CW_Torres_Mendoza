import { Header, Footer } from '../index';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
    return (
        <div className={styles.contenedor}>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export { Layout };