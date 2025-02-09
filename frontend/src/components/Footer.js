import '../styles/Footer.css'

function Footer() {
    return `
        <div class="footer-container">
            <div class="footer-logo">
                <img src="uide.png" alt="Logo UIDE">
            </div>
            <div class="footer-text">
                <p>&copy; ${new Date().getFullYear()} UIDE - Campus Loja. Todos los derechos reservados.</p>
            </div>
            <div class="footer-social">
                <a href="https://www.facebook.com/uide.edu.ec" target="_blank" class="social-btn">
                    <img src="icons/facebook.svg" alt="Facebook">
                </a>
                <a href="https://www.instagram.com/uide_oficial" target="_blank" class="social-btn">
                    <img src="icons/instagram.svg" alt="Instagram">
                </a>
                <a href="https://twitter.com/uide_ec" target="_blank" class="social-btn">
                    <img src="icons/twitter.svg" alt="Twitter">
                </a>
                <a href="https://www.linkedin.com/school/uide/" target="_blank" class="social-btn">
                    <img src="icons/linkedin.svg" alt="LinkedIn">
                </a>
            </div>
        </div>
    `;
}

export default Footer