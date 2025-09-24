// Header.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

// Mock store selector
vi.mock('@store/hooks', () => ({
  useAppSelector: () => ({ count: 2 }), // fake favorites count
}));

// Mock icons
vi.mock('@assets/icons/icons', () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
  HamburgerMenu: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="hamburger" {...props} />,
}));

describe('Header', () => {
  it('renders logo and brand text', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText(/Meowbase/i)).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cats/i)).toBeInTheDocument();
    expect(screen.getByText(/Breeds/i)).toBeInTheDocument();
    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
  });

  it('shows favorites count when greater than 0', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('opens and closes mobile menu when hamburger is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Mobile menu should NOT be visible initially
    expect(screen.queryByRole('navigation', { hidden: true })).toBeInTheDocument();
    expect(screen.queryByText(/Cats/i, { selector: 'a.' + 'navbarMobileLink' })).not.toBeInTheDocument();

    // Open menu
    fireEvent.click(screen.getByRole('button', { name: /toggle navigation/i }));
    expect(screen.getAllByRole('link', { name: /Cats/i })).toHaveLength(2);

    // Close menu
    fireEvent.click(screen.getByRole('button', { name: /toggle navigation/i }));
    // Only the desktop link should remain
    expect(screen.getAllByRole('link', { name: /Cats/i })).toHaveLength(1);
    });
});
