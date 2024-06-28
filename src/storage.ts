import { Storage } from "@plasmohq/storage";

const storage = new Storage();

export const readStorage = async (key:string)=>{
  return storage.get(key);
}

export const deleteStorageKey = async (key:string)=>{
  await storage.remove(key);
}


export const readStorageAsBoolean = async (key:string)=>{
    const value = await storage.get(key);    
    return value=="true";
}

export const readStorageAsString = async (key:string)=>{
    const value = await storage.get(key);    
    return value;
}

export const readStorageAsList = async (key:string)=>{
    const value = await storage.get(key);
    if(!value) return [];        
    return value.split(/\r?\n/);
}

export const writeStorage = async (key:string, value:string)=>{
    await storage.set(key, value);
}


export const removeDuplicatesAndWriteToStorage = async (key:string, value:string[])=>{  
    const newValue = [...new Set(value)];
    await writeStorage(key, newValue.join('\n'));  
}


export const watchSettings = (callback) => {
  const settingsToWatch = [
    'hide_explore_button',
    'hide_grok_button',
    'hide_lists_button',
    'hide_bookmarks_button',
    'hide_communities_button',
    'hide_premium_button',
    'hide_more_button',
    'add_drafts_button',
    'add_scheduled_button',
    'add_settings_button',
    'add_analytics_button',
    'hide_trends_panel',
    'hide_whoToFollow_panel',
    'hide_ads_tweets',
    'hide_messages_box',
    'hide_tabHeader_in_notifications_page',
    'hide_gallery',
    'hide_relevant_people',
    'hide_translate_link',
    'hide_reposts',
    'hide_discover_more',
    'add_advanced_search',
    'clean_tweet_text',
    'is_label_shown',
    'mutted_texts',
    'timeline_width',
    'tweet_font_size',
    'change_persian_tweets_font',
    'justify_tweet_text'
  ];

  settingsToWatch.forEach((setting) => {
    storage.watch({
      [setting]: (c) => {
        callback(c.newValue);
      },
    });
  });
};

  