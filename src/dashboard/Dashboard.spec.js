import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-testing-library';

import Dashboard from './Dashboard';

describe('<Dashboard />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays correct gate text and classes', () => {
    const { getByText } = render(<Dashboard />);

    const openPanel = getByText('Open');
    expect(openPanel.classList).toContain('green-led');

    const unlockedPanel = getByText('Unlocked');
    expect(unlockedPanel.classList).toContain('green-led');

    const closeBtn = getByText('Close Gate');
    fireEvent.click(closeBtn);
    expect(openPanel.textContent).toBe('Closed');
    expect(openPanel.classList).toContain('red-led');

    const lockBtn = getByText('Lock Gate');
    fireEvent.click(lockBtn);
    expect(unlockedPanel.textContent).toBe('Locked');
    expect(unlockedPanel.classList).toContain('red-led');
  });

  it('enables/disables buttons correctly for each status', () => {
    const { getByText } = render(<Dashboard />);

    const closeBtn = getByText('Close Gate');
    expect(closeBtn.disabled).toBeFalsy();

    const lockBtn = getByText('Lock Gate');
    expect(lockBtn.disabled).toBeTruthy();

    fireEvent.click(closeBtn);
    expect(lockBtn.disabled).toBeFalsy();
    fireEvent.click(lockBtn);
    expect(closeBtn.disabled).toBeTruthy();
  });
});
