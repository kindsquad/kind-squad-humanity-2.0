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
      answer: "Yes, absolutely! You can cancel your Ambassador or Champion membership at any time with no penalties or fees. Your membership benefits will continue until the end of your current billing period, and you can always rejoin later."
    },
    {
      question: "How do I access the private community?",
      answer: "Once you become an Ambassador or Champion member, you'll receive an email invitation to join our private community platform within 24 hours. This exclusive space is where members connect, share ideas, and collaborate on missions."
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
      `}</style>

      {/* Hero Section */}
      <section className="py-16 text-center bg-gradient-to-br from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent fade-in-up">
            Join the Kind Squad
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8 fade-in-up">
            Become part of a global movement recreating humanity through kindness. Choose your level of impact and help us spread hope and compassion without limits.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-12 scroll-animate">Choose Your Impact Level</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            
            {/* Supporter Tier */}
            <div className="pricing-card bg-gray-800 border border-gray-700 rounded-xl p-8 text-center relative scroll-animate">
              <h3 className="text-2xl font-bold mb-2">Supporter</h3>
              <div className="text-5xl font-bold text-yellow-400 mb-2">Free</div>
              <div className="text-gray-400 mb-4">Always</div>
              <p className="text-gray-400 mb-8">Start your kindness journey with our community of supporters</p>
              <ul className="text-left mb-8 space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Access to public missions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Monthly impact newsletter
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Community updates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Basic mission participation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Social media community access
                </li>
              </ul>
              <button 
                className="cta-button w-full py-4 px-8 bg-transparent border-2 border-yellow-400 text-yellow-400 rounded-lg font-bold hover:bg-yellow-400 hover:text-black"
                onClick={() => handleMembershipClick('Supporter', 'Join for Free')}
              >
                Join for Free
              </button>
            </div>

            {/* Ambassador Tier */}
            <div className="pricing-card bg-gray-800 border-2 border-yellow-400 rounded-xl p-8 text-center relative scroll-animate">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Ambassador</h3>
              <div className="text-5xl font-bold text-yellow-400 mb-2">$5</div>
              <div className="text-gray-400 mb-4">per month</div>
              <p className="text-gray-400 mb-8">Amplify your impact with exclusive access and priority support</p>
              <ul className="text-left mb-8 space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Everything in Supporter
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Private community access
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Priority mission notifications
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Exclusive member events
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Monthly impact reports
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Ambassador badge & recognition
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Early access to new programs
                </li>
              </ul>
              <button 
                className="cta-button w-full py-4 px-8 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-500"
                onClick={() => handleMembershipClick('Ambassador', 'Become an Ambassador')}
              >
                Become an Ambassador
              </button>
            </div>

            {/* Champion Tier */}
            <div className="pricing-card bg-gray-800 border border-gray-700 rounded-xl p-8 text-center relative scroll-animate">
              <h3 className="text-2xl font-bold mb-2">Champion</h3>
              <div className="text-5xl font-bold text-yellow-400 mb-2">$25</div>
              <div className="text-gray-400 mb-4">per month</div>
              <p className="text-gray-400 mb-8">Lead the movement with maximum impact and exclusive benefits</p>
              <ul className="text-left mb-8 space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Everything in Ambassador
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Direct line to leadership team
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Quarterly strategy calls
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Mission proposal privileges
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Champion-only events
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Annual impact summit invitation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Custom thank you package
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Tax-deductible receipts
                </li>
              </ul>
              <button 
                className="cta-button w-full py-4 px-8 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-500"
                onClick={() => handleMembershipClick('Champion', 'Lead as a Champion')}
              >
                Lead as a Champion
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-12 scroll-animate">Compare Membership Benefits</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-800 rounded-xl overflow-hidden scroll-animate">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-4 text-left text-yellow-400 font-bold">Features</th>
                  <th className="p-4 text-center text-yellow-400 font-bold">Supporter<br /><small>Free</small></th>
                  <th className="p-4 text-center text-yellow-400 font-bold">Ambassador<br /><small>$5/mo</small></th>
                  <th className="p-4 text-center text-yellow-400 font-bold">Champion<br /><small>$25/mo</small></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[
                  ['Access to public missions', true, true, true],
                  ['Monthly impact newsletter', true, true, true],
                  ['Community updates', true, true, true],
                  ['Private community access', false, true, true],
                  ['Priority mission notifications', false, true, true],
                  ['Exclusive member events', false, true, true],
                  ['Monthly impact reports', false, true, true],
                  ['Direct line to leadership', false, false, true],
                  ['Quarterly strategy calls', false, false, true],
                  ['Mission proposal privileges', false, false, true],
                  ['Annual impact summit', false, false, true],
                  ['Tax-deductible receipts', false, false, true]
                ].map(([feature, supporter, ambassador, champion], index) => (
                  <tr key={index}>
                    <td className="p-4 font-medium">{feature}</td>
                    <td className="p-4 text-center">
                      <span className={supporter ? "text-green-400 text-xl" : "text-red-400 text-xl"}>
                        {supporter ? "✅" : "❌"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={ambassador ? "text-green-400 text-xl" : "text-red-400 text-xl"}>
                        {ambassador ? "✅" : "❌"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={champion ? "text-green-400 text-xl" : "text-red-400 text-xl"}>
                        {champion ? "✅" : "❌"}
                      </span>
                    </td>
                  </tr>
                ))}
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
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 scroll-animate">
              <p className="text-gray-300 italic mb-4">
                "Being an Ambassador has connected me with an incredible community of people who truly care about making a difference. The private community is so supportive and inspiring!"
              </p>
              <div className="text-yellow-400 font-bold">Sarah Martinez</div>
              <div className="text-gray-400 text-sm">Ambassador Member since 2023</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 scroll-animate">
              <p className="text-gray-300 italic mb-4">
                "As a Champion, I love having direct access to the leadership team and being able to propose missions that matter to my local community. It's amazing to see ideas become reality."
              </p>
              <div className="text-yellow-400 font-bold">Michael Chen</div>
              <div className="text-gray-400 text-sm">Champion Member since 2022</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 scroll-animate">
              <p className="text-gray-300 italic mb-4">
                "I started as a free Supporter and quickly upgraded to Ambassador. The exclusive events and early access to programs make me feel like I'm truly part of something special."
              </p>
              <div className="text-yellow-400 font-bold">Emily Rodriguez</div>
              <div className="text-gray-400 text-sm">Ambassador Member since 2024</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-12 scroll-animate">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden scroll-animate">
                <button
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-700 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <span className={`faq-icon ${openFAQ === index ? 'rotated' : ''}`}>▼</span>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6 text-gray-400">
                    {faq.answer}
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

