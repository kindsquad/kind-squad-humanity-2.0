export default function Footer() {
  return (
    <footer className="bg-black dark:bg-black light:bg-white border-t border-white/10 dark:border-white/10 light:border-black/10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-white dark:text-white light:text-black text-lg font-bold mb-4">About Kind Squad®</h3>
            <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 mb-4 leading-relaxed">
              Recreating humanity and what it looks like. From local care packages to crisis response, we're building a network of kindness without limits.
            </p>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
              501(c)(3) Nonprofit Organization<br />
              EIN: 99-2813860
            </p>
          </div>

          {/* Chapters Section */}
          <div>
            <h3 className="text-white dark:text-white light:text-black text-lg font-bold mb-4">Chapters</h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-300 light:text-gray-700">
              <li>Western Mass</li>
              <li className="text-gray-500 dark:text-gray-500 light:text-gray-400">—</li>
              <li className="text-gray-500 dark:text-gray-500 light:text-gray-400">—</li>
              <li className="text-gray-500 dark:text-gray-500 light:text-gray-400">—</li>
              <li>
                <a href="#start-chapter" className="text-yellow-400 dark:text-yellow-400 light:text-orange-800 hover:text-yellow-300 dark:hover:text-yellow-300 light:hover:text-orange-700 transition-colors">
                  Start a Chapter →
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white dark:text-white light:text-black text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-300 light:text-gray-700">
              <li>
                <a href="#about" className="hover:text-yellow-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#missions" className="hover:text-yellow-400 transition-colors">
                  Our Missions
                </a>
              </li>
              <li>
                <a href="#get-involved" className="hover:text-yellow-400 transition-colors">
                  Get Involved
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-yellow-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 dark:border-white/10 light:border-black/10 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
            © 2025 Kind Squad® Humanity 2.0. All rights reserved. Kind Squad® is a registered trademark.
          </p>
        </div>
      </div>
    </footer>
  )
}

