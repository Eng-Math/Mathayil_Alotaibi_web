import {
  Bot,
  Activity,
  Search,
  Headset,
  TrendingUp,
  HandMetal,
  Radar,
  Network,
  Waves,
  Target,
  Zap,
  Shield,
  Award,
  BarChart3,
  Layers,
  Cpu,
  Smartphone,
  Box,
  Wifi,
} from 'lucide-react';

export const getFeaturedProjects = (lang: string) => [
  {
    id: 'noor',
    title: 'Noor — Smart Mom Assistant',
    titleAr: lang === 'ar' ? 'نور — المساعد الذكي للأم' : 'Noor — Smart Mom Assistant',
    description: lang === 'ar'
      ? 'نظام هندسي متكامل يساعد الأمهات ذوات الإعاقة السمعية في مراقبة أطفالهن عبر تنبيهات حسية وبصرية فورية، بدقة تصنيف تصل إلى 99%.'
      : 'An integrated engineering system that helps hearing-impaired mothers monitor their children through instant sensory and visual alerts, with 99% classification accuracy.',
    tech: ['IoT', 'FFT Algorithm', 'NodeMCU ESP8266', 'Flutter', 'DSP'],
    color: 'pink',
    icon: Activity,
    images: [
      '/images/projects/noor/Noor — Smart Mom Assistant 1.png',
      '/images/projects/noor/Noor — Smart Mom Assistant 2.png',
      '/images/projects/noor/Noor — Smart Mom Assistant 3.png',
      '/images/projects/noor/Noor — Smart Mom Assistant 4.png',
      '/images/projects/noor/Noor — Smart Mom Assistant 5.png',
      '/images/projects/noor/Noor — Smart Mom Assistant 6.png',
      '/images/projects/noor/Noor — Smart Mom Assistant 7.png',
      '/images/projects/noor/Noor — Smart Mom Assistant 8.png',
    ],
    stats: [
      { value: '99%', label: lang === 'ar' ? 'دقة التصنيف' : 'Classification Accuracy', icon: Target },
      { value: '<1s', label: lang === 'ar' ? 'زمن الاستجابة' : 'Response Time', icon: Zap },
      { value: '30m', label: lang === 'ar' ? 'نطاق التغطية' : 'Coverage Range', icon: Wifi },
    ],
    highlights: [
      { icon: Wifi, title: lang === 'ar' ? 'بنية IoT متكاملة' : 'Integrated IoT Architecture', desc: lang === 'ar' ? 'اتصال لاسلكي عبر Wi-Fi يربط المستشعر بالسوار' : 'Wireless Wi-Fi connection linking the sensor to the wristband' },
      { icon: Cpu, title: lang === 'ar' ? 'معالجة إشارات متقدمة' : 'Advanced Signal Processing', desc: lang === 'ar' ? 'خوارزمية FFT لتحليل بصمة بكاء الرضيع' : 'FFT algorithm for analyzing infant cry signatures' },
      { icon: Smartphone, title: lang === 'ar' ? 'تطبيق Flutter' : 'Flutter App', desc: lang === 'ar' ? 'تتبع إحصائيات البكاء وإدارة الأدوية' : 'Track crying statistics and manage medications' },
    ],
    details: [
      {
        icon: Target,
        title: lang === 'ar' ? 'الرؤية والهدف (Vision & Concept)' : 'Vision & Concept',
        content: lang === 'ar'
          ? '"نور" جسر تقني يكسر حواجز الصمت، صُمم لتمكين الأمهات ذوات الإعاقة السمعية من رعاية أطفالهن باستقلالية. يحوّل النظام الموجات الصوتية إلى نبضات حسية وإشارات ضوئية ذكية تصل للأم لحظياً في أي مكان.'
          : '"Noor" is a technical bridge that breaks the barriers of silence, designed to empower hearing-impaired mothers to care for their children independently. The system converts sound waves into haptic pulses and smart LED signals that reach the mother instantly anywhere.'
      },
      {
        icon: Cpu,
        title: lang === 'ar' ? 'معالجة الإشارات الرقمية (DSP)' : 'Digital Signal Processing (DSP)',
        content: lang === 'ar'
          ? 'يعتمد النظام على معالجة الإشارات الرقمية (DSP) وتوظيف خوارزمية (FFT) لتحليل الترددات الصوتية لحظياً. يضمن هذا تمييز "بصمة بكاء الرضيع" بدقة متناهية وعزلها عن ضجيج البيئة المحيطة لتجنب الإنذارات الخاطئة.'
          : 'The system relies on Digital Signal Processing (DSP) and employs the FFT algorithm to analyze audio frequencies in real-time. This ensures precise identification of the "infant cry signature" and isolates it from ambient noise to avoid false alarms.',
        impact: lang === 'ar' ? 'دقة 99% في التصنيف بفضل خوارزمية FFT متعددة النطاقات' : '99% classification accuracy using multi-band FFT algorithm'
      },
      {
        icon: Wifi,
        title: lang === 'ar' ? 'البنية اللاسلكية (IoT)' : 'Wireless Architecture (IoT)',
        content: lang === 'ar'
          ? 'بنية تحتية تعتمد على إنترنت الأشياء (IoT)؛ حيث يرتبط مستشعر الصوت بوحدة NodeMCU ESP8266 ليرسل إشارات مشفرة عبر Wi-Fi إلى سوار الأم، خالقاً شبكة تواصل لحظية تتجاوز حواجز الجدران.'
          : 'An IoT-based infrastructure where the sound sensor connects to a NodeMCU ESP8266 unit to send encrypted signals via Wi-Fi to the mother\'s wristband, creating a real-time communication network that transcends walls.',
        impact: lang === 'ar' ? 'نطاق تغطية 30 متر مع تشفير AES-256' : '30m coverage range with AES-256 encryption'
      },
      {
        icon: Layers,
        title: lang === 'ar' ? 'التصميم العتادي (Hardware)' : 'Hardware Design',
        content: lang === 'ar'
          ? 'تُرجمت المخططات لدوائر إلكترونية دقيقة تدمج تقنية الاهتزاز (Haptic Feedback) مع إضاءات LED داخل سوار عصري. صُمم السوار ليكون خفيف الوزن، مريحاً للارتداء اليومي، وعالي الكفاءة في استهلاك الطاقة.'
          : 'Schematics were translated into precise electronic circuits integrating Haptic Feedback technology with LED lights inside a modern wristband. Designed to be lightweight, comfortable for daily wear, and highly energy-efficient.',
        impact: lang === 'ar' ? 'استهلاك طاقة <5mW مع بطارية تدوم 7 أيام' : '<5mW power consumption with 7-day battery life'
      },
      {
        icon: Box,
        title: lang === 'ar' ? 'النمذجة الهندسية (3D Modeling)' : '3D Modeling',
        content: lang === 'ar'
          ? 'صُممت نماذج ثلاثية الأبعاد للهيكل الخارجي تجمع بين المتانة والانسيابية. روعيت المعايير الهندسية لضمان حماية المكونات الداخلية وتوزيع الصوت بشكل مثالي عبر فتحات هيكلية دقيقة.'
          : '3D models were designed for the outer casing combining durability and aerodynamics. Engineering standards were observed to ensure protection of internal components and optimal sound distribution through precise structural openings.'
      },
      {
        icon: Smartphone,
        title: lang === 'ar' ? 'تطبيق التحكم الذكي' : 'Smart Control App',
        content: lang === 'ar'
          ? 'تكتمل التجربة بتطبيق هواتف مطور ببيئة Flutter يمنح الأم تحكماً شاملاً. يعمل التطبيق كمركز بيانات يتيح تتبع إحصائيات البكاء التاريخية وتنظيم مواعيد الأدوية، لتبقى الأم على اطلاع دائم.'
          : 'The experience is completed with a Flutter-developed mobile app giving the mother full control. The app serves as a data center for tracking historical crying statistics and organizing medication schedules.',
        impact: lang === 'ar' ? 'واجهة عربية سهلة مع إشعارات فورية' : 'User-friendly interface with instant notifications'
      }
    ]
  },
  {
    id: 'rakeem',
    title: 'Rakeem — Financial AI Agent',
    titleAr: lang === 'ar' ? 'ركيم — الوكيل المالي الذكي' : 'Rakeem — Financial AI Agent',
    description: lang === 'ar'
      ? 'وكيل مالي ذكي ومستقل يحلل البيانات، يُقدّم تنبيهات استباقية، وينفّذ مهام الاستشارة والتدقيق للمنشآت السعودية.'
      : 'An intelligent and autonomous financial agent that analyzes data, provides proactive alerts, and executes consulting and auditing tasks for Saudi enterprises.',
    tech: ['AI Agent', 'LangChain', 'RAG', 'GPT-4 API', 'Holt-Winters'],
    color: 'cyan',
    icon: Bot,
    images: [
      '/images/projects/rakeem/Rakeem — Financial AI Agent 1.png',
      '/images/projects/rakeem/Rakeem — Financial AI Agent 2.png',
      '/images/projects/rakeem/Rakeem — Financial AI Agent 3.png',
      '/images/projects/rakeem/Rakeem — Financial AI Agent 4.png',
      '/images/projects/rakeem/Rakeem — Financial AI Agent 5.png',
      '/images/projects/rakeem/Rakeem — Financial AI Agent 6.png',
      '/images/projects/rakeem/Rakeem — Financial AI Agent 7.png',
      '/images/projects/rakeem/Rakeem — Financial AI Agent 8.png',
      '/images/projects/rakeem/Rakeem — Financial AI Agent 9.png',
    ],
    stats: [
      { value: '96%', label: lang === 'ar' ? 'دقة التنبؤ' : 'Prediction Accuracy', icon: BarChart3 },
      { value: '24/7', label: lang === 'ar' ? 'استشارة متواصلة' : 'Continuous Consulting', icon: Zap },
      { value: '100%', label: lang === 'ar' ? 'امتثال ZATCA' : 'ZATCA Compliance', icon: Shield },
    ],
    highlights: [
      { icon: Bot, title: lang === 'ar' ? 'وكيل مستقل' : 'Autonomous Agent', desc: lang === 'ar' ? 'تحليل ملفات Excel/CSV واتخاذ قرارات منطقية' : 'Analyzing Excel/CSV files and making logical decisions' },
      { icon: Shield, title: lang === 'ar' ? 'امتثال ضريبي' : 'Tax Compliance', desc: lang === 'ar' ? 'نظام RAG متصل بلوائح هيئة الزكاة' : 'RAG system connected to ZATCA regulations' },
      { icon: BarChart3, title: lang === 'ar' ? 'تنبؤ مالي' : 'Financial Forecasting', desc: lang === 'ar' ? 'خوارزمية Holt-Winters للتوقعات المالية' : 'Holt-Winters algorithm for financial forecasting' },
    ],
    details: [
      {
        icon: Target,
        title: lang === 'ar' ? 'الرؤية والهدف' : 'Vision & Goal',
        content: lang === 'ar'
          ? '"ركيم" وكيل مالي ذكي يعمل كشريك استراتيجي للمنشآت الصغيرة والمتوسطة، ليحوّل تعقيدات المحاسبة إلى قرارات مالية واضحة وواثقة تدعم مستهدفات رؤية 2030.'
          : '"Rakeem" is an intelligent financial agent that acts as a strategic partner for SMEs, transforming accounting complexities into clear and confident financial decisions supporting Vision 2030 goals.',
        impact: lang === 'ar' ? 'توفير 40% من وقت المحاسبين وتحسين دقة التقارير' : 'Saving 40% of accountants\' time and improving report accuracy'
      },
      {
        icon: Bot,
        title: lang === 'ar' ? 'الاستنتاج المستقل (Autonomous Reasoning)' : 'Autonomous Reasoning',
        content: lang === 'ar'
          ? 'يتميز "ركيم" باستقلاليته التامة؛ حيث يحلل الملفات المالية المرفوعة (Excel/CSV) ويتخذ قرارات منطقية لتنفيذ العمليات الحسابية والتنبؤية بدقة عالية عبر إطار عمل LangChain.'
          : '"Rakeem" is distinguished by its complete autonomy; it analyzes uploaded financial files (Excel/CSV) and makes logical decisions to execute computational and predictive operations with high accuracy via the LangChain framework.',
        impact: lang === 'ar' ? 'أتمتة 80% من المهام المحاسبية الروتينية' : 'Automating 80% of routine accounting tasks'
      },
      {
        icon: Headset,
        title: lang === 'ar' ? 'المساعد المالي التفاعلي' : 'Interactive Financial Assistant',
        content: lang === 'ar'
          ? 'شات بوت ذكي يدعم اللغة العربية، يُتيح للمستخدم طرح أسئلة مباشرة حول بياناته المالية المرفوعة ليُجيب عليها بدقة وفي نفس السياق، مما يوفر استشارة مالية متاحة على مدار الساعة.'
          : 'An intelligent chatbot supporting Arabic, allowing users to ask direct questions about their uploaded financial data and receive accurate, context-aware answers, providing 24/7 financial consultation.',
        impact: lang === 'ar' ? 'استجابة فورية بزمن <2 ثانية للاستفسارات المالية' : 'Instant response in <2 seconds for financial queries'
      },
      {
        icon: Shield,
        title: lang === 'ar' ? 'الامتثال الضريبي السعودي (ZATCA RAG)' : 'Saudi Tax Compliance (ZATCA RAG)',
        content: lang === 'ar'
          ? 'يوظف النظام تقنية الاسترجاع المعزز (RAG) للبحث الذكي في لوائح هيئة الزكاة والضريبة والجمارك، ليُقدم توصيات ضريبية دقيقة ومُحدّثة تتوافق تماماً مع الأنظمة السعودية.'
          : 'The system employs Retrieval-Augmented Generation (RAG) for intelligent search through ZATCA regulations, providing accurate and up-to-date tax recommendations fully compliant with Saudi regulations.',
        impact: lang === 'ar' ? '100% امتثال مع تحديثات فورية للوائح ZATCA' : '100% compliance with real-time ZATCA regulation updates'
      },
      {
        icon: TrendingUp,
        title: lang === 'ar' ? 'محرك التنبؤ والاستباقية' : 'Prediction & Proactive Engine',
        content: lang === 'ar'
          ? 'يعتمد الوكيل على خوارزمية Holt-Winters لتحليل التوجهات المالية التاريخية، مما يُمكّنه من إرسال تنبيهات استباقية لاقتناص الفرص وتجنب المخاطر المالية قبل وقوعها.'
          : 'The agent relies on the Holt-Winters algorithm to analyze historical financial trends, enabling it to send proactive alerts to seize opportunities and avoid financial risks before they occur.',
        impact: lang === 'ar' ? 'دقة تنبؤ 96% للأنماط المالية الموسمية' : '96% prediction accuracy for seasonal financial patterns'
      },
      {
        icon: Award,
        title: lang === 'ar' ? 'أتمتة التقارير' : 'Report Automation',
        content: lang === 'ar'
          ? 'بضغطة زر، يُحوّل الوكيل تحليلاته المعقدة إلى تقارير PDF احترافية، ويعرض مؤشرات الأداء (KPIs) عبر لوحة بيانات تفاعلية تُلخص النتائج المالية في ثوانٍ معدودة.'
          : 'With a single click, the agent transforms its complex analyses into professional PDF reports and displays KPIs through an interactive dashboard that summarizes financial results in seconds.',
        impact: lang === 'ar' ? 'توليد تقارير احترافية في <10 ثوانٍ' : 'Generating professional reports in <10 seconds'
      }
    ]
  }
];

