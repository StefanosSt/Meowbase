// Modal.test.tsx
import React from 'react';
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

// --- Mock dialog methods (jsdom doesn’t implement these) ---
beforeAll(() => {
  window.HTMLDialogElement.prototype.showModal = vi.fn();
  window.HTMLDialogElement.prototype.close = vi.fn();
});

// Mock hooks
vi.mock('@hooks', () => ({
  useLockBodyScroll: vi.fn(),
  useEscapeKey: vi.fn(),
}));

// Mock redux hooks
const mockDispatch = vi.fn();
let mockCurrentView = 'cat';
vi.mock('@store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: unknown) => unknown) =>
    selector({ modalContent: { currentView: mockCurrentView } }),
}));

// Mock slice action
vi.mock('@store/modalContentSlice', () => ({
  switchToBreedView: () => ({ type: 'modal/switchToBreedView' }),
}));

// Mock icons
vi.mock('@assets/icons/icons', () => ({
  Arrow: () => <span data-testid="arrow">←</span>,
}));

describe('Modal', () => {
  let defaultProps: {
    isOpen: boolean;
    setIsOpen: () => void;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    orientation: string;
    catId: string;
  };

  beforeEach(() => {
    defaultProps = {
      isOpen: true,
      setIsOpen: vi.fn(),
      onClose: vi.fn(),
      children: <p>Modal content</p>,
      title: 'Test Modal',
      orientation: 'center',
      catId: 'cat123',
    };
    mockDispatch.mockClear();
    mockCurrentView = 'cat';
  });

  it('renders title and children when open', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByTestId('modal-close-btn'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking backdrop', () => {
    render(<Modal {...defaultProps} />);
    const dialog = screen.getByTestId('modal-dialog');
    fireEvent.click(dialog, { target: dialog, currentTarget: dialog });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('dispatches switchToBreedView when back button is clicked (if currentView is "cat")', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByTestId('modal-back-btn'));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'modal/switchToBreedView' });
  });

  it('does not render back button if currentView is not "cat"', () => {
    mockCurrentView = 'breed';
    render(<Modal {...defaultProps} />);
    expect(screen.queryByRole('button', { name: /go back/i })).not.toBeInTheDocument();
  });
});
