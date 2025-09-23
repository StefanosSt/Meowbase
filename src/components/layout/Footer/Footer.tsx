import styles from './Footer.module.scss';
import { Logo, Linkedin, Gmail, Github } from '@assets/icons/icons';

const CONTACTLINKS = [
        {
            href: 'https://www.linkedin.com/in/stefanos-stamoulis/',
            label: 'LinkedIn',
            icon: Linkedin
        },
        {
            href: 'mailto:sstamoulis.wd@gmail.com',
            label: 'Gmail',
            icon: Gmail
        },
        {
            href: 'https://github.com/StefanosSt',
            label: 'GitHub',
            icon: Github
        }
    ];

const Footer = () => {
    

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.leftSection}>
                     <Logo width={80} height={100} className={styles.logo}/>
                </div>
                
                <div className={styles.rightSection}>
                    <span className={styles.contactTitle}>Contact Me</span>
                    <div className={styles.contactLinks}>
                        {CONTACTLINKS.map((link) => {
                            const IconComponent = link.icon;
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.contactLink}
                                >
                                    <IconComponent width={20} height={20} className={styles.icon} />
                                    <span className={styles.linkText}>{link.label}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;