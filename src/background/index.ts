import "@plasmohq/messaging/background"

import {
  readStorageAsString,
  writeStorage
} from "../storage"

const storageDefaults = {
  enable_twifiner: "true",
  display_logo_button: "false",
  display_explore_button: "false",
  display_grok_button: "false",
  display_lists_button: "false",
  display_bookmarks_button: "true",
  display_communities_button: "false",
  display_premium_button: "false",
  display_drafts_button: "true",
  display_scheduled_button: "true",
  display_settings_button: "true",
  display_analytics_button: "true",
  display_more_button: "false",
  display_trends_panel: "false",
  display_whoToFollow_panel: "false",
  display_ads_tweets: "false",
  clean_tweet_text: "true",
  display_premium_panel: "false",
  display_footer_panel: "false",
  display_messages_box: "false",
  display_usernames_in_timeline: "false",
  change_hashtags_styles: "true",
  remove_repetitive_emojies: "true",
  tweet_datetime_as_age: "true",
  display_tabHeader_in_notifications_page: "false",
  change_replying_to_tweets_style: "true",
  display_usernames: "false",
  highlight_mutuals_friends: "true",
  change_tweet_datetime_style_in_messages_page: "true",
  display_usernames_in_messages_page: "false",
  display_dot_before_dates: "false",
  tweet_datetime_as_age_in_chat: "true",
  display_gallery: "false",
  display_highlights_tab: "false",
  joined_date_as_age: "true",
  change_pinned_tweet_style: "true",
  display_usernames_in_search1: "false",
  display_usernames_in_search2: "false",
  display_relevant_people: "false",
  display_translate_post: "false",
  display_discover_more: "false",
  is_label_shown: "true",
  mute_tweets_containing_specific_texts: "true",
  mutted_texts: "",
  make_rtl: "true",
  replace_link_with_title: "true",
  display_translate_link: "false",
  timeline_width: "normal",
  display_tooltip_dates_as_shamsi: "true",
  move_account_menu_to_top: "true"
}

const storageItems = Object.keys(storageDefaults)

chrome.runtime.onInstalled.addListener(async (details) => {
  await Promise.all(
    storageItems.map(async (key) => {
      let value = await readStorageAsString(key)

      if (!value) {
        writeStorage(key, storageDefaults[key])
        await new Promise((resolve) => setTimeout(resolve, 50))

        // Reload all tabs related to Twitter
        chrome.tabs.query({}, function (tabs) {
          tabs.forEach((tab) => {
            const url = tab.url
            if (url && url.match(/https:\/\/(twitter|x)\.com\/.*/)) {
              chrome.tabs.reload(tab.id)
            }
          })
        })
      }
    })
  )
})

chrome.management.onEnabled.addListener(() => {
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((tab) => {
      const url = tab.url
      if (url && url.match(/https:\/\/(twitter|x)\.com\/.*/)) {
        chrome.tabs.reload(tab.id)
      }
    })
  })
})