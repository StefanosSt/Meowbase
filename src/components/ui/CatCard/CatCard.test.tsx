// CatCard.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CatCard from './CatCard';

// Mock FavoriteBtn
vi.mock('@components/common/FavoriteBtn/FavoriteBtn', () => ({
  default: ({ imageId, className }: { imageId: string; className: string }) => (
    <div data-testid="favorite-btn" data-id={imageId} className={className}>
      FavoriteBtn
    </div>
  ),
}));

describe('CatCard', () => {
  const mockProps = {
    id: 'cat123',
    imageUrl: 'http://example.com/cat.jpg',
    alt: 'The cutest cat of Meowbase',
    openModal: vi.fn(),
  };

  it('renders the cat image with correct src and alt', () => {
    render(<CatCard {...mockProps} />);
    const img = screen.getByRole('img', { name: /cutest cat/i });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockProps.imageUrl);
    expect(img).toHaveAttribute('alt', mockProps.alt);
  });

  it('renders FavoriteBtn with correct props', () => {
    render(<CatCard {...mockProps} />);
    const favBtn = screen.getByTestId('favorite-btn');

    expect(favBtn).toBeInTheDocument();
    expect(favBtn).toHaveAttribute('data-id', mockProps.id);
  });

  it('calls openModal when the card is clicked', () => {
    render(<CatCard {...mockProps} />);
    const card = screen.getByRole('button');

    fireEvent.click(card);

    expect(mockProps.openModal).toHaveBeenCalledTimes(1);
  });
});
