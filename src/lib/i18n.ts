export type Locale = "ar" | "en";

export const translations = {
  ar: {
    nav: {
      home: "الرئيسية",
      projects: "المشاريع",
      products: "المنتجات",
      features: "المميزات",
      custom: "التخصيص",
      contact: "تواصل",
      quote: "عرض سعر",
      whatsapp: "واتساب",
    },
    hero: {
      badge: "الفخامة والابتكار المعماري للمظلات",
      title: "نبتكر الظل.. لنصنع الفخامة المعمارية",
      subtitle:
        "أنظمة مظلات حديثة وهياكل معمارية متطورة مصممة بأعلى معايير الأناقة والمتانة للمنازل والمنشآت الفاخرة في ليبيا.",
      ctaWhatsapp: "تواصل معنا عبر واتساب",
      ctaProjects: "استكشف مشاريعنا",
    },
    gallery: {
      title: "معرض أعمالنا الحصرية",
    },
    products: {
      title: "سلسلة المنتجات",
      subtitle: "اختر من بين تشكيلتنا الفاخرة المحدثة للمظلات المعمارية",
      orderNow: "اطلب الآن",
      card1Title: "سلسلة المظلات المعمارية المبتكرة",
      card1Desc:
        "تصاميم متطورة ومقاومة للعوامل الجوية تمنح مساحتك الخارجية مظهرًا معماريًا أنيقًا.",
      card2Title: "سلسلة التظليل العصري والبرجولات",
      card2Desc:
        "حلول تظليل حديثة توفر أقصى درجات الراحة والحماية مع لمسات تصميمية فاخرة.",
    },
    features: {
      badge: "لماذا تفاصيل",
      title: "مواد وتقنيات بمعايير معمارية",
      subtitle: "نجمع بين الجمال المعماري والأداء الهندسي لنمنحك ظلاً فاخراً يدوم.",
      items: [
        {
          title: "مقاومة العوامل الجوية",
          description:
            "أنظمة مصممة لتحمل الشمس والرياح والأمطار في المناخ الليبي، مع طلاءات حماية ومواد عازلة طويلة الأمد.",
        },
        {
          title: "تصاميم هيدروليكية ومتحركة",
          description:
            "آليات فتح وإغلاق سلسة بمحركات هيدروليكية وكهربائية دقيقة — تحكم كامل بالظل والضوء حسب الحاجة.",
        },
        {
          title: "ألومنيوم وعوازل عالية الجودة",
          description:
            "هياكل ألومنيوم معالجة وأقمشة وعوازل مختارة بعناية لضمان المتانة، العزل الحراري، واللمسة المعمارية الفاخرة.",
        },
        {
          title: "تركيب هندسي بضمان",
          description:
            "فرق تركيب متخصصة، معايرة ميدانية دقيقة، وضمان خدمة ما بعد البيع يحفظ قيمة استثمارك المعماري.",
        },
      ],
    },
    configurator: {
      badge: "مُكوِّن تفاعلي",
      title: "صمّم شترك بدقة المخطط",
      subtitle:
        "اختر النظام والأبعاد والأجهزة ولون الإطار — شاهد الستارة تتحرك فورياً ثم اطلب عبر واتساب.",
      openClose: "فتح / إغلاق الستارة",
      closed: "مغلق",
      open: "مفتوح بالكامل",
      prev: "السابق",
      next: "التالي",
      summary: "ملخص الطلب",
      system: "النظام",
      dimensions: "الأبعاد",
      hardware: "الأجهزة",
      frameColor: "لون الإطار",
      estimate: "تقدير داخلي",
      width: "العرض (سم)",
      height: "الارتفاع (سم)",
      area: "المساحة",
      whatsappOrder: "اطلب عرض سعر عبر واتساب",
      steps: ["النظام", "الأبعاد", "الأجهزة", "اللون"],
    },
    contact: {
      title: "تواصل معنا",
      subtitle:
        "زر أحد فرعينا أو راسلنا مباشرة — نساعدك في القياس والمعاينة وعرض السعر.",
      branch1: "الفرع الأول",
      branch1Area: "السراج",
      branch1Detail: "قرب كوبري الثلاجات",
      branch2: "الفرع الثاني",
      branch2Area: "المدينة الرياضية",
      branch2Detail: "المجمع الاستثماري — الدور الثاني",
      phoneLabel: "جوال / واتساب",
      callNow: "اتصل الآن",
      whatsappDirect: "واتساب مباشر",
    },
    catalog: {
      badge: "الكتالوج",
      title: "جميع التفاصيل موجودة في الكتالوج.",
      subtitle:
        "يرجى مراجعة كتالوج منتجاتنا، والذي يتضمن المواصفات الفنية، وأبعاد الشرائح، وخيارات الألوان، وتفاصيل التركيب.",
      tags: "المواصفات الفنية • الأبعاد • تفاصيل التجميع",
      download: "تحميل الكتالوج الرقمي (PDF)",
    },
    process: {
      badge: "فترة التنفيذ",
      title: "من الاكتشاف إلى التجميع",
      subtitle: "متوسط وقت التسليم 21 يومًا - نحن نتولى القياسات، وكذلك المسؤولية.",
      steps: [
        {
          badge: "يوم واحد • مجاناً",
          title: "المسح والقياس",
          text: "سيقوم فريقنا من الخبراء بفحص الموقع؛ وسيتم إعداد القياسات وظروف الأرض وتقارير أحمال الرياح مجاناً.",
        },
        {
          badge: "3-5 أيام",
          title: "تصميم المشروع",
          text: "تم تصميم النظام بناءً على نموذج ثلاثي الأبعاد لمساحتك؛ ستكون النتيجة دقيقة ومطابقة للواقع.",
        },
        {
          badge: "7-14 يوماً",
          title: "إنتاج",
          text: "يتم تصنيع قطاعات الألومنيوم بدقة باستخدام آلات CNC ويتم تغليفها بطلاء مسحوق إلكتروستاتيكي.",
        },
        {
          badge: "1-2 يوم + ضمان",
          title: "التجميع والتسليم",
          text: "يقوم فريق التركيب لدينا بإكمال عملية التجميع، وتفعيل النظام، وتقديم التدريب على الاستخدام في الموقع.",
        },
      ],
    },
    footer: {
      quickLinks: "روابط سريعة",
      directContact: "تواصل مباشر",
      craft: "✦ صناعة وتركيب معماري في ليبيا",
      rights: "جميع الحقوق محفوظة.",
      blurb:
        "نبتكر الظل لنصنع الفخامة المعمارية. حلول مظلات وبرجولات بتركيب هندسي محترف في ليبيا.",
    },
    a11y: {
      menu: "القائمة",
      lang: "تغيير اللغة",
      theme: "تبديل المظهر",
      scrollTop: "العودة للأعلى",
    },
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      products: "Products",
      features: "Features",
      custom: "Customize",
      contact: "Contact",
      quote: "Get a Quote",
      whatsapp: "WhatsApp",
    },
    hero: {
      badge: "Luxury architectural shade innovation",
      title: "We craft shade… to create architectural luxury",
      subtitle:
        "Modern canopy systems and advanced architectural structures designed with elegance and durability for luxury homes and commercial sites in Libya.",
      ctaWhatsapp: "Chat on WhatsApp",
      ctaProjects: "Explore our projects",
    },
    gallery: {
      title: "Exclusive project gallery",
    },
    products: {
      title: "Product series",
      subtitle: "Choose from our updated luxury architectural shade collection",
      orderNow: "Order now",
      card1Title: "Innovative architectural canopy series",
      card1Desc:
        "Advanced, weather-resistant designs that give your outdoor space an elegant architectural look.",
      card2Title: "Modern shading & pergola series",
      card2Desc:
        "Contemporary shading solutions that deliver comfort and protection with refined design details.",
    },
    features: {
      badge: "Why Tafasil",
      title: "Materials & technology to architectural standards",
      subtitle:
        "We combine architectural beauty with engineering performance for lasting luxury shade.",
      items: [
        {
          title: "Weather resistance",
          description:
            "Systems built for Libya’s sun, wind, and rain — with protective coatings and long-life insulation materials.",
        },
        {
          title: "Hydraulic & motorized designs",
          description:
            "Smooth open/close mechanisms with precise hydraulic and electric motors — full control of shade and light.",
        },
        {
          title: "Premium aluminum & insulation",
          description:
            "Treated aluminum structures and carefully selected fabrics for durability, thermal comfort, and a luxury finish.",
        },
        {
          title: "Engineered install with warranty",
          description:
            "Specialist installation teams, precise on-site calibration, and after-sales support that protects your investment.",
        },
      ],
    },
    configurator: {
      badge: "Interactive configurator",
      title: "Design your shutter with blueprint precision",
      subtitle:
        "Choose system, dimensions, hardware, and frame color — watch the curtain move in real time, then order via WhatsApp.",
      openClose: "Open / close curtain",
      closed: "Closed",
      open: "Fully open",
      prev: "Previous",
      next: "Next",
      summary: "Order summary",
      system: "System",
      dimensions: "Dimensions",
      hardware: "Hardware",
      frameColor: "Frame color",
      estimate: "Internal estimate",
      width: "Width (cm)",
      height: "Height (cm)",
      area: "Area",
      whatsappOrder: "Request quote on WhatsApp",
      steps: ["System", "Dimensions", "Hardware", "Color"],
    },
    contact: {
      title: "Contact us",
      subtitle:
        "Visit one of our branches or message us directly — we help with measurement, site visit, and quotation.",
      branch1: "Branch 1",
      branch1Area: "Al-Sarraj",
      branch1Detail: "Near Al-Thalajat Bridge",
      branch2: "Branch 2",
      branch2Area: "Sports City",
      branch2Detail: "Investment Complex — 2nd floor",
      phoneLabel: "Mobile / WhatsApp",
      callNow: "Call now",
      whatsappDirect: "WhatsApp direct",
    },
    catalog: {
      badge: "Catalog",
      title: "All the details are in the catalog.",
      subtitle:
        "Review our product catalog for technical specs, slat dimensions, color options, and installation details.",
      tags: "Technical specs • Dimensions • Assembly details",
      download: "Download Digital Catalog (PDF)",
    },
    process: {
      badge: "Timeline",
      title: "From discovery to assembly",
      subtitle:
        "Average delivery time 21 days — we handle measurements and full responsibility.",
      steps: [
        {
          badge: "1 day • Free",
          title: "Survey & measurement",
          text: "Our specialists inspect the site and prepare free measurements, ground conditions, and wind-load reports.",
        },
        {
          badge: "3–5 days",
          title: "Project design",
          text: "The system is designed from a 3D model of your space for an accurate, real-world fit.",
        },
        {
          badge: "7–14 days",
          title: "Production",
          text: "Aluminum profiles are CNC-machined with precision and finished with electrostatic powder coating.",
        },
        {
          badge: "1–2 days + warranty",
          title: "Assembly & handover",
          text: "Our install team completes assembly, activates the system, and trains you on-site.",
        },
      ],
    },
    footer: {
      quickLinks: "Quick links",
      directContact: "Direct contact",
      craft: "✦ Architectural craft & install in Libya",
      rights: "All rights reserved.",
      blurb:
        "We craft shade to create architectural luxury. Canopies and pergolas with professional engineering install in Libya.",
    },
    a11y: {
      menu: "Menu",
      lang: "Change language",
      theme: "Toggle theme",
      scrollTop: "Back to top",
    },
  },
} as const;

export type TranslationDict = (typeof translations)[Locale];
