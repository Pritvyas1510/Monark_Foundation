// lib/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: "Member Registration",
      name: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      gender: "Select Gender",
      city: "City",
      region: "Region",
      photo: "Upload Photo",
      otp: "Enter OTP",
      interestedInHead: "Interested in Head Responsibility",
      submit: "Register",
      submitting: "Submitting...",
      success: "Registration successful",
      male: "Male",
      female: "Female",
      other: "Other",
    },
  },
  hi: {
    translation: {
      title: "सदस्य पंजीकरण",
      name: "पूरा नाम",
      phone: "फोन नंबर",
      email: "ईमेल पता",
      gender: "लिंग चुनें",
      city: "शहर",
      region: "क्षेत्र",
      photo: "फोटो अपलोड करें",
      otp: "ओटीपी दर्ज करें",
      interestedInHead: "हेड जिम्मेदारी में रुचि",
      submit: "पंजीकरण करें",
      submitting: "जमा हो रहा है...",
      success: "पंजीकरण सफल हुआ",
      male: "पुरुष",
      female: "महिला",
      other: "अन्य",
    },
  },
  gu: {
    translation: {
      title: "સભ્ય નોંધણી",
      name: "પૂરુ નામ",
      phone: "ફોન નંબર",
      email: "ઈમેલ સરનામું",
      gender: "લિંગ પસંદ કરો",
      city: "શહેર",
      region: "ક્ષેત્ર",
      photo: "ફોટો અપલોડ કરો",
      otp: "ઓટિપિ દાખલ કરો",
      interestedInHead: "હેડ જવાબદારીમાં રસ",
      submit: "નોંધણી કરો",
      submitting: "સબમિટ કરી રહ્યું છે...",
      success: "નોંધણી સફળ",
      male: "પુરુષ",
      female: "સ્ત્રી",
      other: "અન્ય",
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
