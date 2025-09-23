import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Logo, HamburgerMenu } from '@assets/icons/icons';
import { useClickOutside, useEscapeKey } from '@hooks';
import styles from './Header.module.scss';
import type { NavigationItem } from '@types';

const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: '/', title: 'Cats' },
  { href: '/breeds', title: 'Breeds' },
  { href: '/favorites', title: 'Favorites' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useClickOutside<HTMLElement>(() => setIsOpen(false));
  useEscapeKey(() => setIsOpen(false), isOpen);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar} ref={navRef}>
        <div className={styles.navbarContainer}>
          <div className={styles.navbarBrand}>
            <NavLink to="/" className={styles.navbarLogo}>
              <Logo />
              <span className={styles.navbarLogoText}>Meowbase</span>
            </NavLink>

            <div
              className={`${styles.navbarLinks} ${styles.navbarLinksDesktop}`}
            >
              {NAVIGATION_ITEMS.map(item => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `${styles.navbarLink}${isActive ? ` ${styles.navbarLinkActive}` : ''}`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
          </div>

          <button
            className={styles.navbarToggle}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <HamburgerMenu
              width={40}
              height={50}
              className={styles.navbarToggleIcon}
            />
          </button>
        </div>

        {isOpen && (
          <div className={styles.navbarMobile}>
            {NAVIGATION_ITEMS.map(item => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `${styles.navbarMobileLink}${isActive ? ` ${styles.navbarMobileLinkActive}` : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;