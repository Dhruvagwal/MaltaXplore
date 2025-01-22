import Section from "@/components/ui/Section";
import Banner from "@/components/cui/banner";
import ContactForm from "@/components/cui/contactForm";
import { LinkedinIcon, TwitterIcon, InstagramIcon } from "lucide-react";
import Tilt from "react-parallax-tilt";

const teamMembers = [
  {
    id: 1,
    name: "Selena Smite",
    role: "Expert Team Guide",
    image:
      "https://s3-alpha-sig.figma.com/img/4f19/d451/e86fb8f152473931f274cf7a73a7ced2?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eQZ1eqrzdPuES1oznlA8Lm4nC-2tPPQJGICjw1J6kSBUUPPOWQUc~jIjDH19XpIxhSAVU-HUsAQVQX9ZLdocxiEp2vhbAZEVjL38IE-ypAdbV6atwoaeoMBPLEYifZmC9M5Wj44yCcg0nXX6fdm14XsZE-IFR63miCP3ZISP4uhT48wN4AGnuRjPfbWCjCAPV7HGi4OrtDq~bEE9Mj2ZgI4Ht5c3juPSEggFL4-0ojNRBQEifU82U7KP5Z-B5bsB2V-TtJkwt9uEl~-bB4l1fn0rRTNkwWtiK1j1MoJyU6juXiVCOryUzHd071A79MCONuriFXGCmrwtGQ2sjDlFyw__",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    id: 2,
    name: "Marco Rivera",
    role: "Expert Team Guide",
    image:
      "https://s3-alpha-sig.figma.com/img/46f8/39b4/b5419fc961bfe2f09951830ccc8691ad?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VTPjkHhbH7eQ3nCXw~GLHVhrtHqEGqNJoVSjomfpocR4AY4Sd7-YibrpbESqKVD2gvPm31ekMyUvMZGPx9whiKB7TNnfrbNo2RU3EE3eQh5i31R180nTQQLLvHtIDu-YqHFgEF9~zqWEsvgK2JIHpkO6ylmeOeZemlN3skFfVjGs4~XST8JPONIbnhokxYej1gYla1~fbrd4f~ST66RUy6NTOfSfGh2s567TPokV9iyMKp85Swhw-W56P6-vaAG2uxGuWKhnoObGFC55A1352DmIv2mSZgyFd62iVRY4jQrBqf-pEns01wJv0S-dPsGyZGriS6aj2E1QmUjAT6wi0A__",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Expert Team Guide",
    image:
      "https://s3-alpha-sig.figma.com/img/f93f/b915/f6a596df6e82c3005a11cf0050875142?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hDBQzb-mY9HdT1vJ0YehoJierf01qEcrlk8AFKeoxUQo-ClEHfFlmvaP7JiRu3L3gIqizgeQEG-6iL8ZzFFxa0VTBctyKB1SJ88u0kaMaYAs2Oriy4PtNcnA7mYXyZjUliI-J~~z7V08w3sxrS2ox~OERODAZzkjPIoaMRuMLPRpYkgVyuJvEd5Rl18Mp0FFUV328tUF7QXSUv8OOn9GkvBFFnZHihqxqygTljEpmmAHuW39Og~T2xHwVJOuIaLtkPMhexHGYwQ~Jc8lGQovgJ~7O97FUaozf74ybeOuVz6nJgnec0-LzbR1~b6n7HzsXfMA9U-lFHS~iqva5-zKRA__",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
  },
];

