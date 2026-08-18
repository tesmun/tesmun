import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageShell from "@/components/PageShell";
import About from "@/pages/About";
import CommitteeDetail from "@/pages/CommitteeDetail";
import Committees from "@/pages/Committees";
import Contact from "@/pages/Contact";
import Gallery from "@/pages/Gallery";
import Home from "@/pages/Home";
import NewsArticle from "@/pages/NewsArticle";
import Newspaper from "@/pages/Newspaper";
import NotFound from "@/pages/NotFound";
import OurTeam from "@/pages/OurTeam";
import Press from "@/pages/Press";
import PressSection from "@/pages/PressSection";
import Resources from "@/pages/Resources";
import TeamMember from "@/pages/TeamMember";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/committees" element={<Committees />} />
          <Route path="/committees/:slug" element={<CommitteeDetail />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/our-team/:slug" element={<TeamMember />} />
          <Route path="/press" element={<Press />} />
          <Route path="/news" element={<Newspaper />} />
          <Route path="/news/:articleSlug" element={<NewsArticle />} />
          <Route path="/press/news" element={<Newspaper />} />
          <Route path="/press/news/:articleSlug" element={<NewsArticle />} />
          <Route path="/press/:slug" element={<PressSection />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schedule" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
