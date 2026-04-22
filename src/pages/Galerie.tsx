import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, ZoomIn, HardHat, X, SkipBack, SkipForward } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";

// Import des images pour le fond de la section hero
import bg1 from "@/assets/galerie/chantier2.jpg";
import bg2 from "@/assets/galerie/chantier6.jpg";
import bg3 from "@/assets/galerie/chantier10.jpg";
import bg4 from "@/assets/galerie/chantier31.jpeg";

interface Media {
  id: string;
  title: string;
  description: string | null;
  type: string;
  file_url: string;
  thumbnail_url?: string | null;
  category: string | null;
  created_at: string | null;
}

const VideoPlayer = ({ src, onClose }: { src: string; onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
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
        <video ref={videoRef} src={src} className="w-full max-h-[80vh] object-contain" autoPlay />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-center gap-6">
          <button onClick={() => skip(-10)} className="bg-white/20 hover:bg-white/40 rounded-full p-3 transition text-white">
            <SkipBack className="w-6 h-6" />
          </button>
          <button onClick={togglePlay} className="bg-accent hover:bg-accent/80 rounded-full p-4 transition shadow-lg text-white">
            {isPlaying ? <div className="w-6 h-6 bg-white" style={{ clipPath: "polygon(0% 0%, 0% 100%, 100% 50%)" }} /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>
          <button onClick={() => skip(10)} className="bg-white/20 hover:bg-white/40 rounded-full p-3 transition text-white">
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 rounded-full p-2 transition hover:bg-black/70 text-white">
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default function Galerie() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    const fetchMedias = async () => {
      const { data, error } = await supabase
        .from("galerie_medias")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) console.error(error);
      else setMedias(data || []);
      setLoading(false);
    };
    fetchMedias();
  }, []);

  return (
    <>
      <Helmet>
        <title>Galerie – Nos chantiers | Vision Design SARL</title>
        <meta name="description" content="Découvrez en images et vidéos nos chantiers, nos équipes et l’évolution de nos réalisations en génie civil et construction au Cameroun." />
        <link rel="canonical" href="https://www.visiondesignsarl.com/galerie" />
        <meta property="og:title" content="Galerie – Vision Design SARL" />
        <meta property="og:description" content="Plongez dans l’univers de nos chantiers." />
        <meta property="og:image" content="https://www.visiondesignsarl.com/logo-new.png" />
      </Helmet>

      {/* Hero avec images de fond en grille */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Fond avec grille d'images (inspiré de Realisations) */}
        <div className="absolute inset-0 bg-gradient-hero z-0" />
        <div className="absolute inset-0 opacity-20 z-0">
          <div className="grid grid-cols-4 gap-2 h-full p-2">
            {[bg1, bg2, bg3, bg4].map((img, i) => (
              <div key={i} className="overflow-hidden rounded-lg">
                <img src={img} alt="Chantier" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 container-custom text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
              <HardHat className="w-4 h-4" />
              <span className="text-sm font-medium">Nos chantiers en images</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-6">Galerie</h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Découvrez nos réalisations, nos équipes en action et l’évolution de nos chantiers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grille des médias */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : medias.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Aucun média pour le moment. Revenez bientôt !</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {medias.map((media, idx) => (
                <motion.div
                  key={media.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  onClick={() =>
                    media.type === "image"
                      ? setLightboxImage({ src: media.file_url, title: media.title })
                      : setSelectedVideo(media.file_url)
                  }
                >
                  {media.type === "image" ? (
                    <img
                      src={media.file_url}
                      alt={media.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="relative w-full h-64 bg-black/10 flex items-center justify-center">
                      <video
                        src={media.file_url}
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
                    {media.description && <p className="text-white/80 text-sm">{media.description}</p>}
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
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox pour les images */}
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <p className="absolute bottom-4 left-4 text-white bg-black/50 px-3 py-1 rounded">
              {lightboxImage.title}
            </p>
          </div>
        </motion.div>
      )}

      {/* Lecteur vidéo modal */}
      {selectedVideo && <VideoPlayer src={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </>
  );
}