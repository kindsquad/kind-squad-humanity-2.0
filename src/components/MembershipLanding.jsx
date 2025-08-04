import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const MembershipLanding = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [pendingRegistration, setPendingRegistration] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  useEffect(() => {
    // Check for pending registration data
    const registrationData = localStorage.getItem('pendingRegistration');
    if (registrationData) {
      setPendingRegistration(JSON.parse(registrationData));
      setShowRegistrationModal(true);
    }

    // Scroll animation
    const handleScrollAnimation = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Initial check

    return () => window.removeEventListener('scroll', handleScrollAnimation);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleMembershipClick = (tierName, price) => {
    if (pendingRegistration) {
      // Complete registration with selected tier
      setSelectedTier({ name: tierName, price });
      completeRegistration(tierName, price);
    } else {
      // Regular membership selection
      console.log(`Clicked: ${tierName} tier`);
      alert(`Thank you for your interest in the ${tierName} membership! Payment integration would be implemented here.`);
    }
  };

  const completeRegistration = async (tierName, price) => {
    try {
      console.log('Completing registration:', {
        ...pendingRegistration,
        selectedTier: tierName,
        price: price
      });

      // Simulate API call to complete registration
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Clear pending registration
      localStorage.removeItem('pendingRegistration');
      setPendingRegistration(null);
      setShowRegistrationModal(false);

      // Set auth token to simulate successful registration
      localStorage.setItem('authToken', 'demo-token-' + Date.now());

      alert(`Welcome to Kind Squad! Your ${tierName} membership has been activated. You can now access your member dashboard.`);
      
      // Redirect to member dashboard
      window.location.hash = '#/member';
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const faqData = [
    {
      question: "Can I cancel my membership at any time?",
      answer: "Yes, absolutely! You can cancel your Kind Squad Friend or Family membership at any time with no penalties or fees. Your membership benefits will continue until the end of your current billing period, and you can always rejoin later."
    },
    {
      question: "How do I access the private community?",
      answer: "Once you become a Kind Squad Friend or Family member, you'll receive an email invitation to join our private community platform within 24 hours. This exclusive space is where members connect, share ideas, and collaborate on missions."
    },
    {
      question: "Where does my contribution go?",
      answer: "Your membership contribution directly supports our mission operations, community platform maintenance, exclusive member events, and administrative costs. As a 501(c)(3) nonprofit, we're committed to transparency and provide detailed impact reports to all members."
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Yes! You can upgrade or downgrade your membership level at any time. Upgrades take effect immediately, while downgrades take effect at the end of your current billing period. You'll retain access to all benefits during your paid period."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <style jsx>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pricing-card {
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          border-color: #EAB308;
        }

        .cta-button {
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
        }

        .faq-icon {
          transition: transform 0.3s ease;
        }

        .faq-icon.rotated {
          transform: rotate(180deg);
        }

        .popular-badge {
          background: linear-gradient(45deg, #EAB308, #F59E0B);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="py-16 text-center bg-gradient-to-br from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent fade-in-up">
            Choose Your Impact Level
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 fade-in-up leading-relaxed">
            A $5 coffee gives you 20 minutes of caffeine. A $5 Kind Squad membership gives you a lifetime of impact.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            
            {/* Kind Squad Community (Free) */}
            <div className="pricing-card bg-gray-800 border-4 border-blue-500 rounded-xl p-8 text-center relative scroll-animate">
              <h3 className="text-2xl font-bold mb-2 text-white">Kind Squad Community</h3>
              <div className="text-5xl font-bold text-white mb-2">Free</div>
              
              <ul className="text-left mb-8 space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-white">Feature 1</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-white">Feature 2</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-white">Feature 3</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handleMembershipClick('Community', 'Free')}
                className="cta-button w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-6 rounded-lg text-lg"
              >
                JOIN NOW
              </button>
            </div>

            {/* Kind Squad Friend */}
            <div className="pricing-card bg-gray-800 border-4 border-pink-500 rounded-xl p-8 text-center relative scroll-animate">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Kind Squad Friend</h3>
              <div className="text-5xl font-bold text-white mb-2">$5<span className="text-lg">/mo</span></div>
              
              <ul className="text-left mb-8 space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-white">Feature 1</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-white">Feature 2</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-white">Feature 3</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handleMembershipClick('Friend', '$5/month')}
                className="cta-button w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-6 rounded-lg text-lg"
              >
                JOIN NOW
              </button>
            </div>

            {/* Kind Squad Family */}
            <div className="pricing-card bg-gray-800 border-4 border-purple-500 rounded-xl p-8 text-center relative scroll-animate">
              <h3 className="text-2xl font-bold mb-2 text-white">Kind Squad Family</h3>
              <div className="text-5xl font-bold text-white mb-2">$10<span className="text-lg">/mo</span></div>
              
              <ul className="text-left mb-8 space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-white">Feature 1</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-white">Feature 2</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-white">Feature 3</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handleMembershipClick('Family', '$10/month')}
                className="cta-button w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-6 rounded-lg text-lg"
              >
                JOIN NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-8 bg-gray-900">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-12 scroll-animate">Compare All Features</h2>
          <div className="overflow-x-auto scroll-animate">
            <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left p-4 text-gray-300">Features</th>
                  <th className="text-center p-4 text-gray-400">Kind Squad</th>
                  <th className="text-center p-4 text-blue-400">Kind Squad Friend</th>
                  <th className="text-center p-4 text-yellow-400">Kind Squad Family</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-gray-700">
                  <td className="p-4">SMS/push alerts for new missions</td>
                  <td className="text-center p-4">✅</td>
                  <td className="text-center p-4">✅</td>
                  <td className="text-center p-4">✅</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Access to mission updates</td>
                  <td className="text-center p-4">✅</td>
                  <td className="text-center p-4">✅</td>
                  <td className="text-center p-4">✅</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Community features on kindsquad.org</td>
                  <td className="text-center p-4">✅</td>
                  <td className="text-center p-4">✅</td>
                  <td className="text-center p-4">✅</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Annual exclusive sticker pack</td>
                  <td className="text-center p-4">❌</td>
                  <td className="text-center p-4">✅</td>
                  <td className="text-center p-4">✅</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Merchandise discount</td>
                  <td className="text-center p-4">❌</td>
                  <td className="text-center p-4">15%</td>
                  <td className="text-center p-4">20%</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Profile badge</td>
                  <td className="text-center p-4">❌</td>
                  <td className="text-center p-4">Friend</td>
                  <td className="text-center p-4">Family</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Annual exclusive mug</td>
                  <td className="text-center p-4">❌</td>
                  <td className="text-center p-4">❌</td>
                  <td className="text-center p-4">✅</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Free shipping on merchandise</td>
                  <td className="text-center p-4">❌</td>
                  <td className="text-center p-4">❌</td>
                  <td className="text-center p-4">✅</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Recognition on "Family Wall"</td>
                  <td className="text-center p-4">❌</td>
                  <td className="text-center p-4">❌</td>
                  <td className="text-center p-4">✅</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Monthly Member Spotlight eligibility</td>
                  <td className="text-center p-4">❌</td>
                  <td className="text-center p-4">❌</td>
                  <td className="text-center p-4">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-12 scroll-animate">From the Heart of the Kind Squad</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 scroll-animate">
              <p className="text-gray-300 mb-4 italic">"Being a Kind Squad Friend has shown me that small acts of kindness can create ripple effects of change. My $5 monthly contribution feels like the best investment I've ever made."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
                <div>
                  <div className="font-semibold text-white">Maria Rodriguez</div>
                  <div className="text-blue-400 text-sm">Kind Squad Friend</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 scroll-animate">
              <p className="text-gray-300 mb-4 italic">"The Family membership has connected me with an incredible community. Seeing my name on the Family Wall and being featured in the Member Spotlight made me feel truly valued."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">J</div>
                <div>
                  <div className="font-semibold text-white">James Chen</div>
                  <div className="text-yellow-400 text-sm">Kind Squad Family</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 scroll-animate">
              <p className="text-gray-300 mb-4 italic">"I started as a free member and quickly upgraded to Friend. The exclusive sticker pack and merchandise discounts are great, but the real value is being part of something bigger."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">S</div>
                <div>
                  <div className="font-semibold text-white">Sarah Johnson</div>
                  <div className="text-blue-400 text-sm">Kind Squad Friend</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-12 scroll-animate">Frequently Asked Questions</h2>
          <div className="space-y-4 scroll-animate">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-750 transition-colors"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <span className={`faq-icon text-yellow-400 text-xl ${openFAQ === index ? 'rotated' : ''}`}>
                    ▼
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Completion Modal */}
      {showRegistrationModal && pendingRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Complete Your Registration</h3>
              <p className="text-gray-400">
                Welcome {pendingRegistration.firstName}! Choose your membership tier to complete registration.
              </p>
            </div>

            <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4 mb-6">
              <p className="text-yellow-200 text-sm">
                <strong>Account Details:</strong><br />
                Name: {pendingRegistration.firstName} {pendingRegistration.lastName}<br />
                Email: {pendingRegistration.email}
                {pendingRegistration.phone && <><br />Phone: {pendingRegistration.phone}</>}
              </p>
            </div>

            <p className="text-gray-300 text-center mb-6">
              Select a membership tier below to activate your account and start making an impact!
            </p>

            <div className="text-center">
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Choose membership tier below ↓
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MembershipLanding;

