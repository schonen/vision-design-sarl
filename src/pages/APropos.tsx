import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {  Users, Award, Target, Heart, Lightbulb, MapPin, Calendar, ArrowRight, Bot, Calculator, HelpCircle, Sparkles, Star, Quote } from "lucide-react";
import AnimatedCounter from "@/components/ui/animated-counter";
import SectionAnimation from "@/components/ui/section-animation";

// Import images
import equipe1 from "@/assets/team/equipe-1.jpeg";
import equipe2 from "@/assets/team/equipe-2.jpeg";
import equipe3 from "@/assets/team/equipe-3.jpeg";
import fondateur1 from "@/assets/team/fondateur-1.jpeg";
import fondateur2 from "@/assets/team/fondateur-2.jpeg";
import visionBotImage from "@/assets/chatbot/visionbot.png";

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
    name: "Mme Bel NDJOUMOU",
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

const visionBotFeatures = [
  {
    icon: HelpCircle,
    title: "Réponses Instantanées",
    description: "Posez vos questions sur nos services 24h/24",
  },
  {
    icon: Calculator,
    title: "Estimation de Budget",
    description: "Obtenez une estimation des coûts pour votre projet",
  },
  {
    icon: Sparkles,
    title: "Conseils Personnalisés",
    description: "Recevez des recommandations adaptées à vos besoins",
  },
];

const timeline = [
  {
    year: "2016",
    title: "Création de Vision Design SARL",
    description: "Fondation de l'entreprise par M. DEFFO SADO Thomas Daquin avec une vision claire : transformer le secteur du génie civil au Cameroun.",
  },
  {
    year: "2018",
    title: "Premiers Grands Projets",
    description: "Réalisation de nos premiers projets majeurs incluant des villas de luxe, des appartements haut standing et des immeubles en étage.",
  },
  {
    year: "2020",
    title: "Développement de l'expertise technique", 
    description: "Obtention des certifications professionnelles et montée en compétence de l'équipe sur les normes internationales de construction.",
  },
  {
    year: "2021",
    title: "Immatriculation de Vision Design SARL",
    description: "Immatriculation officielle sous le numéro RC/YAD/2021/B/2029, marquant le début légal de notre activité et notre engagement à respecter les exigences du génie civil au Cameroun.",
  },
  {
    year: "2022",
    title: "Lancement des grands chantiers",
    description: "Signature des premiers contrats pour des projets d'infrastructure et de bâtiments commerciaux, posant les bases de notre notoriété dans la région.",
  },
  {
    year: "2023",
    title: "Expansion de l'Équipe",
    description: "Croissance de l'équipe avec l'intégration de nouveaux experts en construction, plomberie et électricité.",
  },
  {
    year: "2024",
    title: "+20 Projets Réalisés",
    description: "Franchissement du cap des 20 projets réalisés avec succès à travers le Cameroun.",
  },
  {
    year: "2025",
    title: "Vision d'Avenir",
    description: "Expansion vers de nouveaux services et consolidation de notre position de leader dans le génie civil au Cameroun.",
  },
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "Nous visons la perfection dans chaque projet, sans compromis sur la qualité des matériaux et des finitions.",
  },
  {
    icon: Heart,
    title: "Intégrité",
    description: "Transparence totale avec nos clients, respect des engagements et honnêteté dans toutes nos relations.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Adoption des technologies modernes et des techniques de construction les plus avancées.",
  },
];

