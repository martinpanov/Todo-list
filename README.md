# Project Documentation: Todo list

## Overview

This App is a single-page application built with React that allows users to add, remove, complete, filter to-dos.

### The link to the website is http://martinp79.sg-host.com

![martinp79 sg-host com_](https://github.com/martinpanov/Todo-list/assets/106311309/5c0f60ae-1567-4d11-9be1-248a098c4ed9)

## Technology Stack

 * React
 * TypeScript
 * Redux

## Project Architecture

 1. React components:
  * The app has one component called `App`. This component represents the entire application
 2. State management:
  * The component uses React's `useState` hook to manage the `inputValue`, which represents the text input for adding new to-do items.
  * Redux is used for state management. It imports hooks like `useAppDispatch` and `useAppSelector` from `./hooks` to interact with the Redux store.
 3. Redux Slice Actions:
  * Redux actions related to to-do management are imported from `./features/todoSlice`. These actions include setting todos, adding, deleting, and toggling todos, managing displayed todos, and changing the selected action for filtering.
 4. Event Handlers:
  * Event handlers are defined for input change `handleChange`, form submission `handleSubmit`, and keypress `handleKeyDown`.
  * Functions like `completeTodo` and `removeTodo` are used to complete or remove to-do items.
  * The `filterTodos` function filters and updates the displayed to-do items based on selected criteria.

## Project Setup

To set up the project locally, follow these steps:

1. Clone the project repository from GitHub.
2. Install the dependencies using `npm install`.
4. Run the dev server using `npm run dev`.

## Project Features

 * Adding to-dos.
 * Completing to-dos.
 * Removing to-ddos
 * Filtering to-dos
