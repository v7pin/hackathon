import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Create Account": "Create Account",
      "Sign up with Google": "Sign up with Google",
      "Sign up with Facebook": "Sign up with Facebook",
      "-OR-": "-OR-",
      "Username": "Username",
      "Email Address": "Email Address",
      "Password": "Password",
      "Already have an account?": "Already have an account?",
      "Log in": "Log in",
      "Security! Caution! Everyone's Attention!": "Security! Caution! Everyone's Attention!",
    }
  },
  hi: {
    translation: {
      "Create Account": "खाता बनाएं",
      "Sign up with Google": "गूगल के साथ साइन अप करें",
      "Sign up with Facebook": "फेसबुक के साथ साइन अप करें",
      "-OR-": "-या-",
      "Username": "उपयोगकर्ता नाम",
      "Email Address": "ईमेल पता",
      "Password": "पासवर्ड",
      "Already have an account?": "पहले से खाता है?",
      "Log in": "लॉग इन करें",
      "Security! Caution! Everyone's Attention!": "सुरक्षा! सावधान! सबका ध्यान!",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // initial language
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
