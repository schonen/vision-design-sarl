import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Wrench, Zap, Grid3X3, HardHat, Settings, Sun, CheckCircle, ArrowRight, Phone } from "lucide-react";
import SectionAnimation from "@/components/ui/section-animation";
import { Helmet } from "react-helmet-async"; 


// Import images
import batimentImg from "@/assets/services/batiment.png";
import plomberieImg from "@/assets/services/plomberie.png";
import electriciteImg from "@/assets/services/electricite.png";
import carrelageImg from "@/assets/services/carrelage.png";
import genieCivilImg from "@/assets/services/genie-civil.png";
import prestationsImg from "@/assets/services/prestations-diverses.png";

const services = [
  {
    id: "batiment",
    icon: Building2,
    title: "Bâtiment & Style",
    subtitle: "Construction Résidentielle & Commerciale",
    description:
      "Vision Design SARL excelle dans la construction de bâtiments résidentiels et commerciaux alliant esthétique moderne et fonctionnalité. Notre expertise couvre la conception architecturale, le gros œuvre, les finitions haut de gamme et l'aménagement intérieur. Chaque projet est réalisé avec des matériaux de qualité supérieure et une attention méticuleuse aux détails.",
    features: [
      "Conception architecturale personnalisée",
      "Construction de villas et résidences de luxe",
      "Bâtiments commerciaux et industriels",
      "Finitions intérieures haut de gamme",
      "Respect des normes de construction",
      "Garantie décennale",
    ],
    image: batimentImg,
  },
  {
    id: "plomberie",
    icon: Wrench,
    title: "Plomberie Sanitaire",
    subtitle: "Installation & Maintenance",
    description:
      "Notre équipe de plombiers qualifiés assure l'installation complète de systèmes de plomberie et sanitaires selon les normes internationales. De la conception du réseau d'eau à l'installation des équipements sanitaires, nous garantissons un travail de qualité avec des matériaux durables et des finitions impeccables.",
    features: [
      "Installation de réseaux d'eau potable",
      "Systèmes d'évacuation des eaux usées",
      "Pose de sanitaires (douches, baignoires, WC)",
      "Installation de chauffe-eau",
      "Maintenance et dépannage",
      "Certification des installations",
    ],
    image: plomberieImg,
  },
  {
    id: "electricite",
    icon: Zap,
    title: "Électricité",
    subtitle: "Installations Sécurisées",
    description:
      "Nous réalisons des installations électriques complètes et sécurisées pour tous types de bâtiments. Notre expertise couvre le câblage, les tableaux électriques, l'éclairage, les prises et les systèmes de sécurité. Toutes nos installations respectent les normes de sécurité en vigueur au Cameroun.",
    features: [
      "Câblage électrique complet",
      "Installation de tableaux électriques",
      "Éclairage intérieur et extérieur",
      "Systèmes de sécurité électrique",
      "Mise aux normes",
      "Certificat de conformité",
    ],
    image: electriciteImg,
  },
  {
    id: "carrelage",
    icon: Grid3X3,
    title: "Carrelage",
    subtitle: "Pose Intérieure & Extérieure",
    description:
      "La pose de carrelage est un art que nos artisans maîtrisent parfaitement. Que ce soit pour le sol, les murs, les salles de bain ou les terrasses, nous garantissons une pose précise avec des finitions impeccables. Nous travaillons avec une large gamme de carreaux pour s'adapter à tous les styles et budgets.",
    features: [
      "Carrelage sol et mur",
      "Faïence salle de bain et cuisine",
      "Carrelage de terrasse et extérieur",
      "Mosaïque décorative",
      "Joints et finitions professionnelles",
      "Conseil en choix de matériaux",
    ],
    image: carrelageImg,
  },
  {
    id: "genie-civil",
    icon: HardHat,
    title: "Génie Civil",
    subtitle: "Études Techniques & Infrastructures",
    description:
      "Notre département de génie civil prend en charge les études techniques, la conception des fondations et la réalisation d'infrastructures solides. Nous utilisons les techniques les plus avancées pour garantir la stabilité et la durabilité de vos ouvrages, quelle que soit la nature du terrain.",
    features: [
      "Études de sol et topographie",
      "Conception de fondations",
      "Ouvrages en béton armé",
      "Terrassement et VRD",
      "Murs de soutènement",
      "Supervision de chantier",
    ],
    image: genieCivilImg,
  },
  {
    id: "prestations",
    icon: Sun,
    title: "Prestations Diverses",
    subtitle: "Énergie Solaire & Solutions Sur-Mesure",
    description:
      "En plus de nos services principaux, Vision Design SARL propose des prestations complémentaires incluant l'installation de systèmes solaires photovoltaïques, la rénovation de bâtiments existants et des solutions personnalisées pour répondre à tous vos besoins en construction et aménagement.",
    features: [
      "Installation solaire photovoltaïque",
      "Rénovation et réhabilitation",
      "Peinture intérieure et extérieure",
      "Menuiserie aluminium et bois",
      "Faux plafonds et décoration",
      "Solutions sur-mesure",
    ],
    image: prestationsImg,
  },
];

