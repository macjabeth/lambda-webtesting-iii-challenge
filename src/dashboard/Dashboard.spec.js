import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import Dashboard from './Dashboard';

describe('<Dashboard />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays correct gate text and classes', async () => {
    const { getByText } = render(<Dashboard />);

    const openPanel = await waitForElement(() => getByText('Open'));
    expect(openPanel.textContent).toBe('Open');
    expect(openPanel.classList).toContain('green-led');

    const unlockedPanel = await waitForElement(() => getByText('Unlocked'));
    expect(unlockedPanel.textContent).toBe('Unlocked');
    expect(unlockedPanel.classList).toContain('green-led');

    const closeBtn = await waitForElement(() => getByText('Close Gate'));
    fireEvent.click(closeBtn);
    expect(openPanel.textContent).toBe('Closed');
    expect(openPanel.classList).toContain('red-led');

    const lockBtn = await waitForElement(() => getByText('Lock Gate'));
    fireEvent.click(lockBtn);
    expect(unlockedPanel.textContent).toBe('Locked');
    expect(unlockedPanel.classList).toContain('red-led');
  });
});
