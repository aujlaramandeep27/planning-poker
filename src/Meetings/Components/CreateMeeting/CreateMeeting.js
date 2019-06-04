import React from 'react';
import { connect } from 'react-redux';
import { PostMeeting } from '../../Actions/MeetingsActions';
import { viewMeetings } from '../../../Navigation/route-actions';
import { withHeader } from '../../../Common/Header';

export function CreateMeeting({postMeeting}) {
  return (
    <form onSubmit={ event => { postNewMeeting(event, postMeeting) } }>
      <div className="uk-margin">
        <div className="uk-inline uk-width-1-2">
          <span className="uk-form-icon" data-uk-icon="icon: users"/>
          <input name="meetingInputName" className="uk-input" placeholder="Name" type="text"/>
        </div>
        <button className="uk-button uk-button-primary uk-width-1-4">
          CREATE
        </button>
      </div>
    </form>
  );

  function postNewMeeting(event, onSubmit) {
    event.preventDefault();
    onSubmit(event.target.meetingInputName.value.trim());
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postMeeting: (meetingName) => dispatch(PostMeeting(meetingName)),
    goBack: () => dispatch(viewMeetings())
  }
}

export default connect(null, mapDispatchToProps)(withHeader(CreateMeeting, 'Add Meeting'))
