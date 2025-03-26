import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enMessages from '../messages/en.json'
import ruMessages from '../messages/ru.json'

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: enMessages
		},
		ru: {
			translation: ruMessages
		}
	},
	lng: 'ru',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false
	}
})

export default i18n
