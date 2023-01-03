import EN from './EN';
import TR from './TR';

const translations = {
    EN,
    TR
};

const getTranslatedText = (
    key,
    locale
) => {
    const currTranslation = translations[locale] ? translations[locale] : TR;
    let translatedText  = currTranslation[key]
    ? currTranslation[key]
    : TR[key]
    ? TR[key]
    : key;

    return translatedText;
};

export { getTranslatedText };