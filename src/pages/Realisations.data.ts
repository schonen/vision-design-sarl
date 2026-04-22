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