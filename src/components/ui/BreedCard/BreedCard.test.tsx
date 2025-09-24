// BreedCard.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BreedCard from './BreedCard';

// Mock cat placeholder import
vi.mock('@assets/cat.png', () => ({ default: 'placeholder.png' }));

describe('BreedCard', () => {
  const baseProps = {
    id: 'breed123',
    name: 'Persian',
    description: 'Calm and affectionate cat.',
    temperament: 'Gentle, Quiet',
    origin: 'Iran',
    lifeSpan: '12-17',
    image: { id: 'img123', url: 'http://example.com/persian.jpg' },
    onClick: vi.fn(),
  };

  it('renders the image with correct src and alt', () => {
    render(<BreedCard {...baseProps} />);
    const img = screen.getByRole('img', { name: /Persian/i });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', baseProps.image.url);
    expect(img).toHaveAttribute('alt', baseProps.name);
  });

  it('falls back to placeholder when no image is provided', () => {
    const { id, name, description, temperament, origin, lifeSpan, onClick } = baseProps;
    render(
      <BreedCard
        id={id}
        name={name}
        description={description}
        temperament={temperament}
        origin={origin}
        lifeSpan={lifeSpan}
        image={undefined}
        onClick={onClick}
      />
    );
    const img = screen.getByRole('img', { name: /Persian/i });

    expect(img).toHaveAttribute('src', 'placeholder.png');
  });

  it('renders all breed info fields', () => {
    render(<BreedCard {...baseProps} />);
    expect(screen.getByText('Persian')).toBeInTheDocument();
    expect(screen.getByText(/Origin: Iran/i)).toBeInTheDocument();
    expect(screen.getByText(/Temperament: Gentle, Quiet/i)).toBeInTheDocument();
    expect(screen.getByText(/Life Span: 12-17 years/i)).toBeInTheDocument();
    expect(screen.getByText(/Calm and affectionate cat./i)).toBeInTheDocument();
  });

  it('truncates long descriptions', () => {
    const longDesc = 'x'.repeat(150); // 150 chars
    render(<BreedCard {...baseProps} description={longDesc} />);
    expect(screen.getByText(/x{120}\.\.\./)).toBeInTheDocument();
  });

  it('calls onClick when the card is clicked', () => {
    render(<BreedCard {...baseProps} />);
    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(baseProps.onClick).toHaveBeenCalledTimes(1);
  });
});
