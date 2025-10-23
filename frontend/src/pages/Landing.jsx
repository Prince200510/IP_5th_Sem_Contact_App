import { Users, RefreshCw, QrCode, Share2, Shield, Zap, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className = '', onClick }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    outline: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300',
    secondary: 'bg-gray-900 hover:bg-gray-800 text-white'
  };
  
  return (
    <button onClick={onClick} className={`px-6 py-2.5 rounded-md font-medium transition-all ${variants[variant]} ${className}`}>{children}</button>
  );
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-600 rounded-md flex items-center justify-center">
              <Users className="text-white" size={20} />
            </div>
            <span className="text-xl font-semibold text-white">ContactPro</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/login')} className="text-gray-300 hover:text-white font-medium text-sm">Login</button>
            <Button variant="primary" className="text-sm" onClick={() => navigate('/register')}>Get Started</Button>
          </div>
        </div>
      </nav>
      <section className="bg-gradient-to-b from-gray-800 to-gray-900 py-20 border-b border-gray-700">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-900 border border-blue-800 rounded-full mb-6">
              <CheckCircle size={14} className="text-blue-400" />
              <span className="text-xs font-medium text-blue-300 uppercase tracking-wide">Enterprise Contact Management</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">Professional Contact Management for Modern Teams</h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto"> Streamline your business relationships with our enterprise-grade contact management platform.  Secure, scalable, and designed for professional organizations.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button variant="primary" className="w-48 py-3 flex items-center justify-center gap-2" onClick={() => navigate('/register')}>Start Free Trial <ArrowRight size={16} /></Button>
              <Button variant="outline" className="w-48 py-3" onClick={() => navigate('/login')}>Schedule Demo</Button>
            </div>
            <p className="text-sm text-gray-400 mt-6">No credit card required • 14-day free trial</p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Manage Contacts</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Powerful features built for businesses that value efficiency and security</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Centralized Database</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Store and organize all contact information in a single, secure database with advanced search and filtering capabilities.</p>
            </div>
            <div className="group">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                <RefreshCw className="text-purple-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Duplicate Management</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Automatically detect and merge duplicate entries while maintaining data integrity across your organization.</p>
            </div>
            <div className="group">
              <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-700 transition-colors">
                <QrCode className="text-green-500" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">QR Integration</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Generate professional QR codes for seamless contact exchange at conferences and business events.</p>
            </div>
            <div className="group">
              <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-700 transition-colors">
                <Share2 className="text-orange-500" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure Sharing</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Share contact information securely with team members and external partners with granular access controls.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Shield className="text-blue-600" size={28} />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Security</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Bank-level encryption and compliance with SOC 2, GDPR, and industry standards to protect your data.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Zap className="text-blue-600" size={28} />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">High Performance</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Built on modern infrastructure ensuring 99.9% uptime and lightning-fast response times.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <BarChart3 className="text-blue-600" size={28} />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Analytics & Insights</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Comprehensive reporting and analytics to understand your network and optimize relationships.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-1">99.9%</div>
              <div className="text-sm text-gray-400">Uptime SLA</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">10K+</div>
              <div className="text-sm text-gray-400">Organizations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">5M+</div>
              <div className="text-sm text-gray-400">Contacts Managed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-400">Support Available</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-blue-900 to-blue-950">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Contact Management?</h2>
          <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">Join thousands of organizations streamlining their operations with ContactPro</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/register')} className="px-8 py-3 bg-white hover:bg-gray-100 text-blue-900 font-medium rounded-md transition-all flex items-center justify-center gap-2">Start Free Trial <ArrowRight size={16} /></button>
            <button onClick={() => navigate('/admin-login')} className="px-8 py-3 bg-blue-800 hover:bg-blue-700 text-white font-medium rounded-md transition-all border border-blue-700">Admin Access</button>
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 border-t border-gray-700 py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                  <Users className="text-white" size={16} />
                </div>
                <span className="text-lg font-semibold text-white">ContactPro</span>
              </div>
              <p className="text-sm text-gray-400">Enterprise contact management for modern organizations</p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-3 text-sm">Product</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-3 text-sm">Company</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-3 text-sm">Legal</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 ContactPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}