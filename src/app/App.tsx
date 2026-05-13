import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  MapPin,
  Users,
  MessageCircle,
  Briefcase,
  ShoppingCart,
  Star,
  Download,
  CheckCircle2,
  TrendingUp,
  Globe,
  Shield,
  Smartphone,
  Zap,
  Navigation,
  Menu,
  X,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { ThemeToggle } from "./components/ThemeToggle";
import { LanguageSelector } from "./components/LanguageSelector";
import { Language, translations } from "./locales/translations";
import { PeaLogo } from "./components/PeaLogo";
import { PhoneMockup } from "./components/PhoneMockup";
import qrCode from "figma:asset/77275bbaa65ab8bc7f52cd79bb5b11119870d13f.png";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<Language>("ko");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }

    // Check for saved language preference
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["ko", "en", "fr", "zh"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-white dark:bg-[#1A211D] transition-colors duration-300">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-[#323E38]/90 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <PeaLogo size={50} className="sm:hidden" />
              <PeaLogo size={60} className="hidden sm:block md:hidden" />
              <PeaLogo size={80} className="hidden md:block" />
              <span
                className="text-lg sm:text-xl md:text-2xl font-bold"
                style={{
                  background:
                    "linear-gradient(to right, #258D55, #30B66E, #64C74C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                WanduGo
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-8 items-center">
              <a
                href="#features"
                className="text-[#59625C] dark:text-[#AEB4B0] hover:text-[#258D55] dark:hover:text-[#49CF87] transition-colors font-medium"
              >
                {t.features}
              </a>
              <a
                href="#download"
                className="text-[#59625C] dark:text-[#AEB4B0] hover:text-[#258D55] dark:hover:text-[#49CF87] transition-colors font-medium"
              >
                {t.download}
              </a>
              <a
                href="#about"
                className="text-[#59625C] dark:text-[#AEB4B0] hover:text-[#258D55] dark:hover:text-[#49CF87] transition-colors font-medium"
              >
                {t.about}
              </a>
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
              />
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              <a
                href="https://wandugo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all font-semibold"
                style={{
                  background: "linear-gradient(to right, #30B66E, #64C74C)",
                }}
              >
                {t.getStarted}
              </a>
            </div>

            {/* Mobile Theme Toggle - Placeholder for spacing */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              {/* Spacer for hamburger button */}
              <div className="w-10 h-10" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button - Fixed at top right, independent z-index */}
      <div className="fixed top-0 right-0 lg:hidden" style={{ zIndex: 10001 }}>
        <div className="flex items-center h-16 sm:h-20 px-4 sm:px-6">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-[#F6F8F7] dark:hover:bg-[#59625C] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#323E38] dark:text-[#F6F8F7]" />
            ) : (
              <Menu className="w-6 h-6 text-[#323E38] dark:text-[#F6F8F7]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Outside nav for independent stacking */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9998,
        }}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel - Outside nav for independent stacking */}
      <motion.div
        initial={false}
        animate={{
          x: isMobileMenuOpen ? 0 : "100%",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 bottom-0 w-full sm:w-80 bg-white dark:bg-[#323E38] shadow-2xl lg:hidden overflow-y-auto"
        style={{
          position: "fixed",
          height: "100dvh",
          zIndex: 10000,
          willChange: "transform",
        }}
      >
        <div className="flex flex-col h-full pt-16 sm:pt-20">
          {/* Menu Items */}
          <div className="flex-1 px-6 py-8 space-y-6">
            {/* Language Selector in Mobile Menu */}
            <div className="pb-6 border-b border-[#DCE0DE] dark:border-[#59625C]">
              <p className="text-xs font-semibold text-[#8D948F] dark:text-[#AEB4B0] mb-3 uppercase tracking-wider">
                Language / 언어
              </p>
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
              />
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2">
              <a
                href="#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#323E38] dark:text-[#F6F8F7] hover:bg-[#EBF8E8] dark:hover:bg-[#59625C] transition-all group"
              >
                <Zap className="w-5 h-5 text-[#258D55] dark:text-[#49CF87]" />
                <span className="font-medium">{t.features}</span>
              </a>
              <a
                href="#download"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#323E38] dark:text-[#F6F8F7] hover:bg-[#EBF8E8] dark:hover:bg-[#59625C] transition-all group"
              >
                <Download className="w-5 h-5 text-[#258D55] dark:text-[#49CF87]" />
                <span className="font-medium">{t.download}</span>
              </a>
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#323E38] dark:text-[#F6F8F7] hover:bg-[#EBF8E8] dark:hover:bg-[#59625C] transition-all group"
              >
                <Navigation className="w-5 h-5 text-[#258D55] dark:text-[#49CF87]" />
                <span className="font-medium">{t.about}</span>
              </a>
            </nav>
          </div>

          {/* CTA Button at Bottom */}
          <div className="p-6 border-t border-[#DCE0DE] dark:border-[#59625C]">
            <a
              href="https://wandugo.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-white px-6 py-4 rounded-full hover:shadow-lg transition-all font-semibold"
              style={{
                background: "linear-gradient(to right, #30B66E, #64C74C)",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Download className="w-5 h-5" />
              {t.getStarted}
            </a>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EBF8E8] via-[#C9ECC1] to-[#FFF5E0] dark:from-[#1B653D]/30 dark:via-[#2A5D1D]/30 dark:to-[#AD7200]/20" />
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#64C74C] dark:bg-[#258D55] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#49CF87] dark:bg-[#30B66E] rounded-full blur-3xl" />
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-6 px-4 py-2 bg-white/80 dark:bg-[#323E38]/80 backdrop-blur-sm rounded-full border border-[#C9ECC1] dark:border-[#1B653D]"
          >
            <span className="text-[#258D55] dark:text-[#49CF87] font-semibold">
              {t.platformTag}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 px-4"
            style={{
              background:
                "linear-gradient(to right, #258D55, #30B66E, #64C74C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Poppins', sans-serif",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t.heroTitle1}
            <br />
            {t.heroTitle2}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-[#59625C] dark:text-[#AEB4B0] mb-8 sm:mb-6 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t.heroSubtitle1}
            <br />
            <span className="font-semibold text-[#258D55] dark:text-[#49CF87]">
              {t.heroSubtitle2}
            </span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <a
              href="https://wandugo.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto group text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(to right, #30B66E, #64C74C)",
              }}
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              {t.downloadApp}
            </a>
            <button
              onClick={() => {
                const featuresSection = document.getElementById("features");
                featuresSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto bg-white dark:bg-[#323E38] text-[#323E38] dark:text-[#F6F8F7] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold border-2 border-[#DCE0DE] dark:border-[#59625C] hover:border-[#258D55] dark:hover:border-[#49CF87] transition-all"
            >
              {t.learnMore}
            </button>
          </motion.div>

          <motion.div className="mt-20" style={{ opacity }}>
            <div className="inline-block animate-bounce">
              <div className="w-8 h-12 border-2 border-[#30B66E] dark:border-[#49CF87] rounded-full flex justify-center pt-2">
                <div className="w-1.5 h-3 bg-[#30B66E] dark:bg-[#49CF87] rounded-full" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white dark:bg-[#1A211D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1A211D] dark:text-white">
              {t.problemTitle}
            </h2>
            <p className="text-xl text-[#59625C] dark:text-[#AEB4B0] max-w-3xl mx-auto">
              {t.problemSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Briefcase,
                title: t.problem1Title,
                description: t.problem1Desc,
              },
              {
                icon: Users,
                title: t.problem2Title,
                description: t.problem2Desc,
              },
              {
                icon: MapPin,
                title: t.problem3Title,
                description: t.problem3Desc,
              },
              {
                icon: Shield,
                title: t.problem4Title,
                description: t.problem4Desc,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-[#F6F8F7] to-white dark:from-[#323E38] dark:to-[#1A211D] p-8 rounded-2xl border border-[#DCE0DE] dark:border-[#59625C] hover:border-[#C9ECC1] dark:hover:border-[#258D55] hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #C9ECC1, #A8E09A)",
                  }}
                >
                  <item.icon className="w-7 h-7 text-[#258D55]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A211D] dark:text-white">
                  {item.title}
                </h3>
                <p className="text-[#59625C] dark:text-[#AEB4B0]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Value Section */}
      <section className="py-24 bg-gradient-to-br from-[#EBF8E8] via-[#C9ECC1] to-[#FFF5E0] dark:from-[#1B653D]/20 dark:via-[#2A5D1D]/20 dark:to-[#AD7200]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1A211D] dark:text-white">
              {t.keyValueTitle}
            </h2>
            <p className="text-xl text-[#59625C] dark:text-[#AEB4B0] max-w-3xl mx-auto italic">
              "{t.keyValueSubtitle}"
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                emoji: "🌍",
                title: t.value1Title,
                description: t.value1Desc,
              },
              {
                emoji: "🤝",
                title: t.value2Title,
                description: t.value2Desc,
              },
              {
                emoji: "⚡",
                title: t.value3Title,
                description: t.value3Desc,
              },
              {
                emoji: "📍",
                title: t.value4Title,
                description: t.value4Desc,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-[#323E38] p-8 rounded-2xl border border-[#DCE0DE] dark:border-[#59625C] hover:border-[#C9ECC1] dark:hover:border-[#258D55] hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl mb-6">{item.emoji}</div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A211D] dark:text-white">
                  {item.title}
                </h3>
                <p className="text-[#59625C] dark:text-[#AEB4B0]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-[#1A211D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1A211D] dark:text-white">
              {t.featuresTitle}
            </h2>
            <p className="text-xl text-[#59625C] dark:text-[#AEB4B0] max-w-3xl mx-auto">
              {t.featuresSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: t.feature1Title,
                description: t.feature1Desc,
                color: "linear-gradient(to bottom right, #30B66E, #64C74C)",
              },
              {
                icon: Briefcase,
                title: t.feature2Title,
                description: t.feature2Desc,
                color: "linear-gradient(to bottom right, #258D55, #49CF87)",
              },
              {
                icon: Users,
                title: t.feature3Title,
                description: t.feature3Desc,
                color: "linear-gradient(to bottom right, #64C74C, #A8E09A)",
              },
              {
                icon: MessageCircle,
                title: t.feature4Title,
                description: t.feature4Desc,
                color: "linear-gradient(to bottom right, #FFAF14, #FFC14A)",
              },
              {
                icon: Star,
                title: t.feature5Title,
                description: t.feature5Desc,
                color: "linear-gradient(to bottom right, #FFC14A, #FFD27A)",
              },
              {
                icon: ShoppingCart,
                title: t.feature6Title,
                description: t.feature6Desc,
                color: "linear-gradient(to bottom right, #EC7D17, #F09847)",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white dark:bg-[#323E38] p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-[#DCE0DE] dark:border-[#59625C]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{
                    background: feature.color,
                  }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-[#1A211D] dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-[#59625C] dark:text-[#AEB4B0] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section
        id="download"
        className="py-24 bg-gradient-to-br from-[#EBF8E8] via-[#C9ECC1] to-[#FFF5E0] dark:from-[#1B653D]/20 dark:via-[#2A5D1D]/20 dark:to-[#AD7200]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* App Preview Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1A211D] dark:text-white">
              {t.downloadTitle1}
              <br />
              {t.downloadTitle2}
            </h2>
            <p className="text-xl text-[#59625C] dark:text-[#AEB4B0] max-w-3xl mx-auto mb-16">
              {t.downloadSubtitle}
            </p>

            {/* Phone Mockups */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PhoneMockup variant="jobs" />
              <PhoneMockup variant="map" />
              <PhoneMockup variant="community" />
            </div>
          </motion.div>

          {/* Download CTA */}
          <div
            className="rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background:
                "linear-gradient(to bottom right, #30B66E, #64C74C, #4CAB35)",
            }}
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-between p-8 md:p-20">
              <motion.div
                className="flex-1 text-center md:text-left max-w-xl w-full"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 md:mb-6">
                  <Smartphone className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    Available Now
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  {t.downloadTitle1}
                </h3>
                <p className="text-base md:text-lg text-white/95 mb-6 md:mb-8 leading-relaxed">
                  {t.downloadSubtitle}
                </p>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium text-sm md:text-base">
                        {t.freeDownload}
                      </p>
                      <p className="text-white/80 text-xs md:text-sm">
                        {t.freeDownloadDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium text-sm md:text-base">
                        {t.globalService}
                      </p>
                      <p className="text-white/80 text-xs md:text-sm">
                        {t.globalServiceDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium text-sm md:text-base">
                        {t.safePlatform}
                      </p>
                      <p className="text-white/80 text-xs md:text-sm">
                        {t.safePlatformDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col items-center w-full md:w-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <a
                  href="https://wandugo.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-xl group-hover:bg-white/20 transition-all duration-300" />

                  <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-2xl group-hover:scale-105 transition-all duration-300">
                    <div className="text-center mb-4 md:mb-6">
                      <p className="text-[#258D55] font-bold text-lg md:text-xl mb-2">
                        {t.qrCode}
                      </p>
                      <p className="text-[#59625C] text-xs md:text-sm leading-relaxed">
                        {t.scanToDownload}
                        <br />
                        <span className="text-xs text-[#8D948F]">
                          {t.scanWithCamera}
                        </span>
                      </p>
                    </div>

                    <div className="relative flex justify-center">
                      <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-white rounded-2xl p-3 md:p-4 border-4 border-[#C9ECC1] group-hover:border-[#64C74C] transition-all duration-300">
                        <img
                          src={qrCode}
                          alt="WanduGo QR Code"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Corner decorations */}
                      <div className="absolute -top-2 -left-2 w-6 h-6 md:w-8 md:h-8 border-t-4 border-l-4 border-[#258D55] rounded-tl-lg" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 border-t-4 border-r-4 border-[#258D55] rounded-tr-lg" />
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 md:w-8 md:h-8 border-b-4 border-l-4 border-[#258D55] rounded-bl-lg" />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 md:w-8 md:h-8 border-b-4 border-r-4 border-[#258D55] rounded-br-lg" />
                    </div>

                    <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 text-[#258D55]">
                      <Download className="w-4 h-4 md:w-5 md:h-5 animate-bounce" />
                      <span className="text-xs md:text-sm font-semibold">
                        {t.downloadNow}
                      </span>
                    </div>
                  </div>
                </a>

                <p className="mt-4 md:mt-6 text-white/70 text-xs text-center max-w-xs">
                  {t.appAvailability}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section
        id="about"
        className="py-24 bg-gradient-to-br from-[#F6F8F7] to-white dark:from-[#323E38] dark:to-[#1A211D]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1A211D] dark:text-white">
              {t.visionTitle}
            </h2>
            <p className="text-xl text-[#59625C] dark:text-[#AEB4B0] max-w-3xl mx-auto">
              {t.visionSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                number: t.stat1Number,
                label: t.stat1Label,
                description: t.stat1Desc,
              },
              {
                icon: TrendingUp,
                number: t.stat2Number,
                label: t.stat2Label,
                description: t.stat2Desc,
              },
              {
                icon: Users,
                number: t.stat3Number,
                label: t.stat3Label,
                description: t.stat3Desc,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-[#323E38] p-8 rounded-2xl border border-[#DCE0DE] dark:border-[#59625C] text-center hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #C9ECC1, #A8E09A)",
                  }}
                >
                  <stat.icon className="w-8 h-8 text-[#258D55]" />
                </div>
                <div className="text-4xl font-bold text-[#258D55] dark:text-[#49CF87] mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-[#1A211D] dark:text-white mb-2">
                  {stat.label}
                </div>
                <p className="text-[#59625C] dark:text-[#AEB4B0]">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(to bottom right, #30B66E, #64C74C, #4CAB35)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t.ctaTitle}
            </h2>
            <p className="text-xl text-white/90 mb-10">{t.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wandugo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-[#258D55] px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                {t.downloadApp}
              </a>
              <a
                href="mailto:canada.jellyjo@gmail.com"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                {t.contact}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#323E38] dark:bg-[#1A211D] text-white py-16 border-t border-[#59625C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-3 mb-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#49CF87]"
                aria-label="Scroll to top"
              >
                <PeaLogo size={80} />
                <span
                  className="text-2xl font-bold"
                  style={{
                    background:
                      "linear-gradient(to right, #49CF87, #64C74C, #A8E09A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  WanduGo
                </span>
              </button>
              <p className="text-[#AEB4B0] mb-4 max-w-md">{t.footerDesc}</p>
              <p className="text-[#8D948F] text-sm">{t.footerTagline}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.platformSection}</h4>
              <ul className="space-y-2 text-[#AEB4B0]">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.jobs}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.community}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.groupBuying}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.usedMarket}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.companySection}</h4>
              <ul className="space-y-2 text-[#AEB4B0]">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.intro}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.team}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.invest}
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:canada.jellyjo@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    {t.contactUs}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#59625C] pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#8D948F] text-sm">{t.copyright}</p>
              <div className="flex gap-6 text-sm text-[#8D948F]">
                <a href="#" className="hover:text-white transition-colors">
                  {t.terms}
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  {t.privacy}
                </a>
                <a
                  href="mailto:canada.jellyjo@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  {t.contactUs}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
