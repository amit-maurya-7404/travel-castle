export interface BlogSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'quote' | 'callout';
  content: string | string[];
}

export interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'destinations' | 'culture' | 'adventure' | 'food' | 'tips';
  date: string;
  readTime: string;
  author: string;
  authorImage?: string;
  keywords: string[];
  sections: BlogSection[];
}

export const blogs: Blog[] = [
  {
    id: 'hidden-gems-of-mountain-valleys',
    title: 'Hidden Gems of Mountain Valleys: Best Customized Offbeat Trips',
    description: 'Discover the top hidden mountain valleys, secret trails, and custom offbeat trip packages with Travel Castle, the best travel agency in India for personalized itineraries.',
    image: '/images/blog-1.jpg',
    category: 'destinations',
    date: 'Dec 15, 2025',
    readTime: '5 min read',
    author: 'Aarav Mehta (Senior Travel Designer)',
    authorImage: '/images/avatar-1.jpg',
    keywords: ['best travel agency', 'custom tour packages', 'travel company in India', 'plan custom trip', 'Travel Castle', 'mountain valleys', 'offbeat travel'],
    sections: [
      {
        type: 'heading',
        content: 'Why Offbeat Mountain Travel is the New Luxury'
      },
      {
        type: 'paragraph',
        content: 'In a world where popular tourist spots are increasingly overcrowded, travelers are looking for deeper, quieter connections with nature. Mountain valleys like Spiti, Tirthan, and Zanskar offer pristine rivers, snow-capped peaks, and a peaceful environment. However, planning a trip to these remote locations requires expertise. That is where a professional travel company in India like Travel Castle comes in, designing seamless customized trip packages tailored to your comfort.'
      },
      {
        type: 'callout',
        content: '✨ Travel Castle Insider Tip: The best time to visit hidden valleys in North India is from September to March if you want to experience snow and clear winter skies, or June to August to escape the summer heat in the plains.'
      },
      {
        type: 'heading',
        content: 'Top 3 Hidden Valleys You Must Visit'
      },
      {
        type: 'list',
        content: [
          '**Tirthan Valley, Himachal Pradesh**: Famous for trout fishing and the Great Himalayan National Park, this valley is ideal for nature lovers seeking a slow, relaxed environment.',
          '**Zanskar Valley, Ladakh**: Offering rugged terrains, ancient monasteries, and majestic glaciers, Zanskar is a dream destination for adventure travelers.',
          '**Jibhi Valley, Himachal Pradesh**: A small hamlet surrounded by lush pine forests, cozy wooden cottages, and beautiful waterfalls.'
        ]
      },
      {
        type: 'quote',
        content: '“Travel is not about visiting landmark sights; it is about immersing yourself in the rhythm of local life, tasting mountain tea, and sleeping under a clear sky of stars.”'
      },
      {
        type: 'subheading',
        content: 'How to Plan Your Custom Trip to Remote Valleys'
      },
      {
        type: 'paragraph',
        content: 'When traveling to offbeat destinations, standard tour templates often fall short. Road conditions, permits, high altitude acclimation, and choice of stays are crucial factors. Travel Castle, recognized as the best tour operator for customized travel, designs custom tour packages that balance adventure with luxury.'
      },
      {
        type: 'paragraph',
        content: 'Our customized itineraries ensure you get private 4x4 vehicles, verified boutique homestays, expert local guides, and 24/7 support throughout your journey. To get started, you can click on "Plan Custom Trip" on our platform, share your dates and preferences, and let our designers handle the details.'
      }
    ]
  },
  {
    id: 'exploring-ancient-temples-and-cultural-heritage',
    title: 'Exploring Ancient Temples & Culture: Custom Tour Packages',
    description: 'Embark on a cultural journey with Travel Castle. Explore historic monuments, spiritual temples, and tailored heritage tour packages built specifically for you.',
    image: '/images/blog-2.jpg',
    category: 'culture',
    date: 'Dec 10, 2025',
    readTime: '7 min read',
    author: 'Meera Sharma (Heritage Expert)',
    authorImage: '/images/avatar-2.jpg',
    keywords: ['best travel agency', 'custom tour packages', 'heritage tours', 'Travel Castle', 'spiritual travel', 'ancient temples'],
    sections: [
      {
        type: 'heading',
        content: 'The Magic of Spiritual and Heritage Travel in India'
      },
      {
        type: 'paragraph',
        content: 'India is home to some of the world’s most magnificent ancient architecture, temple complexes, and cultural heritage. From the stone-carved ruins of Hampi to the spiritual ghats of Varanasi and the majestic forts of Rajasthan, every state offers a journey through history. A customized tour package designed by Travel Castle helps you experience these destinations beyond the standard tourist tracks.'
      },
      {
        type: 'heading',
        content: 'Must-See Cultural & Temple Destinations'
      },
      {
        type: 'list',
        content: [
          '**Hampi, Karnataka**: Step back into the Vijayanagara Empire with stone chariot monuments, boulder-strewn landscapes, and active temples.',
          '**Varanasi, Uttar Pradesh**: Experience spiritual energy on the banks of the Ganges, witness the Ganga Aarti, and explore historic lanes.',
          '**Madurai & Tanjore, Tamil Nadu**: Explore the towering Gopurams of the Meenakshi Temple and admire the architecture of the Brihadisvara Temple.'
        ]
      },
      {
        type: 'quote',
        content: '“Heritage travel reconnects us with our roots. It teaches us about ancient science, art, and spirituality that shaped modern civilizations.”'
      },
      {
        type: 'subheading',
        content: 'Customized Heritage Trips with Travel Castle'
      },
      {
        type: 'paragraph',
        content: 'We understand that cultural travel is not just about visiting temples; it is about comfort, learning, and local storytelling. Our cultural tour packages include private guided tours with certified historians, stays in converted heritage palaces, and culinary trails to taste local delicacies. Choose Travel Castle, the premier travel company in India, to plan your next enriching cultural vacation.'
      }
    ]
  },
  {
    id: 'coastal-towns-vibrant-beach-adventures',
    title: 'Top Coastal Towns to Visit: Custom Beach Vacation Packages',
    description: 'Looking for the perfect coastal escape? Learn about the best beach towns and customize your tropical getaway with Travel Castle, your premier travel company.',
    image: '/images/blog-3.jpg',
    category: 'destinations',
    date: 'Dec 05, 2025',
    readTime: '6 min read',
    author: 'Vikram Roy (Coastal Itinerary Specialist)',
    authorImage: '/images/avatar-3.jpg',
    keywords: ['best travel agency', 'custom tour packages', 'beach vacation', 'Travel Castle', 'coastal towns', 'luxury custom trips'],
    sections: [
      {
        type: 'heading',
        content: 'Escape to India’s Most Vibrant Coastal Havens'
      },
      {
        type: 'paragraph',
        content: 'Whether you seek adrenaline-pumping water sports, private candlelit beach dinners, or quiet beach walks away from crowds, the Indian coastline has it all. Beyond commercial beaches, towns like Varkala, Gokarna, and the Andaman Islands offer spectacular views and pristine waters. To experience these coastal paradises to the fullest, you need custom tour packages that suit your pace.'
      },
      {
        type: 'heading',
        content: 'Top Beach Destinations for Your Next Holiday'
      },
      {
        type: 'list',
        content: [
          '**Varkala, Kerala**: Unique cliffside beaches overlooking the Arabian Sea, featuring natural springs and yoga retreats.',
          '**Gokarna, Karnataka**: Pristine, crescent-shaped beaches like Half Moon Beach, perfect for sunset trekking and camping.',
          '**Havelock Island, Andamans**: Renowned for Radhanagar Beach and exceptional scuba diving reefs.'
        ]
      },
      {
        type: 'quote',
        content: '“Saltwater cures everything. A customized beach holiday is the perfect recipe for relaxation, romance, and rejuvenation.”'
      },
      {
        type: 'subheading',
        content: 'Tailored Beach Getaways with Travel Castle'
      },
      {
        type: 'paragraph',
        content: 'As a luxury travel designer, Travel Castle creates customized trip packages that highlight private pool villas, beachside glamping, scuba diving excursions with PADI instructors, and sunset yacht cruises. Let the best travel agency in India create a customized beach vacation that matches your dreams.'
      }
    ]
  },
  {
    id: 'solo-travel-guide-finding-yourself-on-the-road',
    title: 'Solo Travel Guide: How to Plan a Safe & Fearless Journey',
    description: 'Discover the power of solo traveling with Travel Castle. Find top destinations, safety tips, and learn how to customize a solo trip package built around your style.',
    image: '/images/package-solo.jpg',
    category: 'adventure',
    date: 'Nov 28, 2025',
    readTime: '8 min read',
    author: 'Ananya Sen (Solo Travel Expert)',
    authorImage: '/images/avatar-1.jpg',
    keywords: ['best travel agency', 'custom tour packages', 'solo travel guide', 'Travel Castle', 'safe solo trips', 'plan custom trip'],
    sections: [
      {
        type: 'heading',
        content: 'The Transformative Power of Traveling Solo'
      },
      {
        type: 'paragraph',
        content: 'Traveling solo is one of the most liberating experiences. It pushes you out of your comfort zone, helps you meet new people, and gives you absolute freedom to choose your own itinerary. But for many, the safety, logistics, and planning of a solo trip can feel overwhelming. That is where booking through a reliable travel company in India makes a world of difference.'
      },
      {
        type: 'heading',
        content: 'Top Tips for Safe and Successful Solo Trips'
      },
      {
        type: 'list',
        content: [
          '**Plan Ahead, but Leave Room for Spontaneity**: Book your stays and transport in advance to ensure safety, but keep your daily plan flexible.',
          '**Stay in Social Stays**: Opt for boutique hostels or custom homestays where you can interact with fellow travelers and locals.',
          '**Stay Connected**: Always keep family or trusted tour operators informed of your location.'
        ]
      },
      {
        type: 'quote',
        content: '“Loving yourself starts with exploring the world on your own terms. Solo travel is the ultimate form of self-investment.”'
      },
      {
        type: 'subheading',
        content: 'How Travel Castle Empowers Solo Adventurers'
      },
      {
        type: 'paragraph',
        content: 'With Travel Castle, you are never truly alone. We offer customized solo trip packages that provide safe and verified accommodations, reliable private transfers, local guides who are background-checked, and 24/7 concierge support. Whether you want to trek in Spiti or explore historical temples in Vietnam, we help you plan custom trips with absolute peace of mind.'
      }
    ]
  },
  {
    id: 'street-food-adventures-global-culinary-tours',
    title: 'Global Street Food Adventures: Best Customized Culinary Tours',
    description: 'Explore the world through taste. Discover famous street food spots and custom culinary travel packages designed by Travel Castle, the best tour operator.',
    image: '/images/package-family.jpg',
    category: 'food',
    date: 'Nov 20, 2025',
    readTime: '6 min read',
    author: 'Rohan Gupta (Culinary Travel Lead)',
    authorImage: '/images/avatar-3.jpg',
    keywords: ['best travel agency', 'custom tour packages', 'culinary tours', 'Travel Castle', 'street food', 'food tourism'],
    sections: [
      {
        type: 'heading',
        content: 'Taste the World: Why Food is the Ultimate Destination'
      },
      {
        type: 'paragraph',
        content: 'Food brings people together and tells the story of a culture. Street food, in particular, offers a raw, authentic window into the history and daily life of a destination. From the night markets of Bangkok to the taco stands of Oaxaca and the busy lanes of Old Delhi, street food is a must for any traveler. A customized culinary package lets you experience the ultimate food crawl safely and authentically.'
      },
      {
        type: 'heading',
        content: 'Famous Street Food Capitals of the World'
      },
      {
        type: 'list',
        content: [
          '**Bangkok, Thailand**: Famous for Pad Thai, mango sticky rice, and spicy som tum salad served at bustling street carts.',
          '**Penang, Malaysia**: The street food capital of Southeast Asia, renowned for Char Kway Teow and Penang Laksa.',
          '**Old Delhi, India**: A historic food lover’s haven, famous for hot paranthas, spicy chaats, and rich local sweets.'
        ]
      },
      {
        type: 'quote',
        content: '“To understand a country, you must first taste it. Street food is where the soul of a culture truly resides.”'
      },
      {
        type: 'subheading',
        content: 'Design Your Food Tour Package with Travel Castle'
      },
      {
        type: 'paragraph',
        content: 'At Travel Castle, the best travel agency for experiential travelers, we create customized food tour packages. We design itineraries that include private street food walks with food experts, hands-on cooking classes with local chefs, and reservations at top-rated eateries. Contact us to plan a customized culinary itinerary that will satisfy your appetite for adventure.'
      }
    ]
  }
];
