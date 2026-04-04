// src/pages/NotreUnivers.tsx
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, ZoomIn, HardHat, Ruler, Wrench, Zap, Droplets, Flame, SkipBack, SkipForward, X } from "lucide-react";
import SectionAnimation from "@/components/ui/section-animation";

// ========== 1. IMPORTS DES 35 IMAGES ==========
import chantier1 from "@/assets/univers/chantier1.jpg";
import chantier2 from "@/assets/univers/chantier2.jpg";
import chantier3 from "@/assets/univers/chantier3.jpg";
import chantier4 from "@/assets/univers/chantier4.jpg";
import chantier5 from "@/assets/univers/chantier5.jpg";
import chantier6 from "@/assets/univers/chantier6.jpg";
import chantier7 from "@/assets/univers/chantier7.jpg";
import chantier8 from "@/assets/univers/chantier8.jpg";
import chantier9 from "@/assets/univers/chantier9.jpg";
import chantier10 from "@/assets/univers/chantier10.jpg";
import chantier11 from "@/assets/univers/chantier11.jpg";
import chantier12 from "@/assets/univers/chantier12.jpeg";
import chantier13 from "@/assets/univers/chantier13.jpeg";
import chantier14 from "@/assets/univers/chantier14.jpeg";
import chantier15 from "@/assets/univers/chantier15.jpeg";
import chantier16 from "@/assets/univers/chantier16.jpeg";
import chantier17 from "@/assets/univers/chantier17.jpeg";
import chantier18 from "@/assets/univers/chantier18.jpeg";
import chantier19 from "@/assets/univers/chantier19.jpeg";
import chantier20 from "@/assets/univers/chantier20.jpeg";
import chantier21 from "@/assets/univers/chantier21.jpeg";
import chantier22 from "@/assets/univers/chantier22.jpeg";
import chantier23 from "@/assets/univers/chantier23.jpeg";
import chantier24 from "@/assets/univers/chantier24.jpeg";
import chantier25 from "@/assets/univers/chantier25.jpeg";
import chantier26 from "@/assets/univers/chantier26.jpeg";
import chantier27 from "@/assets/univers/chantier27.jpeg";
import chantier29 from "@/assets/univers/chantier29.jpeg";
import chantier30 from "@/assets/univers/chantier30.jpeg";
import chantier31 from "@/assets/univers/chantier31.jpeg";
import chantier32 from "@/assets/univers/chantier32.jpeg";
import chantier33 from "@/assets/univers/chantier33.jpeg";
import chantier34 from "@/assets/univers/chantier34.jpeg";
import chantier35 from "@/assets/univers/chantier35.jpeg";

// ========== 2. VIDÉOS (5) ==========
import video1 from "@/assets/univers/video1.mp4";
import video2 from "@/assets/univers/video2.mp4";
import video3 from "@/assets/univers/video3.mp4";
import video4 from "@/assets/univers/video4.mp4";
import video5 from "@/assets/univers/video5.mp4";

// ========== 3. IMAGE DE FOND POUR LE HERO ==========
import immeubleVds from "@/assets/hero/immeuble-vds.png";

// ========== 4. REGROUPEMENT DES MÉDIAS ==========
const medias = [
  // 35 images (mêmes titres que précédemment)
  { type: "image", src: chantier1, title: "Maçonnerie – Béton armé" },
  { type: "image", src: chantier2, title: "Installation hourdis" },
  { type: "image", src: chantier3, title: "Pose des hourdis" },
  { type: "image", src: chantier4, title: "Solivage" },
  { type: "image", src: chantier5, title: "Coulage de dalle" },
  { type: "image", src: chantier6, title: "L'étape cruciale du relevé topographique" },
  { type: "image", src: chantier7, title: "Solivage" },
  { type: "image", src: chantier8, title: "Construction maison en étage" },
  { type: "image", src: chantier9, title: "Résidence en construction" },
  { type: "image", src: chantier10, title: "Contrôle de conformité des agrégats à la livraison" },
  { type: "image", src: chantier11, title: "Local technique- panneaux solaires" },
  { type: "image", src: chantier12, title: "Maçonnerie – Élévation" },
  { type: "image", src: chantier13, title: "Élévation" },
  { type: "image", src: chantier14, title: "Élévation des murs " },
  { type: "image", src: chantier15, title: "Plombage poteaux" },
  { type: "image", src: chantier16, title: "Équipe de soudeurs" },
  { type: "image", src: chantier17, title: "Crépissage" },
  { type: "image", src: chantier18, title: "Chantier – Mfou" },
  { type: "image", src: chantier19, title: "Élévation mur porteur" },
  { type: "image", src: chantier20, title: "Réunion d’équipe" },
  { type: "image", src: chantier21, title: "Coffrage" },
  { type: "image", src: chantier22, title: "Le déchargement précis du sable fin" },
  { type: "image", src: chantier23, title: "Vibration et lissage mécanique des dalles béton" },
  { type: "image", src: chantier24, title: "Opération de levé topographique et implantation des axes" },
  { type: "image", src: chantier25, title: "Installation moteur forage" },
  { type: "image", src: chantier26, title: "Fondation radier" },
  { type: "image", src: chantier27, title: "Suivi technique de l'avancement des lots techniques et gros œuvre." },
  { type: "image", src: chantier29, title: "Fondation superficielle par dalle" },
  { type: "image", src: chantier30, title: "Démolition" },
  { type: "image", src: chantier31, title: "Montage des murs de structure" },
  { type: "image", src: chantier32, title: "Coordination des équipes d'exécution sur chantier de gros œuvre" },
  { type: "image", src: chantier33, title: "Pierre naturelle" },
  { type: "image", src: chantier34, title: "Ferraillage fondation radier" },
  { type: "image", src: chantier35, title: "Notre équipe en action" },
  // 5 vidéos
  { type: "video", src: video1, title: "Coulée de béton – Villa R+1" },
  { type: "video", src: video2, title: "Supervision des compagnons maçons en phase d'élévation" },
  { type: "video", src: video3, title: "Respect des procédures QHSE lors des travaux de manutention" },
  { type: "video", src: video4, title: "Visite des bureaux au siège de l'entreprise" },
  { type: "video", src: video5, title: "Avancement chantier – Immeuble" },
];