export default function APropos() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-20">
          <img
            src={equipe1}
            alt="Équipe Vision Design"
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
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Notre Histoire</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-6">
              À Propos de Nous
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Découvrez l'histoire de Vision Design SARL et notre passion pour 
              l'excellence dans le génie civil.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Photo with Stats */}
      <section className="relative -mt-10 mb-20">
        <div className="container-custom">
          <SectionAnimation>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={equipe2}
                alt="L'équipe Vision Design SARL"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <span className="text-3xl md:text-4xl font-heading font-black text-accent">
                      <AnimatedCounter end={10} suffix="+" />
                    </span>
                    <p className="text-primary-foreground/90 mt-1">Années</p>
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-heading font-black text-accent">
                      <AnimatedCounter end={20} suffix="+" />
                    </span>
                    <p className="text-primary-foreground/90 mt-1">Projets</p>
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-heading font-black text-accent">
                      <AnimatedCounter end={40} suffix="+" />
                    </span>
                    <p className="text-primary-foreground/90 mt-1">Experts</p>
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-heading font-black text-accent">
                      <AnimatedCounter end={100} suffix="%" />
                    </span>
                    <p className="text-primary-foreground/90 mt-1">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionAnimation>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <SectionAnimation className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              Notre Parcours
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Histoire de Vision Design
            </h2>
            <p className="text-lg text-muted-foreground">
              Depuis 2021, nous construisons l'avenir du génie civil au Cameroun.
            </p>
          </SectionAnimation>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

            {timeline.map((item, index) => (
              <SectionAnimation
                key={item.year}
                delay={index * 0.1}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <div className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}>
                  {/* Year badge */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10">
                    <span className="w-3 h-3 bg-primary-foreground rounded-full" />
                  </div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}>
                    <div className="bg-card rounded-xl p-6 shadow-sm">
                      <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionAnimation className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4"
            >
              <Target className="w-4 h-4" />
              Notre Mission
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4"
            >
              Construire l'avenir avec excellence
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Notre mission est de fournir des services de construction et de génie civil 
              de qualité supérieure, contribuant au développement du Cameroun tout en 
              respectant les normes internationales.
            </motion.p>
          </SectionAnimation>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <SectionAnimation key={value.title} delay={index * 0.15}>
                <motion.div 
                  className="bg-card rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow h-full group"
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-6"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="text-xl font-heading font-bold text-foreground mb-3"
                  >
                    {value.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="text-muted-foreground"
                  >
                    {value.description}
                  </motion.p>
                </motion.div>
              </SectionAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionAnimation className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Notre Équipe
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Une équipe passionnée et en croissance
            </h2>
            <p className="text-lg text-muted-foreground">
              Depuis notre création en 2016, notre équipe n'a cessé de s'agrandir, 
              réunissant des talents passionnés par le génie civil et la construction.
            </p>
          </SectionAnimation>

          <div className="grid md:grid-cols-2 gap-8">
            <SectionAnimation direction="left">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={equipe2}
                  alt="L'équipe Vision Design SARL"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-primary-foreground font-medium">
                    Notre équipe technique qualifiée
                  </p>
                </div>
              </div>
            </SectionAnimation>

            <SectionAnimation direction="right" delay={0.2}>
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={equipe3}
                  alt="L'équipe Vision Design SARL au complet"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-primary-foreground font-medium">
                    Une famille professionnelle unie
                  </p>
                </div>
              </div>
            </SectionAnimation>
          </div>

          <SectionAnimation delay={0.3} className="mt-12">
            <div className="bg-card rounded-2xl p-8 shadow-sm">
              <div className="grid md:grid-cols-3 gap-8 text-center mb-8">
                <div>
                  <span className="text-4xl font-heading font-black text-secondary">
                    <AnimatedCounter end={10} suffix="+" />
                  </span>
                  <p className="text-muted-foreground mt-1">Années d'expérience</p>
                </div>
                <div>
                  <span className="text-4xl font-heading font-black text-secondary">
                    <AnimatedCounter end={40} suffix="+" />
                  </span>
                  <p className="text-muted-foreground mt-1">Membres dans l'équipe</p>
                </div>
                <div>
                  <span className="text-4xl font-heading font-black text-secondary">
                    <AnimatedCounter end={6} />
                  </span>
                  <p className="text-muted-foreground mt-1">Corps de métiers</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
                Notre équipe rassemble des ingénieurs civils, des électriciens qualifiés, 
                des plombiers certifiés, des carreleurs experts, des maçons expérimentés 
                et des techniciens en énergie solaire. Chaque année, nous intégrons de 
                nouveaux talents pour répondre à la demande croissante et maintenir notre 
                niveau d'excellence. Cette croissance témoigne de la confiance que nos 
                clients nous accordent et de notre engagement à développer l'emploi local.
              </p>
            </div>
          </SectionAnimation>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SectionAnimation direction="left">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={fondateur1}
                  alt="M. DEFFO SADO Thomas Daquin"
                  className="w-full rounded-2xl shadow-lg"
                />
                <img
                  src={fondateur2}
                  alt="M. DEFFO SADO Thomas Daquin"
                  className="w-full rounded-2xl shadow-lg mt-8"
                />
              </div>
            </SectionAnimation>

            <SectionAnimation direction="right" delay={0.2}>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  <Users className="w-4 h-4" />
                  Fondateur & CEO
                </div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
                  M. DEFO SADO Thomas Daquin
                </h2>
                <p className="text-lg text-accent font-medium">
                  Chef d'Entreprise
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Entrepreneur passionné, M. DEFO SADO Thomas Daquin a fondé
                  Vision Design SARL en 2016 avec une vision claire : révolutionner le 
                  secteur de la construction au Cameroun en alliant excellence technique 
                  et innovation.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Fort de son expérience et de sa formation, il dirige une équipe de 
                  professionnels dévoués, supervisant personnellement chaque projet pour 
                  garantir la qualité et la satisfaction de nos clients.
                </p>
                <blockquote className="border-l-4 border-primary pl-4 italic text-foreground">
                  "Notre ambition est de construire des ouvrages qui traverseront les 
                  générations, témoignant de notre engagement envers l'excellence."
                </blockquote>
              </div>
            </SectionAnimation>
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* VisionBot Image */}
            <SectionAnimation direction="left">
              <div className="relative">
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
              </div>
            </SectionAnimation>

            {/* Text Content */}
            <SectionAnimation direction="right" delay={0.2}>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
                  <Bot className="w-4 h-4" />
                  Assistant Virtuel Intelligent
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground">
                  Rencontrez{" "}
                  <span className="text-secondary">VisionBot</span>
                </h2>
                <p className="text-lg text-primary-foreground/80 leading-relaxed">
                  VisionBot est notre assistant virtuel intelligent, conçu pour faciliter 
                  votre expérience sur notre site. Disponible 24h/24 et 7j/7, il répond 
                  à toutes vos questions et vous guide dans vos projets.
                </p>
                
                <div className="space-y-4">
                  {visionBotFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      className="flex items-start gap-4 bg-primary-foreground/5 rounded-xl p-4 backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary-foreground">{feature.title}</h4>
                        <p className="text-sm text-primary-foreground/70">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-sm text-primary-foreground/60 flex items-center gap-2 pt-2"
                >
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  Cliquez sur l'icône en bas à droite pour discuter avec VisionBot
                </motion.p>
              </div>
            </SectionAnimation>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <SectionAnimation className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Témoignages
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-lg text-muted-foreground">
              La satisfaction de nos clients est notre plus grande fierté.
            </p>
          </SectionAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <SectionAnimation key={testimonial.name} delay={index * 0.1}>
                <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-accent" />
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
              </SectionAnimation>
            ))}
          </div>
        </div>
      </section>

            {/* Location */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionAnimation className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" />
              Notre Localisation
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Visitez nos bureaux
            </h2>
            <p className="text-lg text-muted-foreground">
              Yaoundé, En face du Cimetière Omnisport
            </p>
          </SectionAnimation>

          <SectionAnimation>
            <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.904860737205!2d11.5444127!3d3.890156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bc5ea886a78e1%3A0x9593811e7b1f59d7!2sCimeti%C3%A8re%20Omnisport!5e0!3m2!1sfr!2scm!4v1742151345678!5m2!1sfr!2scm"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Vision Design SARL - En face du Cimetière Omnisport"
              />
            </div>
          </SectionAnimation>

          <div className="text-center mt-10">
            <Link to="/contact" className="btn-primary">
              Nous Contacter
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
