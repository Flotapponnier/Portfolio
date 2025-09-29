'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Language types
export type Language = 'en' | 'fr' | 'de';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}


// Translations object
const translations = {
  en: {
    // Header
    'header.title': 'Student at 42 - Heilbronn C/C++ Developer | GenAI Enthusiast',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.formation': 'Formation',
    'nav.languages': 'Languages',

    // About section
    'about.title': 'HELLO WORLD',
    'about.welcome': 'Welcome to my digital realm',
    'about.intro1': 'My name is Florent Tapponnier, French developer currently based in Heilbronn, Germany. I built strong fundamentals in computer science through my curriculum at 42 Heilbronn, working primarily with C and C++.',
    'about.intro2': 'After exploring AI concepts including NLP, generative AI, and machine learning, I am now focused on backend development and cloud computing, with Go as my primary stack.',
    'about.intro3': 'I love connecting with others, building projects, participating in hackathons, and embracing the startup spirit while constantly challenging myself.',
    'about.regenerate': 'Regenerate with LLM',
    'about.generating': 'Generating with AI...',
    'about.generation.error': 'Failed to generate description. Not enough credit :(, Please try again later.',
    'about.contact': 'Get in touch',

    // Projects section
    'projects.title': 'Projects',
    'projects.filter.all': 'All',
    'projects.filter.c': 'C',
    'projects.filter.cpp': 'Cpp',
    'projects.filter.genai': 'GenAI',
    'projects.filter.go': 'Go',
    'projects.filter.docker': 'Docker',
    'projects.filter.python': 'Python',
    'projects.filter.boba': 'Boba',
    'projects.view': 'View Project',

    // Skills section
    'skills.title': 'Technical Skills',
    'skills.additional': 'Additional Skills',
    'skills.c': 'C Programming',
    'skills.cpp': 'C++ Programming',
    'skills.genai': 'Generative AI',
    'skills.python': 'Python Programming',
    'skills.go': 'Go Programming',

    // Formation section
    'formation.title': 'Formation',
    'formation.school': 'Heilbronn - 42 school',
    'formation.status': 'Alumni',
    'formation.description': 'Joining the 42 school, giving me access to the network of programming, increasing and made me diving in the world of embedded systems and computer science',

    // Languages section
    'languages.title': 'Language Skills',
    'languages.instruction': 'Click on flags to reveal proficiency level',

    // Contact section
    'contact.title': 'Contact',
    'contact.email': 'Send mail',

    // Footer
    'footer.copyright': '© 2025 Florent Tapponnier',

    // Language selector
    'language.select': 'Language',
  },
  fr: {
    // Header
    'header.title': 'Étudiant à 42 - Heilbronn Développeur C/C++ | Passionné d\'IA Générative',
    'nav.about': 'À propos',
    'nav.projects': 'Projets',
    'nav.skills': 'Compétences',
    'nav.contact': 'Contact',
    'nav.formation': 'Formation',
    'nav.languages': 'Langues',

    // About section
    'about.title': 'BONJOUR LE MONDE',
    'about.welcome': 'Bienvenue dans mon univers numérique',
    'about.intro1': 'Je m\'appelle Florent Tapponnier, développeur français actuellement basé à Heilbronn, en Allemagne. J\'ai construit de solides fondamentaux en informatique grâce à mon cursus à 42 Heilbronn, travaillant principalement avec C et C++.',
    'about.intro2': 'Après avoir exploré les concepts d\'IA incluant le NLP, l\'IA générative et l\'apprentissage automatique, je me concentre maintenant sur le développement backend et le cloud computing, avec Go comme stack principal.',
    'about.intro3': 'J\'aime me connecter avec les autres, construire des projets, participer à des hackathons et embrasser l\'esprit startup tout en me défiant constamment.',
    'about.regenerate': 'Régénérer avec LLM',
    'about.generating': 'Génération avec AI...',
    'about.generation.error': 'Échec de la génération de description. Plus de credit :(,  Veuillez réessayer plus tard.',
    'about.contact': 'Me contacter',

    // Projects section
    'projects.title': 'Projets',
    'projects.filter.all': 'Tous',
    'projects.filter.c': 'C',
    'projects.filter.cpp': 'Cpp',
    'projects.filter.genai': 'IA Gen',
    'projects.filter.go': 'Go',
    'projects.filter.docker': 'Docker',
    'projects.filter.python': 'Python',
    'projects.filter.boba': 'Boba',
    'projects.view': 'Voir le Projet',

    // Skills section
    'skills.title': 'Compétences Techniques',
    'skills.additional': 'Compétences Supplémentaires',
    'skills.c': 'Programmation C',
    'skills.cpp': 'Programmation C++',
    'skills.genai': 'IA Générative',
    'skills.python': 'Programmation Python',
    'skills.go': 'Programmation Go',

    // Formation section
    'formation.title': 'Formation',
    'formation.school': 'Heilbronn - École 42',
    'formation.status': 'Diplômé',
    'formation.description': 'Rejoindre l\'école 42 m\'a donné accès au réseau de programmation, m\'a fait progresser et m\'a plongé dans le monde des systèmes embarqués et de l\'informatique',

    // Languages section
    'languages.title': 'Compétences Linguistiques',
    'languages.instruction': 'Cliquez sur les drapeaux pour révéler le niveau de compétence',

    // Contact section
    'contact.title': 'Contact',
    'contact.email': 'Envoyer un mail',

    // Footer
    'footer.copyright': '© 2025 Florent Tapponnier',

    // Language selector
    'language.select': 'Langue',
  },
  de: {
    // Header
    'header.title': 'Student an 42 - Heilbronn C/C++ Entwickler | GenAI Enthusiast',
    'nav.about': 'Über mich',
    'nav.projects': 'Projekte',
    'nav.skills': 'Fähigkeiten',
    'nav.contact': 'Kontakt',
    'nav.formation': 'Ausbildung',
    'nav.languages': 'Sprachen',

    // About section
    'about.title': 'HALLO WELT',
    'about.welcome': 'Willkommen in meiner digitalen Welt',
    'about.intro1': 'Mein Name ist Florent Tapponnier, französischer Entwickler mit Sitz in Heilbronn, Deutschland. Ich habe solide Grundlagen in der Informatik durch mein Studium an der 42 Heilbronn aufgebaut und arbeite hauptsächlich mit C und C++.',
    'about.intro2': 'Nach der Erkundung von KI Konzepten einschließlich NLP, generativer KI und maschinellem Lernen konzentriere ich mich nun auf Backend Entwicklung und Cloud Computing, mit Go als meinem primären Stack.',
    'about.intro3': 'Ich liebe es, mich mit anderen zu vernetzen, Projekte zu entwickeln, an Hackathons teilzunehmen und den Startup Geist zu leben, während ich mich ständig selbst herausfordere.',
    'about.regenerate': 'Mit LLM regenerieren',
    'about.generating': 'Generierung mit AI...',
    'about.generation.error': 'Beschreibung konnte nicht generiert werden. Mehr kredit :(, Bitte versuchen Sie es später erneut.',
    'about.contact': 'Kontakt aufnehmen',

    // Projects section
    'projects.title': 'Projekte',
    'projects.filter.all': 'Alle',
    'projects.filter.c': 'C',
    'projects.filter.cpp': 'Cpp',
    'projects.filter.genai': 'GenAI',
    'projects.filter.go': 'Go',
    'projects.filter.docker': 'Docker',
    'projects.filter.python': 'Python',
    'projects.filter.boba': 'Boba',
    'projects.view': 'Projekt ansehen',

    // Skills section
    'skills.title': 'Technische Fähigkeiten',
    'skills.additional': 'Zusätzliche Fähigkeiten',
    'skills.c': 'C Programmierung',
    'skills.cpp': 'C++ Programmierung',
    'skills.genai': 'Generative KI',
    'skills.python': 'Python Programmierung',
    'skills.go': 'Go Programmierung',

    // Formation section
    'formation.title': 'Ausbildung',
    'formation.school': 'Heilbronn - 42 Schule',
    'formation.status': 'Absolvent',
    'formation.description': 'Der Beitritt zur 42 Schule gab mir Zugang zum Programmiernetzwerk, ließ mich wachsen und tauchte mich in die Welt der eingebetteten Systeme und Informatik ein',

    // Languages section
    'languages.title': 'Sprachkenntnisse',
    'languages.instruction': 'Klicken Sie auf die Flaggen, um das Kompetenzniveau zu enthüllen',

    // Contact section
    'contact.title': 'Kontakt',
    'contact.email': 'Mail senden',

    // Footer
    'footer.copyright': '© 2025 Florent Tapponnier',

    // Language selector
    'language.select': 'Sprache',
  },
};

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key as keyof typeof translations[typeof currentLanguage]] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
