// pages/_app.js
import { UnitProvider } from '@/context/UnitContext';
import { LanguageProvider} from '@/context/LanguageContext';
import { CityIdProvider } from '@/context/CityIdContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <CityIdProvider>
      <UnitProvider>
        <LanguageProvider>        
          <Component {...pageProps} />         
        </LanguageProvider>
      </UnitProvider>
    </CityIdProvider>
  );
}

export default MyApp;

