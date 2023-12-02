import { useMemo, useState } from 'react'
import './App.scss'
import WeatherCard from './components/WeatherCard'

function App() {

  const [lang, setLang] = useState({shortName:'ar',name:'Arabic'})

  //SetLang
  let siteDir = useMemo(() => {
    if (lang.shortName == 'ar') {
      return 'rtl'
    }else if(lang.shortName == 'en'){
      return 'ltr'
    }
  }, [lang])

  return (
    <>
      <div className="container" >
        <WeatherCard setLang={setLang} lang={lang} siteDir={siteDir}/>
      </div>
    </>
  )
}

export default App
