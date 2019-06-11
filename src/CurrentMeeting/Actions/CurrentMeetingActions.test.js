import {
    CURRENT_MEETING_ERROR,
    CURRENT_MEETING_SUCCESS,
    GetCurrentMeeting,
    getCurrentMeetingAsync
} from "./CurrentMeetingActions";
import {CurrentMeetingAPI} from "../API/CurrentMeeting.api";
import {call, put, select} from 'redux-saga/effects';
import {getCurrentMeetingId} from "../../Common/selectors";

describe('CurrentMeeting Actions', () => {
    let fixture;

    describe('GetCurrentMeeting', () => {
        const meetingId = '2342nioewro2342';

        beforeEach(() => {
            fixture = getCurrentMeetingAsync({payload: meetingId});
        });

        it('should dispatch action when meeting not in store', () => {
            const ApiResponse = [];
            expect(fixture.next().value).toEqual(select(getCurrentMeetingId));
            expect(fixture.next(null).value).toEqual(call(CurrentMeetingAPI.byId, meetingId));
            expect(fixture.next(ApiResponse).value).toEqual(put({
                type: CURRENT_MEETING_SUCCESS,
                payload: {currentMeeting: ApiResponse}
            }));
            expect(fixture.next().done).toBeTruthy();
        });

        it('should not dispatch action when meeting is in store', () => {
            expect(fixture.next().value).toEqual(select(getCurrentMeetingId));
            expect(fixture.next(meetingId).done).toBeTruthy();
        });

        it('should handle errors', () => {
            fixture.next();
            let e = {message: 'Failed!'};
            expect(fixture.throw(e).value).toEqual(put({
                type: CURRENT_MEETING_ERROR,
                payload: {
                    error: e
                }
            }));
            expect(fixture.next().done).toBeTruthy();
        });
    });

});