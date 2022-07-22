import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import {
  inputTestkitFactory,
  dropdownTestkitFactory,
  buttonTestkitFactory,
  textTestkitFactory,
} from 'wix-style-react/dist/testkit';

import App from './App';

describe('App', () => {
  it('should display saved data', async () => {
    const { baseElement } = render(<App />);

    inputTestkitFactory({
      wrapper: baseElement,
      dataHook: 'first-name-input',
    }).enterText('First name');
    inputTestkitFactory({
      wrapper: baseElement,
      dataHook: 'last-name-input',
    }).enterText('Last name');
    dropdownTestkitFactory({
      wrapper: baseElement,
      dataHook: 'favorite-color-dropdown',
    }).driver.selectOptionById(0);

    await buttonTestkitFactory({
      wrapper: baseElement,
      dataHook: 'submit-button',
    }).click();

    const firstNameText = textTestkitFactory({
      wrapper: baseElement,
      dataHook: 'first-name-text',
    }).getText();
    const lastNameText = textTestkitFactory({
      wrapper: baseElement,
      dataHook: 'last-name-text',
    }).getText();
    const favoriteColorText = textTestkitFactory({
      wrapper: baseElement,
      dataHook: 'favorite-color-text',
    }).getText();

    expect(firstNameText).toBe('First name');
    expect(lastNameText).toBe('Last name');
    expect(favoriteColorText).toBe('Red');
  });

  it('should not display saved data', async () => {
    const { baseElement } = render(<App />);

    dropdownTestkitFactory({
      wrapper: baseElement,
      dataHook: 'favorite-color-dropdown',
    }).driver.selectOptionById(0);
    const isSubmitButtonDisabled = await buttonTestkitFactory({
      wrapper: baseElement,
      dataHook: 'submit-button',
    }).isButtonDisabled();

    expect(isSubmitButtonDisabled).toBe(true);
  });

  it('should clear inputs', async () => {
    const { baseElement } = render(<App />);

    inputTestkitFactory({
      wrapper: baseElement,
      dataHook: 'first-name-input',
    }).enterText('First name');
    inputTestkitFactory({
      wrapper: baseElement,
      dataHook: 'last-name-input',
    }).enterText('Last name');
    dropdownTestkitFactory({
      wrapper: baseElement,
      dataHook: 'favorite-color-dropdown',
    }).driver.selectOptionById(0);

    await buttonTestkitFactory({
      wrapper: baseElement,
      dataHook: 'clear-button',
    }).click();

    const firstNameValue = inputTestkitFactory({
      wrapper: baseElement,
      dataHook: 'first-name-input',
    }).getText();
    const lastNameValue = inputTestkitFactory({
      wrapper: baseElement,
      dataHook: 'last-name-input',
    }).getText();
    const favoriteColorValue = dropdownTestkitFactory({
      wrapper: baseElement,
      dataHook: 'favorite-color-dropdown',
    }).inputDriver.getText();

    expect(firstNameValue).toBe('');
    expect(lastNameValue).toBe('');
    expect(favoriteColorValue).toBe('');
  });
});
