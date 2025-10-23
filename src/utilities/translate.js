import { CURRENT_LANG } from "../constants/settings";
import eng from "../constants/languages/eng.json";
import my from "../constants/languages/my.json";

export const setLanguage = (lang) => {
    localStorage.setItem(CURRENT_LANG, lang);

    if(lang === 'eng') return eng;

    if(lang === 'my') return my;

    return eng;
}