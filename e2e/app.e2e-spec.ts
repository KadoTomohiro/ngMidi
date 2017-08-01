import { NgMidiPage } from './app.po';

describe('ng-midi App', () => {
  let page: NgMidiPage;

  beforeEach(() => {
    page = new NgMidiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
