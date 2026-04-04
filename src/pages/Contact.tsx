import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, ChevronDown, Building2, Wrench, HardHat, Sun, CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import SectionAnimation from "@/components/ui/section-animation";
import { toast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import immeubleVds from "@/assets/hero/immeuble-vds.png";

const projectTypes = [
  { value: "batiment", label: "Bâtiment & Style", icon: Building2 },
  { value: "plomberie", label: "Plomberie Sanitaire", icon: Wrench },
  { value: "electricite", label: "Électricité", icon: Sun },
  { value: "carrelage", label: "Carrelage", icon: CheckCircle },
  { value: "genie-civil", label: "Génie Civil", icon: HardHat },
  { value: "prestations", label: "Prestations Diverses", icon: MessageCircle },
  { value: "autre", label: "Autre projet", icon: MessageCircle },
];

const faqItems = [
  {
    question: "Quels types de projets réalisez-vous ?",
    answer: "Vision Design SARL réalise tous types de projets de construction et de génie civil : villas, immeubles résidentiels, bâtiments commerciaux, installations électriques, plomberie, carrelage, et installations solaires. Nous proposons également des services de rénovation et d'aménagement.",
  },
  {
    question: "Comment obtenir un devis  ?",
    answer: "Pour obtenir un devis , vous pouvez remplir le formulaire de contact ci-dessus, nous appeler directement au +237 695 76 60 22, ou nous contacter via WhatsApp au +237 677 57 16 99. Notre équipe vous répondra dans les plus brefs délais.",
  },
  {
    question: "Quels sont vos délais de réalisation ?",
    answer: "Les délais varient selon la nature et l'ampleur du projet. Pour une villa standard, comptez 12 à 18 mois. Pour des travaux d'installation (électricité, plomberie, carrelage), les délais sont généralement de 2 à 6 semaines. Nous vous fournirons un planning détaillé lors de l'établissement du devis.",
  },
  {
    question: "Travaillez-vous en dehors de Yaoundé ?",
    answer: "Absolument ! Bien que notre siège soit à Yaoundé, nous intervenons dans tout le Cameroun : Douala, Bafoussam, Kribi, Limbé, et d'autres villes. Les conditions d'intervention peuvent varier selon la localisation.",
  },
  {
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Nous acceptons les virements bancaires, les paiements en espèces et les paiements mobiles (Orange Money, MTN Mobile Money). Un échéancier de paiement est généralement établi avec un acompte à la signature, des paiements intermédiaires, et le solde à la livraison.",
  },
];

const projectTypeLabels: Record<string, string> = {
  batiment: "Bâtiment & Style",
  plomberie: "Plomberie Sanitaire",
  electricite: "Électricité",
  carrelage: "Carrelage",
  "genie-civil": "Génie Civil",
  prestations: "Prestations Diverses",
  autre: "Autre projet",
};

export default function Contact() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preSelectedService = searchParams.get('service') || "";
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: preSelectedService,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.phone.trim() && !formData.email.trim()) {
      newErrors.contact = "Au moins un moyen de contact (téléphone ou email) est requis";
    }
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.projectType) newErrors.projectType = "Sélectionnez un type de projet";
    if (!formData.message.trim()) newErrors.message = "Le message est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ========== FONCTION POUR L'EMAIL (comme dans le footer) ==========
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = "visiondesignsarl@gmail.com";
    const subject = encodeURIComponent("Demande d'information - Vision Design SARL");
    const body = encodeURIComponent(
      "Bonjour,\n\nJe vous contacte suite à la visite de votre site web.\n\nCordialement."
    );
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `googlegmail://co?to=${email}&subject=${subject}&body=${body}`;
      setTimeout(() => {
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      }, 500);
    } else {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`,
        "_blank"
      );
    }
  };

  // Génération des messages (inchangée)
  const generateWhatsAppMessage = () => {
    const projectLabel = projectTypeLabels[formData.projectType] || formData.projectType;
    let message = `*NOUVELLE DEMANDE DE CONSULTATION - Vision Design SARL*\n\n`;
    message += `*Client:* ${formData.name}\n`;
    if (formData.phone) message += `*Téléphone:* ${formData.phone}\n`;
    if (formData.email) message += `*Email:* ${formData.email}\n`;
    message += `*Type de projet:* ${projectLabel}\n\n`;
    message += `*Description du projet:*\n${formData.message}\n\n`;
    message += `*Date:* ${new Date().toLocaleString('fr-FR')}`;
    return encodeURIComponent(message);
  };

  const generateEmailTemplate = () => {
    const projectLabel = projectTypeLabels[formData.projectType] || formData.projectType;
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0a3b5c 0%, #1a4f6e 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .info-box { background: white; padding: 15px; margin-bottom: 15px; border-left: 4px solid #f57c00; border-radius: 5px; }
    .label { font-weight: bold; color: #0a3b5c; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Nouvelle Demande de Consultation</h2>
    </div>
    <div class="content">
      <div class="info-box">
        <h3>Informations Client</h3>
        <p><span class="label">Nom:</span> ${formData.name}</p>
        ${formData.phone ? `<p><span class="label">Téléphone:</span> ${formData.phone}</p>` : ''}
        ${formData.email ? `<p><span class="label">Email:</span> ${formData.email}</p>` : ''}
        <p><span class="label">Date:</span> ${new Date().toLocaleString('fr-FR')}</p>
      </div>
      <div class="info-box">
        <h3>Détails du Projet</h3>
        <p><span class="label">Type de projet:</span> ${projectLabel}</p>
      </div>
      <div class="info-box">
        <h3>Description</h3>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
    <div class="footer">
      <p>Vision Design SARL - Votre partenaire en génie civil</p>
      <p>Yaoundé, Cameroun</p>
    </div>
  </div>
</body>
</html>
    `.trim();
    return { htmlBody };
  };

  const sendToWhatsApp = (phoneNumber: string) => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const sendToEmail = () => {
    const { htmlBody } = generateEmailTemplate();
    const subject = encodeURIComponent(`Demande de consultation - ${formData.name}`);
    const body = encodeURIComponent(htmlBody.replace(/<[^>]*>/g, ''));
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=visiondesignsarl@gmail.com&su=${subject}&body=${body}`,
      '_blank'
    );
  };

  const sendToSMS = (phoneNumber: string) => {
    const projectLabel = projectTypeLabels[formData.projectType] || formData.projectType;
    const message = encodeURIComponent(
      `Vision Design: Nouvelle consultation - ${formData.name} - ${projectLabel} - ${formData.message.substring(0, 50)}...`
    );
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      window.location.href = `sms:${phoneNumber}?body=${message}`;
    } else {
      toast({
        title: "SMS prêt à être envoyé",
        description: `Message: ${decodeURIComponent(message)}`,
      });
    }
  };

  const saveToSupabase = async () => {
    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone || null,
        source_page: location.pathname,
        discussion_topic: formData.projectType,
      });
      if (error) console.error("Erreur lors de l'enregistrement dans Supabase:", error);
      else console.log("Lead enregistré avec succès dans Supabase");
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await saveToSupabase();
      sendToWhatsApp('237677571699');
      sendToWhatsApp('237695766022');
      sendToEmail();
      sendToSMS('237695766022');
      sendToSMS('237677571699');
      toast({
        title: "Demande envoyée avec succès !",
        description: "Votre demande a été transmise à notre équipe via WhatsApp, Email et SMS. Nous vous contacterons rapidement.",
      });
      setFormData({ name: "", phone: "", email: "", projectType: "", message: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-20">
          <img src={immeubleVds} alt="Immeuble Vision Design SARL" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-custom text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">Contactez-nous</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-6">Parlons de Votre Projet</h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Notre équipe est à votre écoute pour concrétiser vos projets de construction et de génie civil.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <SectionAnimation direction="left">
              <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Demander une Consultation</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nom complet *</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`form-input ${errors.name ? "border-destructive" : ""}`} placeholder="Votre nom" />
                    {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Téléphone</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="form-input" placeholder="+237 6XX XX XX XX" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`form-input ${errors.email ? "border-destructive" : ""}`} placeholder="votre@email.com" />
                    </div>
                  </div>
                  {errors.contact && <p className="text-destructive text-sm mt-1">{errors.contact}</p>}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Type de projet *</label>
                    <div className="relative">
                      <select value={formData.projectType} onChange={(e) => setFormData({ ...formData, projectType: e.target.value })} className={`form-input w-full appearance-none pr-10 ${errors.projectType ? "border-destructive" : ""}`}>
                        <option value="">Sélectionnez un type de projet</option>
                        {projectTypes.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    </div>
                    {errors.projectType && <p className="text-destructive text-sm mt-1">{errors.projectType}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Décrivez votre projet *</label>
                    <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} className={`form-input resize-none ${errors.message ? "border-destructive" : ""}`} placeholder="Décrivez votre projet, vos besoins et vos attentes..." />
                    {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    <p>Votre demande sera envoyée à notre équipe via :</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>📱 WhatsApp (principal et secondaire)</li>
                      <li>📧 Email (visiondesignsarl@gmail.com)</li>
                      <li>💬 SMS (les deux numéros)</li>
                    </ul>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full btn-accent py-4 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full" />
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" /> Envoyer ma demande
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </SectionAnimation>

            {/* Contact Info */}
            <SectionAnimation direction="right" delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold text-foreground">Nos Coordonnées</h2>
                <p className="text-muted-foreground">N'hésitez pas à nous contacter par téléphone ou à nous rendre visite dans nos bureaux. Notre équipe est disponible pour répondre à toutes vos questions.</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-sm">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><MapPin className="w-6 h-6 text-primary" /></div>
                    <div><h3 className="font-semibold text-foreground">Adresse</h3><p className="text-muted-foreground">Yaoundé, Omnisport<br />En face du cimetière Omnisport</p></div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-sm">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0"><Phone className="w-6 h-6 text-secondary" /></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Téléphones</h3>
                      <a href="tel:+237695766022" className="text-muted-foreground hover:text-primary transition-colors block">+237 695 76 60 22</a>
                      <a href="tel:+237677571699" className="text-muted-foreground hover:text-primary transition-colors block">+237 677 57 16 99</a>
                    </div>
                  </div>
                  <a href="https://wa.me/237677571699" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0"><MessageCircle className="w-6 h-6 text-secondary-foreground" /></div>
                    <div><h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors">WhatsApp Principal</h3><p className="text-muted-foreground">+237 677 57 16 99<br /><span className="text-sm">Cliquez pour ouvrir WhatsApp</span></p></div>
                  </a>
                  <a href="https://wa.me/237695766022" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-12 h-12 rounded-lg bg-secondary/80 flex items-center justify-center flex-shrink-0"><MessageCircle className="w-6 h-6 text-secondary-foreground" /></div>
                    <div><h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors">WhatsApp Secondaire</h3><p className="text-muted-foreground">+237 695 76 60 22<br /><span className="text-sm">Cliquez pour ouvrir WhatsApp</span></p></div>
                  </a>
                  {/* Email - comportement footer */}
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-sm">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><Mail className="w-6 h-6 text-accent" /></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <a href="#" onClick={handleEmailClick} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">visiondesignsarl@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-sm">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Clock className="w-6 h-6 text-primary" /></div>
                    <div><h3 className="font-semibold text-foreground">Horaires</h3><p className="text-muted-foreground">Lundi - Samedi : 7h30 - 17h00</p></div>
                  </div>
                </div>
              </div>
            </SectionAnimation>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-muted/50">
        <div className="container-custom">
          <SectionAnimation>
            <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.904860737205!2d11.5444127!3d3.890156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bc5ea886a78e1%3A0x9593811e7b1f59d7!2sCimeti%C3%A8re%20Omnisport!5e0!3m2!1sfr!2scm!4v1742151345678!5m2!1sfr!2scm" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Localisation Vision Design SARL - En face du Cimetière Omnisport"></iframe>
            </div>
          </SectionAnimation>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <SectionAnimation className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"><MessageCircle className="w-4 h-4" />FAQ</div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">Questions Fréquentes</h2>
            <p className="text-lg text-muted-foreground">Trouvez rapidement les réponses à vos questions les plus courantes.</p>
          </SectionAnimation>
          <SectionAnimation delay={0.2}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-xl px-6 shadow-sm border-none">
                  <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-primary hover:no-underline py-5">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SectionAnimation>
        </div>
      </section>
    </>
  );
}