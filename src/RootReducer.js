import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import user from './User/Reducers/UserReducer';
import storyEstimate from './StoryEstimate/Reducers/StoryEstimateReducer';
import meetings from './Meetings/Reducers/MeetingsReducer';
import stories from './Stories/Reducers/StoriesReducer';
import error from './ErrorReducer';
import currentMeeting from './CurrentMeeting/Reducers/CurrentMeetingReducer';
import currentStory from './CurrentStory/Reducers/CurrentStoryReducer'

export default (history) =>
  combineReducers({
      router: connectRouter(history),
      storyEstimate,
      user,
      meetings,
      stories,
      currentMeeting,
      currentStory,
      error
    }
  );
