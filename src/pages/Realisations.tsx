import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, ArrowRight,  } from "lucide-react";
import { Link } from "react-router-dom";
import SectionAnimation from "@/components/ui/section-animation";
import { Helmet } from "react-helmet-async"; 


// Import images
import immeubleR3Omnisport from "@/assets/projects/immeuble-r3-omnisport.png";
import immeubleOmnisport2 from "@/assets/projects/immeuble-omnisport-2.png";
import electricalSystem from "@/assets/projects/electrical-system.jpeg";
import solarInstallation from "@/assets/projects/solar-installation.jpg";
import villaLuxe from "@/assets/projects/villa-luxe.png";
import boukarouYaounde from "@/assets/projects/boukarou-yaounde.jpeg";
import chantierMican from "@/assets/projects/chantier-mican.jpeg";
import maisonEbebda from "@/assets/projects/maison-ebebda.jpeg";
import carrelageTerrasseNkolmesseng from "@/assets/projects/carrelage-terrasse-nklomesseng.jpeg";
import forageOmnisport from "@/assets/projects/forage-omnisport.jpeg";

export const projects = [
  {
    id: "boukarou-yaounde",
    title: "Boukarou Moderne à Odza",
    location: "Yaoundé, Odza Borne 10",
    category: "Bâtiment & Style",
    image: boukarouYaounde,
    description: "Construction d'un boukarou moderne de style contemporain avec finitions haut de gamme, éclairage LED intégré et garage spacieux. Ce projet allie tradition architecturale camerounaise et design moderne.",
    specs: ["Type: Boukarou", "Finitions: Haut de gamme", "Éclairage: LED intégré", "Localisation: Yaoundé, Odza Borne 10"],
  },
  {
    id: "maison-ngock-saa",
    title: "Résidence à Ngoksa",
    location: "Ngoksa, Commune d'Ebebda",
    category: "Bâtiment & Style",
    image: maisonEbebda,
    description: "Construction d'une résidence familiale de plain-pied avec toiture en tuiles noires, véranda à colonnes et aménagement paysager complet. Un cadre de vie élégant et confortable dans la commune d'Ebebda.",
    specs: ["Type: Résidence familiale", "Toiture: Tuiles noires", "Aménagement: Jardin paysager", "Localisation: Ngoksa, Commune d'Ebebda"],
  },
  {
    id: "villa-mikan",
    title: "Villa en Construction à Mikan",
    location: "Yaoundé, Mikan",
    category: "Génie Civil",
    image: chantierMican,
    description: "Construction d'une villa spacieuse avec toiture en tôles vertes, véranda à colonnes et jardins aménagés. Projet en cours de finition avec un potentiel architectural remarquable dans le quartier Mican de Yaoundé.",
    specs: ["Type: Villa", "Toiture: Tôles vertes", "Style: Colonial moderne", "Localisation: Yaoundé, Mican"],
  },
  {
    id: "carrelage-nkolmesseng",
    title: "Pose Carreaux Terrasse de Luxe",
    location: "Yaoundé, Nkolmesseng",
    category: "Carrelage",
    image: carrelageTerrasseNkolmesseng,
    description: "Pose de carrelage marbre avec bordures décoratives en noir et doré sur une terrasse de luxe. Finitions impeccables avec colonnes et balustrades en fer forgé.",
    specs: ["Type: Carrelage terrasse", "Matériau: Marbre", "Finitions: Bordures dorées", "Localisation: Yaoundé, Nkolmesseng"],
  },
  {
    id: "forage-omnisport",
    title: "Forage Automatique",
    location: "Yaoundé, Omnisport",
    category: "Plomberie Sanitaire",
    image: forageOmnisport,
    description: "Réalisation d'un forage automatique avec pompe immergée pour l'approvisionnement en eau potable. Installation complète et fonctionnelle pour une autonomie en eau.",
    specs: ["Type: Forage automatique", "Équipement: Pompe immergée", "Usage: Eau potable", "Localisation: Yaoundé, Omnisport"],
  },
  {
    id: "immeuble-r3-omnisport",
    title: "Immeuble R+3 avec Sous-sol",
    location: "Yaoundé, Omnisport",
    category: "Génie Civil",
    image: immeubleR3Omnisport,
    description: "Construction d'un immeuble type R+3 avec sous-sol, exécution complète par Vision Design SARL. Un projet ambitieux mêlant fonctionnalité et esthétique urbaine.",
    specs: ["Type: R+3 avec sous-sol", "Exécution: Vision Design", "Localisation: Yaoundé, Omnisport"],
  },
  {
    id: "immeuble-omnisport",
    title: "Immeuble Résidentiel Omnisport",
    location: "Yaoundé, Omnisport",
    category: "Bâtiment & Style",
    image: immeubleOmnisport2,
    description: "Construction d'un immeuble résidentiel moderne à Yaoundé Omnisport avec des appartements spacieux et des espaces communs bien aménagés.",
    specs: ["Type: Immeuble résidentiel", "Exécution: Vision Design", "Localisation: Yaoundé, Omnisport"],
  },
  {
    id: "installation-electrique-bamendjou",
    title: "Installation Électrique avec Stockage",
    location: "Bafoussam, Bamendjou",
    category: "Électricité",
    image: electricalSystem,
    description: "Installation électrique avec système de stockage sur batterie, solution complète et autonome pour une indépendance énergétique totale.",
    specs: ["Type: Installation électrique + Batterie", "Autonomie: Complète", "Localisation: Bafoussam, Bamendjou"],
  },
  {
    id: "panneaux-solaires-bamendjou",
    title: "Panneaux Solaires Résidentiels",
    location: "Bafoussam, Bamendjou",
    category: "Prestations Diverses",
    image: solarInstallation,
    description: "Installation de panneaux solaires pour une résidence familiale avec optimisation énergétique et réduction significative des coûts d'électricité.",
    specs: ["Type: Résidentiel", "Optimisation: Énergétique", "Localisation: Bafoussam, Bamendjou"],
  },
  {
    id: "villa-versailles-bamendjou",
    title: "Villa R+1 Style Château de Versailles",
    location: "Bafoussam, Bamendjou",
    category: "Bâtiment & Style",
    image: villaLuxe,
    description: "Construction d'une villa de luxe R+1 de style château de Versailles avec finitions haut de gamme, ornements classiques et aménagements intérieurs somptueux.",
    specs: ["Type: R+1 Luxe", "Style: Château de Versailles", "Exécution: Vision Design", "Localisation: Bafoussam, Bamendjou"],
  },
];

