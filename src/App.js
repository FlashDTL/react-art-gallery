import './css/App.css';
import React, { useEffect, useState } from 'react';
import Artwork from "./Components/Artwork";

function App() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [dayNightMode, setDayNightMode] = useState(
        JSON.parse(localStorage.getItem('mode')) || false
    );

    const [language, setLanguage] = useState(
        JSON.parse(localStorage.getItem('lang')) || 'en'
    )

    const text = {
        'est': {
            'header': 'React Kunstigalerii',
            'day': 'Päev',
            'night': 'Öö',
            'empty': 'Sisu puudub',
            'copyright': '© 2023 Eduard Žurin. Kõik õigused kaitstud.'
        },
        'en': {
            'header': 'React Art Gallery',
            'day': 'Day',
            'night': 'Night',
            'empty': 'No content available',
            'copyright': '© 2023 Eduard Žurin. All Rights Reserved.'
        },
        'ru': {
            'header': 'React Галерея Искусств',
            'day': 'День',
            'night': 'Ночь',
            'empty': 'Пусто',
            'copyright': '© 2023 Eduard Žurin. Все права защищены.'
        }
    }


    const toggleDayNightMode = () => {
        const updated = !dayNightMode
        setDayNightMode(updated);
        localStorage.setItem('mode', JSON.stringify(updated));
    };

    const toggleLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('lang', JSON.stringify(lang))

    }

    const removeArtwork = (id) => {
        setData(data.filter(a => a.id !== id))

    }

    const translateText = (lang, t) =>{
        return text[lang][t]
    }

    const nextPage = () =>{
        setPage(page + 1)
        window.scrollTo(0, 0);
    }

    const previousPage = () => {
        if (page <= 1){
            setPage(1)
        }else {setPage(page - 1)}
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        const fetchData = async (page) => {
            try {
                console.log(localStorage)
                const url = 'https://api.artic.edu/api/v1/artworks?page=' + page + '&limit=20&fields=id,title,image_id'
                const response = await fetch(url);
                const data = await response.json();
                setData(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(page);
    }, [page]);



  return (
      <div className={dayNightMode ? 'page-night' : 'page'}>
      <div className="header">
        <h1>{translateText(language, "header")}</h1>
          <div className="app-preferences">
              <h2>{translateText(language, "day")}</h2>
              <label className="switch">
                  <input type="checkbox" checked={dayNightMode} onChange={toggleDayNightMode}/>
                      <span className="slider"></span>
              </label>
              <h2>{translateText(language, "night")}</h2>

          </div>
      </div>
          <div className={dayNightMode ? 'container-night' : 'container'}>
          <ul className={dayNightMode ? 'content-night' : 'content'}>
              {data.length >= 1 ? (
                  data.map((data) => (
                      <Artwork
                          key={data.id}
                          mode={dayNightMode}
                          id={data.id}
                          remove={removeArtwork}
                          title={data.title}
                          image_id={data.image_id}
                      ></Artwork>
                  ))
              ) : (
                  <div className='content-missing'>
                      <h2>{translateText(language, 'empty')}</h2>
                  </div>
              )}
          </ul>
      </div>
          <div className={dayNightMode ? "buttons-night" : "buttons"}>
              <button onClick={previousPage}>←</button>
              <button onClick={nextPage}>→</button>
          </div>
          <div className="footer">
              <p>{translateText(language, "copyright")}</p>
              <div className='languages'>
                  <p className={language === "est" ? "selected" : null} onClick={() => toggleLanguage("est")}>EST</p>
                  <p className={language === "en" ? "selected" : null} onClick={() => toggleLanguage("en")}>EN</p>
                  <p className={language === "ru" ? "selected" : null} onClick={() => toggleLanguage("ru")}>RU</p>
              </div>
          </div>
      </div>
  );
}

export default App;
