import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { initialize, addTranslation, setActiveLanguage  } from 'react-localize-redux';

export default function configureStore(initialState) {
	const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
	const store = createStoreWithMiddleware(rootReducer, initialState);
	const languages = ['en', 'pl'];

	store.dispatch(initialize(languages, { defaultLanguage: 'en' }));

	const translations = {
		login: ['Login', 'Zaloguj się'],
		register: ['Register', 'Zarejestruj się']
	};

	store.dispatch(addTranslation(translations));

	return store;
}
