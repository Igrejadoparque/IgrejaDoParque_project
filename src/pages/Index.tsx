import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import AboutSection from "@/components/sections/AboutSection";
import YoutubeSection from "@/components/sections/YoutubeSection";
import DownloadsSection from "@/components/sections/DownloadsSection";
import DevotionalSection from "@/components/sections/DevotionalSection";
import LeadershipPage from "@/components/pages/LeadershipPage";
import AboutPage from "@/components/pages/AboutPage";
import PublicationsPage from "@/components/pages/PublicationsPage";
import WebTVPage from "@/components/pages/WebTVPage";
import EventsPage from "@/components/pages/EventsPage";
import ContactPage from "@/components/pages/ContactPage";
import DepartmentsPage from "@/components/pages/DepartmentsPage";
import { ActivePage } from "@/types";

const Index = () => {
  const [activePage, setActivePage] = useState<ActivePage>("inicio");

  const renderPage = () => {
    switch (activePage) {
      case "inicio":
        return (
          <>
            <HeroSection setActivePage={setActivePage} />
            <ActivitiesSection />
            <AboutSection setActivePage={setActivePage} />
            <YoutubeSection />
            <DownloadsSection setActivePage={setActivePage} />

          </>
        );
      case "lideranca":
        return <LeadershipPage />;
      case "sobre":
        return <AboutPage />;
      case "publicacoes":
        return <PublicationsPage setActivePage={setActivePage} />;
      case "eventos":
        return <EventsPage />;
      case "contato":
        return <ContactPage />;
      case "departamentos":
        return <DepartmentsPage />;
      case "webtv":
        return <WebTVPage setActivePage={setActivePage} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen font-[\'Montserrat\',sans-serif]">
      <Header activePage={activePage} setActivePage={setActivePage} />

      <main className="pt-20">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};

export default Index;