export const getGalleryProjects = (lang: string) => [
  {
    id: 'ai-research',
    title: 'AI Research Assistant',
    titleAr: lang === 'ar' ? 'المساعد البحثي الذكي' : 'AI Research Assistant',
    description: lang === 'ar'
      ? 'نظام استرجاع معرفي معزز (RAG) يعالج الأوراق البحثية المعقدة ويحولها إلى مرجع تفاعلي. بدلاً من البحث اليدوي، يتيح النظام للمستخدم طرح أسئلة والحصول على إجابات دقيقة وموثقة فوراً من داخل المستندات المرفوعة.'
      : 'A Retrieval-Augmented Generation (RAG) system that processes complex research papers and transforms them into an interactive reference. Instead of manual searching, users can ask questions and get accurate, documented answers instantly from uploaded documents.',
    tech: ['LangChain', 'RAG System', 'OpenAI API', 'Python'],
    icon: Search,
    color: 'violet',
    coverImage: '/images/projects/covers/AI Research Assistant غلاف.png',
    images: ['/images/projects/ai-research/AI Research Assistant 1.png'],
    metric: lang === 'ar' ? '85% دقة الاسترجاع' : '85% Retrieval Accuracy',
    details: [
      { title: lang === 'ar' ? 'معالجة المستندات الذكية' : 'Smart Document Processing', content: lang === 'ar' ? 'يتم فهرسة الأوراق البحثية في قاعدة بيانات متجهية (VectorDB) لتمكين البحث الدلالي والاسترجاع اللحظي للمعلومات.' : 'Research papers are indexed in a Vector Database (VectorDB) to enable semantic search and instant information retrieval.' },
      { title: lang === 'ar' ? 'الردود الموثقة' : 'Documented Responses', content: lang === 'ar' ? 'كل إجابة يدعمها النظام تأتي مع اقتباس مباشر من المصدر لضمان الأمانة العلمية والدقة التقنية.' : 'Every response from the system comes with a direct citation from the source to ensure scientific integrity and technical accuracy.' },
    ]
  },
  {
    id: 'tech-support',
    title: 'Autonomous Tech Support Agent',
    titleAr: lang === 'ar' ? 'وكيل الدعم الفني المستقل' : 'Autonomous Tech Support Agent',
    description: lang === 'ar'
      ? 'وكيل ذكي مصمم لفهم السياق التقني المعقد وتشخيص المشكلات باستقلالية. يقوم بتحليل تاريخ المشكلة ويقترح حلولاً مخصصة تحاكي دور فريق الدعم الفني بكفاءة عالية.'
      : 'An intelligent agent designed to understand complex technical contexts and diagnose problems autonomously. It analyzes issue history and suggests customized solutions that mimic a tech support team with high efficiency.',
    tech: ['AI Agents', 'GPT-4', 'LangChain', 'Python'],
    icon: Headset,
    color: 'cyan',
    coverImage: '/images/projects/covers/Autonomous Tech Support Agent غلاف.png',
    images: ['/images/projects/tech-support/Autonomous Tech Support Agent 1.png'],
    metric: lang === 'ar' ? '70% تقليل وقت الحل' : '70% Resolution Time Reduction',
    details: [
      { title: lang === 'ar' ? 'فهم السياق التقني' : 'Technical Context Understanding', content: lang === 'ar' ? 'يحلل الوكيل تاريخ المشاكل السابقة ويستنتج الأنماط لتقديم حلول مخصصة بدلاً من الإجابات النمطية.' : 'The agent analyzes past issue history and infers patterns to provide customized solutions instead of generic answers.' },
      { title: lang === 'ar' ? 'التعلم المستمر' : 'Continuous Learning', content: lang === 'ar' ? 'يتطور الوكيل مع كل تفاعل، حيث يضيف الحلول الناجحة إلى قاعدة معرفته لزيادة كفاءة الردود المستقبلية.' : 'The agent evolves with each interaction, adding successful solutions to its knowledge base to improve future response efficiency.' },
    ]
  },
  {
    id: 'time-series',
    title: 'Financial Time Series Forecasting',
    titleAr: lang === 'ar' ? 'التنبؤ المالي بالسلاسل الزمنية' : 'Financial Time Series Forecasting',
    description: lang === 'ar'
      ? 'نموذج تنبؤي متقدم يعتمد على شبكات (LSTM) العصبية لتحليل الأنماط المخفية في البيانات المالية التاريخية وتقديم توقعات دقيقة للمسارات المستقبلية.'
      : 'An advanced predictive model based on LSTM neural networks to analyze hidden patterns in historical financial data and provide accurate forecasts for future trends.',
    tech: ['LSTM (RNN)', 'PyTorch', 'Pandas', 'Matplotlib'],
    icon: TrendingUp,
    color: 'emerald',
    coverImage: '/images/projects/covers/Financial Time Series Forecasting غلاف.png',
    images: ['/images/projects/financial/Financial Time Series Forecasting.png'],
    metric: lang === 'ar' ? '92% دقة التنبؤ' : '92% Forecast Accuracy',
    details: [
      { title: lang === 'ar' ? 'شبكات LSTM العصبية' : 'LSTM Neural Networks', content: lang === 'ar' ? 'استخدام خلايا الذاكرة طويلة المدى لتذكر الأنماط التاريخية وربطها بالتقلبات السعرية الحالية.' : 'Using long-term memory cells to remember historical patterns and link them to current price fluctuations.' },
      { title: lang === 'ar' ? 'تحليل المخاطر' : 'Risk Analysis', content: lang === 'ar' ? 'تحديد مستويات الثقة في التوقعات لتزويد المستثمرين بمؤشرات دقيقة حول قوة الاتجاه السعري.' : 'Determining confidence levels in predictions to provide investors with accurate indicators about price trend strength.' },
    ]
  },
  {
    id: 'gesture',
    title: 'Gesture Recognition System',
    titleAr: lang === 'ar' ? 'نظام التعرف على إشارات اليد' : 'Gesture Recognition System',
    description: lang === 'ar'
      ? 'نظام رؤية حاسوبية يمكن الجهاز من فهم لغة الإشارة لحظياً باستخدام كاميرا واحدة. يعتمد على نموذج AlexNet للتعرف على ست إشارات مختلفة بدقة متناهية.'
      : 'A computer vision system enabling the device to understand sign language in real-time using a single camera. It relies on the AlexNet model to recognize six different gestures with extreme precision.',
    tech: ['MATLAB', 'AlexNet (CNN)', 'Computer Vision', 'Deep Learning'],
    icon: HandMetal,
    color: 'pink',
    coverImage: '/images/projects/covers/Gesture Recognition System غلاف.png',
    images: ['/images/projects/gesture/Gesture Recognition System 1.png'],
    metric: lang === 'ar' ? '100% دقة التصنيف' : '100% Classification Accuracy',
    details: [
      { title: lang === 'ar' ? 'رؤية حاسوبية لحظية' : 'Real-time Computer Vision', content: lang === 'ar' ? 'معالجة إطارات الفيديو بسرعة عالية لضمان استجابة النظام الفورية لحركات اليد.' : 'High-speed video frame processing to ensure the system\'s instant response to hand movements.' },
      { title: lang === 'ar' ? 'Deep Learning' : 'Deep Learning', content: lang === 'ar' ? 'توظيف تقنيات التعلم العميق في تصنيف الصور لضمان أعلى مستويات الدقة في البيئات المتغيرة.' : 'Employing deep learning techniques in image classification to ensure the highest accuracy levels in changing environments.' },
    ]
  },
  {
    id: 'radar',
    title: 'Arduino Radar System',
    titleAr: lang === 'ar' ? 'نظام الرادار الذكي' : 'Arduino Radar System',
    description: lang === 'ar'
      ? 'نظام مراقبة يحاكي عمل الرادارات الحقيقية باستخدام مستشعر الموجات فوق الصوتية ولوحة Arduino، مع واجهة رسومية تفاعلية لعرض النتائج بمساحة 180 درجة.'
      : 'A surveillance system that simulates real radar operation using an ultrasonic sensor and Arduino board, with an interactive graphical interface displaying results across a 180-degree range.',
    tech: ['Arduino', 'C++', 'Processing App', 'Hardware Design'],
    icon: Radar,
    color: 'violet',
    coverImage: '/images/projects/covers/Arduino Radar System غلاف.png',
    images: ['/images/projects/radar/Arduino Radar System 1.png'],
    metric: lang === 'ar' ? '180° زاوية المسح' : '180° Scan Angle',
    details: [
      { title: lang === 'ar' ? 'بنية الربط (Interface)' : 'Interface Architecture', content: lang === 'ar' ? 'اتصال تسلسلي بين الاردوينو وتطبيق المعالجة الرسومية لعرض البيانات البيئية بشكل مرئي.' : 'Serial communication between Arduino and the graphical processing app to visually display environmental data.' },
      { title: lang === 'ar' ? 'استشعار المدى' : 'Range Sensing', content: lang === 'ar' ? 'قياس المسافة بدقة عالية بالأشعة فوق الصوتية لتحديد موقع الأجسام الغريبة في النطاق المحيط.' : 'High-precision distance measurement using ultrasonic waves to locate foreign objects in the surrounding range.' },
    ]
  },
  {
    id: 'hospital-network',
    title: 'Hospital Network Infrastructure',
    titleAr: lang === 'ar' ? 'بنية الشبكات الطبية' : 'Hospital Network Infrastructure',
    description: lang === 'ar'
      ? 'تصميم وهندسة بنية تحتية شبكية متكاملة لمستشفى مركزي وعياداته التابعة يضمن التصميم نقلاً آمناً وسريعاً للبيانات الطبية.'
      : 'Design and engineering of a comprehensive network infrastructure for a central hospital and its affiliated clinics, ensuring safe and fast medical data transfer.',
    tech: ['Cisco iOS', 'OSPF', 'VLANs', 'Security Protocols'],
    icon: Network,
    color: 'cyan',
    coverImage: '/images/projects/covers/Hospital Network Infrastructure غلاف.png',
    images: ['/images/projects/hospital/Hospital Network Infrastructure 1.png'],
    metric: '99.9% Uptime',
    details: [
      { title: lang === 'ar' ? 'أمن المعلومات (Network Security)' : 'Network Security', content: lang === 'ar' ? 'تطبيق جدران نارية وقواعد وصول صارمة لحماية السجلات الطبية من الاختراق.' : 'Implementing firewalls and strict access rules to protect medical records from breaches.' },
      { title: lang === 'ar' ? 'استمرارية العمل (Redundancy)' : 'Redundancy & Continuity', content: lang === 'ar' ? 'تصميم مسارات توجيه احتياطية لضمان عدم انقطاع الاتصال في الحالات الطارئة.' : 'Designing backup routing paths to ensure uninterrupted connectivity during emergencies.' },
    ]
  },
  {
    id: 'underwater',
    title: 'Underwater Channel Modeling',
    titleAr: lang === 'ar' ? 'نمذجة الشبكات تحت الماء' : 'Underwater Channel Modeling',
    description: lang === 'ar'
      ? 'محاكاة هندسية متقدمة لانتقال الإشارات اللاسلكية في البيئات المائية المعقدة يتنبأ بدقة بمعدلات نقل البيانات وتوهين الإشارة.'
      : 'An advanced engineering simulation of wireless signal propagation in complex aquatic environments, accurately predicting data transfer rates and signal attenuation.',
    tech: ['MATLAB', 'Wireless Modeling', 'Signal Processing', 'Acoustics'],
    icon: Waves,
    color: 'emerald',
    coverImage: '/images/projects/covers/Underwater Channel Modeling غلاف.png',
    images: [
      '/images/projects/underwater/Underwater Channel Modeling 1.png',
      '/images/projects/underwater/Underwater Channel Modeling 2.png'
    ],
    metric: lang === 'ar' ? 'نموذج دقيق رياضياً' : 'Mathematically Accurate Model',
    details: [
      { title: lang === 'ar' ? 'نمذجة القناة (Channel Modeling)' : 'Channel Modeling', content: lang === 'ar' ? 'بناء خوارزميات رياضية تحاكي قناة الاتصال الصوتية تحت الماء لمواجهة تحديات الانعكاس والضوضاء.' : 'Building mathematical algorithms that simulate the underwater acoustic communication channel to address reflection and noise challenges.' },
      { title: lang === 'ar' ? 'تحليل الإشارة' : 'Signal Analysis', content: lang === 'ar' ? 'دراسة تأثير التردد والعمق على انتقال الموجات لتحسين كفاءة أنظمة السونار والاتصالات البحرية.' : 'Studying the impact of frequency and depth on wave propagation to improve the efficiency of sonar systems and marine communications.' },
    ]
  }
];