const Aboutus = () => {
  return (
    <div className="min-h-screen bg-[#fff5f5]">
      <main>
        {/* Hero Banner */}
        <div className="">
          <Banner url="/about-us-banner.jpg">
            <h1 className="text-3xl md:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              About Us
            </h1>
          </Banner>
        </div>

        {/* Welcome Section */}
        <section className="relative py-12 md:py-24">
          <div className="mx-8 md:mx-20 max-md:px-4 flex flex-col lg:flex-row lg:justify-center lg:items-center gap-2 ">
            {/* Left content */}
            <div className="w-full lg:w-1/2 md:pr-8 md:mb-28">
              <h1 className="text-3xl md:text-4xl md:text-5xl font-bold mb-6">
                Welcome to MaltaXplore
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                Your ultimate guide to discovering the rich heritage, stunning
                landscapes, and vibrant culture of Malta.
              </p>
              <p className="text-gray-600 mb-4">
                Whether you're planning a relaxing getaway, an adventure-filled
                trip, or exploring Malta's history and traditions, MaltaXplore
                is here to make your journey unforgettable.
              </p>
              <p className="text-gray-600">
                As a team of passionate locals and travel enthusiasts, we bring
                together firsthand knowledge and insider tips to help you
                explore Malta like never before. From iconic landmarks to hidden
                gems, from culinary delights to thrilling experiences, we aim to
                connect you with the very best Malta has to offer.
              </p>
            </div>

            {/* Right images grid */}

            <div className="w-full lg:w-1/2 relative h-[600px] mt-16">
              {/* Top right image */}
              <div className="absolute right-0 top-0 w-[80%] h-[80%] md:w-[70%] md:h-[90%] rounded-2xl overflow-hidden z-20">
                <img
                  src="/malta-arial-view.png"
                  alt="Malta aerial view"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Top left floating image */}
              <div className="absolute left-0 md:left-16 top-[10%] w-[45%] h-[40%] md:w-[40%] md:h-[30%] rounded-2xl overflow-hidden z-30 shadow-xl bg-white p-2">
                <Tilt>
                  <img
                    src="/malta-church.png"
                    alt="Malta church"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </Tilt>
              </div>

              {/* Bottom left floating image */}
              <div className="absolute left-[10%] md:left-[0%] bottom-[10%] md:bottom-[18%] w-[45%] h-[40%] rounded-2xl overflow-hidden z-30 shadow-xl bg-white p-2">
                <Tilt>
                  <img
                    src="malta-harbor.png"
                    alt="Malta harbor"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </Tilt>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="relative py-12 md:py-24 bg-gray-50">
          {/* <div className="container mx-auto px-4"> */}
          <div className="mx-auto md:mx-20 max-md:px-4">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Left side with image */}
              <div className="w-full lg:w-1/2 relative">
                <h2 className="text-xl md:text-3xl md:text-4xl font-bold absolute left-0 py-2 px-4 rounded-tr-2xl z-10">
                  Our Story
                </h2>
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={"/images/ourstory.png"}
                    alt="Malta coastal village"
                    className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                  />
                </div>
              </div>

              {/* Right side with text */}
              <div className="w-full lg:w-1/2 bg-white p-6 md:p-8 rounded-2xl shadow-sm mt-2 lg:mt-12">
                <p className="text-lg md:text-xl text-gray-800 mb-6">
                  MaltaXplore began with a simple idea: to share the unmatched
                  beauty and rich culture of Malta with the world. What started
                  as a passion project by a group of avid travelers and proud
                  locals has grown into a trusted platform for exploring
                  everything the Maltese Islands have to offer.
                </p>
                <p className="text-base md:text-lg text-gray-600">
                  Driven by a love for Malta's history, stunning vistas, and
                  warm hospitality, we set out to create a space where visitors
                  can find authentic insights and practical advice to make their
                  trip unforgettable. Our story is one of connection,
                  inspiration, and a deep commitment to showcasing the heart of
                  Malta to travelers from all walks of life.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* CEO Section */}
        <section className="max-md:py-12 md:pt-24 relative">
          {/* <div className="container mx-auto px-4"> */}
          <div className="mx-2 md:mx-20 max-md:px-4">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto md:mb-24">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[#E5484D] text-6xl font-serif">"</span>
                <h2 className="text-2xl md:text-4xl font-bold">
                  At MaltaXplore, we aim to inspire and guide travelers,
                  ensuring every visit to Malta is unforgettable and authentic.
                </h2>
                <span className="text-[#E5484D] text-6xl font-serif rotate-180 mb-12">
                  "
                </span>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src="/founder.png"
                  alt="Cleven D'amato"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold">Cleven D'amato</h3>
                <p className="text-gray-600">CEO & Founder</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="relative py-12 md:py-16">
          <div className="relative max-w-[1400px] mx-8 md:mx-auto md:px-6">
            {/* Background Image */}
            <div className="w-full h-[260px] md:h-[500px] rounded-[2rem] overflow-hidden">
              <img
                src={"/images/ourmission.jpg"}
                alt="Malta coastline"
                className="w-full h-full object-cover max-md:hidden"
              />
            </div>

            {/* Overlay Title */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 px-12 md:mt-[-2rem] py-11 rounded-2xl">
              <h2 className="text-2xl md:text-4xl font-bold whitespace-nowrap">
                We are on a mission
              </h2>
            </div>

            {/* Mission and Vision Cards */}
            <div className="max-w-6xl mx-auto md:px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 -mt-32 relative z-10">
                {/* Mission Card */}
                <Tilt>
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">
                      Our Mission
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      At MaltaXplore, our mission is to inspire and empower
                      travelers by providing reliable, in-depth information
                      about Malta's attractions, activities, and accommodations.
                      We are committed to being your trusted resource, ensuring
                      every visitor to Malta has access to accurate, up-to-date,
                      and personalized travel insights.
                    </p>
                  </div>
                </Tilt>

                {/* Vision Card */}

                <Tilt>
                  <div className="bg-white p-8 rounded-2xl shadow-lg h-full">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">
                      Our Vision
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      To become the leading platform for exploring Malta,
                      recognized globally for fostering meaningful travel
                      experiences, promoting sustainable tourism, and
                      celebrating the unique beauty of the Maltese Islands.
                    </p>
                  </div>
                </Tilt>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <Section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 max-md:mx-8">
            Meet with our smart team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8 max-w-6xl mx-4 md:mx-auto">
            {teamMembers.map((member) => (
              <div key={member.id} className="group">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={533}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                  <div className="flex gap-2">
                    <a
                      href={member.socialLinks.linkedin}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <LinkedinIcon className="h-5 w-5 text-gray-600" />
                    </a>
                    <a
                      href={member.socialLinks.twitter}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <TwitterIcon className="h-5 w-5 text-gray-600" />
                    </a>
                    <a
                      href={member.socialLinks.instagram}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label={`${member.name}'s Instagram`}
                    >
                      <InstagramIcon className="h-5 w-5 text-gray-600" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact Section */}
        <Section className="bg-gray-50">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 d">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-8 md:mx-auto">
              Have questions or want to start your Malta adventure? Reach out to
              us, and our expert team will be happy to assist you.
            </p>
          </div>
        </Section>
        <ContactForm />
      </main>
    </div>
  );
};

export default Aboutus;
