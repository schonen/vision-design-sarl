import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight as ArrowRightIcon, MapPin, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { projects } from "./Realisations.data";

export default function RealisationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const index = projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [id]);

  const project = projects[currentIndex];
  const totalProjects = projects.length;

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + totalProjects) % totalProjects;
    navigate(`/realisations/${projects[prevIndex].id}`);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % totalProjects;
    navigate(`/realisations/${projects[nextIndex].id}`);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      else if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-heading font-bold text-foreground">Projet introuvable</h1>
          <Link to="/realisations" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Retour aux réalisations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} – Réalisation Vision Design SARL | Cameroun</title>
        <meta name="description" content={project.description.substring(0, 150)} />
        <meta name="keywords" content={`${project.title}, ${project.category}, construction ${project.location}, réalisation Vision Design`} />
        <link rel="canonical" href={`https://www.visiondesignsarl.com/realisations/${project.id}`} />
        <meta property="og:title" content={`${project.title} – Réalisation Vision Design SARL`} />
        <meta property="og:description" content={project.description.substring(0, 150)} />
        <meta property="og:image" content={project.image} />
        <meta property="og:url" content={`https://www.visiondesignsarl.com/realisations/${project.id}`} />
      </Helmet>

      {/* Hero Image avec navigation */}
      <section className="relative pt-24 bg-muted">
        <div className="container-custom py-8">
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            <div className="w-full bg-background rounded-2xl shadow-lg overflow-hidden">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={`absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                    project.id === "forage-omnisport" ? "object-contain" : "object-cover"
                  }`}
                />
              </div>
            </div>

            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent hover:text-accent-foreground z-10"
              aria-label="Projet précédent"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent hover:text-accent-foreground z-10"
              aria-label="Projet suivant"
            >
              <ArrowRightIcon className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <span className="text-sm font-medium text-foreground">
                {currentIndex + 1} / {totalProjects}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <Link to="/realisations" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Retour aux réalisations
              </Link>
              <div className="flex items-center gap-2">
                <button onClick={goToPrevious} className="px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Précédent
                </button>
                <button onClick={goToNext} className="px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2">
                  Suivant <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {project.category}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              {project.title}
            </h1>

            <div className="flex items-center gap-2 text-muted-foreground mb-8">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-lg">{project.location}</span>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {project.description}
            </p>

            <div className="mb-10">
              <h2 className="text-xl font-heading font-bold text-foreground mb-4">Caractéristiques du projet</h2>
              <ul className="space-y-3">
                {project.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-foreground">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-muted rounded-2xl p-8 text-center space-y-4">
              <h3 className="text-2xl font-heading font-bold text-foreground">
                Un projet similaire vous intéresse ?
              </h3>
              <p className="text-muted-foreground">
                Contactez Vision Design SARL pour un devis personnalisé.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Demander une Consultation <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <a href="https://wa.me/237677571699" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a href="tel:+237695766022" className="btn-outline inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Appeler
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}