import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Cookie, Mail, AlertCircle, CheckCircle } from "lucide-react";
import SectionAnimation from "@/components/ui/section-animation";

export default function PolitiqueConfidentialite() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative container-custom text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Protection des données</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-6">
              Politique de Confidentialité
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Notre engagement pour la protection de vos données personnelles
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12">
            {/* Introduction */}
            <SectionAnimation>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    Chez Vision Design SARL, nous accordons une importance capitale à la protection de vos données personnelles. 
                    La présente politique de confidentialité a pour objectif de vous informer sur la manière dont nous collectons, 
                    utilisons et protégeons vos informations lorsque vous utilisez notre site web.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    En utilisant notre site, vous consentez aux pratiques décrites dans cette politique.
                  </p>
                </div>
              </div>
            </SectionAnimation>

            {/* Responsable du traitement */}
            <SectionAnimation delay={0.1}>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Responsable du traitement
                  </h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Le responsable du traitement des données personnelles collectées sur le site www.visiondesignsarl.com est :
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p><span className="font-semibold text-foreground">Vision Design SARL</span></p>
                    <p>Yaoundé, Omnisport</p>
                    <p>Email : visiondesignsarl@gmail.com</p>
                    <p>Tél : +237 695 76 60 22</p>
                  </div>
                </div>
              </div>
            </SectionAnimation>

            {/* Données collectées */}
            <SectionAnimation delay={0.2}>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Database className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Données personnelles collectées
                  </h2>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Nous sommes susceptibles de collecter les catégories de données suivantes :
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Nom et prénom",
                      "Adresse email",
                      "Numéro de téléphone",
                      "Adresse postale",
                      "Informations de paiement (uniquement pour les transactions)",
                      "Données de navigation (cookies, pages visitées)"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionAnimation>

            {/* Utilisation des données */}
            <SectionAnimation delay={0.3}>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Utilisation de vos données
                  </h2>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Vos données personnelles sont utilisées pour :
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Répondre à vos demandes de devis et d'information",
                      "Gérer la relation client et le suivi des projets",
                      "Vous envoyer des informations sur nos services (avec votre consentement)",
                      "Améliorer notre site et nos services",
                      "Respecter nos obligations légales et réglementaires"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionAnimation>

            {/* Cookies */}
            <SectionAnimation delay={0.4}>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Gestion des cookies
                  </h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                    Les cookies sont de petits fichiers texte stockés sur votre appareil.
                  </p>
                  <p className="font-semibold text-foreground">Types de cookies utilisés :</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Cookies essentiels (nécessaires au fonctionnement du site)</li>
                    <li>Cookies analytiques (mesure d'audience)</li>
                    <li>Cookies de préférences (mémorisation de vos choix)</li>
                  </ul>
                  <p className="mt-4">
                    Vous pouvez paramétrer vos préférences cookies à tout moment via les paramètres de votre navigateur.
                  </p>
                </div>
              </div>
            </SectionAnimation>

            {/* Sécurité */}
            <SectionAnimation delay={0.5}>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Sécurité des données
                  </h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées 
                    pour garantir un niveau de sécurité adapté au risque, notamment :
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Chiffrement des données sensibles</li>
                    <li>Accès restreint aux données personnelles</li>
                    <li>Surveillance continue des systèmes</li>
                    <li>Sauvegardes régulières</li>
                  </ul>
                </div>
              </div>
            </SectionAnimation>

            {/* Vos droits */}
            <SectionAnimation delay={0.6}>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Vos droits
                  </h2>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Conformément à la réglementation en vigueur, vous disposez des droits suivants :
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Droit d'accès à vos données personnelles",
                      "Droit de rectification des données inexactes",
                      "Droit à l'effacement (droit à l'oubli)",
                      "Droit à la limitation du traitement",
                      "Droit d'opposition au traitement",
                      "Droit à la portabilité de vos données"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 p-4 bg-muted rounded-lg">
                    Pour exercer vos droits, contactez-nous par email à{" "}
                    <a 
                      href="mailto:visiondesignsarl@gmail.com"
                      className="text-primary hover:underline"
                    >
                      visiondesignsarl@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </SectionAnimation>

            {/* Mise à jour */}
            <SectionAnimation delay={0.7}>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Mise à jour de la politique
                  </h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    La présente politique de confidentialité peut être mise à jour périodiquement 
                    pour refléter les évolutions de nos pratiques ou des obligations légales.
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Dernière mise à jour :</span> 15 mars 2026
                  </p>
                </div>
              </div>
            </SectionAnimation>
          </div>
        </div>
      </section>
    </>
  );
}