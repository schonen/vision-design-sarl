import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Wrench, Zap, Grid3X3, HardHat, Settings, Phone, Award, Users, Clock, Shield, Star, Quote, Bot, Calculator, HelpCircle, Sparkles, Facebook } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import visionBotImage from "@/assets/chatbot/visionbot.png";
import AnimatedCounter from "@/components/ui/animated-counter";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Import project images
import villaLuxe from "@/assets/projects/villa-luxe.png";
import solarInstallation from "@/assets/projects/solar-installation.jpg";
import immeubleR3Omnisport from "@/assets/projects/immeuble-r3-omnisport.png";
import immeubleOmnisport2 from "@/assets/projects/immeuble-omnisport-2.png";
import electricalSystem from "@/assets/projects/electrical-system.jpeg";
import equipe from "@/assets/team/equipe-1.jpeg";
import immeubleVds from "@/assets/hero/immeuble-vds.png";

const services = [
  {
    id: "batiment",
    icon: Building2,
    title: "Bâtiment & Style",
    description: "Construction résidentielle et commerciale de qualité supérieure avec des finitions modernes.",
  },
  {
    id: "plomberie",
    icon: Wrench,
    title: "Plomberie Sanitaire",
    description: "Installation complète de systèmes de plomberie et sanitaires aux normes internationales.",
  },
  {
    id: "electricite",
    icon: Zap,
    title: "Électricité",
    description: "Installations électriques sécurisées pour résidences et bâtiments commerciaux.",
  },
  {
    id: "carrelage",
    icon: Grid3X3,
    title: "Carrelage",
    description: "Pose professionnelle de carrelage intérieur et extérieur avec précision.",
  },
  {
    id: "genie-civil",
    icon: HardHat,
    title: "Génie Civil",
    description: "Études techniques, fondations solides et infrastructures durables.",
  },
  {
    id: "prestations",
    icon: Settings,
    title: "Prestations Diverses",
    description: "Installation solaire, rénovation et solutions sur-mesure.",
  },
];

// Import new project images
import boukarouYaounde from "@/assets/projects/boukarou-yaounde.jpeg";
import maisonNgockSaa from "@/assets/projects/chantier-mican.jpeg";
import maisonEbeda from "@/assets/projects/maison-ebebda.jpeg";
import carrelageTerrasseMican from "@/assets/projects/carrelage-terrasse-nklomesseng.jpeg";
import forageNkolmesseng from "@/assets/projects/forage-omnisport.jpeg";

const projects = [
  { image: boukarouYaounde, title: "Boukarou Moderne à Odza", location: "Yaoundé, Odza Borne 10", category: "Bâtiment & Style" },
  { image: maisonNgockSaa, title: "Résidence à Ngoksa", location: "Ngoksa, Commune d'Ebebda", category: "Bâtiment & Style" },
  { image: maisonEbeda, title: "Villa en Construction à Mican", location: "Yaoundé, Mican", category: "Génie Civil" },
  { image: carrelageTerrasseMican, title: "Pose Carreaux Terrasse de Luxe", location: "Yaoundé, Nkolmesseng", category: "Carrelage" },
  { image: forageNkolmesseng, title: "Forage Automatique", location: "Yaoundé, Omnisport", category: "Plomberie" },
  { image: immeubleR3Omnisport, title: "Immeuble R+3 avec Sous-sol", location: "Yaoundé, Omnisport", category: "Génie Civil" },
  { image: immeubleOmnisport2, title: "Immeuble Résidentiel", location: "Yaoundé, Omnisport", category: "Bâtiment & Style" },
  { image: electricalSystem, title: "Installation Électrique + Stockage", location: "Bafoussam, Bamendjou", category: "Électricité" },
  { image: solarInstallation, title: "Panneaux Solaires Résidentiels", location: "Bafoussam, Bamendjou", category: "Prestations Diverses" },
  { image: villaLuxe, title: "Villa R+1 Style Versailles", location: "Bafoussam, Bamendjou", category: "Bâtiment & Style" },
];

