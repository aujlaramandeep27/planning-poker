import {Estimate} from './Estimate';

describe('Container: Estimate', () => {
    it('should render Estimate correctly', () => {
        const props = {
            storyId: '123',
            storyDescription: 'blah',
            estimate: 1,
            goToMeetings: jest.fn(),
            goToHost: jest.fn(),
            estimateStory: jest.fn(),
            currentMeeting: jest.fn().mockReturnValue({
                host: 'user blah'
            }),
            location: {
                search: 'blah'
            }
        }

        expect(Estimate(props)).toMatchSnapshot();
    })
});