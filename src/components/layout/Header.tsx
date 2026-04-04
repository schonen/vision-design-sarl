import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa"; 
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo-new.png";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Réalisations", href: "/realisations" },
  { name: "À Propos", href: "/a-propos" },
  { name: "Notre Univers", href: "/notre-univers" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Fonction pour ouvrir WhatsApp avec un message pré-défini
  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const phoneNumber = "237677571699";
    const message = encodeURIComponent(
      "Bonjour Vision Design SARL,\n\nJe vous contacte suite à la visite de votre site web. Je souhaiterais obtenir plus d'informations sur vos services de construction et de génie civil.\n\nMerci de bien vouloir me recontacter."
    );
    
    // Ouvrir WhatsApp avec le message pré-défini
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Vision Design SARL Logo"
              className="h-16 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <span className={`font-heading font-bold text-lg ${isScrolled ? 'text-foreground' : 'text-primary-foreground'} group-hover:text-accent transition-colors`}>
                Vision Design
              </span>
              <span className={`block text-xs ${isScrolled ? 'text-muted-foreground' : 'text-primary-foreground/70'}`}>
                SARL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors link-underline ${
                  location.pathname === item.href
                    ? "text-accent"
                    : isScrolled
                    ? "text-foreground hover:text-accent"
                    : "text-primary-foreground hover:text-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+237695766022"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isScrolled
                  ? "text-primary hover:bg-primary/10"
                  : "text-primary-foreground hover:bg-primary-foreground/10"
              }`}
              title="Appeler: +237 695 76 60 22"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">Appeler</span>
            </a>
            <a
              href="#"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)"
              }}
              title="WhatsApp: +237 677 57 16 99"
            >
              <FaWhatsapp className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-foreground hover:bg-muted"
                : "text-primary-foreground hover:bg-primary-foreground/10"
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <div className="container-custom py-4 space-y-2">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                      location.pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="tel:+237695766022"
                  className="flex items-center justify-center gap-2 py-3 rounded-lg bg-primary/10 text-primary font-medium"
                >
                  <Phone className="w-5 h-5" />
                  +237 695 76 60 22
                </a>
                <a
                  href="#"
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-white transition-all duration-300 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)"
                  }}
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Contacter sur WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}