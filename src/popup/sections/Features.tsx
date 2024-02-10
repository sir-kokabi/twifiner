import TimelineButtonGroup from "~popup/components/TimelineButtonGroup"
import Toggle from "~popup/components/Toggle"

const Features = () => {
  return (
    <>
    <div className="flex flex-col justify-center">
      <TimelineButtonGroup id="timeline_width" />

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
        title="Clean persian tweets *"                
      />
      <Toggle
        id="change_hashtags_styles"        
        title="Make hashtags pop *"        
      />
      <Toggle
        id="display_ads_tweets"        
        title="Display Ads"        
      />
      <Toggle
        id="replace_link_with_title"        
        title="Replace t.co links with title *"
      />
      <Toggle
        id="highlight_mutuals_friends"        
        title="Highlight mutuals friends *"
        tooltip="In following, followers and verified followers page"
      />
    
    </div>

    <p className="text-xs text-gray-400 mt-6">Features marked with an asterisk (*) require a page refresh to apply changes. </p>

    </>
  )
}

export default Features