const categories = [
  "Tous",
  "Bâtiment & Style",
  "Génie Civil",
  "Carrelage",
  "Plomberie Sanitaire",
  "Électricité",
  "Prestations Diverses",
];

export default function Realisations() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProjects = activeCategory === "Tous"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <>

      <Helmet>
        <title>Nos Réalisations – Projets de construction et génie civil | Vision Design SARL</title>
        <meta name="description" content="Découvrez nos réalisations : villas, immeubles, installations électriques, plomberie, carrelage, solaire – plus de 20 projets au Cameroun." />
        <meta name="keywords" content="réalisations construction Yaoundé, projets génie civil Cameroun, villa luxe, immeuble R+3, forage automatique" />
        <link rel="canonical" href="https://www.visiondesignsarl.com/realisations" />
        <meta property="og:title" content="Nos Réalisations – Vision Design SARL" />
        <meta property="og:description" content="Des projets concrets qui témoignent de notre savoir-faire." />
        <meta property="og:image" content="https://www.visiondesignsarl.com/logo-new.png" />
        <meta property="og:url" content="https://www.visiondesignsarl.com/realisations" />
      </Helmet>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-4 gap-2 h-full p-2">
            {[immeubleR3Omnisport, boukarouYaounde, carrelageTerrasseNkolmesseng, villaLuxe].map((img, i) => (
              <div key={i} className="overflow-hidden rounded-lg">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="relative container-custom text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">Portfolio</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-6">
              Nos Réalisations
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Découvrez nos projets les plus emblématiques, témoins de notre 
              savoir-faire et de notre engagement envers l'excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <SectionAnimation key={project.id} delay={index * 0.05}>
                <Link
                  to={`/realisations/${project.id}`}
                  className="project-card aspect-[4/3] cursor-pointer group relative overflow-hidden rounded-xl block"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="project-overlay">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/80 text-primary-foreground mb-2 inline-block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-primary-foreground">
                      {project.title}
                    </h3>
                    <p className="text-primary-foreground/70 text-sm">
                      📍 {project.location}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-accent font-medium">
                      En savoir plus <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </SectionAnimation>
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Aucun projet dans cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