// Fonction pour gérer la redirection vers la section contact avec ancrage
const handleContactRedirect = (e: React.MouseEvent<HTMLAnchorElement>, serviceId?: string) => {
  e.preventDefault();
  
  if (serviceId) {
    // Redirection vers le formulaire de devis avec le service pré-sélectionné
    window.location.href = `/contact?service=${serviceId}#devis`;
  } else {
    // Redirection vers la section des coordonnées (téléphones)
    window.location.href = `/contact#coordonnees`;
  }
  
  // Force le rechargement de la page pour que l'ancre fonctionne
  setTimeout(() => {
    window.location.reload();
  }, 100);
};

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Nos Services – Génie civil, Construction, Électricité, Plomberie, Carrelage, Solaire | Vision Design SARL</title>
        <meta name="description" content="Découvrez tous les services de Vision Design SARL : bâtiment, plomberie, électricité, carrelage, génie civil, prestations diverses. Devis gratuit." />
        <meta name="keywords" content="services construction Yaoundé, génie civil Cameroun, électricien, plombier, carreleur, panneaux solaires" />
        <link rel="canonical" href="https://www.visiondesignsarl.com/services" />
        <meta property="og:title" content="Nos Services – Vision Design SARL" />
        <meta property="og:description" content="Une gamme complète pour tous vos projets de construction et de rénovation." />
        <meta property="og:image" content="https://www.visiondesignsarl.com/logo-new.png" />
        <meta property="og:url" content="https://www.visiondesignsarl.com/services" />
        </Helmet>


      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-20">
          <img
            src={batimentImg}
            alt="Chantier de construction"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container-custom text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Nos Expertises</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-6">
              Nos Services
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Une gamme complète de services en génie civil et construction pour 
              concrétiser tous vos projets au Cameroun.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-background">
        <div className="container-custom space-y-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-24"
            >
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}>
                <SectionAnimation
                  direction={index % 2 === 0 ? "left" : "right"}
                  className={index % 2 === 1 ? "lg:col-start-2" : ""}
                >
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full rounded-2xl shadow-lg"
                    />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                      <service.icon className="w-12 h-12 text-primary-foreground" />
                    </div>
                  </div>
                </SectionAnimation>

                <SectionAnimation
                  direction={index % 2 === 0 ? "right" : "left"}
                  delay={0.2}
                >
                  <div className="space-y-6">
                    <div>
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                        <service.icon className="w-4 h-4" />
                        {service.subtitle}
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
                        {service.title}
                      </h2>
                    </div>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="grid sm:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <a
                        href={`/contact?service=${service.id}#devis`}
                        onClick={(e) => handleContactRedirect(e, service.id)}
                        className="btn-primary inline-flex items-center justify-center"
                      >
                        Demander une Consultation
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                      <a
                        href="/contact#coordonnees"
                        onClick={(e) => handleContactRedirect(e)}
                        className="btn-outline inline-flex items-center justify-center"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Nous Appeler
                      </a>
                    </div>
                  </div>
                </SectionAnimation>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-primary">
        <div className="container-custom text-center">
          <SectionAnimation>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-foreground mb-6">
              Vous avez un projet en tête ?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Notre équipe est prête à vous accompagner dans la réalisation de 
              votre projet. Contactez-nous pour un devis gratuit.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-accent-foreground font-semibold hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              Contacter Notre Équipe
              <ArrowRight className="w-5 h-5" />
            </Link>
          </SectionAnimation>
        </div>
      </section>
    </>
  );
}