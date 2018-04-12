import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { initialize, addTranslation, setActiveLanguage  } from 'react-localize-redux';
import translations from '../translate/vocabulary';

export default function configureStore(initialState) {
	const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
	const store = createStoreWithMiddleware(rootReducer, initialState);
	const languages = ['en', 'pl'];

	store.dispatch(initialize(languages, { defaultLanguage: 'en' }));

	store.dispatch(addTranslation(translations));

	return store;
}
