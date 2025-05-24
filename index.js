/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { persistedStore, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const AppContainer = () => {
    return (
        <Provider store={store} >
            <PersistGate loading={null} persistor={persistedStore}>
                <App />
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => AppContainer);
