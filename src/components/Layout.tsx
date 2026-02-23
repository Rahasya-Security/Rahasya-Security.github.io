import { useEffect, useState, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const loadGSAP = () => {
      if (window.gsap) return Promise.resolve();
      return new Promise<void>((resolve) => {
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
        gsapScript.onload = () => {
          const scrollTriggerScript = document.createElement('script');
          scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
          scrollTriggerScript.onload = () => {
            if (window.gsap && window.ScrollTrigger) {
              window.gsap.registerPlugin(window.ScrollTrigger);
            }
            resolve();
          };
          document.head.appendChild(scrollTriggerScript);
        };
        document.head.appendChild(gsapScript);
      });
    };

    loadGSAP().then(() => {
      if (backgroundRef.current && window.gsap) {
        const container = backgroundRef.current;
        const dotCount = 120;
        const lineCount = 40;

        for (let i = 0; i < dotCount; i++) {
          const dot = document.createElement('div');
          dot.className = 'animated-dot';
          const size = Math.random() * 6 + 4;
          dot.style.width = size + 'px';
          dot.style.height = size + 'px';
          dot.style.left = Math.random() * 100 + '%';
          dot.style.top = Math.random() * 100 + '%';
          dot.style.opacity = String(Math.random() * 0.6 + 0.4);
          container.appendChild(dot);

          window.gsap.to(dot, {
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 300,
            duration: Math.random() * 25 + 20,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 3,
          });
        }

        for (let i = 0; i < lineCount; i++) {
          const line = document.createElement('div');
          line.className = 'animated-line';
          const length = Math.random() * 200 + 80;
          const angle = Math.random() * 360;
          line.style.width = length + 'px';
          line.style.height = '2px';
          line.style.left = Math.random() * 100 + '%';
          line.style.top = Math.random() * 100 + '%';
          line.style.transform = `rotate(${angle}deg)`;
          line.style.transformOrigin = 'left center';
          container.appendChild(line);

          window.gsap.to(line, {
            rotation: angle + 360,
            duration: Math.random() * 40 + 25,
            repeat: -1,
            ease: 'none',
          });
        }

        if (window.gsap && window.ScrollTrigger) {
          window.gsap.to(container, {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }
    });
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (isHome) {
      handleSmoothScroll(e, targetId);
    } else {
      e.preventDefault();
      navigate('/' + targetId);
      setMobileMenuOpen(false);
    }
  };

  const showToast = () => {
    if (toastRef.current && window.gsap) {
      window.gsap.to(toastRef.current, { x: 0, duration: 0.3, ease: 'power2.out' });
      setTimeout(() => {
        if (toastRef.current && window.gsap) {
          window.gsap.to(toastRef.current, { x: 400, duration: 0.3, ease: 'power2.in' });
        }
      }, 2500);
    }
  };

  return (
    <div className="text-gray-900 antialiased relative" style={{ background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)' }}>
      <div id="animated-background" ref={backgroundRef} />

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center">
              <img src="/Cipherra_logo.jpeg" alt="Cipherra Logo" className="logo-img" />
            </Link>
            <ul className="hidden md:flex items-center gap-10 list-none">
              <li>
                <a href="#features" onClick={(e) => handleNavClick(e, '#features')} className="text-gray-700 font-medium hover:text-cipherra-blue transition-colors text-sm">Features</a>
              </li>
              <li>
                <a href="#applications" onClick={(e) => handleNavClick(e, '#applications')} className="text-gray-700 font-medium hover:text-cipherra-blue transition-colors text-sm">Applications</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="text-gray-700 font-medium hover:text-cipherra-blue transition-colors text-sm">Contact</a>
              </li>
              <li>
                <Link to="/blog" className="text-gray-700 font-medium hover:text-cipherra-blue transition-colors text-sm">Blog</Link>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="ml-4 px-6 py-2.5 bg-cipherra-blue text-white font-semibold rounded-full hover:bg-cipherra-blue-dark transition-all text-sm shadow-lg shadow-cipherra-blue/20 hover:shadow-xl hover:shadow-cipherra-blue/30">Get Started</a>
              </li>
            </ul>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-cipherra-blue transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </div>
        <div className={`${mobileMenuOpen ? '' : 'hidden'} md:hidden bg-white border-t border-gray-100`}>
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-3">
            <a href="#features" onClick={(e) => handleNavClick(e, '#features')} className="block text-gray-700 font-medium hover:text-cipherra-blue transition-colors py-2">Features</a>
            <a href="#applications" onClick={(e) => handleNavClick(e, '#applications')} className="block text-gray-700 font-medium hover:text-cipherra-blue transition-colors py-2">Applications</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="block text-gray-700 font-medium hover:text-cipherra-blue transition-colors py-2">Contact</a>
            <Link to="/blog" className="block text-gray-700 font-medium hover:text-cipherra-blue transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="block px-6 py-2.5 bg-cipherra-blue text-white font-semibold rounded-full text-center hover:bg-cipherra-blue-dark transition-all">Get Started</a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <Outlet />
      </main>

      <footer className="py-16 bg-gray-900 text-gray-300 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="h-10 mb-4 flex items-center">
                <div style={{ background: 'white', padding: '4px', borderRadius: '4px', display: 'inline-block' }}>
                  <img src="/Cipherra_logo.jpeg" alt="Cipherra Logo" className="h-8 w-auto" />
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Building the future of privacy-preserving analytics with homomorphic encryption.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" onClick={(e) => handleNavClick(e, '#features')} className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
                <li><a href="#applications" onClick={(e) => handleNavClick(e, '#applications')} className="text-gray-400 hover:text-white transition-colors text-sm">Applications</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast(); }} className="text-gray-400 hover:text-white transition-colors text-sm">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast(); }} className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast(); }} className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li><a href="mailto:nithesh@cipherra.ai,dhruv@cipherra.ai" className="text-gray-400 hover:text-white transition-colors text-sm">Email</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast(); }} className="text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast(); }} className="text-gray-400 hover:text-white transition-colors text-sm">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm">© 2026 Cipherra. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <div ref={toastRef} className="fixed top-5 right-5 bg-cipherra-blue text-white px-6 py-4 rounded-full font-semibold shadow-2xl transform translate-x-96 transition-transform duration-300 z-50">
        Coming Soon! 🚀
      </div>
    </div>
  );
}
