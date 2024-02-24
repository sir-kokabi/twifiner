import moment from "moment"
import ghmariMoment from "moment-hijri"
import shamsiMoment from "moment-jalaali"
import persianRex from "persian-rex"
import rtl from "rtl-detect"
import Virastar from "virastar"

import { sendToBackground } from "@plasmohq/messaging"

import { readStorageAsList } from "./storage"

var virastar = new Virastar({ cleanup_begin_and_end: false })

function cleanupText(text) {
  let normalizedText = text

  if (isPersian(text)) {
    normalizedText = virastar.cleanup(text)
    normalizedText = normalizedText.replace(/(.)\1{2,}/g, "$1$1") // Reduce more than 2 consecutive characters to 2
  }

  return normalizedText
}

function isPersian(text) {
  var totalCharacters = text.length

  var persianCharacters = 0

  for (var i = 0; i < totalCharacters; i++) {
    if (persianRex.text.test(text.charAt(i))) {
      persianCharacters++
    }
  }

  var percentage = (persianCharacters / totalCharacters) * 100

  return percentage > 80
}

function wholeWordSearch(tweetText, text) {
  const persianTextPattern = new RegExp(
    `(?<![آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیؤئيإأةكء])${text}(?![آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیؤئيإأةكء])`
  )
  return persianTextPattern.test(tweetText)
}

function muteRegexPattern(text) {
  return false
}

function getRoundedAge(starttime) {
  const startMoment = moment(starttime)
  const endMoment = moment()
  const duration = moment.duration(Math.abs(endMoment.diff(startMoment)))

  const thresholds = [
    { unit: "seconds", threshold: 45 },
    { unit: "minutes", threshold: 45 },
    { unit: "hours", threshold: 18 },
    { unit: "days", threshold: 5 },
    { unit: "weeks", threshold: 3 },
    { unit: "months", threshold: 9 }
  ]

  for (let i = 0; i < thresholds.length - 1; i++) {
    const currentUnit = thresholds[i].unit
    const currentThreshold = thresholds[i].threshold

    if (duration[currentUnit]() >= currentThreshold) {
      duration.add(1, thresholds[i + 1].unit)
    }
  }

  const units = [
    "years",
    "months",
    "weeks",
    "days",
    "hours",
    "minutes",
    "seconds"
  ]

  for (const unit of units) {
    const unitValue = duration[unit]()

    if (unitValue > 0) {
      const unitLabel = unitValue === 1 ? unit.slice(0, -1) : unit
      return `${unitValue} ${unitLabel}`
    }
  }
}

async function hasMuttedText(tweetText) {
  const mutedTexts = await readStorageAsList("mutted_texts")

  return mutedTexts.some((text) => {
    return wholeWordSearch(tweetText, text)
  })
}

async function getFinalUrl(url) {
  try {
    const finalUrl = await fetchUrl(url)

    return finalUrl
  } catch (error) {
    return undefined
  }
}

const parser = new DOMParser()

async function getTitle(url) {
  try {
    const text = await fetchText(url)

    const doc = parser.parseFromString(text, "text/html")
    const title = doc.querySelector("title").textContent
    const h1Tags = Array.from(doc.querySelectorAll("h1"))
    let heading = h1Tags.find((h1) => title.includes(h1.textContent))
    heading = heading ? heading.textContent : title
    return heading
  } catch (error) {
    return undefined
  }
}

async function getFavIcon(url) {
  try {
    const finalUrl = await getFinalUrl(url)
    const favicon = await fetchFavIcon(finalUrl)
    return favicon
  } catch (error) {
    return undefined
  }
}

async function fetchUrl(url) {
  const res = await sendToBackground({
    name: "fetchUrl",
    body: url
  })

  return res
}
async function fetchText(url) {
  const res = await sendToBackground({
    name: "fetchText",
    body: url
  })

  return res
}
async function fetchFavIcon(url) {
  const res = await sendToBackground({
    name: "fetchFavIcon",
    body: url
  })

  return res
}

function evaluateXpath(xpath) {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  )
}

function cleanTweetText(text) {
  // Remove URLs
  text = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")

  // Remove text starting with '@' and hashtags starting with '#'
  text = text.replace(/(?:\B@|\B#)\w+/g, "")

  return text
}

async function isRTL(text) {
  text = cleanTweetText(text)
  const result = (await chrome.i18n.detectLanguage(text)).languages[0].language
  return rtl.isRtlLang(result)
}

function formatShamsiDate(date) {
  const shamsiMomentDate = shamsiMoment(date, "MMM D, YYYY");
  const shamsiDate = shamsiMomentDate.format("jYYYY / (MM) jDD / jMM");
  const shamsiMonthNumber = shamsiMomentDate.jMonth();
  const farsiMonthNames = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];
  const farsiMonthName = farsiMonthNames[shamsiMonthNumber];
  const formattedShamsiDate = shamsiDate.replace(/\((\d+)\)/, `(${farsiMonthName})`);
  return formattedShamsiDate;
}

function formatGhamariDate(date) {
  const ghamariMomentDate = ghmariMoment(date, "MMM D, YYYY");
  const ghamariDate = ghamariMomentDate.format("iYYYY / (MM) iDD / iMM");
  const ghamariMonthNumber = ghamariMomentDate.iMonth();
  const ghamariMonthNames = [
    "محرم", "صفر", "ربیع‌الاول", "ربیع‌الثانی", "جمادی‌الاول", "جمادی‌الثانی",
    "رجب", "شعبان", "رمضان", "شوال", "ذیقعده", "ذیحجه"
  ];
  const ghamariMonthName = ghamariMonthNames[ghamariMonthNumber];
  const formattedGhamariDate = ghamariDate.replace(/\((\d+)\)/, `(${ghamariMonthName})`);
  return formattedGhamariDate;
}

function bgColorForCurrentTheme(){
  const themeColor = document.querySelector('meta[name="theme-color"]').getAttribute("content");
  if (themeColor === "#000000") return "#202327";
  if (themeColor==="#15202B") return "#273340";
  return "#eceeee";  
}

function getCurrentTheme(){
  const themeColor = document.querySelector('meta[name="theme-color"]').getAttribute("content");
  if (themeColor === "#000000") return "dark";
  if (themeColor==="#15202B") return "dim";
  return "light";  
}

function formatAllDates(datetime) {
  const [time, date] = datetime.split(" · ");
  const formattedShamsi = formatShamsiDate(date);
  const formattedGhamari = formatGhamariDate(date);
  const fotmattedGeorgian = moment(date, "MMM D, YYYY").format("YYYY / (MMM) MM / DD")
  return [fotmattedGeorgian, formattedShamsi, formattedGhamari, time];
}

function getSimplifiedVersion () {
  const version = chrome.runtime.getManifest().version
  
  let parts = version.split('.');

  while (parts.length > 1 && parts[parts.length - 1] === '0') {
      parts.pop();
  }

  if (parts.length > 1 && parts[parts.length - 1] === '0') {
      parts.pop();
  }

  return parts.join('.');
};

export {
  getRoundedAge,
  isPersian,
  cleanupText,
  muteRegexPattern,
  hasMuttedText,
  isRTL,
  getFinalUrl,
  getTitle,
  getFavIcon,
  formatAllDates,
  evaluateXpath,
  fetchText,
  bgColorForCurrentTheme,
  getCurrentTheme,
  getSimplifiedVersion
}
