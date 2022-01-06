import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

describe('Greeting component', () => {
    test('renders Hello World as text', () => {
        //Arrange
        render(<Greeting />);

        //Act
        //Nothing to act here

        //Assert
        const helloWorldElement = screen.getByText('Hello World!');
        expect(helloWorldElement).toBeInTheDocument();
    });

    test('renders good to see you! if button was not clicked', () => {
        //Arrange
        render(<Greeting />);

        //Act
        //Nothing to act here

        //Assert
        const outputElement = screen.getByText('good to see you!', {
            exact: false,
        });
        expect(outputElement).toBeInTheDocument();
    });

    test('renders text changed if button was clicked', () => {
        //Arrange
        render(<Greeting />);

        //Act
        const buttonElem = screen.getByRole('button');
        userEvent.click(buttonElem);

        //Assert
        const outputElement = screen.getByText('text changed', {exact: false});
        expect(outputElement).toBeInTheDocument();
    });

    test('does not render "good to see you" if button was clicked', () => {
        //Arrange
        render(<Greeting />);

        //Act
        const buttonElem = screen.getByRole('button');
        userEvent.click(buttonElem);

        //Assert
        const outputElement = screen.queryByText('good to see you', {
            exact: false,
        });
        expect(outputElement).toBeNull();
    });
});
