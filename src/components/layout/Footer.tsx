import { Link, useNavigate } from "react-router-dom";
import { Facebook, MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import logo from "../../assets/logo-new.png"; // Importation du logo

const services = [
  { name: "Bâtiment & Style", href: "/services#batiment" },
  { name: "Plomberie Sanitaire", href: "/services#plomberie" },
  { name: "Électricité", href: "/services#electricite" },
  { name: "Carrelage", href: "/services#carrelage" },
  { name: "Génie Civil", href: "/services#genie-civil" },
  { name: "Prestations Diverses", href: "/services#prestations" },
];

const quickLinks = [
  { name: "Accueil", href: "/" },
  { name: "Nos Réalisations", href: "/realisations" },
  { name: "À Propos", href: "/a-propos" },
  { name: "Demander un Devis", href: "/contact" },
];

export default function Footer() {
  const navigate = useNavigate();

  // Fonction pour gérer la redirection avec scroll vers le haut
  const handleLinkClick = (href: string) => {
    navigate(href);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Fonction pour gérer la redirection vers un service avec ancre
  const handleServiceClick = (href: string) => {
    const [path, anchor] = href.split('#');
    navigate(path);
    
    // Petit délai pour permettre à la page de se charger avant de scroller vers l'ancre
    setTimeout(() => {
      if (anchor) {
        const element = document.getElementById(anchor);
        if (element) {
          const offset = 80; // Ajustez selon la hauteur de votre header
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  // Fonction pour ouvrir Gmail avec l'adresse email pré-remplie
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = "visiondesignsarl@gmail.com";
    const subject = encodeURIComponent("Demande d'information - Vision Design SARL");
    const body = encodeURIComponent(
      "Bonjour,\n\nJe vous contacte suite à la visite de votre site web.\n\nCordialement."
    );
    
    // Détection du navigateur pour ouvrir Gmail ou le client mail par défaut
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Sur mobile, essayer d'ouvrir l'app Gmail si disponible, sinon client mail par défaut
      window.location.href = `googlegmail://co?to=${email}&subject=${subject}&body=${body}`;
      
      // Fallback après un délai si l'app Gmail n'est pas disponible
      setTimeout(() => {
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      }, 500);
    } else {
      // Sur desktop, ouvrir Gmail dans le navigateur
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`,
        "_blank"
      );
    }
  };

  return (
    <footer className="bg-primary-dark text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom section-padding pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Vision Design SARL Logo"
                className="h-16 w-auto object-contain"
              />
              <div>
                <span className="font-heading font-bold text-xl block">Vision Design</span>
                <span className="text-primary-foreground/70 text-sm">SARL</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              VDS - L'avenir du génie civil. Entreprise spécialisée dans la construction 
              et les travaux de génie civil à Yaoundé, Cameroun depuis 2021.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100077492796084"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitez notre page Facebook"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/237677571699"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactez-nous sur WhatsApp Principal"
                className="w-10 h-10 rounded-lg bg-secondary/80 hover:bg-secondary flex items-center justify-center transition-colors"
                title="WhatsApp: +237 677 57 16 99"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                onClick={handleEmailClick}
                aria-label="Envoyez-nous un email"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors cursor-pointer"
                title="Email: visiondesignsarl@gmail.com"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Nos Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <button
                    onClick={() => handleServiceClick(service.href)}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">
                  Yaoundé, Omnisport<br />
                  Avant Matrix Telecoms,
                  En face du cimetière Omnisport
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <div className="text-primary-foreground/80">
                  <a href="tel:+237695766022" className="hover:text-accent transition-colors block">
                    +237 695 76 60 22
                  </a>
                  <a href="tel:+237677571699" className="hover:text-accent transition-colors block">
                    +237 677 57 16 99
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="#"
                  onClick={handleEmailClick}
                  className="text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer"
                >
                  visiondesignsarl@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  Lun - Sam: 7h30 - 17h00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© 2026 Vision Design SARL. Tous droits réservés.</p>
          <div className="flex gap-6">
            <button
              onClick={() => handleLinkClick("/mentions-legales")}
              className="hover:text-primary-foreground transition-colors"
            >
              Mentions légales
            </button>
            <button
              onClick={() => handleLinkClick("/politique-confidentialite")}
              className="hover:text-primary-foreground transition-colors"
            >
              Politique de confidentialité
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}