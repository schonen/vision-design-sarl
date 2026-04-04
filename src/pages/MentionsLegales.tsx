import { motion } from "framer-motion";
import { Building2, MapPin, Phone, Mail, FileText, Scale, Home, UserCheck } from "lucide-react";
import SectionAnimation from "@/components/ui/section-animation";

export default function MentionsLegales() {
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
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Informations Légales</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-6">
              Mentions Légales
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Conformément aux dispositions des articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12">
            {/* Éditeur du site */}
            <SectionAnimation>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Éditeur du site
                  </h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">Raison sociale :</span> Vision Design SARL
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Forme juridique :</span> Société à Responsabilité Limitée
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Capital social :</span> 10 000 000 FCFA
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Registre du commerce :</span> RC/YAD/2021/B/2029
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Siège social :</span> Yaoundé, Omnisport, Avant Matrix Telecoms, En face du cimetière Omnisport
                  </p>
                </div>
              </div>
            </SectionAnimation>

            {/* Directeur de publication */}
            <SectionAnimation delay={0.1}>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Directeur de la publication
                  </h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">Nom et prénom :</span> Jules Valmy SADO
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Fonction :</span> Gérant
                  </p>
                  <p className="text-sm bg-muted p-4 rounded-lg">
                    Le directeur de la publication est une personne physique ou morale qui assume la responsabilité du contenu du site.
                  </p>
                </div>
              </div>
            </SectionAnimation>

            {/* Hébergement */}
<SectionAnimation delay={0.2}>
  <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
        <Home className="w-6 h-6 text-accent" />
      </div>
      <h2 className="text-2xl font-heading font-bold text-foreground">
        Hébergement
      </h2>
    </div>
    <div className="space-y-4 text-muted-foreground">
      <p>
        <span className="font-semibold text-foreground">Hébergeur :</span> Vercel Inc.
      </p>
      <p>
        <span className="font-semibold text-foreground">Siège social :</span> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
      </p>
      <p>
        <span className="font-semibold text-foreground">Site web :</span>{" "}
        <a 
          href="https://vercel.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          vercel.com
        </a>
      </p>
      <p className="text-sm mt-2">
        <span className="font-semibold text-foreground">Nom de domaine :</span> enregistré auprès de Namecheap, Inc.
      </p>
    </div>
  </div>
</SectionAnimation>

            {/* Contact */}
            <SectionAnimation delay={0.3}>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Contact
                  </h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Yaoundé, Omnisport - Cameroun</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p>+237 695 76 60 22</p>
                      <p>+237 677 57 16 99</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <a 
                      href="mailto:visiondesignsarl@gmail.com"
                      className="text-primary hover:underline"
                    >
                      visiondesignsarl@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </SectionAnimation>

            {/* Propriété intellectuelle */}
            <SectionAnimation delay={0.4}>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Propriété intellectuelle
                  </h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    L'ensemble du contenu du site www.visiondesignsarl.com (structure, articles, logos, icônes, photographies, vidéos, etc.) est la propriété exclusive de Vision Design SARL, sauf mention contraire.
                  </p>
                  <p>
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Vision Design SARL.
                  </p>
                  <p className="font-semibold text-foreground mt-4">
                    © Vision Design SARL - Tous droits réservés
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