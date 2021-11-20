import React from 'react';
import {shallow} from 'enzyme';
import HappyHourAd from './HappyHourAd';
const select = {
  title: '.title',
  promoDescription: '.promoDescription',
};
const testProps = {
  title: 'testTitle',
  promoDescription: 'promoDescription',
};

beforeAll(() => {
  const utilsModule = jest.requireActual('../../../utils/formatTime.js');
  utilsModule.formatTime = jest.fn(seconds => seconds);
});

describe('Component HappyHourAd', () => {
  it('should render', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
  });
  it('should render correct elments in component', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.description)).toEqual(true);
  });
  it('should render correct title', () => {
    const component = shallow(<HappyHourAd {...testProps}/>);
    const renderedTitle = component.find(select.title).text();
    expect(renderedTitle).toEqual(testProps.title);
  });
});
const trueDate = Date;
const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length){
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return (new Date(customDate)).getTime();
  }
};
const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct value at ${time}`, () => {
    global.Date = mockDate(`2020-03-24T${time}.135Z`);
    const component = shallow(<HappyHourAd {...testProps} />);
    const renderedTime = component.find(select.description).text();
    expect(renderedTime).toEqual(expectedDescription);
    global.Date = trueDate;
  });
};
const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} after ${time}`, () => {
    jest.useFakeTimers();
    global.Date = mockDate(`2020-03-24T${time}.135Z`);
    const component = shallow(<HappyHourAd {...testProps} />);
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());
    jest.advanceTimersByTime(delaySeconds * 1000);
    const renderedTime = component.find(select.description).text();
    expect(renderedTime).toEqual(expectedDescription);
    global.Date = trueDate;
    jest.useRealTimers();
  });
};
describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');
});
describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAfterTime('11:57:58', 5, '117');
  checkDescriptionAfterTime('11:59:56', 3, '1');
  checkDescriptionAfterTime('13:00:00', 2 * 60 * 60, 21 * 60 * 60 + '');
});
describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAtTime('12:00:00', testProps.description);
  checkDescriptionAtTime('12:30:00', testProps.description);
  checkDescriptionAtTime('12:59:59', testProps.description);
});
describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAfterTime('11:59:58', 5, testProps.description);
  checkDescriptionAfterTime('11:59:56', 7, testProps.description);
  checkDescriptionAfterTime('10:30:00', 2 * 60 * 60, testProps.description);
});