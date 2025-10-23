import bannerImg from "../../../assets/images/defaultBanner.jpg";
import { useAuth } from "../../../hooks/useAuth";
import { Avatar } from "../../common/ui";

const Banner = () => {
  const { user } = useAuth();

  return (
    <>
      <section className="relative flex flex-col justify-end items-center md:items-start md:pl-25 min-h-[40vh] rounded-b-[50px] max-w-7xl mx-auto">
        {/* Imagen de fondo optimizada */}
        <img
          src={bannerImg}
          alt="Banner de perfil"
          className="absolute inset-0 w-full h-full object-cover rounded-b-[50px]"
          loading="eager"
        />
        <div className="absolute -bottom-15 left-10 md:items-start md:absolute md:-bottom-15 md:left-30">
          <Avatar
            src={user?.avatar}
            alt="Profile"
            size="xxl"
            className="border-4 border-white shadow-lg"
          />
        </div>
      </section>
    </>
  );
};

export default Banner;
