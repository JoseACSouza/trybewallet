import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';

describe('Testes relacionados a página login', () => {
  it('Verifica se a página inicial (Login) contém 2 inputs e um botão, com seus respectivos placeholders ', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const button = screen.getByRole('button');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(emailInput.placeholder).toEqual('Email');
    expect(passwordInput.placeholder).toEqual('Password');
  });

  it('Verifica se o botão só é habilitado caso email tenha @ + .com e password tem mais que 6 carcteres ', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();

    // verifica se só com um email válido o botão continua desabilitado

    userEvent.type(emailInput, 'testeemail.com');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'teste@emailcom');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'teste@email.com');
    expect(button).toBeDisabled();

    userEvent.type(passwordInput, '123');
    expect(button).toBeDisabled();

    userEvent.type(passwordInput, '123456');
    expect(button).not.toBeDisabled();

    userEvent.type(emailInput, 'teste@email.com');
    expect(button).not.toBeDisabled();
  });

  it('Verifica se é redirecionado para /carteira ao clicar no botão', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const button = screen.getByRole('button');

    userEvent.type(passwordInput, '123456');
    userEvent.type(emailInput, 'emai@email.com');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

describe('Testes relacionados ao componente Header', () => {
  it('Verifica se os elementos do Header são renderizados corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const button = screen.getByRole('button');

    userEvent.type(passwordInput, '123456');
    userEvent.type(emailInput, 'email@email.com');
    userEvent.click(button);

    const emailField = screen.getByTestId('email-field');
    const totalField = screen.getByTestId('total-field');
    const currencyField = screen.getByTestId('header-currency-field');

    expect(emailField).toBeInTheDocument();
    expect(emailField.innerHTML).toBe('email@email.com');
    expect(totalField).toBeInTheDocument();
    expect(totalField.innerHTML).toBe('0.00');
    expect(currencyField).toBeInTheDocument();
    expect(currencyField.innerHTML).toBe('BRL');
  });
});

describe('Testes relacionados ao componente Table', () => {
  it('Verifica se a tabela contém os títulos esperados', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const button = screen.getByRole('button');

    userEvent.type(passwordInput, '123456');
    userEvent.type(emailInput, 'emal@email.com');
    userEvent.click(button);
    userEvent.type(screen.getByTestId('value-input'), '3');

    const thNames = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluiir'];
    expect(screen.getByRole('columnheader', { name: thNames[0] })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: thNames[1] })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: thNames[2] })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: thNames[3] })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: thNames[4] })).toBeInTheDocument();
  });
});
