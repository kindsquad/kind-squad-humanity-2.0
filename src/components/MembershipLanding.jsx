import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const MembershipLanding = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
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

  const handleMembershipClick = (tierName, buttonText) => {
    console.log(`Clicked: ${buttonText} for ${tierName} tier`);
    // Add payment integration here
    alert(`Thank you for your interest in the ${tierName} membership! Payment integration would be implemented here.`);
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
            
            {/* Kind Squad (Free) */}
            <div className="pricing-card bg-gray-800 border border-gray-700 rounded-xl p-8 text-center relative scroll-animate">
              <h3 className="text-2xl font-bold mb-2 text-white">KIND SQUAD</h3>
              <div className="text-5xl font-bold text-gray-400 mb-2">Free</div>
              <div className="text-gray-400 mb-4">Join the movement</div>
              
              <ul className="text-left mb-8 space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">SMS/push alerts for new missions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">Access to mission updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">Community features on kindsquad.org</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handleMembershipClick('Kind Squad', 'Join Kind Squad')}
                className="cta-button w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg"
              >
                Join Kind Squad
              </button>
            </div>

            {/* Kind Squad Friend (Most Popular) */}
            <div className="pricing-card bg-blue-900 border-2 border-yellow-500 rounded-xl p-8 text-center relative scroll-animate">
              {/* Most Popular Badge */}
              <div className="popular-badge absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-blue-400">KIND SQUAD FRIEND</h3>
              <div className="text-5xl font-bold text-blue-400 mb-2">$5</div>
              <div className="text-gray-300 mb-4">/month</div>
              <p className="text-gray-300 mb-6 italic">Same price as your morning coffee. Infinitely more meaningful.</p>
              
              <ul className="text-left mb-6 space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">Everything in Kind Squad, PLUS:</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">Annual exclusive Kind Squad sticker pack</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">15% discount on all merchandise</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">Friend badge on your profile</span>
                </li>
              </ul>

              <div className="bg-blue-800 border border-blue-600 rounded-lg p-4 mb-6">
                <p className="text-blue-200 text-sm italic">
                  "Your $5 doesn't buy coffee that's gone in 20 minutes—it funds kindness that lasts forever."
                </p>
              </div>
              
              <button 
                onClick={() => handleMembershipClick('Kind Squad Friend', 'Become a Kind Squad Friend')}
                className="cta-button w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg"
              >
                Become a Kind Squad Friend
              </button>
            </div>

            {/* Kind Squad Family */}
            <div className="pricing-card bg-yellow-900 border border-yellow-600 rounded-xl p-8 text-center relative scroll-animate">
              <h3 className="text-2xl font-bold mb-2 text-yellow-400">KIND SQUAD FAMILY</h3>
              <div className="text-5xl font-bold text-yellow-400 mb-2">$10</div>
              <div className="text-gray-300 mb-4">/month</div>
              <p className="text-gray-300 mb-6">Join our inner circle</p>
              
              <ul className="text-left mb-8 space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">Everything in Kind Squad Friend, PLUS:</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">Annual exclusive Kind Squad mug</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">20% discount + FREE SHIPPING on all merchandise</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">Recognition on "Family Wall"</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">Eligible for monthly Member Spotlight</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handleMembershipClick('Kind Squad Family', 'Become Kind Squad Family')}
                className="cta-button w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg"
              >
                Become Kind Squad Family
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 bg-gray-900">
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

      <Footer />
    </div>
  );
};

export default MembershipLanding;

