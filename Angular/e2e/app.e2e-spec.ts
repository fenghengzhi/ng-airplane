import { NgAirplanePage } from './app.po';

describe('ng-airplane App', () => {
  let page: NgAirplanePage;

  beforeEach(() => {
    page = new NgAirplanePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