const advantages = [
  {
    icon: Award,
    title: "Excellence Garantie",
    description: "Qualité supérieure dans chaque projet avec des matériaux de premier choix.",
  },
  {
    icon: Users,
    title: "Équipe Expérimentée",
    description: "Des professionnels qualifiés avec des années d'expérience dans le domaine.",
  },
  {
    icon: Clock,
    title: "Respect des Délais",
    description: "Livraison de projets dans les temps avec une planification rigoureuse.",
  },
  {
    icon: Shield,
    title: "Garantie Décennale",
    description: "Couverture complète pour votre tranquillité d'esprit sur le long terme.",
  },
];

const testimonials = [
  {
    name: "Mr Jean Kalvin LABUSE",
    role: "Homme d'affaires",
    location: "Bamendjou, Maison Blanche",
    content: "Vision Design a construit ma résidence avec un professionnalisme exemplaire. Les finitions sont remarquables et le résultat dépasse toutes mes attentes. Une équipe de confiance !",
    rating: 5,
  },
  {
    name: "Mr CLaude MBARGA",
    role: "Médecin",
    location: "Yaoundé, Omnisport - R+3",
    content: "Mon immeuble R+3 à Omnisport a été réalisé dans les délais avec une qualité irréprochable. L'équipe Vision Design est compétente, rigoureuse et à l'écoute. Je recommande vivement.",
    rating: 5,
  },
  {
    name: "Mme Bel",
    role: "Femme d'affaires",
    location: "Yaoundé",
    content: "Collaboration exceptionnelle avec Vision Design SARL. Leur expertise et leur sens du détail ont permis de concrétiser mon projet immobilier exactement comme je l'imaginais.",
    rating: 5,
  },
  {
    name: "Mr Régis KENFACK",
    role: "Entrepreneur",
    location: "Cameroun",
    content: "Des travaux réalisés avec expertise et un grand professionnalisme. Vision Design SARL est une entreprise sérieuse qui respecte ses engagements. Je leur fais entièrement confiance.",
    rating: 5,
  },
];

