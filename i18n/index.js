import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { PUBLIC_LANGUAGE_CODE },
} = getConfig();

const lng = PUBLIC_LANGUAGE_CODE || 'zh_TW';
const translation = require(`./locales/${lng}/translation.json`);

let resources = {}
resources[lng] = {
  translation: translation
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: lng
  })

export default i18n;