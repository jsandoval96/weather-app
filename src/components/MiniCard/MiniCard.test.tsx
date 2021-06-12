import { render } from '@testing-library/react';
import MiniCard from './MiniCard';


describe('<MiniCard />', () => {
  const title = 'Test';
  const value = 'value';
  const type = 'type';

  test('Render content', () => {
    const component = render(<MiniCard title={title} value={value} type={type} />);

    expect(component.container).toHaveTextContent(title);
    expect(component.container).toHaveTextContent(value);
    expect(component.container).toHaveTextContent(type);
  });
});