export default function Index() {
  // Fonction pour WhatsApp avec message pré-défini
  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const phoneNumber = "237677571699";
    const message = encodeURIComponent(
      "Bonjour Vision Design SARL,\n\nJe vous contacte suite à la visite de votre site web. Je souhaiterais obtenir plus d'informations sur vos services de construction et de génie civil.\n\nMerci de bien vouloir me recontacter."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <motion.img
            src={immeubleVds}
            alt="Immeuble Vision Design SARL"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom text-center text-primary-foreground pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm font-medium">Depuis 2016 à Yaoundé, Cameroun</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black mb-6 leading-tight"
            >
              VDS - L'avenir du{" "}
              <span className="text-secondary">génie civil</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
            >
              Vision Design SARL transforme vos rêves architecturaux en réalité. 
              Construction, rénovation et génie civil d'excellence au Cameroun.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/contact" className="btn-hero-primary">
                Demander une Consultation
              </Link>
              <Link to="/realisations" className="btn-hero-secondary">
                Voir Nos Réalisations
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team & Introduction */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative">
                <img
                  src={equipe}
                  alt="L'équipe Vision Design SARL"
                  className="w-full rounded-2xl shadow-lg"
                />
                <motion.div 
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-accent rounded-2xl flex items-center justify-center shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <div className="text-center text-accent-foreground">
                    <span className="text-3xl font-heading font-black block">10+</span>
                    <span className="text-sm font-medium">Années</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                <Building2 className="w-4 h-4" />
                Notre Histoire
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
                Bâtir l'excellence depuis{" "}
                <span className="text-primary">2016</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Vision Design SARL est née de la passion de M. DEFO SADO Thomas Daquin 
                pour le génie civil et l'architecture. Depuis notre création à Yaoundé, 
                nous avons réalisé plus de 20 projets, allant des appartements haut standing et immeubles à étages aux 
                installations industrielles, électiques, sanitaires et solaires.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Notre équipe de professionnels qualifiés s'engage à fournir des services 
                de qualité supérieure, respectant les normes internationales et les 
                délais convenus.
              </p>
              <Link to="/a-propos" className="btn-primary inline-flex items-center gap-2">
                En savoir plus
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-border">
            {[
              { end: 10, suffix: "+", label: "Années d'expérience" },
              { end: 20, suffix: "+", label: "Projets réalisés" },
              { end: 100, suffix: "%", label: "Clients satisfaits" },
              { end: 20, suffix: "+", label: "Experts qualifiés" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-accent">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </span>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VisionBot Section */}
      <section className="section-padding bg-gradient-to-br from-primary-dark via-primary to-primary-dark relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
                <Bot className="w-4 h-4" />
                Assistant Virtuel Intelligent
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground">
                Découvrez{" "}
                <span className="text-secondary">VisionBot</span>
              </h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Notre assistant virtuel intelligent est là pour vous accompagner 24h/24. 
                Posez vos questions sur nos services, obtenez des estimations de budget 
                et recevez des conseils personnalisés instantanément.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: HelpCircle, text: "Réponses instantanées à toutes vos questions" },
                  { icon: Calculator, text: "Estimation des coûts et matériaux" },
                  { icon: Sparkles, text: "Conseils personnalisés pour votre projet" },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-primary-foreground/90">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-sm text-primary-foreground/60 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Cliquez sur l'icône en bas à droite pour discuter avec VisionBot
              </motion.p>
            </motion.div>

            {/* VisionBot Image */}
            <motion.div
              initial={{ opacity: 0, rotateY: 30 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img
                  src={visionBotImage}
                  alt="VisionBot - Assistant Virtuel Vision Design"
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 right-10 w-20 h-20 bg-secondary/30 rounded-full blur-xl"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-20 left-10 w-16 h-16 bg-accent/30 rounded-full blur-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Settings className="w-4 h-4" />
              Nos Services
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              Des solutions complètes pour vos projets
            </h2>
            <p className="text-lg text-muted-foreground">
              De la conception à la réalisation, nous vous accompagnons à chaque étape 
              de votre projet de construction ou de rénovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
              >
                <Link
                  to={`/services#${service.id}`}
                  className="service-card group block h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Carousel */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Building2 className="w-4 h-4" />
              Nos Réalisations
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              Découvrez nos projets récents
            </h2>
            <p className="text-lg text-muted-foreground">
              Chaque projet témoigne de notre engagement envers l'excellence 
              et la satisfaction de nos clients.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {projects.map((project, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div 
                      className="project-card aspect-[4/3]"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="project-overlay">
                        <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-xl font-heading font-bold text-primary-foreground">
                          {project.title}
                        </h3>
                        <p className="text-primary-foreground/70 text-sm">
                          {project.location}
                        </p>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4 bg-card border-border hover:bg-muted" />
              <CarouselNext className="hidden md:flex -right-4 bg-card border-border hover:bg-muted" />
            </Carousel>
          </motion.div>

          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link to="/realisations" className="btn-outline">
              Voir tous les projets
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Pourquoi Nous Choisir
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              L'excellence à votre service
            </h2>
            <p className="text-lg text-muted-foreground">
              Nous nous distinguons par notre professionnalisme, notre rigueur 
              et notre engagement envers la qualité.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-5">
                    <motion.div 
                      className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <advantage.icon className="w-8 h-8 text-primary-foreground" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        {advantage.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, rotateX: -15 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Témoignages
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-lg text-muted-foreground">
              La satisfaction de nos clients est notre plus grande fierté.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 150
                }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                      >
                        <Star className="w-5 h-5 text-accent fill-accent" />
                      </motion.div>
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/20 mb-3" />
                  <p className="text-muted-foreground mb-6 flex-1">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-primary">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-accent" />
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        
        <motion.div 
          className="relative container-custom text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-accent-foreground mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Prêt à concrétiser votre projet ?
          </motion.h2>
          <motion.p 
            className="text-xl text-accent-foreground/80 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Contactez-nous dès aujourd'hui pour un devis gratuit et 
            personnalisé. Notre équipe est à votre disposition.
          </motion.p>
          
          {/* Première rangée : Appeler et Demander un devis */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.a
              href="tel:+237695766022"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-accent-foreground text-accent font-semibold hover:-translate-y-1 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              Appeler Maintenant
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-accent-foreground/10 text-accent-foreground border-2 border-accent-foreground/30 font-semibold hover:bg-accent-foreground/20 hover:-translate-y-1 transition-all duration-300"
              >
                Demander une Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Deuxième rangée : WhatsApp et Facebook */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a
              href="#"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white hover:-translate-y-1 transition-all duration-300 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp className="w-5 h-5" />
              WhatsApp
            </motion.a>
            <motion.a
              href="https://www.facebook.com/profile.php?id=100077492796084"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white hover:-translate-y-1 transition-all duration-300 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #1877F2 0%, #0E5A9E 100%)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}