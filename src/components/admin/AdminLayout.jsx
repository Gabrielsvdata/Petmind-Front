import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { limparAuth } from '../../services/api'
import styles from './AdminLayout.module.scss'

const itensMenu = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/usuarios', label: 'Usuários' },
  { to: '/admin/pets', label: 'Pets' },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  function sair() {
    limparAuth()
    navigate('/login')
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div>
          <strong className={styles.logo}>⚽ PETMIND ADMIN</strong>
        </div>

        <div className={styles.headerAcoes}>
          <button className={styles.acaoHeader} onClick={() => navigate('/home')}>
            Voltar ao app
          </button>
          <button className={styles.acaoHeaderSecundaria} onClick={sair}>
            Sair
          </button>
        </div>
      </header>

      <aside className={styles.sidebar}>
        <h1 className={styles.sidebarTitulo}>Painel Administrativo</h1>
        <nav className={styles.menu} aria-label="Menu administrativo">
          {itensMenu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.ativo : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <section className={styles.conteudo}>
        <Outlet />
      </section>
    </div>
  )
}