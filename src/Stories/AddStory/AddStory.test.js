import {AddStory} from "./AddStory";

it('AddStory renders correctly', () => {
    const props = {
        goToHost: jest.fn()
    }
    expect(AddStory(props)).toMatchSnapshot();
});