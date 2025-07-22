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
    'about.intro1': 'My name is Florent Tapponnier, i\'m from France and have been intensively working to gain value and skill during the year 2024 - 2025. As a creative person, I\'m always seeking solutions outside the box,',
    'about.intro2': 'With the help of the 42 school i become proificient in C/C++ developemment and now i have a growing interest in Generative AI.',
    'about.intro3': 'Currently, I\'m focused on applying these skills to the emerging field of GenAI development, with taking an interest in ML/DL/NLP/LLM/AI Agent. Several hackathons have sparked my passion for this field, where I discovered the potential of combining traditional programming with artificial intelligence.',
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
    'about.intro1': 'Je m\'appelle Florent Tapponnier, je viens de France et j\'ai travaillé intensivement pour acquérir de la valeur et des compétences durant l\'année 2024 - 2025. En tant que personne créative, je recherche toujours des solutions en dehors des sentiers battus,',
    'about.intro2': 'Grâce à l\'école 42, je suis devenu compétent en développement C/C++ et j\'ai maintenant un intérêt grandissant pour l\'IA générative.',
    'about.intro3': 'Actuellement, je me concentre sur l\'application de ces compétences au domaine émergent du développement GenAI, avec un intérêt pour ML/DL/NLP/LLM/Agent IA. Plusieurs hackathons ont éveillé ma passion pour ce domaine, où j\'ai découvert le potentiel de combiner la programmation traditionnelle avec l\'intelligence artificielle.',
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
    'about.intro1': 'Mein Name ist Florent Tapponnier, ich komme aus Frankreich und habe intensiv daran gearbeitet, Wert und Fähigkeiten im Jahr 2024 - 2025 zu erlangen. Als kreativer Mensch suche ich immer nach Lösungen abseits der ausgetretenen Pfade,',
    'about.intro2': 'Mit Hilfe der 42 Schule bin ich kompetent in der C/C++ Entwicklung geworden und habe jetzt ein wachsendes Interesse an generativer KI.',
    'about.intro3': 'Derzeit konzentriere ich mich darauf, diese Fähigkeiten auf das aufkommende Gebiet der GenAI-Entwicklung anzuwenden, mit Interesse an ML/DL/NLP/LLM/KI-Agent. Mehrere Hackathons haben meine Leidenschaft für dieses Feld geweckt, wo ich das Potenzial entdeckte, traditionelle Programmierung mit künstlicher Intelligenz zu verbinden.',
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
