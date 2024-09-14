import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VoiceTooltip from '../VoiceTooltip';

describe('VoiceTooltip', () => {
  test('renderiza el children correctamente', () => {
    render(
      <VoiceTooltip text="Tooltip text">
        <button>Hover me</button>
      </VoiceTooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  test('muestra el tooltip al hacer hover', () => {
    render(
      <VoiceTooltip text="Tooltip text">
        <button>Hover me</button>
      </VoiceTooltip>
    );
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(screen.getByText('Tooltip text')).toBeVisible();
  });

  test('oculta el tooltip al quitar el hover', () => {
    render(
      <VoiceTooltip text="Tooltip text">
        <button>Hover me</button>
      </VoiceTooltip>
    );
    const button = screen.getByText('Hover me');
    const tooltip = screen.getByText('Tooltip text');
    
    fireEvent.mouseEnter(button);
    expect(tooltip).toBeVisible();
    
    fireEvent.mouseLeave(button);
    expect(tooltip).not.toBeVisible();
  });
});