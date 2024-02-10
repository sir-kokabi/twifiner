import { Storage } from "@plasmohq/storage";

const storage = new Storage();

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
    'display_explore_button',
    'display_grok_button',
    'display_lists_button',
    'display_bookmarks_button',
    'display_communities_button',
    'display_premium_button',
    'display_drafts_button',
    'display_scheduled_button',
    'display_settings_button',
    'display_analytics_button',
    'display_more_button',
    'display_trends_panel',
    'display_whoToFollow_panel',
    'display_ads_tweets',
    'clean_tweet_text',
    'display_messages_box',
    'display_tabHeader_in_notifications_page',
    'display_gallery',
    'display_relevant_people',
    'is_label_shown',
    'mutted_texts',
    'display_translate_link',
    'timeline_width',
    'display_advanced_search'
  ];

  settingsToWatch.forEach((setting) => {
    storage.watch({
      [setting]: (c) => {
        callback(c.newValue);
      },
    });
  });
};

  