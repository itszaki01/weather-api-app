import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './WeatherCard.scss'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import moment from 'moment/moment'
import 'moment/min/locales'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import { fetchWeather } from '../Store/weatherSlice'

export default function WeatherCard({ setLang, lang, siteDir }) {
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch()
    const temp = useSelector(({ weather }) => weather.weather)
    useEffect(() => {
        if (localStorage.getItem("i18nextLng") != 'en' || localStorage.getItem("i18nextLng") != 'ar') {
            i18n.changeLanguage('ar')
        }
        dispatch(fetchWeather())
    }, [])
    //handleChangeLangClick
    moment.locale(lang.shortName)
    function handleChangeLangClick() {
        if (lang.shortName == 'ar') {
            setLang({ shortName: 'en', name: 'Arabic' })
            i18n.changeLanguage('en')
        } else if (lang.shortName == 'en') {
            setLang({ shortName: 'ar', name: 'إنجليزي' })
            i18n.changeLanguage('ar')
        }
    }

    return (
        <>
            <div className="card" dir={siteDir}>
                <div className='card-header'>
                    <h1>{t('سطيف')}</h1>
                    <h4>{moment().format('LLLL')}</h4>
                    <hr />
                </div>
                <div className="card-big-icon">
                    <FontAwesomeIcon icon={faCloud} style={{ color: "#ffffff", fontSize: '150px' }} />
                </div>
                <div className="card-info">
                    <h1 style={{ fontSize: '65px' }}>{temp.number} <img src={temp.icon} alt="" /></h1>
                    <h2>{t(temp.description,{fallbackLng:'en'})}</h2>

                    <div className='card-info-footer'>
                        <h3>{t('أعلى')} : {temp.max}</h3>
                        <h3>|</h3>
                        <h3>{t('أدنى')}: {temp.min}</h3>
                    </div>
                </div>
                <button onClick={handleChangeLangClick}>{lang.name}</button>
            </div>
        </>
    )
}