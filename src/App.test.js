import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { residentData, userData } from "./mocks";

const server = setupServer(
  rest.get(`${process.env.REACT_APP_BASE_URL}/users/me`, (_req, res, ctx) => {
    return res(
      ctx.json(userData)
    );
  }),
  rest.get(
    `${process.env.REACT_APP_BASE_URL}/households/10`,
    (_req, res, ctx) => {
      return res(
        ctx.json(residentData)
      );
    }
  )
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders page", () => {
  render(<App />);
  const heading = screen.getByText(/User Data/i);
  expect(heading).toBeInTheDocument();
});
test("renders firstname and lastname", async () => {
  render(<App />);
  await waitFor(() => {
    const name = screen.getByText(/Developer Jones/i);
    expect(name).toBeInTheDocument();
  });
});

test("renders address", async () => {
  render(<App />);
  await waitFor(() => {
    const address = screen.getByText(/123 Demonstration Boulevard/i);
    expect(address).toBeInTheDocument();
  });
});
