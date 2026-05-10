import { Sparkles } from 'lucide-react'
import { features } from '@/constants/data'

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] top-1/4 -left-48 animate-pulse-slow"></div>
        <div className="absolute w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] bottom-1/4 -right-48 animate-pulse-slow [animation-delay:2s]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-slide-in-up flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold uppercase text-xs tracking-widest">Why Travel With Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Benefits</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Discover what makes our travel experiences extraordinary and completely stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 group cursor-pointer overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)]"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Background Glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-500 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]">
                  <div className="text-3xl filter drop-shadow-md">{feature.icon}</div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed font-light text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
