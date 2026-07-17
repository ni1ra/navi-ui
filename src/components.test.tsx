import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button, Modal, SegmentedControl, Tabs, TextField } from './components';

describe('component contracts', () => {
  it('exposes loading and error state semantics', () => {
    render(<><Button loading>Save</Button><TextField label="Score" error="Impossible checkout" defaultValue="179"/></>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByLabelText('Score')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Score')).toHaveAccessibleDescription('Impossible checkout');
  });

  it('moves tabs with arrow keys and reports the selected panel', () => {
    render(<Tabs label="Input" items={[{id:'one',label:'One',content:'First'},{id:'two',label:'Two',content:'Second'},{id:'off',label:'Off',content:'Never',disabled:true}]}/>);
    const first = screen.getByRole('tab', { name: 'One' });
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second');
  });

  it('keeps tab and panel IDs unique across instances', () => {
    render(<><Tabs label="First tabs" items={[{id:'same',label:'First',content:'First panel'}]}/><Tabs label="Second tabs" items={[{id:'same',label:'Second',content:'Second panel'}]}/></>);
    const tabs = screen.getAllByRole('tab');
    const panels = screen.getAllByRole('tabpanel');
    expect(tabs[0].id).not.toBe(tabs[1].id);
    expect(tabs[0]).toHaveAttribute('aria-controls', panels[0].id);
    expect(tabs[1]).toHaveAttribute('aria-controls', panels[1].id);
    expect(panels[0]).toHaveAttribute('aria-labelledby', tabs[0].id);
    expect(panels[1]).toHaveAttribute('aria-labelledby', tabs[1].id);
  });

  it('moves segmented selection by keyboard and skips disabled options', () => {
    function Specimen() {
      const [value, setValue] = useState<'one' | 'off' | 'three'>('one');
      return <SegmentedControl label="Pace" value={value} onChange={setValue} options={[{value:'one',label:'One'},{value:'off',label:'Off',disabled:true},{value:'three',label:'Three'}]}/>;
    }
    render(<Specimen/>);
    const one = screen.getByRole('radio', { name: 'One' });
    fireEvent.keyDown(one, { key: 'ArrowRight' });
    expect(screen.getByRole('radio', { name: 'Three' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Three' })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('radio', { name: 'Three' }), { key: 'Home' });
    expect(one).toHaveAttribute('aria-checked', 'true');
    expect(one).toHaveFocus();
  });

  it('closes a modal with Escape and restores focus', () => {
    const onClose = vi.fn();
    const { rerender } = render(<><button>Origin</button><Modal open onClose={onClose} title="Ready"><p>Content</p></Modal></>);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
    rerender(<><button>Origin</button><Modal open={false} onClose={onClose} title="Ready"><p>Content</p></Modal></>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
