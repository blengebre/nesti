import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import profileImg from './photo_2026-04-18_14-06-52.jpg';
import aboutHeroImg from './photo_2026-04-18_14-06-52.jpg';
import { 
  User, 
  GraduationCap, 
  Code2, 
  Award, 
  Heart, 
  Contact, 
  Wrench,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Mail,
  Linkedin,
  MapPin,
  Brush,
  Menu,
  X
} from 'lucide-react';

// Types
type Section = 'about' | 'education' | 'projects' | 'skills' | 'certifications' | 'volunteer' | 'contact';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'about', label: 'About Me', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'volunteer', label: 'Volunteer', icon: Heart },
    { id: 'contact', label: 'Contact', icon: Contact },
  ];

  const handleNavClick = (id: Section) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-brand-light">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-soft-green rounded-lg flex items-center justify-center text-brand-sage font-bold">P</div>
          <h1 className="font-display font-bold text-lg text-brand-sage">Portfolio</h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-500 hover:text-brand-sage transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Navigation (Desktop & Mobile Menu) */}
      <nav className={`
        fixed inset-0 md:relative md:inset-auto z-40 bg-white md:w-64 border-r border-gray-100 p-6 flex flex-col justify-between 
        md:h-screen sticky md:top-0 transition-transform duration-300 transform
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          <div className="hidden md:block mb-8 p-2">
            <h1 className="font-display font-bold text-2xl text-brand-sage tracking-tight">Portfolio</h1>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">Biomedical Engineering</p>
          </div>
          
          <ul className="space-y-2 mt-8 md:mt-0">
            {navigation.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id as Section)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                    activeSection === item.id 
                      ? 'bg-brand-soft-green text-brand-sage shadow-sm ring-1 ring-brand-sage/10' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={18} strokeWidth={activeSection === item.id ? 2.5 : 2} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:block pt-6 border-t border-gray-50">
          <p className="text-[10px] text-gray-400 font-sans tracking-wide">
            © 2026 Academic Portfolio<br/>
            Biomedical Innovation
          </p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 px-6 py-12 md:p-20 overflow-hidden relative">
        {/* Background Accent Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sage opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent opacity-[0.03] rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeSection === 'about' && <AboutSection />}
              {activeSection === 'education' && <EducationSection />}
              {activeSection === 'projects' && <ProjectsSection />}
              {activeSection === 'skills' && <SkillsSection />}
              {activeSection === 'certifications' && <CertificationsSection />}
              {activeSection === 'volunteer' && <VolunteerSection />}
              {activeSection === 'contact' && <ContactSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function SectionHeading({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) {
  return (
    <div className="mb-12">
      {subtitle && <p className="text-brand-sage font-semibold text-sm uppercase tracking-[0.2em] mb-3">{subtitle}</p>}
      <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-dark tracking-tight leading-tight">{children}</h2>
      <div className="h-1.5 w-12 bg-brand-sage mt-6 rounded-full opacity-20"></div>
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean, key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
      >
        <span className="font-display font-semibold text-brand-dark">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-brand-sage"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-6 pt-0 border-t border-gray-50 text-gray-600 leading-relaxed text-sm">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AboutSection() {
  return (
    <section>
      <SectionHeading subtitle="Personal Statement">Engineering Compassion</SectionHeading>
      
      <div className="mb-12 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-sage/10 relative h-[300px] md:h-[400px]">
        <img 
          src={aboutHeroImg} 
          alt="Professional Hero" 
          className="w-full h-full object-cover grayscale brightness-90 contrast-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-sage/60 to-transparent flex items-center px-12">
          <div className="max-w-md hidden md:block">
            <h3 className="text-white text-3xl font-display font-bold leading-tight">Driving Clinical Excellence Through Technology</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="p-8 bg-brand-soft-green/30 rounded-3xl border border-brand-sage/10 mb-8">
            <h3 className="text-2xl md:text-3xl font-display font-medium text-brand-sage italic leading-tight">
              "Intersecting Medical Innovation and Human-Centric Design to solve complex healthcare challenges."
            </h3>
          </div>

          <p className="text-xl md:text-2xl font-display font-light text-brand-dark leading-relaxed">
            I am a 5th-year <span className="text-brand-sage font-medium italic underline decoration-brand-sage/30 underline-offset-4 leading-tight">Biomedical Engineering</span> student 
            dedicated to bridging the gap between rigorous technical innovation and compassionate patient care.
          </p>
          
          <div className="space-y-4 mt-8">
            <Accordion title="My Professional Vision" defaultOpen={true}>
              <p>
                As a future engineer, I am driven by the potential of AI and medical technology to transform diagnosis and treatment. My passion lies in developing accessible, high-precision tools that reduce human suffering and improve healthcare outcomes globally.
              </p>
            </Accordion>
            
            <Accordion title="Core Strengths & Personality">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Creative Problem Solving', desc: 'Approaching technical hurdles with an innovative, artistic mindset.' },
                  { label: 'Detail-Oriented Precision', desc: 'High accuracy in medical image processing and data analysis.' },
                  { label: 'Compassionate Advocacy', desc: 'Ensuring patient well-being is at the heart of every design.' },
                  { label: 'Interdisciplinary Balance', desc: 'Seamlessly bridging technical engineering and aesthetic design.' }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-2xl">
                    <h4 className="font-display font-bold text-brand-sage text-sm mb-1">{item.label}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Accordion>

            <Accordion title="Analytical & Artistic Balance">
              <p>
                Beyond the lab, I believe in the power of creative expression. My experience as a certified makeup artist has taught me that precision and empathy go hand-in-hand. Whether it is calculating biomedical signals or understanding a client's aesthetic needs, my approach is always detail-oriented and heart-led.
              </p>
            </Accordion>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-soft-green/50 text-brand-sage rounded-full text-xs font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-sage animate-pulse"></span>
              GPA 3.21 / 4.0
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold tracking-wide">
              5th Year Student
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4 lg:sticky lg:top-32">
          <div className="aspect-[4/5] bg-gray-200 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-sage/10 relative group border-4 border-white">
            <img 
              src={profileImg} 
              alt="Professional Headshot" 
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-sage/40 to-transparent"></div>
          </div>
          <div className="mt-6 text-center">
            <p className="font-display font-medium text-brand-dark text-sm">Creative • Compassionate • Detail-Oriented</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section>
      <SectionHeading subtitle="Academic Background">Education</SectionHeading>
      
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative pl-8 border-l-2 border-brand-soft-green"
        >
          <div className="absolute w-5 h-5 bg-white border-4 border-brand-sage rounded-full -left-[11px] top-0 shadow-sm"></div>
          <span className="text-brand-sage font-semibold text-xs uppercase tracking-widest block mb-2">2021 — Present</span>
          <h3 className="text-2xl font-display font-bold text-brand-dark">Bachelor of Science in Biomedical Engineering</h3>
          <p className="text-lg text-gray-500 font-medium mb-6">5th Year • Current CGPA: 3.21</p>
          
          <div className="space-y-4">
            <Accordion title="View Key Focus Areas">
              <p className="mb-4">Rigorous training in the intersection of biology, medicine, and engineering principles.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {['Medical Imaging', 'Signal Processing', 'Bio-Instrumentation', 'Biomedical Materials', 'Clinical Engineering'].map(tag => (
                  <div key={tag} className="flex items-center gap-2 text-sm">
                    <div className="w-1 h-1 bg-brand-sage rounded-full"></div>
                    {tag}
                  </div>
                ))}
              </div>
            </Accordion>
            
            <Accordion title="Honors & Extracurriculars">
              <p>Recognized for consistent academic excellence and leadership in engineering group projects. Active member of the University Biomedical Society, contributing to peer-mentoring for junior students.</p>
            </Accordion>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative pl-8 border-l-2 border-brand-soft-green"
        >
          <div className="absolute w-5 h-5 bg-white border-4 border-gray-300 rounded-full -left-[11px] top-0 shadow-sm"></div>
          <span className="text-gray-400 font-semibold text-xs uppercase tracking-widest block mb-2">Secondary Education</span>
          <h3 className="text-2xl font-display font-bold text-brand-dark">National Exam Achievement</h3>
          <p className="text-lg text-gray-500 font-medium mb-4">Score: 595 / 700</p>
          <Accordion title="Performance Details">
            <p>Demonstrated exceptional proficiency in STEM subjects, ranking among the top candidates nationally. Achieving this score reflects strong foundational skills in Physics, Calculus, and Biology, which laid the groundwork for my engineering career.</p>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section>
      <SectionHeading subtitle="Innovation Gallery">Featured Projects</SectionHeading>
      
      <div className="grid grid-cols-1 gap-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="group grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
        >
          <div className="bg-brand-soft-green/30 p-8 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 bg-brand-sage text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Final Year Project</div>
            <img 
              src="https://picsum.photos/seed/medical-ai/600/600" 
              alt="AI Detection System" 
              className="w-full max-w-xs object-contain drop-shadow-2xl rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-sage transition-colors">AI-based Anal Fistula Detection</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Developed an end-to-end classification system using deep learning to assist clinicians in identifying and categorizing anal fistula types from medical images.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <ChevronRight size={16} className="text-brand-sage" />
                Medical image pre-processing & enhancement
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <ChevronRight size={16} className="text-brand-sage" />
                CNN-based architectural implementation
              </li>
            </ul>
            <div className="flex gap-2 underline">
              <span className="px-3 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-500 uppercase tracking-wider">Pytorch</span>
              <span className="px-3 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-500 uppercase tracking-wider">OpenCV</span>
              <span className="px-3 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-500 uppercase tracking-wider">Scikit-learn</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white border border-gray-100 rounded-[2rem]">
            <div className="w-12 h-12 bg-brand-soft-green rounded-2xl flex items-center justify-center text-brand-sage mb-6">
              <Code2 size={24} />
            </div>
            <h3 className="text-xl font-display font-bold mb-3">Image Processing Research</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              In-depth research and implementation of noise reduction algorithms for X-ray and CT datasets to improve diagnostic reliability.
            </p>
          </div>
          <div className="p-8 bg-white border border-gray-100 rounded-[2rem]">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 mb-6">
              <Brush size={24} />
            </div>
            <h3 className="text-xl font-display font-bold mb-3">Medical Device Prototyping</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Experience in designing and analyzing CAD models for orthopedic implants, ensuring biomechanical integrity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const skillCategories = [
    {
      title: 'Technical Core',
      icon: Code2,
      skills: ['Biomedical Fundamentals', 'Radiology Informatics', 'Anatomy/Physiology', 'Medical Ethics']
    },
    {
      title: 'Digital & AI',
      icon: Wrench,
      skills: ['Medical Image Processing', 'AI/ML Basic Applications', 'Python (Fundamentals)', 'Signal Processing']
    },
    {
      title: 'Professional',
      icon: Award,
      skills: ['Analytical Thinking', 'Complex Problem Solving', 'Technical Reporting', 'Project Management']
    },
    {
      title: 'Human-Centric',
      icon: Heart,
      skills: ['Compassionate Care', 'Detail Orientation', 'Creative Design thinking', 'Artistic Integration']
    }
  ];

  return (
    <section>
      <SectionHeading subtitle="Capabilities">Expertise & Skills</SectionHeading>
      
      <div className="grid grid-cols-1 gap-4">
        {skillCategories.map((cat, i) => (
          <Accordion key={cat.title} title={cat.title} defaultOpen={i === 0}>
             <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-brand-soft-green/50 text-brand-sage rounded-xl">
                <cat.icon size={20} />
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Skill Set Details</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {cat.skills.map(skill => (
                <div key={skill} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-brand-sage/30"></div>
                  <span className="text-sm font-medium text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </Accordion>
        ))}
      </div>
    </section>
  );
}

function CertificationsSection() {
  return (
    <section>
      <SectionHeading subtitle="Beyond Engineering">Certifications & Creative Experience</SectionHeading>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="p-8 bg-brand-sage text-white rounded-[2rem] shadow-xl shadow-brand-sage/20 relative overflow-hidden">
             <Brush size={120} className="absolute -right-8 -bottom-8 opacity-10 rotate-12" />
             <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">Certified Professional</div>
                <h3 className="text-3xl font-display font-bold mb-4 italic">Certified Makeup Artist</h3>
                <p className="max-w-xl text-brand-soft-green/90 leading-relaxed mb-6">
                  Successfully balanced rigorous engineering studies with a professional certification in makeup artistry. This dual background has refined my attention to detail, precision, and human-centric design approach.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 border border-white/20 backdrop-blur-md rounded-xl text-xs font-semibold">Client-Based Communication</div>
                  <div className="px-4 py-2 border border-white/20 backdrop-blur-md rounded-xl text-xs font-semibold">Color Theory & Aesthetics</div>
                  <div className="px-4 py-2 border border-white/20 backdrop-blur-md rounded-xl text-xs font-semibold">Business Management</div>
                </div>
             </div>
          </div>

        <div className="space-y-4">
          <div className="flex items-start gap-6 p-6 bg-white border border-gray-100 rounded-2xl">
            <div className="p-3 bg-gray-50 text-gray-400 rounded-xl shrink-0">
              <Brush size={24} />
            </div>
            <div>
              <h4 className="font-display font-bold text-brand-dark">Freelance Client Work</h4>
              <p className="text-sm text-gray-500 mt-1">Managed a portfolio of beauty clients, demonstrating strong organizational skills and the ability to balance technical precision with artistic vision in high-pressure environments.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VolunteerSection() {
  return (
    <section>
      <SectionHeading subtitle="Social Impact">Volunteer Work</SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-10 bg-white border border-gray-100 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-brand-sage/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Heart size={80} strokeWidth={1} />
          </div>
          <h3 className="text-2xl font-display font-bold text-brand-dark mb-4">Community Charity Lead</h3>
          <p className="text-gray-500 leading-relaxed mb-6">
            Organized and participated in numerous charity activities, focusing on providing essential supplies and emotional support to local communities in need.
          </p>
          <div className="flex items-center gap-2 text-brand-sage font-semibold text-sm">
            <MapPin size={16} />
            Local Community Centers
          </div>
        </div>

        <div className="p-10 bg-white border border-gray-100 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-brand-sage/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Heart size={80} strokeWidth={1} />
          </div>
          <h3 className="text-2xl font-display font-bold text-brand-dark mb-4">Orphanage Support Program</h3>
          <p className="text-gray-500 leading-relaxed mb-6">
            Regularly visited orphanages to provide supplies, educational support, and companionship, demonstrating a deep commitment to social responsibility and compassion.
          </p>
          <div className="flex items-center gap-2 text-brand-sage font-semibold text-sm">
            <MapPin size={16} />
            National Orphanage Network
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="text-center md:text-left">
      <SectionHeading subtitle="Get in touch">Contact Information</SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-14 h-14 bg-brand-soft-green text-brand-sage rounded-2xl flex items-center justify-center shadow-sm shrink-0">
              <Mail size={24} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">Email Me</p>
              <a href="mailto:hello@example.com" className="text-lg md:text-xl font-display font-bold text-brand-dark hover:text-brand-sage transition-colors break-words">biomed.engineer.port@example.edu</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-14 h-14 bg-brand-soft-green text-brand-sage rounded-2xl flex items-center justify-center shadow-sm shrink-0">
              <Linkedin size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">LinkedIn Profile</p>
              <a href="#" className="text-lg md:text-xl font-display font-bold text-brand-dark hover:text-brand-sage transition-colors flex items-center gap-2">
                linkedin.com/in/biomed-innovator
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
           <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-accent/10 rounded-full blur-2xl"></div>
           <h3 className="text-2xl font-display font-bold mb-6">Ready to Collaborate?</h3>
           <p className="text-gray-500 mb-8 max-w-sm">
             I am currently seeking international scholarship opportunities and research collaborations in Biomedical Engineering and Medical AI.
           </p>
           <button className="w-full py-4 bg-brand-sage text-white rounded-2xl font-bold shadow-lg shadow-brand-sage/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
             <Mail size={18} />
             Request Curriculum Vitae
           </button>
        </div>
      </div>
    </section>
  );
}
