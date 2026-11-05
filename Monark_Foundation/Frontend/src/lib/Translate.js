// lib/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Page Titles
      title: "Member Registration",
      membershipTitle: "Monark Foundation Membership",
      membershipDesc: "Join us to create social impact across communities.",

      // Buttons
      learnMore: "Learn More",
      viewStories: "View Stories",
      registerNow: "Register Now",
      submitting: "Submitting...",
      editDetails: "Edit Details",
      downloadCard: "Download ID Card (PDF)",

      // Form Fields
      name: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      dob: "Date of Birth",
      address: "Address",
      gender: "Select Gender",
      bloodGroup: "Blood Group",
      city: "City",
      Landmark: "Landmark",
      photo: "Upload Photo",
      interestedInHead: "Interested in Head Responsibility",

      // Gender
      male: "Male",
      female: "Female",
      other: "Other",

      // Success
      success: "Registration successful 🎉",
    },
  },

  hi: {
    translation: {
      title: "सदस्य पंजीकरण",
      membershipTitle: "मोनार्क फाउंडेशन सदस्यता",
      membershipDesc: "समुदायों में सामाजिक प्रभाव बनाने के लिए हमारे साथ जुड़ें।",

      learnMore: "और जानें",
      viewStories: "कहानियाँ देखें",
      registerNow: "पंजीकरण करें",
      submitting: "जमा हो रहा है...",
      editDetails: "विवरण संपादित करें",
      downloadCard: "आईडी कार्ड डाउनलोड करें",

      name: "पूरा नाम",
      phone: "फोन नंबर",
      email: "ईमेल पता",
      dob: "जन्म तिथि",
      address: "पता",
      gender: "लिंग चुनें",
      bloodGroup: "ब्लड ग्रुप",
      city: "शहर",
      Landmark: "क्षेत्र",
      photo: "फोटो अपलोड करें",
      interestedInHead: "हेड जिम्मेदारी में रुचि",

      male: "पुरुष",
      female: "महिला",
      other: "अन्य",

      success: "पंजीकरण सफल हुआ 🎉",
    },
  },

  gu: {
    translation: {
      title: "સભ્ય નોંધણી",
      membershipTitle: "મોનાર્ક ફાઉન્ડેશન સભ્યપદ",
      membershipDesc: "સમાજમાં સકારાત્મક પરિવર્તન લાવવા માટે અમારી સાથે જોડાઓ.",

      learnMore: "વધુ જાણો",
      viewStories: "કથાઓ જુઓ",
      registerNow: "નોંધણી કરો",
      submitting: "સબમિટ થઈ રહ્યું છે...",
      editDetails: "વિગતો સંપાદિત કરો",
      downloadCard: "આઈડી કાર્ડ ડાઉનલોડ કરો",

      name: "પૂરુ નામ",
      phone: "ફોન નંબર",
      email: "ઈમેલ સરનામું",
      dob: "જન્મ તારીખ",
      address: "સરનામું",
      gender: "લિંગ પસંદ કરો",
      bloodGroup: "બ્લડ ગ્રુપ",
      city: "શહેર",
      Landmark: "ક્ષેત્ર",
      photo: "ફોટો અપલોડ કરો",
      interestedInHead: "હેડ જવાબદારીમાં રસ",

      male: "પુરુષ",
      female: "સ્ત્રી",
      other: "અન્ય",

      success: "નોંધણી સફળ 🎉",
    },
  },
};


i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
