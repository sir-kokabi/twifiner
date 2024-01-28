import TimelineButtonGroup from "~popup/components/TimelineButtonGroup"
import Toggle from "~popup/components/Toggle"

const Features = () => {
  return (
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
    
    </div>
  )
}

export default Features
