import { render, RenderResult, fireEvent } from '@testing-library/react';
import SearchField from './SearchField';

describe('<SearchField />', () => {
  const onSubmitMock = jest.fn();
  const onSubmitLocationMock = jest.fn();
  const value = 'Santiago';
  const error = false;
  const errorMessage = 'prueba error';
  let component: RenderResult;

  beforeEach(() => {
    component = render(<SearchField defaultValue={value} onSubmit={onSubmitMock} onSubmitLocation={onSubmitLocationMock} error={error} errorMessage={errorMessage} placeholder="placeholder"/>);
  });

  test('Should pass a location to test input field', () => {
    const input = component.getByDisplayValue(value);
    
    expect(input).toHaveAttribute('value', value);
  });

  test('Should change a input value', () => {
    const input = component.getByDisplayValue(value);
    fireEvent.change(input, { target: { value: 'Arica' }});
    const inputEl = component.getByDisplayValue('Arica');

    expect(inputEl).toHaveAttribute('value', 'Arica');
  });

  test('Should execute a function on click', () => {
    const button = component.getByRole('location');
    fireEvent.click(button);

    expect(onSubmitLocationMock).toHaveBeenCalledTimes(1);
  });

  test('Should return a input value on submit', () => {
    const button = component.getByRole('submit');
    fireEvent.click(button);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith(value);
  });
});