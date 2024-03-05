import {
  readStorageAsString,
  writeStorage
} from "../storage"

const storageDefaults = {
  enable_twifiner: "true",
  hide_X_logo: "true",
  hide_explore_button: "true",
  hide_grok_button: "true",
  hide_lists_button: "true",
  hide_bookmarks_button: "false",
  hide_communities_button: "true",
  hide_premium_button: "true",
  add_drafts_button: "false",
  add_scheduled_button: "false",
  add_settings_button: "true",
  add_analytics_button: "false",
  hide_more_button: "false",
  hide_trends_panel: "true",
  hide_whoToFollow_panel: "true",
  hide_ads_tweets: "true",
  clean_tweet_text: "true",
  hide_premium_panel: "true",
  hide_footer_panel: "true",
  hide_messages_box: "true",
  hide_usernames_in_timeline: "true",
  make_hashtags_pop: "true",
  remove_repetitive_emojies: "true",
  tweet_datetime_as_age: "true",
  highlight_replying_notification: "true",
  highlight_mutuals_friends: "true",
  change_tweet_datetime_style_in_messages_page: "true",
  tweet_datetime_as_age_in_chat: "true",
  joined_date_as_age: "true",
  highlight_pinned_tweet: "true",
  is_label_shown: "true",
  mute_tweets_containing_specific_texts: "true",
  mutted_texts: "",
  make_rtl: "true",
  timeline_width: "normal",
  move_account_menu_to_top: "true",
  hide_tabHeader_in_notifications_page: "true",
  hide_usernames: "true",
  hide_usernames_in_messages_page: "true",
  hide_dot_before_dates: "true",
  hide_gallery: "true",
  hide_highlights_tab: "true",
  hide_usernames_in_search1: "true",
  hide_usernames_in_search2: "true",
  hide_relevant_people: "true",
  hide_discover_more: "true",
  hide_translate_link: "true",
  display_tooltip_dates_as_shamsi: "true",
  add_advanced_search:"true",
  hide_reposts:"false",
  tweet_font_size:"15",
  change_persian_tweets_font:"false",
  justify_tweet_text: "false"
}

const storageItems = Object.keys(storageDefaults)

chrome.runtime.onInstalled.addListener(async (details) => {
  await Promise.all(
    storageItems.map(async (key) => {
      let value = await readStorageAsString(key)

      if (!value) {
        writeStorage(key, storageDefaults[key])
        await new Promise((resolve) => setTimeout(resolve, 50))
      }
    })
  )
})