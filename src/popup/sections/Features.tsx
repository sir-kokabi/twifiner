import TimelineButtonGroup from "~popup/components/TimelineButtonGroup"
import Toggle from "~popup/components/Toggle"

const Features = () => {
  return (
    <>
    <div className="flex flex-col justify-center">
      <TimelineButtonGroup id="timeline_width" />
      <p className="text-sm text-black mt-6">Some following features may require a page refresh to display changes:</p>
      <Toggle id="display_trends_panel" title="Display Trends" />
      <Toggle id="display_whoToFollow_panel" title="Display Who to follow" />
      
      <Toggle id="display_messages_box" title="Display messages box" />      

      <Toggle
        id="display_relevant_people"
        title="Display relevant people"        
      />
      <Toggle
        id="display_translate_link"
        title="Display translate link"        
      />
      <Toggle
        id="display_tabHeader_in_notifications_page"
        title="Display notification tab header"        
      />
      <Toggle
        id="clean_tweet_text"        
        title="Clean persian tweets"                
      />
      <Toggle
        id="change_hashtags_styles"        
        title="Make hashtags pop"        
      />
      <Toggle
        id="display_ads_tweets"        
        title="Display Ads"        
      />
      <Toggle
        id="replace_link_with_title"        
        title="Replace t.co links with title"
      />
      <Toggle
        id="highlight_mutuals_friends"        
        title="Highlight mutuals friends"
        tooltip="In following, followers and verified followers page"
      />    
      <Toggle
        id="highlight_pinned_tweet"        
        title="Highlight pinned tweet"    
      />
      <Toggle
        id="highlight_replying_notification"        
        title="Highlight replying notifications"    
      />
      <Toggle
        id="move_account_menu_to_top"        
        title="Move account menu to top"    
      />
      <Toggle
        id="display_advanced_search"        
        title="Display advanced search"    
      />
    
      <Toggle
        id="hide_ads_tweets"        
        title="Hide ads in timeline"    
      />
    
    </div>


    </>
  )
}

export default Features
