import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Ajoute ces lignes pour déboguer les variables d'environnement
console.log('🔥 Débogage des variables d\'environnement:');
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log('Toutes les variables:', import.meta.env);

// Vérifie si les variables sont définies
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('❌ Les variables Supabase ne sont pas définies dans .env');
} else {
  console.log('✅ Variables Supabase trouvées');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)