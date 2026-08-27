import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-[var(--border)] bg-[rgba(23,23,29,0.85)] text-[var(--text-primary)] shadow-sm backdrop-blur-md',
        accent:
          'border-[var(--border-accent)] bg-[var(--accent-subtle)] text-[var(--accent)] font-semibold',
        outline:
          'border-[var(--border)] bg-transparent text-[var(--text-secondary)]',
        muted:
          'border-transparent bg-[var(--bg-secondary)] text-[var(--text-muted)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded text-sm font-medium font-mono uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--accent)] text-[var(--text-primary)] border border-[var(--accent)] hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] hover:shadow-[0_0_25px_var(--accent-glow)] active:scale-[0.98]',
        outline:
          'border border-[var(--border-strong)] bg-transparent text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] active:scale-[0.98]',
        ghost:
          'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]',
        link: 'text-[var(--accent)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-6 py-3',
        sm: 'px-3.5 py-1.5 text-xs',
        lg: 'px-8 py-4 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);
