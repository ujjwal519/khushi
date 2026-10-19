import { useState, useEffect, useCallback, useMemo } from 'react';
import content from './content';
import { useActiveSection } from './hooks';
import WelcomeScreen from './components/WelcomeScreen';
import BirthdaySection from './components/BirthdaySection';
import TreeOfHearts from './components/TreeOfHearts';
import PhotoScrapbook from './components/PhotoScrapbook';
import PersonalLetter from './components/PersonalLetter';
import InteractiveCards from './components/InteractiveCards';
import OpenWhenMessages from './components/OpenWhenMessages';
import WishGarden from './components/WishGarden';
import FinalSurprise from './components/FinalSurprise';
import MusicToggle from './components/MusicToggle';
import './index.css';

const SECTION_CONFIG = [
  { id: 'birthday', key: 'birthday' },
  { id: 'treeOfHearts', key: 'treeOfHearts' },
  { id: 'scrapbook', key: 'scrapbook' },
  { id: 'letter', key: 'letter' },
  { id: 'cards', key: 'cards' },
  { id: 'openWhen', key: 'openWhen' },
  { id: 'garden', key: 'garden' },
  { id: 'finalSurprise', key: 'finalSurprise' },
];

export default function App() {
  const [entered, setEntered] = useState(false);
  const [fadeWelcome, setFadeWelcome] = useState(false);

  // Build the list of visible section IDs
  const visibleSections = useMemo(
    () => SECTION_CONFIG.filter((s) => content.sections[s.key]),
    []
  );
  const sectionIds = useMemo(
    () => visibleSections.map((s) => s.id),
    [visibleSections]
  );

  const activeIndex = useActiveSection(entered ? sectionIds : []);

  const handleEnter = useCallback(() => {
    setFadeWelcome(true);
    setTimeout(() => setEntered(true), 800);
  }, []);

  const handleRestart = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setEntered(false);
    setFadeWelcome(false);
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Reset scroll on enter
  useEffect(() => {
    if (entered) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [entered]);

  if (!entered) {
    return (
      <div className={`welcome-wrapper ${fadeWelcome ? 'fade-out' : ''}`}>
        <WelcomeScreen onEnter={handleEnter} />
      </div>
    );
  }

  return (
    <>
      {/* Navigation dots */}
      <nav className="nav-dots" aria-label="Page sections">
        {visibleSections.map((section, i) => (
          <button
            key={section.id}
            className={`nav-dot ${activeIndex === i ? 'active' : ''}`}
            onClick={() => scrollToSection(section.id)}
            aria-label={`Go to ${section.id} section`}
            title={section.id}
          />
        ))}
      </nav>

      {/* Music toggle */}
      <MusicToggle />

      {/* Main content */}
      <main>
        {content.sections.birthday && (
          <div id="birthday">
            <BirthdaySection />
          </div>
        )}

        {content.sections.treeOfHearts && (
          <div id="treeOfHearts">
            <TreeOfHearts />
          </div>
        )}

        {content.sections.scrapbook && (
          <div id="scrapbook">
            <PhotoScrapbook />
          </div>
        )}

        {content.sections.letter && (
          <div id="letter">
            <PersonalLetter />
          </div>
        )}

        {content.sections.cards && (
          <div id="cards">
            <InteractiveCards />
          </div>
        )}

        {content.sections.openWhen && (
          <div id="openWhen">
            <OpenWhenMessages />
          </div>
        )}

        {content.sections.garden && (
          <div id="garden">
            <WishGarden />
          </div>
        )}

        {content.sections.finalSurprise && (
          <div id="finalSurprise">
            <FinalSurprise onRestart={handleRestart} />
          </div>
        )}
      </main>

      <style>{`
        .welcome-wrapper {
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .welcome-wrapper.fade-out {
          opacity: 0;
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}
