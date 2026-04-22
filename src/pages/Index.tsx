import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Building2, Wrench, Zap, Grid3X3, HardHat, Settings, Phone,
  Award, Users, Clock, Shield, Star, Quote, Bot, Calculator, HelpCircle,
  Sparkles, Facebook, Play, Pause, SkipBack, SkipForward, Maximize, Minimize,
  ChevronLeft, ChevronRight, Volume2, VolumeX
} from "lucide-react";
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
import { Helmet } from "react-helmet-async";

// Import project images
import villaLuxe from "@/assets/projects/villa-luxe.png";
import solarInstallation from "@/assets/projects/solar-installation.jpg";
import immeubleR3Omnisport from "@/assets/projects/immeuble-r3-omnisport.png";
import immeubleOmnisport2 from "@/assets/projects/immeuble-omnisport-2.png";
import electricalSystem from "@/assets/projects/electrical-system.jpeg";
import equipe from "@/assets/team/equipe-1.jpeg";
import immeubleVds from "@/assets/hero/immeuble-vds.png";

// Vidéos de présentation
import introductionVideo from "@/assets/accueil/Introduction VDS.mp4";
import presentationVideo from "@/assets/accueil/Présentation VDS.mp4";
import partenaireVideo from "@/assets/partenaires/Partenaire VDS.mp4";

// Import des images partenaires
import champion1 from "@/assets/partenaires/champion1.jpeg";
import champion2 from "@/assets/partenaires/champion2.jpeg";
import champion3 from "@/assets/partenaires/champion3.jpeg";

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
    name: "Mr Claude MBARGA",
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

