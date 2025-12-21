
import React from 'react';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Globe, 
  Mail, 
  ExternalLink 
} from 'lucide-react';
import Starfield from './components/Starfield';
import { SocialLink } from './types';

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: '1',
    title: 'GitHub',
    url: 'https://github.com',
    iconName: 'github',
    color: 'hover:bg-[#333]'
  },
  {
    id: '2',
    title: 'Twitter / X',
    url: 'https://twitter.com',
    iconName: 'twitter',
    color: 'hover:bg-[#1DA1F2]'
  },
  {
    id: '3',
    title: 'LinkedIn',
    url: 'https://linkedin.com',
    iconName: 'linkedin',
    color: 'hover:bg-[#0077B5]'
  },
  {
    id: '4',
    title: 'Instagram',
    url: 'https://instagram.com',
    iconName: 'instagram',
    color: 'hover:bg-[#E4405F]'
  },
  {
    id: '5',
    title: 'Portfolio Website',
    url: 'https://picsum.photos',
    iconName: 'globe',
    color: 'hover:bg-[#4CAF50]'
  }
];

const IconRenderer: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  switch (name) {
    case 'github': return <Github className={className} size={20} />;
    case 'twitter': return <Twitter className={className} size={20} />;
    case 'linkedin': return <Linkedin className={className} size={20} />;
    case 'instagram': return <Instagram className={className} size={20} />;
    case 'globe': return <Globe className={className} size={20} />;
    default: return <ExternalLink className={className} size={20} />;
  }
};

const SocialCard: React.FC<{ link: SocialLink }> = ({ link }) => {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full max-w-md flex items-center justify-between p-4 mb-4 
                 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl
                 transition-all duration-300 transform hover:scale-[1.02] 
                 hover:bg-white/10 hover:border-white/20 group cursor-pointer`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors`}>
          <IconRenderer name={link.iconName} className="text-white/80 group-hover:text-white" />
        </div>
        <span className="text-lg font-medium tracking-tight text-white/90 group-hover:text-white">
          {link.title}
        </span>
      </div>
      <ExternalLink className="text-white/20 group-hover:text-white/60 transition-colors" size={18} />
    </a>
  );
};

const PeekingFox: React.FC = () => {
  return (
    <div className="fixed bottom-0 right-8 z-20 pointer-events-none translate-y-2 hover:translate-y-0 transition-transform duration-500 ease-out">
      <svg
        width="100"
        height="80"
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
      >
        {/* Fox Ears */}
        <path d="M20 40L35 10L45 40H20Z" fill="white" fillOpacity="0.9" />
        <path d="M80 40L65 10L55 40H80Z" fill="white" fillOpacity="0.9" />
        {/* Ear Insides */}
        <path d="M26 35L35 18L40 35H26Z" fill="#f0f0f0" />
        <path d="M74 35L65 18L60 35H74Z" fill="#f0f0f0" />
        {/* Main Head Shape */}
        <path d="M20 40C20 40 30 35 50 35C70 35 80 40 80 40V80H20V40Z" fill="white" />
        {/* Eyes */}
        <circle cx="40" cy="50" r="2.5" fill="#1a1a1a" />
        <circle cx="60" cy="50" r="2.5" fill="#1a1a1a" />
        {/* Nose */}
        <path d="M48 58L50 61L52 58H48Z" fill="#1a1a1a" />
        {/* Blushed Cheeks */}
        <circle cx="35" cy="56" r="4" fill="#ffccd5" fillOpacity="0.4" />
        <circle cx="65" cy="56" r="4" fill="#ffccd5" fillOpacity="0.4" />
      </svg>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center py-16 px-6 z-10">
      {/* Parallax Background */}
      <Starfield />

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-12">
        <div className="relative">
          {/* Stronger, static blue/cyan glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-60"></div>
          <img 
            src="https://picsum.photos/seed/alex/200" 
            alt="Profile" 
            className="relative w-32 h-32 rounded-full border-4 border-[#0a0a0a] object-cover shadow-2xl"
          />
        </div>
        
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">
          Alex Rivera
        </h1>
        <p className="mt-2 text-white/60 font-medium tracking-wide flex items-center gap-2">
          <span>Creative Developer</span>
          <span className="w-1 h-1 bg-white/30 rounded-full"></span>
          <span>Digital Artist</span>
        </p>
        
        <div className="flex gap-4 mt-6">
           <a href="mailto:hello@example.com" className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors text-white/60 hover:text-white">
             <Mail size={18} />
           </a>
        </div>
      </div>

      {/* Links List */}
      <div className="w-full flex flex-col items-center max-w-xl mx-auto">
        {SOCIAL_LINKS.map(link => (
          <SocialCard key={link.id} link={link} />
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-16 text-white/30 text-sm font-light tracking-widest uppercase">
        &copy; {new Date().getFullYear()} Alex Rivera &bull; Built with starlight
      </footer>

      {/* Easter Egg: Peeking Fox */}
      <PeekingFox />
    </div>
  );
};

export default App;
