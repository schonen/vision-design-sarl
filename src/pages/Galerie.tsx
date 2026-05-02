import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, ZoomIn, HardHat, X, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize,
  ChevronLeft, ChevronRight
} from "lucide-react";
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

// Composant de lecture vidéo professionnel
const VideoPlayer = ({ src, onClose: _onClose }: { src: string; onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = parseFloat(e.target.value);
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      setVolume(isMuted ? 1 : 0);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setIsMuted(vol === 0);
    }
  };

  const toggleFullscreen = () => {
    const videoElement = videoRef.current;
    if (!document.fullscreenElement && videoElement) {
      videoElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-center">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        onClick={togglePlay}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-white text-xs font-mono">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-white/30 rounded-lg cursor-pointer accent-accent"
          />
          <span className="text-white text-xs font-mono">{formatTime(duration)}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button onClick={() => skip(-10)} className="text-white hover:text-accent transition">
              <SkipBack className="w-5 h-5" />
            </button>
            <button onClick={togglePlay} className="bg-accent hover:bg-accent/80 rounded-full p-2 transition shadow-lg">
              {isPlaying ? <div className="w-5 h-5 bg-white" style={{ clipPath: "polygon(0% 0%, 0% 100%, 100% 50%)" }} /> : <Play className="w-5 h-5 text-white ml-0.5" />}
            </button>
            <button onClick={() => skip(10)} className="text-white hover:text-accent transition">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-white hover:text-accent transition">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white/30 rounded-lg cursor-pointer accent-accent"
              />
            </div>
            <button onClick={toggleFullscreen} className="text-white hover:text-accent transition">
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal unifié pour images et vidéos avec navigation
const MediaModal = ({
  medias,
  initialIndex,
  onClose
}: {
  medias: Media[];
  initialIndex: number;
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentMedia = medias[currentIndex];
  const total = medias.length;

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrev, goNext, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Conteneur du média */}
      <div className="relative max-w-6xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {currentMedia.type === 'image' ? (
          <img
            src={currentMedia.file_url}
            alt={currentMedia.title}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
        ) : (
          <VideoPlayer src={currentMedia.file_url} onClose={() => {}} />
        )}

        {/* Flèches de navigation */}
        {total > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white transition"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white transition"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}

        {/* Titre et compteur */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
          {currentMedia.title} ({currentIndex + 1} / {total})
        </div>

        {/* Bouton fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
};

export default function Galerie() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 🔽 AJOUT : remonter en haut de page à chaque chargement de la galerie
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

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
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => openModal(idx)}
                >
                  {media.type === "image" ? (
                    <img
                      src={media.file_url}
                      alt={media.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="relative w-full h-64 bg-black/20">
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
                    <p className="text-white font-semibold text-lg line-clamp-2">{media.title}</p>
                    {media.description && <p className="text-white/80 text-sm line-clamp-1">{media.description}</p>}
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

      {/* Modal unifié */}
      <AnimatePresence>
        {modalOpen && medias.length > 0 && (
          <MediaModal
            medias={medias}
            initialIndex={selectedIndex}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}