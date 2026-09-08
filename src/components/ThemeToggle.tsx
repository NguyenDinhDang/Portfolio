import React from 'react';
import type { Theme } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <label className="theme-switch cursor-pointer" htmlFor="theme-switch">
      <span>Dark Theme</span>
      <input
        type="checkbox"
        id="theme-switch"
        role="switch"
        aria-label="Chuyển đổi giao diện sáng tối"
        aria-checked={isDark}
        checked={isDark}
        onChange={onToggle}
      />
    </label>
  );
};
