import Slider from "~popup/components/Slider"
import TimelineButtonGroup from "~popup/components/TimelineButtonGroup"
import Toggle from "~popup/components/Toggle"

const Features = () => {
  return (
    <>
      <div className="flex flex-col justify-center">
        <TimelineButtonGroup id="timeline_width" />
        <Slider
        classNames="mt-4"
          id="tweet_font_size"
          label="Tweet Font Size"
          min={12}
          max={24}
        />
        <p className="text-sm text-black mt-6">
          Some following features may require a page refresh to display changes:
        </p>
        <Toggle id="hide_trends_panel" title="Hide Trends" />
        <Toggle id="hide_whoToFollow_panel" title="Hide Who to follow" />

        <Toggle id="hide_messages_box" title="Hide messages box" />

        <Toggle id="hide_relevant_people" title="Hide relevant people" />
        <Toggle id="hide_translate_link" title="Hide translate link" />
        <Toggle
          id="hide_tabHeader_in_notifications_page"
          title="Hide notification tab header"
        />
        <Toggle id="clean_tweet_text" title="Clean persian tweets" />
        <Toggle id="make_hashtags_pop" title="Make hashtags pop" />

        <Toggle
          id="replace_link_with_title"
          title="Replace t.co links with title"
        />
        <Toggle
          id="highlight_mutuals_friends"
          title="Highlight mutuals friends"
          tooltip="In following, followers and verified followers page"
        />
        <Toggle id="highlight_pinned_tweet" title="Highlight pinned tweet" />
        <Toggle
          id="highlight_replying_notification"
          title="Highlight replying notifications"
        />
        <Toggle
          id="move_account_menu_to_top"
          title="Move account menu to top"
        />
        <Toggle id="add_advanced_search" title="Add advanced search" />

        <Toggle id="hide_ads_tweets" title="Hide ads in timeline" />

        <Toggle id="hide_reposts" title="Hide reposts in timeline" />
      </div>
    </>
  )
}

export default Features
