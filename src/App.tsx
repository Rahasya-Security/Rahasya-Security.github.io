import { useEffect, useState, useRef } from 'react';
import HEAnimation from './components/HEAnimation';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load GSAP scripts
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
      // Animated Background
      if (backgroundRef.current && window.gsap) {
        const container = backgroundRef.current;
        const dotCount = 120;
        const lineCount = 40;

        // Create moving dots
        for (let i = 0; i < dotCount; i++) {
          const dot = document.createElement('div');
          dot.className = 'animated-dot';
          const size = Math.random() * 6 + 4;
          dot.style.width = size + 'px';
          dot.style.height = size + 'px';
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          dot.style.left = startX + '%';
          dot.style.top = startY + '%';
          dot.style.opacity = String(Math.random() * 0.6 + 0.4);
          
          container.appendChild(dot);

          if (window.gsap) {
            const duration = Math.random() * 25 + 20;
            const xMovement = (Math.random() - 0.5) * 300;
            const yMovement = (Math.random() - 0.5) * 300;

            window.gsap.to(dot, {
              x: xMovement,
              y: yMovement,
              duration: duration,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: Math.random() * 3
            });
          }
        }

        // Create connecting lines
        for (let i = 0; i < lineCount; i++) {
          const line = document.createElement('div');
          line.className = 'animated-line';
          const length = Math.random() * 200 + 80;
          const angle = Math.random() * 360;
          line.style.width = length + 'px';
          line.style.height = '2px';
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          line.style.left = startX + '%';
          line.style.top = startY + '%';
          line.style.transform = `rotate(${angle}deg)`;
          line.style.transformOrigin = 'left center';
          
          container.appendChild(line);

          if (window.gsap) {
            window.gsap.to(line, {
              rotation: angle + 360,
              duration: Math.random() * 40 + 25,
              repeat: -1,
              ease: "none"
            });
          }
        }

        // Parallax effect
        if (window.gsap && window.ScrollTrigger) {
          window.gsap.to(container, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
              trigger: "body",
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          });
        }
      }

      // GSAP Scroll-triggered animations for cards
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        if (window.gsap && window.ScrollTrigger) {
          const cards = document.querySelectorAll('.glass-card, .bg-white.rounded-2xl');
          cards.forEach((card, index) => {
            const cardElement = card as HTMLElement;
            
            // Check if element is already in viewport
            const rect = cardElement.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
            
            if (isInViewport) {
              // If already visible, just set to final state immediately
              window.gsap.set(card, { opacity: 1, y: 0 });
            } else {
              // Set initial state and animate in when scrolled into view
              window.gsap.set(card, { opacity: 0, y: 50 });
              
              window.gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none none",
                  once: true
                },
                delay: index * 0.1
              });
            }
          });
        }
      }, 100);
    });
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setMobileMenuOpen(false);
    }
  };

  const showToast = () => {
    if (toastRef.current && window.gsap) {
      window.gsap.to(toastRef.current, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      setTimeout(() => {
        if (toastRef.current && window.gsap) {
          window.gsap.to(toastRef.current, {
            x: 400,
            duration: 0.3,
            ease: "power2.in"
          });
        }
      }, 2500);
    }
  };

  return (
    <div className="text-gray-900 antialiased relative" style={{background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)'}}>
      {/* Animated Background */}
      <div id="animated-background" ref={backgroundRef}></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex justify-between items-center h-20">
            <a href="#" className="flex items-center">
              <img src="/Cipherra_logo.jpeg" alt="Cipherra Logo" className="logo-img" />
            </a>
            <ul className="hidden md:flex items-center gap-10 list-none">
              <li><a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')} className="text-gray-700 font-medium hover:text-cipherra-blue transition-colors text-sm">Features</a></li>
              <li><a href="#applications" onClick={(e) => handleSmoothScroll(e, '#applications')} className="text-gray-700 font-medium hover:text-cipherra-blue transition-colors text-sm">Applications</a></li>
              <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="text-gray-700 font-medium hover:text-cipherra-blue transition-colors text-sm">Contact</a></li>
              <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="ml-4 px-6 py-2.5 bg-cipherra-blue text-white font-semibold rounded-full hover:bg-cipherra-blue-dark transition-all text-sm shadow-lg shadow-cipherra-blue/20 hover:shadow-xl hover:shadow-cipherra-blue/30">Get Started</a></li>
            </ul>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-cipherra-blue transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </nav>
        </div>
        {/* Mobile menu */}
        <div className={`${mobileMenuOpen ? '' : 'hidden'} md:hidden bg-white border-t border-gray-100`}>
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-3">
            <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')} className="block text-gray-700 font-medium hover:text-cipherra-blue transition-colors py-2">Features</a>
            <a href="#applications" onClick={(e) => handleSmoothScroll(e, '#applications')} className="block text-gray-700 font-medium hover:text-cipherra-blue transition-colors py-2">Applications</a>
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="block text-gray-700 font-medium hover:text-cipherra-blue transition-colors py-2">Contact</a>
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="block px-6 py-2.5 bg-cipherra-blue text-white font-semibold rounded-full text-center hover:bg-cipherra-blue-dark transition-all">Get Started</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-white/40 via-cipherra-blue-lighter/40 to-white/40 backdrop-blur-xs z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-cipherra-blue-light rounded-full mb-8">
              <span className="text-cipherra-blue text-sm font-semibold">🔒 Privacy-Preserving Analytics</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="text-gray-900">Compute on Encrypted Data</span><br />
              <span className="gradient-text">Without Ever Decrypting It</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Revolutionary homomorphic encryption technology enabling secure data processing while maintaining complete privacy. Your data stays encrypted from start to finish.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="px-8 py-4 bg-cipherra-blue text-white font-semibold rounded-full hover:bg-cipherra-blue-dark transition-all shadow-xl shadow-cipherra-blue/30 hover:shadow-2xl hover:shadow-cipherra-blue/40 hover:-translate-y-1 text-lg">
                Get Early Access
              </a>
              <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')} className="px-8 py-4 bg-white text-cipherra-blue font-semibold rounded-full border-2 border-cipherra-blue hover:bg-cipherra-blue-light transition-all text-lg">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 bg-white/40 backdrop-blur-xs relative z-10" id="features">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Homomorphic Encryption Changes Everything
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlock the power of secure computation without compromising privacy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-3xl p-8 shadow-xl card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-cipherra-blue to-cipherra-blue-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Never Decrypt</h3>
              <p className="text-gray-600 leading-relaxed">
                Perform complex computations on encrypted data without ever exposing the raw information. Your sensitive data remains protected throughout the entire process.
              </p>
            </div>
            
            <div className="glass-card rounded-3xl p-8 shadow-xl card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-cipherra-blue to-cipherra-blue-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Full Functionality</h3>
              <p className="text-gray-600 leading-relaxed">
                Execute any mathematical operation, machine learning algorithm, or business logic on encrypted data with complete functionality preserved.
              </p>
            </div>
            
            <div className="glass-card rounded-3xl p-8 shadow-xl card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-cipherra-blue to-cipherra-blue-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">🌐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Zero Trust Architecture</h3>
              <p className="text-gray-600 leading-relaxed">
                Enable secure multi-party computation where no single entity has access to the complete dataset, perfect for collaborative analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Homomorphic Encryption Animation Section */}
      <section className="py-20 md:py-28 bg-white/40 backdrop-blur-xs relative z-10" id="he-animation">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <HEAnimation />
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-white/40 to-gray-50/40 backdrop-blur-xs relative z-10" id="applications">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Potential Applications We're Exploring
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transforming industries with privacy-preserving analytics
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-xl hover:border-cipherra-blue/30 transition-all card-hover">
              <div className="w-12 h-12 bg-cipherra-blue-light rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏥</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Healthcare Analytics</h4>
              <p className="text-gray-600 leading-relaxed text-sm">Analyze patient data across hospitals without compromising privacy or HIPAA compliance.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-xl hover:border-cipherra-blue/30 transition-all card-hover">
              <div className="w-12 h-12 bg-cipherra-blue-light rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Financial Services</h4>
              <p className="text-gray-600 leading-relaxed text-sm">Enable secure credit scoring and fraud detection while keeping financial data encrypted.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-xl hover:border-cipherra-blue/30 transition-all card-hover">
              <div className="w-12 h-12 bg-cipherra-blue-light rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">☁️</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Cloud Computing</h4>
              <p className="text-gray-600 leading-relaxed text-sm">Process sensitive workloads in the cloud without trusting the cloud provider with your data.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-xl hover:border-cipherra-blue/30 transition-all card-hover">
              <div className="w-12 h-12 bg-cipherra-blue-light rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Machine Learning</h4>
              <p className="text-gray-600 leading-relaxed text-sm">Train ML models on encrypted datasets, enabling privacy-preserving AI applications.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-xl hover:border-cipherra-blue/30 transition-all card-hover">
              <div className="w-12 h-12 bg-cipherra-blue-light rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Government & Defense</h4>
              <p className="text-gray-600 leading-relaxed text-sm">Secure multi-agency data sharing and analysis without exposing classified information.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-xl hover:border-cipherra-blue/30 transition-all card-hover">
              <div className="w-12 h-12 bg-cipherra-blue-light rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📡</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">IoT & Edge Computing</h4>
              <p className="text-gray-600 leading-relaxed text-sm">Process sensor data securely at the edge while maintaining end-to-end encryption.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-cipherra-blue via-cipherra-blue-dark to-cipherra-blue text-white relative overflow-hidden z-10" id="contact">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Data Privacy?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join us in building the future of secure computation. Get early access to our platform and help shape the applications that matter most.
          </p>
          <div className="max-w-2xl mx-auto mb-8 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 md:p-8 pt-8 md:pt-10">
              <iframe src="https://tally.so/embed/wAGZxN?alignLeft=1&hideTitle=1&transparentBackground=1" loading="lazy" width="100%" height="200" frameBorder="0" marginHeight={0} marginWidth={0} title="Cipherra Early Access" style={{ borderRadius: '0' }}></iframe>
            </div>
          </div>
          <p className="text-blue-200 text-sm">
            We're currently in stealth mode. Be the first to know when we launch.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-gray-300 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="h-10 mb-4 flex items-center">
                <div style={{background: 'white', padding: '4px', borderRadius: '4px', display: 'inline-block'}}>
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
                <li><a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')} className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
                <li><a href="#applications" onClick={(e) => handleSmoothScroll(e, '#applications')} className="text-gray-400 hover:text-white transition-colors text-sm">Applications</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast(); }} className="text-gray-400 hover:text-white transition-colors text-sm">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast(); }} className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast(); }} className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast(); }} className="text-gray-400 hover:text-white transition-colors text-sm">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li><a href="mailto:nithesh2108@gmail.com,chopradhruv1610@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm">Email</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast(); }} className="text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast(); }} className="text-gray-400 hover:text-white transition-colors text-sm">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Cipherra. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Toast notification */}
      <div ref={toastRef} className="fixed top-5 right-5 bg-cipherra-blue text-white px-6 py-4 rounded-full font-semibold shadow-2xl transform translate-x-96 transition-transform duration-300 z-50">
        Coming Soon! 🚀
      </div>
    </div>
  );
}

export default App;

