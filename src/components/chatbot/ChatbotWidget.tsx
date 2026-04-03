import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Loader2, ImagePlus, User, Mail, Phone, Shield, MessageCircle, Facebook } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import visionbotLogo from "@/assets/chatbot/visionbot.png";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

interface UserInfo {
  name: string;
  contact: string;
  contactType: "email" | "phone";
}

type OnboardingStep = "name" | "contact" | "complete";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("name");
  const [nameInput, setNameInput] = useState("");
  const [contactInput, setContactInput] = useState("");
  const [contactType, setContactType] = useState<"email" | "phone">("email");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [discussionTopic, setDiscussionTopic] = useState<string | null>(null);
  const [lastRequestTime, setLastRequestTime] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sauvegarde du lead (une seule fois)
  const saveLead = useCallback(async (info: UserInfo, topic?: string) => {
    try {
      const leadData = {
        name: info.name,
        email: info.contactType === "email" ? info.contact : null,
        phone: info.contactType === "phone" ? info.contact : null,
        source_page: location.pathname,
        discussion_topic: topic || null,
      };

      const { error } = await supabase.from("leads").insert(leadData);
      if (error) {
        console.error("Error saving lead:", error);
      } else {
        console.log("Lead saved successfully");
      }
    } catch (err) {
      console.error("Failed to save lead:", err);
    }
  }, [location.pathname]);

  // Stream chat (identique)
  const streamChat = useCallback(async (
    chatMessages: { role: string; content: string | { type: string; text?: string; image_url?: { url: string } }[] }[],
    userName: string | null,
    onDelta: (chunk: string) => void,
    onDone: () => void
  ) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/visionbot-chat`;

    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatMessages, userName }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      console.error("Erreur Edge Function:", resp.status, errorData);
      if (resp.status === 429) {
        toast({ variant: "destructive", title: "Limite atteinte", description: "Veuillez patienter quelques instants." });
      } else if (resp.status === 500) {
        toast({ variant: "destructive", title: "Erreur du service", description: errorData.error || "Service indisponible." });
      }
      throw new Error(errorData.error || "Erreur de connexion");
    }

    if (!resp.body) throw new Error("Pas de réponse du serveur");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  }, [toast]);

  // Onboarding – nom
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setOnboardingStep("contact");
  };

  // Onboarding – contact (sauvegarde du lead)
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;

    const newUserInfo: UserInfo = {
      name: nameInput.trim(),
      contact: contactInput.trim(),
      contactType,
    };
    setUserInfo(newUserInfo);
    setOnboardingStep("complete");

    await saveLead(newUserInfo); // Sauvegarde une seule fois

    // Message d'accueil
    const welcomeMessage: Message = {
      role: "assistant",
      content: `Bienvenue ${nameInput.trim()} ! 👋\n\nJe suis VisionBot, votre assistant virtuel expert en construction et génie civil chez Vision Design SARL.\n\n🏗️ **VDS – L'avenir du génie civil**\n\nJe peux vous aider avec :\n• 🏠 Conseils en construction et rénovation\n• 💰 Estimations budgétaires en FCFA\n• 📸 Analyse de photos de bâtiments/terrains\n• ⚡ Questions sur l'électricité, plomberie, carrelage\n• ☀️ Installations solaires\n\n📍 Vos informations sont sécurisées.\n\nComment puis-je vous aider aujourd'hui ?`,
    };
    setMessages([welcomeMessage]);
  };

  // Nouvelle conversation (garder l'utilisateur, effacer l'historique)
  const newConversation = () => {
    setMessages([]);                // Vide l'historique
    setSelectedImage(null);        // Supprime l'image en attente
    setDiscussionTopic(null);      // Reset du sujet
    setLastRequestTime(null);      // Reset du timer
    // On garde userInfo et onboardingStep = "complete"
    // On peut ajouter un message de bienvenue personnalisé
    if (userInfo) {
      const newWelcomeMessage: Message = {
        role: "assistant",
        content: `Bon retour ${userInfo.name} ! 👋\n\nJe suis toujours là pour vous aider avec vos projets de construction et génie civil. Que puis-je faire pour vous aujourd'hui ?`,
      };
      setMessages([newWelcomeMessage]);
    }
  };

  // Gestion des images
  const handleImageSelect = () => fileInputRef.current?.click();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ variant: "destructive", title: "Image trop volumineuse", description: "Veuillez sélectionner une image de moins de 5 Mo." });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const removeSelectedImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Détection du sujet (devis, construction, etc.)
  const detectTopic = (message: string): string | null => {
    const lower = message.toLowerCase();
    if (lower.includes("devis") || lower.includes("prix") || lower.includes("coût") || lower.includes("budget")) return "devis";
    if (lower.includes("construction") || lower.includes("maison") || lower.includes("villa") || lower.includes("immeuble")) return "construction";
    if (lower.includes("rénovation") || lower.includes("renovation")) return "rénovation";
    if (lower.includes("solaire") || lower.includes("panneau") || lower.includes("énergie")) return "solaire";
    if (lower.includes("électricité") || lower.includes("electricite") || lower.includes("électrique")) return "électricité";
    if (lower.includes("plomberie") || lower.includes("sanitaire") || lower.includes("eau")) return "plomberie";
    if (lower.includes("carrelage") || lower.includes("carreau")) return "carrelage";
    return null;
  };

  // Envoi d'un message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const now = Date.now();
    const minDelay = 2000;
    if (lastRequestTime && now - lastRequestTime < minDelay) {
      const waitTime = Math.ceil((minDelay - (now - lastRequestTime)) / 1000);
      toast({ variant: "destructive", title: "Patientez un instant", description: `Veuillez attendre ${waitTime} seconde${waitTime > 1 ? 's' : ''}.` });
      return;
    }

    const userMessage = input.trim();
    const imageToSend = selectedImage;
    setInput("");
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    // Mise à jour du sujet de discussion (si lead déjà existant, on ne fait pas de nouvelle insertion)
    if (!discussionTopic && userMessage) {
      const topic = detectTopic(userMessage);
      if (topic) {
        setDiscussionTopic(topic);
        // On peut mettre à jour le lead existant avec le sujet (optionnel, mais on ne le fait pas ici pour éviter des requêtes inutiles)
        // Vous pourriez ajouter une fonction updateLead si nécessaire.
      }
    }

    const newUserMessage: Message = { role: "user", content: userMessage || "Analysez cette image", image: imageToSend || undefined };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    setLastRequestTime(now);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const apiMessages = messages.map((m) => {
        if (m.image) return { role: m.role, content: [{ type: "text", text: m.content }, { type: "image_url", image_url: { url: m.image } }] };
        return { role: m.role, content: m.content };
      });

      if (imageToSend) {
        apiMessages.push({ role: "user", content: [{ type: "text", text: userMessage || "Analysez cette image..." }, { type: "image_url", image_url: { url: imageToSend } }] });
      } else {
        apiMessages.push({ role: "user", content: userMessage });
      }

      await streamChat(apiMessages, userInfo?.name || null, upsertAssistant, () => setIsLoading(false));
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Désolé, une erreur s'est produite. Veuillez réessayer ou nous contacter directement au +237 695 76 60 22." }]);
      setIsLoading(false);
    }
  };

  // Contact options
  const ContactOptions = () => {
  // Fonction locale pour l'email (identique à celle du footer)
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

  return (
    <div className="space-y-3 mt-4">
      <p className="text-sm text-muted-foreground text-center mb-3">
        Contactez directement un expert Vision Design :
      </p>
      <a href="https://wa.me/237677571699" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 rounded-xl transition-all group">
        <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center"><MessageCircle className="w-5 h-5 text-white" /></div>
        <div><p className="font-medium group-hover:text-[#25D366]">Discuter sur WhatsApp</p><p className="text-xs text-muted-foreground">+237 677 571 699</p></div>
      </a>
      <a href="https://www.facebook.com/profile.php?id=100077492796084" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 rounded-xl transition-all group">
        <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center"><Facebook className="w-5 h-5 text-white" /></div>
        <div><p className="font-medium group-hover:text-[#1877F2]">Voir la page Facebook</p><p className="text-xs text-muted-foreground">Vision Design SARL</p></div>
      </a>
      {/* ✅ Email modifié avec la logique footer */}
      <a
        href="#"
        onClick={handleEmailClick}
        className="flex items-center gap-3 p-3 bg-primary/10 hover:bg-primary/20 rounded-xl transition-all group cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
            Envoyer un email
          </p>
          <p className="text-xs text-muted-foreground">visiondesignsarl@gmail.com</p>
        </div>
      </a>
    </div>
  );
};

  const shouldShowContactOptions = (content: string): boolean => {
    const lower = content.toLowerCase();
    const phrases = ["vous contacter", "contacter directement", "parler à un conseiller", "discuter sur whatsapp", "envoyer un message", "réseaux sociaux", "nous contacter", "contact humain", "expert disponible", "pour un devis précis", "pour plus de détails"];
    return phrases.some(p => lower.includes(p));
  };

  // Rendu JSX (identique à l'original, mais avec newConversation)
  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl overflow-hidden ${isOpen ? "hidden" : ""}`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent animate-pulse opacity-50" />
        <img src={visionbotLogo} alt="VisionBot" className="w-full h-full object-cover relative z-10" />
      </motion.button>

      {!isOpen && (
        <motion.div className="fixed bottom-20 right-6 z-50 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-xs font-medium shadow-lg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2 }}>
          💬 Besoin d'aide ?
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden border border-border"
          >
            <div className="bg-gradient-to-r from-primary-dark via-primary to-secondary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/30" whileHover={{ scale: 1.1 }}>
                  <img src={visionbotLogo} alt="VisionBot" className="w-full h-full object-cover" />
                </motion.div>
                <div>
                  <h3 className="font-heading font-bold text-white text-lg">VisionBot</h3>
                  <p className="text-xs text-white/80">VDS – L'avenir du génie civil</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {userInfo && (
                  <button
                    onClick={newConversation} // ← NOUVELLE FONCTION
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white text-xs"
                    title="Nouvelle conversation"
                  >
                    Nouvelle
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Onboarding or Chat Content */}
            {onboardingStep !== "complete" ? (
              <div className="p-6 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/20"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <img
                      src={visionbotLogo}
                      alt="VisionBot"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <h4 className="font-heading font-bold text-xl text-foreground mb-2">
                    Bienvenue chez Vision Design
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    VDS – L'avenir du génie civil
                  </p>
                </motion.div>

                {onboardingStep === "name" && (
                  <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleNameSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Comment vous appelez-vous ?
                      </label>
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="Votre nom complet"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        required
                        autoFocus
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!nameInput.trim()}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                    >
                      Continuer
                    </button>
                  </motion.form>
                )}

                {onboardingStep === "contact" && (
                  <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleContactSubmit}
                    className="space-y-4"
                  >
                    <p className="text-sm text-muted-foreground text-center">
                      Ravi de vous rencontrer, <span className="font-medium text-foreground">{nameInput}</span> !
                    </p>

                    <div className="flex gap-2 justify-center">
                      <button
                        type="button"
                        onClick={() => setContactType("email")}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                          contactType === "email"
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setContactType("phone")}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                          contactType === "phone"
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        <Phone className="w-4 h-4" />
                        Téléphone
                      </button>
                    </div>

                    <div>
                      <input
                        type={contactType === "email" ? "email" : "tel"}
                        value={contactInput}
                        onChange={(e) => setContactInput(e.target.value)}
                        placeholder={
                          contactType === "email"
                            ? "votre@email.com"
                            : "+237 6XX XXX XXX"
                        }
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        required
                        autoFocus
                      />
                    </div>

                    <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" />
                      <span>
                        Vos informations sont utilisées uniquement pour vous assister et vous recontacter si nécessaire.
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={!contactInput.trim()}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                    >
                      Démarrer la conversation
                    </button>
                  </motion.form>
                )}
              </div>
            ) : (
              <>
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-muted/20 to-transparent">
                  {messages.map((msg, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === "user" ? "bg-gradient-to-r from-primary to-secondary text-white rounded-br-md" : "bg-card border border-border text-foreground rounded-bl-md shadow-sm"}`}>
                        {msg.image && <img src={msg.image} alt="Envoyée" className="rounded-lg mb-2 max-h-40 w-auto" />}
                        <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                        {msg.role === "assistant" && shouldShowContactOptions(msg.content) && <ContactOptions />}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="bg-card border border-border p-3 rounded-2xl rounded-bl-md shadow-sm"><div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin text-primary" /><span className="text-sm text-muted-foreground">VisionBot réfléchit...</span></div></div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="px-4 py-2 border-t border-border/50 bg-muted/30">
                  <button onClick={() => setMessages(prev => [...prev, { role: "assistant", content: "Souhaitez-vous échanger directement avec un expert Vision Design SARL ? Vous pouvez nous contacter immédiatement via l'un des canaux ci-dessous." }])} className="w-full py-2 px-4 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary text-sm font-medium flex items-center justify-center gap-2"><Phone className="w-4 h-4" />Contacter un expert</button>
                </div>

                {selectedImage && (
                  <div className="px-4 pb-2">
                    <div className="relative inline-block">
                      <img src={selectedImage} alt="sélectionnée" className="h-20 rounded-lg border border-border" />
                      <button onClick={removeSelectedImage} className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs hover:scale-110">×</button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card">
                  <div className="flex gap-2">
                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageChange} className="hidden" />
                    <button type="button" onClick={handleImageSelect} className="p-3 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground" title="Envoyer une image"><ImagePlus className="w-5 h-5" /></button>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Posez votre question..." className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary text-sm" />
                    <button type="submit" disabled={(!input.trim() && !selectedImage) || isLoading} className="p-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white disabled:opacity-50 hover:shadow-lg"><Send className="w-5 h-5" /></button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-2">📸 Envoyez une photo pour une analyse experte</p>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}