// ==================== COMPOSANT VIDEOPLAYLIST AMÉLIORÉ ====================
const VideoPlaylist = ({ videos }: { videos: { src: string; title: string; poster?: string }[] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const currentVideo = videos[currentIndex];

  const togglePlayPause = () => {
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const goToVideo = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const handleVideoEnd = () => {
    if (currentIndex + 1 < videos.length) {
      goToVideo(currentIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    const handleEnded = handleVideoEnd;

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [currentIndex]);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [currentIndex]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Lecteur vidéo principal */}
      <div className="flex-1">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black group">
          <video
            ref={videoRef}
            src={currentVideo.src}
            className="w-full h-auto"
            poster={currentVideo.poster || ""}
            onClick={togglePlayPause}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-white text-xs font-mono">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
              />
              <span className="text-white text-xs font-mono">{formatTime(duration)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => skip(-10)} className="text-white hover:text-accent transition p-2" title="Reculer de 10 secondes">
                  <SkipBack className="w-5 h-5" />
                </button>
                <button onClick={togglePlayPause} className="bg-accent hover:bg-accent/80 rounded-full p-3 transition shadow-lg text-white">
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
                <button onClick={() => skip(10)} className="text-white hover:text-accent transition p-2" title="Avancer de 10 secondes">
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-4">
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
                    className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
                  />
                </div>
                <button onClick={toggleFullscreen} className="text-white hover:text-accent transition" title="Plein écran">
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-xl font-heading font-semibold text-foreground">{currentVideo.title}</h3>
          <p className="text-sm text-muted-foreground">Vidéo {currentIndex + 1} sur {videos.length}</p>
        </div>
      </div>

      {/* Liste verticale des vidéos */}
      <div className="w-full lg:w-80 space-y-3">
        <h4 className="font-heading font-semibold text-foreground mb-2">À regarder ensuite</h4>
        {videos.map((video, idx) => (
          <button
            key={idx}
            onClick={() => goToVideo(idx)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
              idx === currentIndex
                ? "bg-primary/20 text-primary border-l-4 border-primary"
                : "bg-card hover:bg-muted text-foreground"
            }`}
          >
            <div className="relative w-16 h-12 rounded-md overflow-hidden bg-black/20 flex-shrink-0">
              {video.poster ? (
                <img src={video.poster} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Play className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
              {idx === currentIndex && isPlaying && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-accent animate-pulse" />
                </div>
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-sm line-clamp-2">{video.title}</p>
              <p className="text-xs text-muted-foreground">
                {idx === currentIndex ? (isPlaying ? "En cours" : "En pause") : "À voir"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ==================== COMPOSANT VIDEOPLAYER SIMPLE AMÉLIORÉ ====================
const VideoPlayer = ({ src, title, poster }: { src: string; title?: string; poster?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlayPause = () => {
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
    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black group">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto"
        poster={poster || ""}
        onClick={togglePlayPause}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-white text-xs font-mono">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
          />
          <span className="text-white text-xs font-mono">{formatTime(duration)}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => skip(-10)} className="text-white hover:text-accent transition p-2" title="Reculer de 10 secondes">
              <SkipBack className="w-5 h-5" />
            </button>
            <button onClick={togglePlayPause} className="bg-accent hover:bg-accent/80 rounded-full p-3 transition shadow-lg text-white">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            <button onClick={() => skip(10)} className="text-white hover:text-accent transition p-2" title="Avancer de 10 secondes">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-4">
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
                className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
              />
            </div>
            <button onClick={toggleFullscreen} className="text-white hover:text-accent transition" title="Plein écran">
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      {title && (
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5">
          <p className="text-white text-sm font-medium">{title}</p>
        </div>
      )}
    </div>
  );
};

// Composant ImageCarousel pour les partenaires
const ImageCarousel = ({ images }: { images: { src: string; alt: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = window.setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, currentIndex]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, idx) => (
            <div key={idx} className="w-full flex-shrink-0">
              <img src={image.src} alt={image.alt} className="w-full h-96 object-contain bg-muted/20" />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => { setIsAutoPlaying(false); prevSlide(); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => { setIsAutoPlaying(false); nextSlide(); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { setIsAutoPlaying(false); goToSlide(idx); }}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-primary w-4" : "bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Index() {
  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const phoneNumber = "237677571699";
    const message = encodeURIComponent(
      "Bonjour Vision Design SARL,\n\nJe vous contacte suite à la visite de votre site web. Je souhaiterais obtenir plus d'informations sur vos services de construction et de génie civil.\n\nMerci de bien vouloir me recontacter."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const playlistVideos = [
  { src: presentationVideo, title: "Présentation de l'entreprise" },
  { src: introductionVideo, title: "Introduction Vision Design" },
];

  const partnerImages = [
    { src: champion1, alt: "Partenaire FECALUTTES - Champion 1" },
    { src: champion2, alt: "Partenaire FECALUTTES - Champion 2" },
    { src: champion3, alt: "Partenaire FECALUTTES - Champion 3" },
  ];

  return (
    <>
      <Helmet>
        <title>Vision Design SARL | Génie civil & Construction à Yaoundé, Cameroun</title>
        <meta name="description" content="Vision Design SARL : expert en génie civil, construction de villas, immeubles, électricité, plomberie, carrelage et installations solaires. Devis gratuit – 10 ans d'expérience." />
        <meta name="keywords" content="génie civil Cameroun, construction Yaoundé, bâtiment, entreprise construction, Vision Design SARL" />
        <link rel="canonical" href="https://www.visiondesignsarl.com/" />
        <meta property="og:title" content="Vision Design SARL – Leader du génie civil au Cameroun" />
        <meta property="og:description" content="Construction, rénovation, électricité, plomberie, solaire – votre partenaire de confiance." />
        <meta property="og:image" content="https://www.visiondesignsarl.com/logo-new.png" />
        <meta property="og:url" content="https://www.visiondesignsarl.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Vision Design SARL",
            "url": "https://www.visiondesignsarl.com",
            "logo": "https://www.visiondesignsarl.com/logo-new.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+237695766022",
              "contactType": "customer service",
              "availableLanguage": "French"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Omnisport, avant Matrix Telecoms",
              "addressLocality": "Yaoundé",
              "addressCountry": "CM"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section - inchangée */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
              VDS - L'avenir du <span className="text-secondary">génie civil</span>
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
              <Link to="/contact" className="btn-hero-primary">Demander une Consultation</Link>
              <Link to="/realisations" className="btn-hero-secondary">Voir Nos Réalisations</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Presentation Section avec playlist améliorée */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="section-padding bg-background"
      >
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
              Découvrez Vision Design en vidéo
            </h2>
            <p className="text-muted-foreground mt-2">Notre savoir-faire et notre engagement en images</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <VideoPlaylist videos={playlistVideos} />
          </div>
        </div>
      </motion.section>

      {/* Team & Introduction - inchangée */}
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
                <img src={equipe} alt="L'équipe Vision Design SARL" className="w-full rounded-2xl shadow-lg" />
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
                <Building2 className="w-4 h-4" /> Notre Histoire
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
                Bâtir l'excellence depuis <span className="text-primary">2016</span>
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
                En savoir plus <ArrowRight className="w-4 h-4" />
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

      {/* VisionBot Section - inchangée */}
      <section className="section-padding bg-gradient-to-br from-primary-dark via-primary to-primary-dark relative overflow-hidden">
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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
                <Bot className="w-4 h-4" /> Assistant Virtuel Intelligent
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground">
                Découvrez <span className="text-secondary">VisionBot</span>
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
                <img src={visionBotImage} alt="VisionBot" className="w-full max-w-md mx-auto drop-shadow-2xl" />
              </motion.div>
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

      {/* Services Section - inchangée */}
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
              <Settings className="w-4 h-4" /> Nos Services
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
                <Link to={`/services#${service.id}`} className="service-card group block h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110">
                    <service.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100">
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Carousel - inchangé */}
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
              <Building2 className="w-4 h-4" /> Nos Réalisations
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
              opts={{ align: "start", loop: true }}
              plugins={[Autoplay({ delay: 5000 })]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {projects.map((project, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div className="project-card aspect-[4/3]" whileHover={{ scale: 1.02 }}>
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      <div className="project-overlay">
                        <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-xl font-heading font-bold text-primary-foreground">{project.title}</h3>
                        <p className="text-primary-foreground/70 text-sm">{project.location}</p>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4 bg-card border-border hover:bg-muted" />
              <CarouselNext className="hidden md:flex -right-4 bg-card border-border hover:bg-muted" />
            </Carousel>
          </motion.div>
          <motion.div className="text-center mt-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link to="/realisations" className="btn-outline">Voir tous les projets <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us - inchangé */}
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
              <Award className="w-4 h-4" /> Pourquoi Nous Choisir
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
                      className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <advantage.icon className="w-8 h-8 text-primary-foreground" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">{advantage.title}</h3>
                      <p className="text-muted-foreground">{advantage.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section - inchangée */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="section-padding bg-background"
      >
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">Nos Partenaires</h2>
            <p className="text-muted-foreground mt-2">Ils nous font confiance et participent à notre succès</p>
          </div>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Vision Design SARL est fier de collaborer avec la <strong className="text-primary">FECALUTTES (Fédération Camerounaise de Luttes)</strong>.
              Ce partenariat nous permet de soutenir le sport de haut niveau au Cameroun tout en partageant des valeurs communes : 
              rigueur, excellence et dépassement de soi.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <ImageCarousel images={partnerImages} />
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-12">
          <h3 className="text-xl font-heading font-semibold text-foreground mb-4 text-center">
            Découvrez notre partenariat en vidéo
          </h3>
          <VideoPlayer src={partenaireVideo} title="Partenariat FECALUTTES" />
        </div>
      </motion.section>

      {/* Testimonials Section - inchangée */}
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
              <Star className="w-4 h-4" /> Témoignages
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-lg text-muted-foreground">La satisfaction de nos clients est notre plus grande fierté.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 150 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}>
                        <Star className="w-5 h-5 text-accent fill-accent" />
                      </motion.div>
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/20 mb-3" />
                  <p className="text-muted-foreground mb-6 flex-1">"{testimonial.content}"</p>
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

      {/* Final CTA - inchangée */}
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
            Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.a href="tel:+237695766022" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-accent-foreground text-accent font-semibold hover:-translate-y-1 transition shadow-lg" whileHover={{ scale: 1.05 }}>
              <Phone className="w-5 h-5" /> Appeler Maintenant
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-accent-foreground/10 text-accent-foreground border-2 border-accent-foreground/30 font-semibold hover:bg-accent-foreground/20 hover:-translate-y-1 transition">
                Demander une Consultation <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
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
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white hover:-translate-y-1 transition shadow-lg"
              style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
              whileHover={{ scale: 1.05 }}
            >
              <FaWhatsapp className="w-5 h-5" /> WhatsApp
            </motion.a>
            <motion.a
              href="https://www.facebook.com/profile.php?id=100077492796084"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white hover:-translate-y-1 transition shadow-lg"
              style={{ background: "linear-gradient(135deg, #1877F2 0%, #0E5A9E 100%)" }}
              whileHover={{ scale: 1.05 }}
            >
              <Facebook className="w-5 h-5" /> Facebook
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}