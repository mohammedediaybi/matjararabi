
export interface Product {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  arabicDescription: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  colors: string[];
  options?: {
    name: string;
    arabicName: string;
    values: string[];
    arabicValues: string[];
  }[];
}

export const products: Product[] = [
  {
    id: "1",
    title: "Smart Watch with 1.7 inch Touch Screen",
    arabicTitle: "ساعة ذكية بشاشة تعمل باللمس 1.7 بوصة",
    description: "Smartwatch with heart rate monitor, step counter, and multiple sport modes. 1.7 inch HD touch screen with customizable watch faces. IP68 waterproof.",
    arabicDescription: "ساعة ذكية مع مراقب معدل ضربات القلب، وعداد الخطوات، وأوضاع رياضة متعددة. شاشة تعمل باللمس HD بحجم 1.7 بوصة مع واجهات ساعة قابلة للتخصيص. مقاومة للماء IP68.",
    price: 299,
    discountPrice: 149,
    images: [
      "https://ae01.alicdn.com/kf/S7b3f578675d341fe9a8e957c9992c0eaG/Smart-Watch-for-Android-iOS-Phones-Compatible-with-iPhone-Samsung-Smartwatch-Answer-Call-IP68-Waterproof-Heart.jpg_640x640.jpg",
      "https://ae01.alicdn.com/kf/S5ac9f7c3b85e4c149c0c58bf7d7ba32bo/Smart-Watch-for-Android-iOS-Phones-Compatible-with-iPhone-Samsung-Smartwatch-Answer-Call-IP68-Waterproof-Heart.jpg_640x640.jpg",
      "https://ae01.alicdn.com/kf/S62d6fd77a6f14bd986d6c06ee0e9cb903/Smart-Watch-for-Android-iOS-Phones-Compatible-with-iPhone-Samsung-Smartwatch-Answer-Call-IP68-Waterproof-Heart.jpg_640x640.jpg",
      "https://ae01.alicdn.com/kf/S36693ca8cc4942dd9c6f6dd83bb4dcc73/Smart-Watch-for-Android-iOS-Phones-Compatible-with-iPhone-Samsung-Smartwatch-Answer-Call-IP68-Waterproof-Heart.jpg_640x640.jpg",
    ],
    category: "Electronics",
    rating: 4.7,
    reviews: 2546,
    colors: ["#000000", "#FFFFFF", "#C0C0C0", "#FFC0CB"],
    options: [
      {
        name: "Color",
        arabicName: "اللون",
        values: ["Black", "White", "Silver", "Pink"],
        arabicValues: ["أسود", "أبيض", "فضي", "وردي"],
      },
    ],
  },
  {
    id: "2",
    title: "Wireless Headphones with Noise Cancellation",
    arabicTitle: "سماعات رأس لاسلكية مع خاصية إلغاء الضوضاء",
    description: "Immersive sound quality with active noise cancellation. Comfortable ear cups for long listening sessions. Up to 30 hours of battery life on a single charge.",
    arabicDescription: "جودة صوت غامرة مع إلغاء الضوضاء النشط. أكواب الأذن المريحة لجلسات الاستماع الطويلة. عمر البطارية يصل إلى 30 ساعة بشحنة واحدة.",
    price: 399,
    discountPrice: 199,
    images: [
      "https://ae01.alicdn.com/kf/S6ea7c192c5e4410d93d8ff14743f7e3fb/Bluetooth-Headphones-Over-Ear-Wireless-Headset-with-Active-Noise-Cancelling-65-Hours-Playtime-Hi-Fi-Stereo.jpg_640x640.jpg",
      "https://ae01.alicdn.com/kf/S6eb8f6b9ee4d49bf9ff093a5aa7d3d7fi/Bluetooth-Headphones-Over-Ear-Wireless-Headset-with-Active-Noise-Cancelling-65-Hours-Playtime-Hi-Fi-Stereo.jpg_640x640.jpg",
      "https://ae01.alicdn.com/kf/Sf3621e66077a49aaa56f03ec2dbe4d40I/Bluetooth-Headphones-Over-Ear-Wireless-Headset-with-Active-Noise-Cancelling-65-Hours-Playtime-Hi-Fi-Stereo.jpg_640x640.jpg",
    ],
    category: "Electronics",
    rating: 4.5,
    reviews: 1832,
    colors: ["#000000", "#FFFFFF", "#0000FF"],
    options: [
      {
        name: "Color",
        arabicName: "اللون",
        values: ["Black", "White", "Blue"],
        arabicValues: ["أسود", "أبيض", "أزرق"],
      },
    ],
  },
  {
    id: "3",
    title: "Premium Bluetooth Speaker with 360° Sound",
    arabicTitle: "مكبر صوت بلوتوث فاخر مع صوت 360 درجة",
    description: "Powerful 360° surround sound experience with deep bass. Portable design with waterproof construction. 12 hours of playtime with quick charging.",
    arabicDescription: "تجربة صوت محيطي قوية بزاوية 360 درجة مع صوت جهير عميق. تصميم محمول مع هيكل مضاد للماء. 12 ساعة من وقت التشغيل مع شحن سريع.",
    price: 499,
    discountPrice: 299,
    images: [
      "https://ae01.alicdn.com/kf/Sce9eaaf695b343a494c25c4dfc465140s/Mini-Bluetooth-Speaker-Portable-Wireless-Column-Bass-Sound-Subwoofer-Music-Box-Waterproof-For-Computer-Laptop-Loudspeaker.jpg_640x640.jpg",
      "https://ae01.alicdn.com/kf/S75b6e2e7ee784731b6a4b34b9ba8dbe4t/Mini-Bluetooth-Speaker-Portable-Wireless-Column-Bass-Sound-Subwoofer-Music-Box-Waterproof-For-Computer-Laptop-Loudspeaker.jpg_640x640.jpg",
      "https://ae01.alicdn.com/kf/S23c25ffb31b54a3da40c59d49ffbbcc9d/Mini-Bluetooth-Speaker-Portable-Wireless-Column-Bass-Sound-Subwoofer-Music-Box-Waterproof-For-Computer-Laptop-Loudspeaker.jpg_640x640.jpg",
    ],
    category: "Electronics",
    rating: 4.8,
    reviews: 1256,
    colors: ["#000000", "#FF0000", "#1E90FF"],
    options: [
      {
        name: "Color",
        arabicName: "اللون",
        values: ["Black", "Red", "Blue"],
        arabicValues: ["أسود", "أحمر", "أزرق"],
      },
    ],
  },
  {
    id: "4",
    title: "SOPANVER Vacuum Beard Trimmer with LED Display",
    arabicTitle: "ماكينة حلاقة اللحية بتقنية الشفط وشاشة LED من سوبانفر",
    description: "Professional vacuum beard trimmer with 20 precision length settings. Built-in powerful vacuum system collects hair while trimming. Features LED display, dual speed modes, IPX6 waterproof design, and USB-C charging. Perfect for precise beard styling with minimal cleanup.",
    arabicDescription: "ماكينة حلاقة اللحية احترافية بنظام شفط مع 20 إعداد دقيق للطول. نظام شفط قوي مدمج يجمع الشعر أثناء التشذيب. تتميز بشاشة LED، ووضعين للسرعة، وتصميم مقاوم للماء IPX6، وشحن USB-C. مثالية لتصفيف اللحية بدقة مع الحد الأدنى من التنظيف.",
    price: 499,
    discountPrice: 349,
    images: [
      "/lovable-uploads/e544fcfb-8ed2-4868-ba25-c551f9a5e337.png",
      "/lovable-uploads/a74baa5d-2aa3-45b0-8c3a-a0f4477ef252.png",
      "/lovable-uploads/70d42d0d-5af2-4ecd-a780-9267109f4eed.png",
      "/lovable-uploads/fdb33a93-2de7-47b3-aacd-125686543f15.png",
      "/lovable-uploads/bd49358b-d45e-43e6-9442-a2c04a666e89.png",
      "/lovable-uploads/8eb4cc83-b27d-42e3-8732-c5e066d4e4bc.png",
      "/lovable-uploads/cd9786b7-5f09-4014-85b6-380fe38bac4c.png"
    ],
    category: "Beauty & Personal Care",
    rating: 4.9,
    reviews: 1854,
    colors: ["#242424"],
    options: [
      {
        name: "Comb Type",
        arabicName: "نوع المشط",
        values: ["Short Hair Comb", "Long Hair Comb", "Complete Set"],
        arabicValues: ["مشط الشعر القصير", "مشط الشعر الطويل", "المجموعة الكاملة"],
      },
    ],
  },
  {
    id: "5",
    title: "WAIKIL Vacuum Beard Trimmer with Precision Wheel",
    arabicTitle: "ماكينة حلاقة اللحية بتقنية الشفط وعجلة دقيقة من وايكيل",
    description: "Advanced vacuum beard trimmer with dual motor design for efficient hair suction. Features precision wheel for 20 length settings (1-20mm), IPX6 waterproof rating, and USB-C charging. 1400mA battery provides 90 minutes of runtime with 2-hour charging time. Includes adjustable combs, cleaning brush, and more.",
    arabicDescription: "ماكينة حلاقة اللحية متطورة بتصميم محرك مزدوج لشفط الشعر بكفاءة. تتميز بعجلة دقيقة لـ 20 إعداد للطول (1-20 مم)، وتصنيف مقاوم للماء IPX6، وشحن USB-C. بطارية 1400 مللي أمبير توفر 90 دقيقة من وقت التشغيل مع وقت شحن ساعتين. تشمل أمشاط قابلة للتعديل، فرشاة تنظيف، والمزيد.",
    price: 599,
    discountPrice: 399,
    images: [
      "/lovable-uploads/1c4c184a-b715-4876-9dfb-abb0d93dd8a8.png",
      "/lovable-uploads/7ce31afc-75c1-4eb1-849a-112bb1ca1f22.png",
      "/lovable-uploads/9e525e80-2957-428c-9260-66b6ea94ff3b.png",
      "/lovable-uploads/47a4cdc2-f6c7-4f0a-b751-6bb273ad0d2d.png",
      "/lovable-uploads/1377ece2-1f12-4ec6-9579-5d3b76f151d1.png",
      "/lovable-uploads/af61d571-199e-4fa8-96d4-ad56988806a4.png",
      "/lovable-uploads/5691fe48-4330-4be1-a4ba-ec561b6fbea6.png",
      "/lovable-uploads/c3e2c443-79a3-46c4-aa49-6b0eef33fd8e.png",
      "/lovable-uploads/0a8eb896-1dcd-45ad-a61f-b9811594ceab.png",
      "/lovable-uploads/95c1f13d-57ed-4129-b086-4f87b8dfeea9.png"
    ],
    category: "Beauty & Personal Care",
    rating: 4.8,
    reviews: 2103,
    colors: ["#242424", "#00FF00"],
    options: [
      {
        name: "Comb Type",
        arabicName: "نوع المشط",
        values: ["Standard Set", "Premium Set"],
        arabicValues: ["المجموعة القياسية", "المجموعة الممتازة"],
      },
    ],
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}
