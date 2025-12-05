import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  
  const milestones = [
    {
      year: '2020',
      title: 'The Spark',
      description: 'TechShop was born in a small apartment. Just a laptop and a vision.'
    },
    {
      year: '2021',
      title: 'Going Viral',
      description: 'Hit 10,000 active customers without spending a dollar on ads.'
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Opened digital shipping hubs in Asia and North America.'
    },
    {
      year: '2023',
      title: 'Sustainability',
      description: 'Committed to 100% carbon-neutral shipping worldwide.'
    },
    {
      year: '2024',
      title: 'Top Rated',
      description: 'Recognized as the fastest-growing digital tech retailer.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-20 selection:bg-indigo-500 selection:text-white">
      
      {/* HERO SECTION */}
      <div className="bg-slate-900 pt-24 pb-32 rounded-b-[4rem] relative overflow-hidden mb-20 shadow-2xl">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent"></div>
         
         <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight"
            >
              We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">TechShop.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Building the future of e-commerce. <br />
              No physical limits. Just pure innovation.
            </motion.p>
         </div>
      </div>

      {/* MISSION SECTION */}
      <div className="max-w-7xl mx-auto px-6 mb-32 -mt-10 relative z-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group order-2 md:order-1 perspective-1000"
            >
                <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                    alt="Team working" 
                    className="relative rounded-[2rem] shadow-2xl w-full object-cover h-[400px] transform transition-transform duration-700 hover:scale-[1.02]"
                />
            </motion.div>
            
            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
                <h2 className="text-3xl font-black text-slate-900 mb-6">Not just another store.</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    We built TechShop to be <strong className="text-indigo-600">100% digital</strong> from day one.
                    By eliminating physical overhead, we invest everything into what matters.
                </p>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                    {[
                        "100% Remote Team",
                        "Carbon Neutral",
                        "Global Shipping",
                        "24/7 Support"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="bg-indigo-100 p-1.5 rounded-full">
                                <CheckCircle className="text-indigo-600 h-4 w-4" />
                            </div>
                            <span className="font-bold text-slate-800 text-sm">{item}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
      </div>

      {/* TIMELINE: FIXED SPACING & COLOR ANIMATION */}
      <div className="max-w-4xl mx-auto px-6 mb-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Our Journey</h2>
        </div>

        <div className="relative">
          {/* Line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-600 via-purple-500 to-transparent transform -translate-x-1/2 rounded-full opacity-30"></div>

          <div className="space-y-16">
            {milestones.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }} 
                transition={{ duration: 0.6, delay: index * 0.2 }} 
                className={`relative flex items-center justify-between md:justify-normal ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Glowing Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-indigo-600 rounded-full border-[3px] border-white shadow-[0_0_15px_rgba(79,70,229,0.5)] transform -translate-x-1/2 z-10"></div>
                
                <div className="hidden md:block w-1/2"></div>
                
                {/* Content*/}
                <div className={`w-full md:w-1/2 group ${index % 2 === 0 ? 'pr-0 pl-16 md:pr-24 md:pl-0 text-left md:text-right' : 'pl-16 md:pl-24 text-left'}`}>
                  <div>
                    {/* Animated Year Color */}
                    <motion.span 
                        initial={{ color: '#4f46e5' }} 
                        whileInView={{ color: '#e2e8f0' }} 
                        viewport={{ once: true }} 
                        transition={{ delay: 1, duration: 1 }} 
                        className="text-5xl font-black mb-2 block tracking-tighter cursor-default transition-colors duration-300 hover:text-indigo-600" // Hover class 
                    >
                        {item.year}
                    </motion.span>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium">
                        {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center px-4"
            >
                <div className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">50k+</div>
                <div className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Active Customers</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center px-4 pt-8 md:pt-0"
            >
                <div className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">30+</div>
                <div className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Countries</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center px-4 pt-8 md:pt-0"
            >
                <div className="text-6xl font-black text-indigo-600 mb-2 tracking-tighter">#1</div>
                <div className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Tech Retailer</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center px-4 pt-8 md:pt-0"
            >
                <div className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">99%</div>
                <div className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Satisfaction</div>
            </motion.div>

            </div>
        </div>
      </div>

    </div>
  );
}