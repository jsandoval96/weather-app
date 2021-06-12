import { render } from '@testing-library/react';
import DailyWeatherCard from './DailyWeatherCard';


describe('<MiniCard />', () => {
  const date = '11-12-2021';
  const img = 'https://localhost:3000/background.jpg';
  const minTemp = 12;
  const maxTemp = 21;
  const tempType = 'C';

  test('Render content', () => {
    const component = render(<DailyWeatherCard date={date} img={img} minTemp={minTemp} maxTemp={maxTemp} tempType={tempType} />);
    const imgEl = component.getByAltText('weather');

    expect(component.container).toHaveTextContent(date);
    expect(component.container).toHaveTextContent(`${minTemp}°${tempType}`);
    expect(component.container).toHaveTextContent(`${maxTemp}°${tempType}`);
    expect(imgEl).toHaveAttribute('src', img);
  });
});