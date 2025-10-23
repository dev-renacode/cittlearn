import { Routes, Route, Navigate } from "react-router-dom";
import {
  Banner,
  FeedNavbar,
  UserInfo,
  PostsSection,
  MediaSection,
  LikesSection,
} from "../components/domain/feed";

const Feed = () => {
  return (
    <>
      <Banner />
      <section className="">
        {/* Layout de dos columnas solo en desktop (md+) */}
        <div className="md:flex md:gap-8 md:max-w-7xl md:mx-auto">
          {/* Columna izquierda - UserInfo */}
          <div className="md:w-1/3">
            <UserInfo />
          </div>

          {/* Columna derecha - FeedNavbar y contenido */}
          <div className="md:w-2/3">
            <FeedNavbar />
            <Routes>
              <Route path="/" element={<Navigate to="/feed/posts" replace />} />
              <Route path="/posts" element={<PostsSection />} />
              <Route path="/media" element={<MediaSection />} />
              <Route path="/likes" element={<LikesSection />} />
            </Routes>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feed;
