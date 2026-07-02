// Testimonials.tsx
'use client';

// Types
interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

// TestimonialCard Component
interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          className="lucide lucide-star text-amber-300"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          className="lucide lucide-star-half text-amber-300"
        >
          <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2"></path>
        </svg>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="lucide lucide-star text-amber-300"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    }

    return stars;
  };

  return (
    <article 
      data-card="testimonial"
      className="rounded-2xl border p-6 border-white/10 bg-neutral-900/70 transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/80 cursor-pointer"
      tabIndex={0}
      role="article"
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.backgroundImage = `radial-gradient(120px 120px at ${x}% ${y}%, rgba(244,63,94,0.10), transparent 60%)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundImage = '';
      }}
    >
      <blockquote className="text-[16px] sm:text-[18px] text-neutral-100 leading-relaxed">
        <span className="inline-flex items-start gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-quote w-4 h-4 text-neutral-400 shrink-0 mt-1"
          >
            <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
            <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
          </svg>
          {testimonial.quote}
        </span>
      </blockquote>
      
      <div className="mt-5 flex items-center gap-3">
        <img 
          className="w-10 h-10 object-cover ring-white/10 ring-2 rounded-full"
          src={testimonial.avatar} 
          alt={testimonial.author}
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{testimonial.author}</div>
          <div className="text-xs text-neutral-400 truncate">{testimonial.role}</div>
          <div className="flex items-center gap-1 mt-1">
            {renderStars(testimonial.rating)}
          </div>
        </div>
      </div>
    </article>
  );
};

// TestimonialColumn Component
interface TestimonialColumnProps {
  testimonials: Testimonial[];
  scrollDirection: 'up' | 'down';
  columnIndex: number;
}

const TestimonialColumn = ({ testimonials, scrollDirection, columnIndex }: TestimonialColumnProps) => {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="overflow-hidden h-[700px]"> {/* Fixed height for scroll container */}
      <div 
        data-scroll-column={columnIndex}
        className="space-y-6"
        style={{
          animation: `${scrollDirection === 'up' ? 'scrollUp' : 'scrollDown'} 40s linear infinite`,
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={`${testimonial.id}-${index}`} 
            testimonial={testimonial} 
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes scrollUp {
          0% { 
            transform: translateY(0); 
          }
          100% { 
            transform: translateY(-50%); 
          }
        }

        @keyframes scrollDown {
          0% { 
            transform: translateY(-50%); 
          }
          100% { 
            transform: translateY(0); 
          }
        }

        [data-scroll-column]:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

// TestimonialScroll Component
interface TestimonialScrollProps {
  testimonials: Testimonial[][];
}

const TestimonialScroll = ({ testimonials }: TestimonialScrollProps) => {
  return (
    <div 
      className="grid grid-cols-1 overflow-hidden md:grid-cols-3 py-12 gap-x-6 gap-y-6"
      style={{ 
        maskImage: 'linear-gradient(180deg, transparent, black 45%, black 45%, transparent)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent, black 45%, black 45%, transparent)'
      }}
    >
      {/* Column 1 - Scroll Up */}
      <div className="overflow-hidden">
        <TestimonialColumn 
          testimonials={testimonials[0]} 
          scrollDirection="up"
          columnIndex={1}
        />
      </div>

      {/* Column 2 - Scroll Down */}
      <div className="overflow-hidden lg:block md:block hidden">
        <TestimonialColumn 
          testimonials={testimonials[1]} 
          scrollDirection="down"
          columnIndex={2}
        />
      </div>

      {/* Column 3 - Scroll Up */}
      <div className="overflow-hidden lg:block md:block hidden">
        <TestimonialColumn 
          testimonials={testimonials[2]} 
          scrollDirection="up"
          columnIndex={3}
        />
      </div>
    </div>
  );
};

// Main Testimonials Component
const testimonialsData: Testimonial[][] = [
  // Column 1
  [
    {
      id: '1',
      quote: "The instant setup let our team start tracking KPIs in minutes, not days. It changed how we plan every sprint.",
      author: "Aisha Green",
      role: "Head of Business Intelligence",
      avatar: "https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg",
      rating: 5
    },
    {
      id: '2',
      quote: "Reporting is effortless now. Our team shares concise insights in seconds—no confusion, no wasted time.",
      author: "Priya Patel",
      role: "Marketing Director",
      avatar: "https://info.gopassage.com/hubfs/Personnel%20image%204483.jpg",
      rating: 5
    },
    {
      id: '3',
      quote: "From trial to rollout took under a week. Dashboards finally match how our teams actually work.",
      author: "Jonas Weber",
      role: "Operations Lead",
      avatar: "https://edencare.org/wp-content/uploads/2023/12/Kayla-Person.jpg",
      rating: 4.5
    }
  ],
  // Column 2
  [
    {
      id: '4',
      quote: "Clear, trustworthy reports across the org—security included. We cut weekly review time by 62%.",
      author: "Michael Chen",
      role: "IT Security Lead",
      avatar: "https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg",
      rating: 5
    },
    {
      id: '5',
      quote: "Integrations were seamless. No extra IT tickets, and we saved 120+ hours in the first quarter.",
      author: "Rachel Adams",
      role: "Product Manager",
      avatar: "https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg",
      rating: 5
    },
    {
      id: '6',
      quote: "Support is outstanding. Every question had a thoughtful answer within minutes.",
      author: "Liam O'Connor",
      role: "Customer Success Manager",
      avatar: "https://info.gopassage.com/hubfs/Personnel%20image%204483.jpg",
      rating: 4.5
    }
  ],
  // Column 3
  [
    {
      id: '7',
      quote: "Switching platforms was our best decision this year—intuitive, secure, and measurable results.",
      author: "Carlos Rivera",
      role: "CEO",
      avatar: "https://edencare.org/wp-content/uploads/2023/12/Kayla-Person.jpg",
      rating: 5
    },
    {
      id: '8',
      quote: "Transparency removed all doubt. We always know where metrics stand and what to do next.",
      author: "Sofia Martinez",
      role: "Analytics Lead",
      avatar: "https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg",
      rating: 5
    },
    {
      id: '9',
      quote: "Predictive models helped us spot trends early and act faster. It's like a compass for growth.",
      author: "Noah Bennett",
      role: "Strategy Director",
      avatar: "https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg",
      rating: 4.5
    }
  ]
];

export const Testimonials = () => {
  return (
    <section className="sm:py-24 pt-16 pb-16 relative" id="testimonials">
      <div className="sm:px-6 lg:px-8 max-w-7xl mr-auto ml-auto pr-4 pl-4">
        <div className="text-center mb-12 in-view" data-scroll-animate-children="">
          <span 
            className="text-sm font-medium text-rose-400"
            style={{ opacity: 1, transform: 'translateY(0px)' }}
          >
            Testimonials
          </span>
          
          <h2 
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
            style={{ opacity: 1, transform: 'translateY(0px)' }}
          >
            Real stories from teams who transformed their analytics.
          </h2>
          
          <div 
            className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 border-white/10 bg-white/5"
            style={{ opacity: 1, transform: 'translateY(0px)' }}
          >
            <span className="inline-flex items-center -space-x-2">
              <img 
                className="w-6 h-6 object-cover ring-neutral-900 ring-2 rounded-full" 
                src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" 
                alt="Reviewer 1" 
              />
              <img 
                className="w-6 h-6 object-cover ring-neutral-900 ring-2 rounded-full" 
                src="https://info.gopassage.com/hubfs/Personnel%20image%204483.jpg" 
                alt="Reviewer 2" 
              />
              <img 
                className="w-6 h-6 object-cover ring-neutral-900 ring-2 rounded-full" 
                src="https://edencare.org/wp-content/uploads/2023/12/Kayla-Person.jpg" 
                alt="Reviewer 3" 
              />
              <img 
                className="w-6 h-6 object-cover rounded-full ring-neutral-900 ring-2" 
                src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg" 
                alt="Reviewer 4" 
              />
            </span>
            
            <span className="ml-2 inline-flex items-center gap-1 text-sm text-neutral-300">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="lucide lucide-star text-amber-300"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="lucide lucide-star text-amber-300"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="lucide lucide-star text-amber-300"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="lucide lucide-star text-amber-300"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="lucide lucide-star-half text-amber-300"
              >
                <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2"></path>
              </svg>
              <span className="ml-1">4.9/5 • 2,431 reviews</span>
            </span>
          </div>
        </div>

        <TestimonialScroll testimonials={testimonialsData} />
      </div>
    </section>
  );
};