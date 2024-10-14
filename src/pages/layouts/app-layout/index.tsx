import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import logo from '../../../assets/logo.svg';

export function AppLayout() {
  const location = useLocation();

  console.log(location);

  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Link to={'/'} className={styles.naming}>
            <img src={logo} alt='App logo' />
            <h1>Transactions</h1>
          </Link>
          <ul className={styles.links}>
            <Link
              to={'/dashboard/transactions'}
              className={location.pathname.includes('/dashboard/transactions') ? styles.active : ''}
            >
              <li>Transactions</li>
            </Link>
            <Link
              to={'/dashboard/suppliers'}
              className={location.pathname.includes('/dashboard/suppliers') ? styles.active : ''}
            >
              <li>Suppliers</li>
            </Link>
            <Link
              to={'/dashboard/metrics'}
              className={location.pathname.includes('/dashboard/metrics') ? styles.active : ''}
            >
              <li>Metrics</li>
            </Link>
          </ul>
        </div>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}