// Composant lecteur vidéo personnalisé (identique)
const VideoPlayer = ({ src, onClose }: { src: string; onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) videoRef.current.currentTime += seconds;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <video
          ref={videoRef}
          src={src}
          className="w-full max-h-[80vh] object-contain"
          controls={false}
          autoPlay
        />
        {/* Contrôles personnalisés */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-center gap-6">
          <button onClick={() => skip(-10)} className="bg-white/20 hover:bg-white/40 rounded-full p-3 transition" title="Reculer de 10 secondes">
            <SkipBack className="w-6 h-6 text-white" />
          </button>
          <button onClick={togglePlay} className="bg-accent hover:bg-accent/80 rounded-full p-4 transition shadow-lg">
            {isPlaying ? <div className="w-6 h-6 bg-white" style={{ clipPath: "polygon(0% 0%, 0% 100%, 100% 50%)" }} /> : <Play className="w-6 h-6 text-white ml-0.5" />}
          </button>
          <button onClick={() => skip(10)} className="bg-white/20 hover:bg-white/40 rounded-full p-3 transition" title="Avancer de 10 secondes">
            <SkipForward className="w-6 h-6 text-white" />
          </button>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition">
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default function NotreUnivers() {
  const [lightboxMedia, setLightboxMedia] = useState<{ src: string; title: string } | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <>
      {/* Hero Section avec image de fond immeubleVds et overlay */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={immeubleVds}
            alt="Vision Design - Bâtiment"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        </div>
        <div className="relative container-custom text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
              <HardHat className="w-4 h-4" />
              <span className="text-sm font-medium">Savoir-faire & ambiance chantier</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-6">
              Notre Univers
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Découvrez l’excellence de nos équipes, du génie civil aux finitions, à travers nos chantiers en images et vidéos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section d’introduction (avant la galerie) */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-heading font-black text-primary">35+</div>
              <p className="text-muted-foreground mt-2">Projets et chantiers documentés</p>
            </div>
            <div>
              <div className="text-4xl font-heading font-black text-primary">5</div>
              <p className="text-muted-foreground mt-2">Vidéos exclusives</p>
            </div>
            <div>
              <div className="text-4xl font-heading font-black text-primary">6</div>
              <p className="text-muted-foreground mt-2">Corps de métier représentés</p>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {medias.map((media, idx) => (
              <SectionAnimation key={idx} delay={idx * 0.005}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => {
                    if (media.type === "image") {
                      setLightboxMedia({ src: media.src, title: media.title });
                    } else {
                      setSelectedVideo(media.src);
                    }
                  }}
                >
                  {media.type === "image" ? (
                    <img
                      src={media.src}
                      alt={media.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="relative w-full h-64 bg-black/10 flex items-center justify-center">
                      <video
                        src={media.src}
                        className="w-full h-full object-cover"
                        preload="metadata"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-accent/80 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-semibold text-lg">{media.title}</p>
                    <div className="mt-2 flex gap-2">
                      {media.type === "image" ? (
                        <ZoomIn className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white" />
                      )}
                      <span className="text-white text-xs">Cliquez pour agrandir</span>
                    </div>
                  </div>
                </motion.div>
              </SectionAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox image */}
      {lightboxMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxMedia(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={lightboxMedia.src}
              alt={lightboxMedia.title}
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
              onClick={() => setLightboxMedia(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <p className="absolute bottom-4 left-4 text-white bg-black/50 px-3 py-1 rounded">
              {lightboxMedia.title}
            </p>
          </div>
        </div>
      )}

      {/* Lecteur vidéo personnalisé */}
      {selectedVideo && <VideoPlayer src={selectedVideo} onClose={() => setSelectedVideo(null)} />}

      {/* Section valeurs métier */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <SectionAnimation>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Des métiers d’excellence
              </h2>
              <p className="text-muted-foreground">
                Chaque geste, chaque matériau, chaque finition raconte notre passion pour le génie civil et le bâtiment.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
              {[
                { icon: Ruler, label: "Maçonnerie" },
                { icon: Flame, label: "Soudure" },
                { icon: Zap, label: "Électricité" },
                { icon: Droplets, label: "Plomberie" },
                { icon: Wrench, label: "Carrelage & Finitions" },
              ].map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card rounded-xl p-4 shadow-sm"
                >
                  <skill.icon className="w-10 h-10 text-primary mx-auto mb-2" />
                  <p className="font-medium text-foreground">{skill.label}</p>
                </motion.div>
              ))}
            </div>
          </SectionAnimation>
        </div>
      </section>
    </>
  );
}